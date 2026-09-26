export interface Area {
  slug: string;
  name: string;
  shortName: string;
  /** ~2 sentences, unique per area */
  intro: string;
  /** residential character of the area */
  residentialNote: string;
  /** 3-4 well-known nearby landmarks */
  landmarks: string[];
  /** approx. distance/time from the Khargapur lab */
  distanceNote: string;
  /** 4 area-flavoured FAQs */
  faqs: { q: string; a: string }[];
  /** unique replacement for the templated services paragraph (optional) */
  servicesNote?: string;
  /** one extra area-specific paragraph (optional) */
  localInsight?: string;
  /** per-area meta description override (optional) */
  metaDescription?: string;
}

export const AREAS: Area[] = [
  {
    slug: "khargapur",
    name: "Khargapur",
    shortName: "Khargapur",
    intro:
      "The Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is located in Khargapur, Gomti Nagar — visit for sample collection and test bookings, or request home sample collection subject to availability.",
    residentialNote:
      "The Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is located in Khargapur, Gomti Nagar — opposite Sanskar Vatika, Awadhpuri-2.",
    landmarks: ["Sanskar Vatika, Awadhpuri-2", "Khargapur, Gomti Nagar", "Lucknow – 226010"],
    distanceNote: "Our Patient Service Centre is located in Khargapur itself (226010). Home sample collection may be available subject to test, location and collection-slot availability.",
    faqs: [
      {
        q: "Is there a blood test centre in Khargapur?",
        a: "Yes. The Dr Lal PathLabs Patient Service Centre (franchise code CC14735) is a physical, operating centre in Khargapur. You can visit the Patient Service Centre for applicable sample collection and test-booking services.",
      },
      {
        q: "Where exactly is the centre in Khargapur?",
        a: "संस्कार वाटिका के सामने, अवधपुरी-2, खरगापुर, गोमती नगर, लखनऊ – 226010 (opposite Sanskar Vatika, Awadhpuri-2). Phone: +91 9451155402.",
      },
      {
        q: "Is home sample collection available in Khargapur?",
        a: "Home sample collection may be available for eligible tests and locations in the Khargapur area, subject to collection-slot availability. Call +91 9451155402 to confirm a slot.",
      },
      {
        q: "How do I book a blood test?",
        a: "Call or WhatsApp +91 9451155402, or book online. Keep your doctor's test list or the test names ready, along with your preferred date and slot.",
      },
    ],
  },
  {
    slug: "gomti-nagar",
    name: "Gomti Nagar",
    shortName: "Gomti Nagar",
    intro:
      "Lucknow's best-planned township and our primary service zone. From Vibhuti Khand to Viraj Khand, our phlebotomists cover all of Gomti Nagar with free doorstep sample collection, 7 days a week.",
    residentialNote:
      "The city's premium residential and commercial hub — wide sectors, parks and high-rises housing families, corporates and senior citizens who value at-home healthcare.",
    landmarks: ["Vibhuti Khand", "Viraj Khand", "Patrakarpuram crossing", "Gomti Nagar railway station"],
    distanceNote: "Approx. 3–5 km from our Khargapur centre — home collection slots are available through the day.",
    faqs: [
      {
        q: "Do you provide home blood sample collection in Gomti Nagar?",
        a: "Yes — free home collection across Vibhuti Khand, Viraj Khand, Vikas Khand, Vishal Khand and every sector of Gomti Nagar.",
      },
      {
        q: "Which lab do Gomti Nagar residents trust for full body checkups?",
        a: "Our NABL-accredited Dr. Lal PathLabs centre serves Gomti Nagar with packages from ₹1250 (Super 1, 40 tests) to ₹2550 (Super 4, 90 tests).",
      },
      {
        q: "Can senior citizens in Gomti Nagar book a home visit?",
        a: "Absolutely — a large share of our Gomti Nagar bookings are senior citizens. Our technicians are trained for gentle, hygienic collection at home.",
      },
      {
        q: "How do I book a test in Gomti Nagar?",
        a: "Book online in 2 minutes or call/WhatsApp +91 9451155402. Morning slots (7–10 AM) are best for fasting tests.",
      },
    ],
  },
  {
    slug: "gomti-nagar-extension",
    name: "Gomti Nagar Extension",
    shortName: "Gomti Nagar Ext.",
    intro:
      "The rapidly developing extension of Gomti Nagar with new societies and townships. We cover the entire Extension with free home sample collection — no need to travel to the main city for quality diagnostics.",
    residentialNote:
      "New-age residential sectors and gated communities along Shaheed Path and Sultanpur Road, home to young families and IT professionals.",
    servicesNote:
      "The Extension's new societies run on gate protocols — share your society name and tower/block on WhatsApp and our technician coordinates entry with you. We cover every sector along Shaheed Path and Sultanpur Road with same-day home collection, and RWAs regularly arrange preventive health camps with us.",
    localInsight:
      "One uniform price list applies everywhere in Lucknow — no Extension surcharge. Young families and IT professionals here mostly book evening slots after work, and morning slots for fasting packages.",
    metaDescription:
      "Blood test in Gomti Nagar Extension, Lucknow — free home collection in all societies along Shaheed Path. Same-day slots, RWA health camps, uniform pricing. Call 9451155402.",
    landmarks: ["Shaheed Path", "Sultanpur Road", "Medanta Hospital approach road", "New township sectors"],
    distanceNote: "Approx. 4–7 km from our Khargapur centre — same-day home collection available.",
    faqs: [
      {
        q: "Is home sample collection available in Gomti Nagar Extension?",
        a: "Yes, free home collection covers all sectors of Gomti Nagar Extension, including societies along Shaheed Path and Sultanpur Road.",
      },
      {
        q: "I just moved to a new society here — how do I book?",
        a: "Share your society name and tower/block on WhatsApp at +91 9451155402 or book online; our technician will coordinate the gate entry with you.",
      },
      {
        q: "Are your test prices the same as the main city?",
        a: "Yes — one uniform price list everywhere. CBC ₹210, Blood Sugar ₹50, and health packages from ₹1250.",
      },
      {
        q: "Do you do corporate or society health camps in the Extension?",
        a: "Yes, we organise preventive health camps for RWAs and offices. Call us to plan one for your society.",
      },
    ],
  },
  {
    slug: "hazratganj",
    name: "Hazratganj",
    shortName: "Hazratganj",
    intro:
      "Lucknow's iconic heritage market and commercial heart. Professionals and shoppers in Hazratganj can book free home sample collection — or combine a lab visit with their day in the city centre.",
    residentialNote:
      "The city's historic commercial core with offices, colleges and old-city residences — busy professionals who prefer early-morning home collection before work.",
    servicesNote:
      "Hazratganj runs on office hours, so our collection schedule bends around them — early-morning home visits for fasting tests before work, and office-address collections for professionals who can't step out. The 10–12 km distance from our Khargapur lab is exactly why doorstep collection, with reports on WhatsApp within 24 hours, suits Ganj's working crowd.",
    localInsight:
      "Many Hazratganj bookings are preventive — annual Super 2 and Super 4 packages for working couples and their parents. If you prefer visiting in person, combine it with your day in the city centre; otherwise the lab comes to you.",
    metaDescription:
      "Blood test in Hazratganj, Lucknow — free home & office sample collection with early-morning slots for professionals. NABL-accredited, reports in 24 hrs. Call 9451155402.",
    landmarks: ["Ganj crossing", "Sahara Ganj", "Janpath market", "Hazratganj metro station"],
    distanceNote: "Approx. 10–12 km from our Khargapur centre — book a morning slot for same-day collection.",
    faqs: [
      {
        q: "Do you collect samples from homes and offices in Hazratganj?",
        a: "Yes — free home and office sample collection across Hazratganj, including early-morning slots for fasting tests before office hours.",
      },
      {
        q: "Can I get my reports on WhatsApp the same day?",
        a: "Routine tests collected in the morning are usually reported within 24 hours on WhatsApp and email.",
      },
      {
        q: "Which tests do working professionals in Hazratganj book most?",
        a: "CBC, HbA1c, Lipid Profile, Thyroid and Vitamin D — plus the Super 2 comprehensive package (60 tests, ₹1550).",
      },
      {
        q: "Is parking/visit easy if I come to your lab from Hazratganj?",
        a: "Our Khargapur centre is about a 25–30 minute drive via Shaheed Path; most Hazratganj customers prefer our free home collection instead.",
      },
    ],
  },
  {
    slug: "indira-nagar",
    name: "Indira Nagar",
    shortName: "Indira Nagar",
    intro:
      "One of Lucknow's largest residential colonies, stretching across sectors A to C. We serve every block of Indira Nagar with free doorstep sample collection by trained phlebotomists.",
    residentialNote:
      "A vast, well-established residential colony of independent houses and apartments — many families and elderly residents who rely on home healthcare.",
    servicesNote:
      "Across Indira Nagar's wide sector grid, home collection is the practical option — our phlebotomists run planned morning routes through Sectors A, B and C, so fasting samples for sugar, lipid and thyroid profiles are collected early and reach our Khargapur lab the same morning. Elderly residents and working professionals around Bhootnath, Takrohi and Munshipulia commonly book the 7–10 AM slots.",
    localInsight:
      "Because the colony stretches several kilometres from Bhootnath market to Faizabad Road, many residents prefer skipping the trip for routine tests. Home collection covers the full sector grid, and reports for most routine tests arrive on WhatsApp and email within 24 hours — no follow-up visit needed.",
    metaDescription:
      "Free home blood sample collection across Indira Nagar Sectors A–C, Lucknow — Bhootnath, Takrohi & Munshipulia covered. NABL-accredited reports in 24 hrs, packages from ₹1250. Call 9451155402.",
    landmarks: ["Bhootnath market", "Indira Nagar Sector 18–25", "Munshipulia crossing", "Faizabad Road"],
    distanceNote: "Approx. 8–10 km from our Khargapur centre — home collection available all 7 days.",
    faqs: [
      {
        q: "Do you serve all sectors of Indira Nagar?",
        a: "Yes — Sectors A, B and C including Bhootnath, Takrohi and Munshipulia sides are all covered with free home collection.",
      },
      {
        q: "My parents are elderly — is home collection safe for them?",
        a: "Yes. Our technicians are trained for gentle collection and carry full hygienic kits. Many of our Indira Nagar bookings are for senior citizens.",
      },
      {
        q: "What is the price of a full body checkup in Indira Nagar?",
        a: "Super 1 (40 tests) ₹1250, Super 2 (60 tests) ₹1550, Super 3 (75 tests) ₹2250, Super 4 (90 tests) ₹2550 — home collection free.",
      },
      {
        q: "Do I need to fast before the test?",
        a: "Fasting (8–10 hours) is required for sugar, lipid and package tests. Our morning slots (7–10 AM) are ideal for fasting samples.",
      },
    ],
  },
  {
    slug: "aliganj",
    name: "Aliganj",
    shortName: "Aliganj",
    intro:
      "A bustling residential-commercial mix in north Lucknow. Residents of Aliganj's sectors and markets get free home sample collection with NABL-accredited accuracy — no long travel needed.",
    residentialNote:
      "Dense residential sectors with markets, schools and clinics — families who want dependable diagnostics without crossing the city.",
    servicesNote:
      "Aliganj's dense sectors make home collection the sensible default — one technician visit can cover the whole family's samples, from children's routine tests to parents' diabetes and thyroid panels. At 12–14 km from our Khargapur centre, doorstep collection skips the cross-city trip entirely, and morning slots keep fasting samples on schedule.",
    localInsight:
      "Most routine tests need no doctor's prescription, so families often book directly — CBC, sugar, thyroid and full-body packages in a single visit, with sealed, barcoded samples transported to our NABL-accredited lab under controlled conditions.",
    metaDescription:
      "Blood test in Aliganj, Lucknow with free home collection for the whole family in one visit. No prescription needed for routine tests, NABL-accredited reports. Call 9451155402.",
    landmarks: ["Aliganj Sector 12 market", "Kapurthala crossing", "Aliganj post office", "Sitapur Road"],
    distanceNote: "Approx. 12–14 km from our Khargapur centre — plan a morning slot for fastest reporting.",
    faqs: [
      {
        q: "Is free home collection available in Aliganj?",
        a: "Yes — all sectors of Aliganj are covered with free doorstep sample collection, 7 days a week.",
      },
      {
        q: "Which tests need a doctor's prescription?",
        a: "Most routine tests (CBC, sugar, thyroid, packages) need no prescription. Specialised tests may ask for one — call us to confirm.",
      },
      {
        q: "How accurate are home-collected samples?",
        a: "100% — samples are sealed, barcoded and transported under controlled conditions to our NABL-accredited lab, exactly like walk-in samples.",
      },
      {
        q: "Can I book for my whole family at once?",
        a: "Yes — family bookings get a single technician visit, and package discounts apply per person.",
      },
    ],
  },
  {
    slug: "jankipuram",
    name: "Jankipuram",
    shortName: "Jankipuram",
    intro:
      "Lucknow's large northern suburb with sectors 1–6 and the Extension. We bring NABL-accredited testing to Jankipuram doorsteps with free home collection across all sectors.",
    residentialNote:
      "A sprawling suburb of plotted developments and new apartments — young families and first-home buyers who prefer digital booking and home visits.",
    servicesNote:
      "Jankipuram's young families tend to book digitally — online booking with UPI payment, a technician at the door in the chosen slot, and reports on WhatsApp. We cover sectors 1–6 and the Extension alike, and diabetes-care panels (HbA1c, fasting/PP sugar, thyroid) are among the most collected tests here.",
    localInsight:
      "Plans change — rescheduling is free up to 2 hours before the slot on a call or WhatsApp message. Morning slots are recommended since Jankipuram is 14–16 km from our Khargapur centre, keeping sample transit times short.",
    metaDescription:
      "Book blood tests online in Jankipuram, Lucknow — free home collection across sectors 1–6 & Extension. UPI payment, diabetes & thyroid panels at home. Call 9451155402.",
    landmarks: ["Jankipuram Sector 3–6", "Jankipuram Extension", "Kursi Road", "Engineering College crossing"],
    distanceNote: "Approx. 14–16 km from our Khargapur centre — morning slots recommended.",
    faqs: [
      {
        q: "Do you cover Jankipuram Extension too?",
        a: "Yes — Jankipuram sectors 1–6 as well as the Extension are fully covered with free home collection.",
      },
      {
        q: "How do I pay for tests booked online?",
        a: "UPI, cards, net-banking online — or cash/UPI to the technician at home. Online payment options are available at booking.",
      },
      {
        q: "Are diabetes and thyroid tests available at home?",
        a: "Yes — HbA1c, fasting/PP sugar, T3/T4/TSH and full diabetes-care panels are all collected at home.",
      },
      {
        q: "What if I need to reschedule my home visit?",
        a: "Just call or WhatsApp +91 9451155402 — rescheduling is free up to 2 hours before the slot.",
      },
    ],
  },
  {
    slug: "alambagh",
    name: "Alambagh",
    shortName: "Alambagh",
    intro:
      "The busy gateway of south Lucknow around the bus station and metro line. Alambagh residents and commuters can book free home sample collection without navigating the crowded market roads.",
    residentialNote:
      "A high-traffic transit and market hub with dense residential lanes — ideal for home collection that skips the traffic entirely.",
    servicesNote:
      "Alambagh's commuters leave early, so we start early too — 7 AM home slots collect fasting samples before you head out, skipping the market-road traffic entirely. The crowds around the bus and metro stations make doorstep collection far more practical than a lab trip through the congested lanes.",
    localInsight:
      "In monsoon, fever panels (Dengue NS1, Typhoid, CBC, CRP) are the most booked tests here — all collected at home. Every booking includes a GST invoice for reimbursements and corporate claims.",
    metaDescription:
      "Blood test in Alambagh, Lucknow — 7 AM home collection slots for commuters near metro & bus station. Fever panels, GST invoice included. Call 9451155402.",
    landmarks: ["Alambagh bus station", "Alambagh metro station", "Singar Nagar", "Krishna Nagar"],
    distanceNote: "Approx. 12–14 km from our Khargapur centre via Shaheed Path — morning slots best.",
    faqs: [
      {
        q: "Do you offer home collection near Alambagh metro/bus station?",
        a: "Yes — Alambagh, Singar Nagar, Krishna Nagar and nearby lanes are all covered with free doorstep collection.",
      },
      {
        q: "I commute daily — can the technician come early morning?",
        a: "Yes, 7 AM slots are available so your fasting sample is collected before you leave for work.",
      },
      {
        q: "Which fever tests do you offer in monsoon season?",
        a: "Fever Panel, Dengue NS1/IgG-IgM, Typhoid (Widal/TyphiDot), CBC and CRP — all with home collection.",
      },
      {
        q: "Will I get a proper GST invoice?",
        a: "Yes — GST invoices are issued for every booking, useful for reimbursements and corporate claims.",
      },
    ],
  },
  {
    slug: "aashiana",
    name: "Aashiana",
    shortName: "Aashiana",
    intro:
      "The well-planned LDA colony on Kanpur Road with sectors A–L. Aashiana families get free home sample collection with the same NABL-accredited quality as our Khargapur centre.",
    residentialNote:
      "A large, organised LDA residential colony — middle-class families and government employees who value affordable, trustworthy healthcare.",
    servicesNote:
      "Aashiana's families watch value closely — Super 1's 40-test annual package at ₹1250 is the most booked option here, with blood sugar at ₹50 and CBC at ₹210 for routine needs. Government employees commonly use our GST invoices and NABL-accredited reports for medical reimbursement claims.",
    localInsight:
      "Our technicians are experienced with paediatric collection and carry child-friendly kits, so children's samples are collected at home without a clinic trip. Same-day slots are usually available across sectors A–L and Ruchi Khand.",
    metaDescription:
      "Affordable blood tests in Aashiana, Lucknow — Super 1 package ₹1250, free home collection across sectors A–L. GST invoice for reimbursement. Call 9451155402.",
    landmarks: ["Aashiana Sector C–L", "Kanpur Road", "Power House crossing", "Ruchi Khand"],
    distanceNote: "Approx. 10–12 km from our Khargapur centre — same-day slots usually available.",
    faqs: [
      {
        q: "Is home collection free in Aashiana sectors?",
        a: "Yes — free across all Aashiana sectors (A to L), Ruchi Khand and nearby Kanpur Road localities.",
      },
      {
        q: "What are your most affordable test options?",
        a: "Blood Sugar ₹50, CBC ₹210, and the Super 1 annual package (40 tests) at just ₹1250 — among the most affordable NABL-accredited rates in Lucknow.",
      },
      {
        q: "Can I get tests done for a medical reimbursement claim?",
        a: "Yes — we provide GST invoices and NABL-accredited reports accepted for most reimbursement claims.",
      },
      {
        q: "Do you test children at home?",
        a: "Yes — our technicians are experienced with paediatric collection and carry child-friendly kits.",
      },
    ],
  },
  {
    slug: "chinhat",
    name: "Chinhat",
    shortName: "Chinhat",
    intro:
      "The growing suburb on Faizabad Road with new societies and the industrial belt. Chinhat residents no longer need to travel into the city — our free home collection brings the lab to your door.",
    residentialNote:
      "An expanding suburb mixing new residential societies with industrial areas — working families who need flexible, at-home diagnostics.",
    servicesNote:
      "Chinhat's mix of new residential societies and the Faizabad Road industrial belt shapes how we serve it — our technicians cover the corridor from Chinhat crossing towards BBD on scheduled routes, and we regularly handle group bookings for factory and industrial staff alongside individual home visits. Morning slots suit both shift workers and families in the new societies.",
    localInsight:
      "Many residents previously travelled into the city for accredited testing; home collection now covers Chinhat and the Faizabad Road societies fully. Industries nearby can also arrange on-site group health camps by calling +91 9451155402.",
    metaDescription:
      "Blood test in Chinhat, Lucknow with free home collection along Faizabad Road — new societies & industrial belt covered. Group bookings available, NABL-accredited reports. Call 9451155402.",
    landmarks: ["Chinhat crossing", "Faizabad Road", "Deva Road", "New societies on Faizabad Road"],
    distanceNote: "Approx. 8–10 km from our Khargapur centre — home visits available 7 days a week.",
    faqs: [
      {
        q: "Do you serve societies on Faizabad Road beyond Chinhat?",
        a: "Yes — Chinhat and societies along Faizabad Road towards BBD are covered with free home collection.",
      },
      {
        q: "Can factory/industrial workers book group tests?",
        a: "Yes — we do group and camp bookings for industries around Chinhat. Call +91 9451155402 for a quote.",
      },
      {
        q: "What is included in the Super 1 package?",
        a: "40 tests covering CBC, sugar, lipid, liver, kidney and thyroid basics at ₹1250 (31% off) — ideal for annual screening.",
      },
      {
        q: "How will I receive my reports?",
        a: "On WhatsApp, email and the web portal — plus a physical copy can be collected from our Khargapur centre.",
      },
    ],
  },
  {
    slug: "shalimar-one-world",
    name: "Shalimar One World",
    shortName: "Shalimar One World",
    intro:
      "Blood tests and home sample collection for Shalimar One World and the surrounding Sector 6 / Gomti Nagar pockets, served by the Dr Lal PathLabs Patient Service Centre (franchise code CC14735) in Khargapur, Lucknow.",
    residentialNote:
      "A residential neighbourhood in the Gomti Nagar region of Lucknow, close to Sector 6 — served by the Khargapur Patient Service Centre for sample collection and test bookings.",
    landmarks: ["Shalimar One World", "Sector 6, Gomti Nagar", "Khargapur, Gomti Nagar"],
    distanceNote:
      "Served by the Dr Lal PathLabs Patient Service Centre in Khargapur, Gomti Nagar (226010). Home sample collection may be available subject to test, location and collection-slot availability.",
    faqs: [
      {
        q: "Is home blood sample collection available near Shalimar One World?",
        a: "Home sample collection may be available for eligible tests near Shalimar One World, subject to collection-slot availability. Call +91 9451155402 to confirm a slot for your address.",
      },
      {
        q: "Which Dr Lal PathLabs centre serves Shalimar One World?",
        a: "This website belongs to the Dr Lal PathLabs Patient Service Centre (franchise code CC14735) in Khargapur, Gomti Nagar, Lucknow — serving Shalimar One World and nearby Sector 6 / Gomti Nagar areas.",
      },
      {
        q: "Which blood tests can I book near Shalimar One World?",
        a: "CBC, blood sugar, HbA1c, thyroid profile, lipid profile, liver and kidney function tests, vitamin D, vitamin B12 and full-body health checkup packages — see the full tests catalogue on this website.",
      },
      {
        q: "How do I book a blood test near Shalimar One World?",
        a: "Call or WhatsApp +91 9451155402, or book online. Keep your doctor's test list ready, along with your preferred date, slot and complete address.",
      },
    ],
  },
];

export const AREA_SLUGS = AREAS.map((a) => a.slug);

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
