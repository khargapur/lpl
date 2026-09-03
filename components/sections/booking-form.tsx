"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Send, Loader2, CheckCircle, Search, X, MapPin, Navigation,
  ChevronDown, FlaskConical,
} from "lucide-react";
import { HEALTH_PACKAGES, SITE_CONFIG } from "@/lib/constants";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  testType: z.string().min(1, "Please select a test or package"),
  collectionType: z.enum(["lab", "home"], { required_error: "Please select collection type" }),
  address: z.string().optional(),
  gpsCoords: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  comments: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, { message: "You must agree to continue" }),
});

type FormValues = z.infer<typeof formSchema>;

const TIME_SLOTS = [
  "7:00 AM – 9:00 AM",
  "9:00 AM – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

interface TestOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface BookingFormProps {
  preselectedTest?: string;
  preselectedPackage?: string;
}

export default function BookingForm({ preselectedTest, preselectedPackage }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Test search combobox state
  const [testQuery, setTestQuery] = useState("");
  const [testResults, setTestResults] = useState<TestOption[]>([]);
  const [testLoading, setTestLoading] = useState(false);
  const [testDropdownOpen, setTestDropdownOpen] = useState(false);
  const [selectedTestLabel, setSelectedTestLabel] = useState("");
  const testDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  // GPS state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const [gpsSet, setGpsSet] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", phone: "", email: "",
      testType: preselectedPackage || preselectedTest || "",
      collectionType: "lab", address: "", gpsCoords: "", date: "", timeSlot: "",
      comments: "", consent: false,
    },
  });

  const collectionType = form.watch("collectionType");

  // Seed package options on mount
  const packageOptions: TestOption[] = HEALTH_PACKAGES.map((p) => ({
    value: p.slug,
    label: `${p.name} – ₹${p.price}`,
    sublabel: "Health Package",
  }));

  const searchTests = useCallback(async (q: string) => {
    setTestLoading(true);
    try {
      const params = new URLSearchParams({ limit: "30" });
      if (q) params.set("q", q);
      const res = await fetch(`/api/tests/search?${params}`);
      const data = await res.json();
      const dbOptions: TestOption[] = (data.tests || []).map((t: { test_code: string; test_name: string; category: string }) => ({
        value: t.test_code,
        label: t.test_name,
        sublabel: t.category,
      }));
      setTestResults([...packageOptions, ...dbOptions]);
    } catch {
      setTestResults(packageOptions);
    } finally {
      setTestLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load initial results on mount
  useEffect(() => {
    searchTests("");
  }, [searchTests]);

  // Debounced search on query change
  useEffect(() => {
    if (testDebounce.current) clearTimeout(testDebounce.current);
    testDebounce.current = setTimeout(() => searchTests(testQuery), 300);
    return () => { if (testDebounce.current) clearTimeout(testDebounce.current); };
  }, [testQuery, searchTests]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target as Node)) {
        setTestDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectTest(opt: TestOption) {
    form.setValue("testType", opt.value, { shouldValidate: true });
    setSelectedTestLabel(opt.label);
    setTestDropdownOpen(false);
    setTestQuery("");
  }

  function clearTest() {
    form.setValue("testType", "", { shouldValidate: true });
    setSelectedTestLabel("");
    setTestQuery("");
    searchTests("");
  }

  // GPS location
  async function handleGetLocation() {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      return;
    }
    setGpsLoading(true);
    setGpsError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        form.setValue("gpsCoords", coords);
        setGpsSet(true);

        // Try reverse geocoding via browser-available Nominatim (no key needed)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const geo = await res.json();
          if (geo.display_name) {
            const current = form.getValues("address");
            if (!current) {
              form.setValue("address", geo.display_name);
            }
          }
        } catch {
          // coords are still saved even if reverse geocoding fails
        }
        setGpsLoading(false);
      },
      (err) => {
        setGpsError(
          err.code === 1
            ? "Location access denied. Please allow location in your browser."
            : "Could not get your location. Please enter your address manually."
        );
        setGpsLoading(false);
      },
      { timeout: 10000 }
    );
  }

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Booking submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-card border border-gray-100 p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-brand-blue mb-2 font-heading">Booking Request Received!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Our team will call you shortly to confirm your appointment. You will receive a confirmation on WhatsApp.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded font-semibold"
        >
          Book Another Test
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
      <div className="bg-brand-blue text-white px-6 py-5">
        <h2 className="text-xl font-bold font-heading">Book a Test</h2>
        <p className="text-white/75 text-sm mt-1">Fill the form and our team will confirm your appointment</p>
      </div>
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Name + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name *</FormLabel>
                  <FormControl><Input placeholder="Your name" {...field} className="h-11 rounded text-sm" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone *</FormLabel>
                  <FormControl><Input placeholder="Mobile number" {...field} className="h-11 rounded text-sm" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Email */}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email *</FormLabel>
                <FormControl><Input type="email" placeholder="Email address" {...field} className="h-11 rounded text-sm" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Test / Package live-search combobox */}
            <FormField control={form.control} name="testType" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Select Test / Package *
                </FormLabel>
                <div ref={comboboxRef} className="relative">
                  {/* Trigger */}
                  {!testDropdownOpen && !selectedTestLabel ? (
                    <button
                      type="button"
                      onClick={() => { setTestDropdownOpen(true); searchTests(""); }}
                      className="w-full h-11 rounded border border-input bg-background px-3 flex items-center justify-between text-sm text-muted-foreground hover:border-gray-400 transition-colors"
                    >
                      <span>Choose a test or package</span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                  ) : !testDropdownOpen ? (
                    <div className="w-full h-11 rounded border border-brand-blue bg-blue-50 px-3 flex items-center justify-between text-sm">
                      <span className="font-medium text-brand-blue line-clamp-1 flex-1">{selectedTestLabel}</span>
                      <button
                        type="button"
                        onClick={clearTest}
                        className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* Search input when open */
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        autoFocus
                        type="text"
                        value={testQuery}
                        onChange={(e) => setTestQuery(e.target.value)}
                        placeholder="Type to search 1,800+ tests..."
                        className="w-full h-11 rounded border border-brand-blue pl-9 pr-9 text-sm outline-none bg-white"
                      />
                      {testQuery && (
                        <button
                          type="button"
                          onClick={() => setTestQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Dropdown */}
                  {testDropdownOpen && (
                    <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                      {testLoading ? (
                        <div className="flex items-center justify-center py-6 text-gray-400">
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          <span className="text-sm">Searching...</span>
                        </div>
                      ) : testResults.length === 0 ? (
                        <div className="py-6 text-center text-sm text-gray-400">No tests found</div>
                      ) : (
                        testResults.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); selectTest(opt); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 flex items-start gap-3"
                          >
                            <FlaskConical className="w-3.5 h-3.5 text-gray-300 mt-0.5 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm text-gray-800 line-clamp-1 font-medium">{opt.label}</p>
                              {opt.sublabel && (
                                <p className="text-xs text-gray-400 mt-0.5">{opt.sublabel}</p>
                              )}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                  {/* Hidden input for form value */}
                  <input type="hidden" {...field} />
                </div>
                <FormMessage />
              </FormItem>
            )} />

            {/* Collection type */}
            <FormField control={form.control} name="collectionType" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sample Collection *</FormLabel>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {(["lab", "home"] as const).map((type) => (
                    <label
                      key={type}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${field.value === type ? "border-brand-blue bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input type="radio" value={type} checked={field.value === type} onChange={() => { field.onChange(type); setGpsSet(false); setGpsError(""); }} className="sr-only" />
                      <p className="font-semibold text-sm text-gray-800">{type === "lab" ? "Visit Lab" : "Home Collection"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{type === "lab" ? "Come to our centre" : "Free pickup at door"}</p>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />

            {/* Home collection: address + GPS */}
            {collectionType === "home" && (
              <div className="space-y-2">
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-1">
                      <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Your Address *
                      </FormLabel>
                      {/* GPS button */}
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={gpsLoading}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                          gpsSet
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-blue-50 text-brand-blue border border-brand-blue/30 hover:bg-brand-blue hover:text-white"
                        }`}
                      >
                        {gpsLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : gpsSet ? (
                          <MapPin className="w-3 h-3" />
                        ) : (
                          <Navigation className="w-3 h-3" />
                        )}
                        {gpsLoading ? "Locating…" : gpsSet ? "Location saved" : "Use my location"}
                      </button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Complete address with landmark"
                        {...field}
                        className="rounded text-sm"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* GPS coords display */}
                {gpsSet && (
                  <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>GPS coordinates saved — our team will use this for precise navigation.</span>
                    <button
                      type="button"
                      onClick={() => { form.setValue("gpsCoords", ""); setGpsSet(false); }}
                      className="ml-auto text-green-500 hover:text-green-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {gpsError && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                    {gpsError}
                  </p>
                )}
              </div>
            )}

            {/* Date + Time slot */}
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Preferred Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} className="h-11 rounded text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="timeSlot" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Time Slot *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 rounded text-sm">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIME_SLOTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Comments */}
            <FormField control={form.control} name="comments" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Additional Comments (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any special requirements or medical conditions" {...field} className="rounded text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Consent */}
            <FormField control={form.control} name="consent" render={({ field }) => (
              <FormItem className="flex items-start gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-xs text-gray-500 font-normal leading-relaxed">
                  I agree to receive appointment confirmation and reports via WhatsApp, email, and SMS.
                </FormLabel>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-brand-blue hover:bg-brand-blue-dark rounded font-semibold">
              {isSubmitting
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
                : <><Send className="w-4 h-4 mr-2" />Submit Booking Request</>}
            </Button>

            <p className="text-center text-xs text-gray-400">
              Or book via{" "}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=Hi, I want to book a test`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue font-semibold hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
