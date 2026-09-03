"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileText, ExternalLink, Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SITE_CONFIG } from "@/lib/constants";

export default function DownloadReportClient() {
  const [patientId, setPatientId] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSearching(false);
    alert("Report download portal will be available soon. Please contact us for your reports.");
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-brand-blue text-white py-12 md:py-16">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">Download Your Reports</h1>
            <p className="text-white/85 text-sm">Access your test reports using your Patient ID and registered mobile number</p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-light-bg">
          <div className="container-custom max-w-lg mx-auto space-y-5">

            {/* Primary CTA - Official Portal */}
            <a
              href="https://www.lalpathlabs.com/download-report"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-brand-blue rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group border-2 border-brand-blue hover:border-brand-yellow"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                  <Download className="w-7 h-7 text-brand-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-0.5">Official Portal</p>
                  <h2 className="text-lg font-bold text-white group-hover:text-brand-yellow transition-colors">Download from Dr. Lal PathLabs</h2>
                  <p className="text-sm text-white/70 mt-0.5">Access your reports on the official Dr. Lal PathLabs portal</p>
                </div>
                <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
              </div>
              <div className="mt-4 bg-brand-yellow/20 rounded-lg px-4 py-2.5 text-sm font-semibold text-brand-yellow flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Click here to download your report
              </div>
            </a>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR GET HELP FROM US</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Local help options */}
            <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-lg font-bold text-brand-blue">Request Reports from Centre</h3>
                <p className="text-xs text-gray-400 mt-1">Enter your Patient ID and we&apos;ll send via WhatsApp</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Patient ID</label>
                    <Input type="text" placeholder="Enter your Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} className="h-11 rounded text-sm" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Registered Mobile</label>
                    <Input type="tel" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="h-11 rounded text-sm" maxLength={10} required />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-brand-blue hover:bg-brand-blue-dark rounded font-semibold" disabled={isSearching}>
                    {isSearching ? "Sending Request..." : <><MessageCircle className="w-4 h-4 mr-2" />Request Report on WhatsApp</>}
                  </Button>
                </form>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-brand-blue flex items-center justify-center"><Phone className="w-5 h-5 text-white" /></div>
                <div><h3 className="font-semibold text-gray-900 text-sm">Call Us</h3><p className="text-xs text-gray-400">{SITE_CONFIG.phone}</p></div>
              </a>
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=Hi, I need my test reports. Patient ID: `} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-3 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-green-600" /></div>
                <div><h3 className="font-semibold text-gray-900 text-sm">WhatsApp</h3><p className="text-xs text-gray-400">Get reports on WhatsApp</p></div>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
