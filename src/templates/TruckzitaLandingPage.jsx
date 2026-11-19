import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Menu, X, Globe, PhoneCall, Phone, Mail, MapPin,
  MessageSquare, Clock, Send, CheckCircle2, CheckCircle,
  ArrowRight, ArrowLeft, Headphones, Truck, Package,
  Anchor, Plane, Weight, Building2, Building, Shield,
  ShieldCheck, Zap, Users, Globe2, Star, BarChart3,
  ArrowUp, FileText
} from 'lucide-react';
import { getPublicAssetUrl } from '../lib/landing-page-api';

/* ==========================================================================
   1. EMBEDDED STYLES & GOOGLE FONTS INJECTION
   ========================================================================== */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;600;700;800;900&display=swap');

    :root {
      --blue-primary:   #1A6FD4;
      --blue-deep:      #0D3A8C;
      --blue-light:     #3B8EE8;
      --blue-electric:  #2E9BF5;
      --blue-dark:      #071E50;
      --dark-bg:        #040D1A;
      --dark-card:      #07152A;
      --dark-card2:     #0C1E3A;
      --white:          #FFFFFF;
      --gray-text:      #8BAFD4;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--dark-bg);
      color: var(--white);
      overflow-x: hidden;
    }

    [dir="rtl"], [dir="rtl"] body {
      font-family: 'Cairo', 'Inter', sans-serif;
    }

    [dir="rtl"] .section-title,
    [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4 {
      font-family: 'Cairo', sans-serif;
      letter-spacing: 0 !important;
    }

    .section-title {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(2rem, 4.2vw, 3.2rem);
      font-weight: 800;
      line-height: 1.2;
    }

    .section-subtitle {
      color: var(--gray-text);
      font-size: 1.05rem;
      line-height: 1.8;
      max-width: 620px;
    }

    .blue-text { color: var(--blue-electric); }

    .btn-primary {
      background: linear-gradient(135deg, var(--blue-primary), var(--blue-electric));
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(26, 111, 212, 0.35);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(26, 111, 212, 0.55);
    }

    .btn-outline {
      background: transparent;
      color: white;
      border: 2px solid rgba(255,255,255,0.3);
      padding: 12px 28px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .btn-outline:hover {
      border-color: var(--blue-electric);
      color: var(--blue-electric);
      transform: translateY(-2px);
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section { padding: 90px 0; }

    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(26,111,212,0.12);
      border: 1px solid rgba(26,111,212,0.35);
      border-radius: 50px;
      padding: 6px 18px;
      margin-bottom: 20px;
      color: var(--blue-electric);
      font-weight: 600;
      font-size: 0.88rem;
    }

    @media (max-width: 860px) {
      .desktop-nav { display: none !important; }
      .mobile-controls { display: flex !important; }
      .hero-grid { grid-template-columns: 1fr !important; }
      .two-col-grid { grid-template-columns: 1fr !important; }
      .footer-grid { grid-template-columns: 1fr 1fr !important; }
    }

    @media (max-width: 520px) {
      .footer-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ==========================================================================
   2. SOCIAL & LOGO VECTOR ICONS
   ========================================================================== */
const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const YtIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

/* Standalone Vector Logo Component */
const TruckzitaLogo = ({ size = 52 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle, #1A6FD4 0%, #071E50 100%)',
      border: '2px solid #2E9BF5',
      boxShadow: '0 0 16px rgba(46,155,245,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <svg
      width={size * 0.7}
      height={size * 0.7}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* صندوق الحمولة */}
      <rect x="2" y="7" width="17" height="14" rx="1.5" />
      {/* خطوط على الصندوق */}
      <path d="M7 11v6M11 11v6M15 11v6" strokeWidth="1.2" opacity="0.7" />

      {/* الكابينة */}
      <path d="M19 11h5.5a1.5 1.5 0 0 1 1.2.6l3 4A1.5 1.5 0 0 1 29 17v4h-10V11z" />
      {/* زجاج الكابينة */}
      <path d="M21.5 13.5h3l2 3h-5v-3z" fill="currentColor" fillOpacity="0.35" strokeWidth="1" />

      {/* الشاسيه */}
      <path d="M2 21h3M12 21h5M26 21h3" />

      {/* العجلات */}
      <circle cx="8" cy="23.5" r="2.8" fill="#071E50" />
      <circle cx="8" cy="23.5" r="0.8" fill="currentColor" />
      <circle cx="23" cy="23.5" r="2.8" fill="#071E50" />
      <circle cx="23" cy="23.5" r="0.8" fill="currentColor" />
    </svg>
  </div>
);

/* ==========================================================================
   3. BILINGUAL TRANSLATION DICTIONARY (EN & AR)
   ========================================================================== */
const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      coverage: 'Coverage',
      fleet: 'Fleet',
      howItWorks: 'How It Works',
      stats: 'Stats',
      contact: 'Contact',
      getQuote: 'Get a Quote',
      tagline: 'Shipping & Heavy Transport',
    },
    hero: {
      badge: "Egypt & Arab World's #1 Heavy Shipping Partner",
      titleMain: 'We Move',
      titleHighlight: 'Everything',
      titleSub: 'Across The',
      titleRegion: 'Arab World',
      description: 'Truckzita operates a powerful fleet of owned and partner trucks delivering across all Egyptian governorates and all Arabic countries. Specialists in heavy transport, oversized cargo, airport logistics, and sea ports.',
      getQuoteBtn: 'Get Free Quote',
      callNowBtn: 'Call Now',
      statCountries: 'Arab Countries',
      statTrucks: 'Trucks Fleet',
      statClients: 'Happy Clients',
      badgeCoverage: '22+ Arab Countries',
      badgeInsured: 'Fully Insured Cargo',
      badgeExpress: 'Express Delivery',
    },
    services: {
      badge: 'Our Core Services',
      title: 'Comprehensive Shipping Solutions For',
      titleHighlight: 'Every Cargo Need',
      subtitle: 'From industrial machinery to standard truckloads, we have the specialized equipment, partner networks, and logistics experts to deliver anywhere reliably.',
      ftlTitle: 'Full Truckload (FTL)',
      ftlDesc: 'Dedicated trucks solely for your cargo. Ideal for high-volume shipments requiring maximum security and direct point-to-point delivery.',
      ftlBadge: 'Most Popular',
      ltlTitle: 'Less Than Truckload (LTL)',
      ltlDesc: 'Cost-effective consolidated shipping for smaller shipments across Egypt and neighboring regions without paying for a full trailer.',
      heavyTitle: 'Heavy & Oversized Transport',
      heavyDesc: 'Engineered heavy haulage for industrial machinery, transformers, construction equipment, and wide-load specialized permits.',
      heavyBadge: 'Specialized',
      airportTitle: 'Airport Air Cargo Logistics',
      airportDesc: 'Synchronized terminal pickups and drop-offs at all Egyptian and regional airports with customs coordination and expedited handling.',
      portTitle: 'Seaport & Ocean Freight Support',
      portDesc: 'Direct container drayage and breakbulk transport from Alexandria, Port Said, Damietta, Sokhna, and Arab port terminals.',
      warehouseTitle: 'Warehousing & Storage',
      warehouseDesc: 'Strategic secure transit depots and warehousing options across Cairo and key hub points for interim cargo storage.',
      expressTitle: 'Express Intercity Delivery',
      expressDesc: 'Time-critical prioritized transport for urgent supply chains, retail restocking, and rapid industrial spares.',
      expressBadge: 'Priority',
      insuredTitle: 'Full Transit Insurance',
      insuredDesc: 'Comprehensive coverage policies protecting your high-value cargo from loading through final destination turnover.',
      learnMore: 'Learn more',
      customTitle: 'Need a Custom Shipping Plan?',
      customSubtitle: 'Our logistics consultants will tailor a dedicated route and equipment package for your specific project.',
      supportText: '24/7 Operations Desk',
    },
    coverage: {
      badge: 'Regional Network',
      title: 'Seamless Coverage Across',
      titleHighlight: 'Egypt & 22+ Arab Nations',
      subtitle: 'From Alexandria to Aswan, and across the entire GCC, Levant, and North Africa — Truckzita connects your supply chain anywhere in the Arab world.',
      mapCaption: 'Truckzita cross-border network — Egypt hub connected to all Arab countries',
      egyptTitle: 'All Egyptian Governorates & Industrial Zones',
      arabTitle: 'Arab Countries & Cross-Border Lanes',
      specialTitle: 'Key Port & Airport Terminals We Serve Daily',
      ports: [
        'Cairo International Airport Cargo Terminal',
        'Borg El Arab International Airport (Alexandria)',
        'Alexandria Port & Dekheila Terminal (Mediterranean)',
        'Port Said Port & East Port Said Hub (Suez Canal)',
        'Damietta Sea Port',
        'Ain Sokhna Port & Red Sea Maritime Gateway',
      ],
      countries: [
        { name: 'Saudi Arabia', cities: 'Riyadh, Jeddah, Dammam' },
        { name: 'United Arab Emirates', cities: 'Dubai, Abu Dhabi, Sharjah' },
        { name: 'Kuwait', cities: 'Kuwait City, Shuwaikh, Ahmadi' },
        { name: 'Qatar', cities: 'Doha, Mesaieed, Ras Laffan' },
        { name: 'Jordan', cities: 'Amman, Zarqa, Aqaba' },
        { name: 'Libya', cities: 'Tripoli, Benghazi, Misrata' },
        { name: 'Sudan', cities: 'Khartoum, Port Sudan' },
        { name: 'Iraq', cities: 'Baghdad, Basra, Erbil' },
        { name: 'Syria', cities: 'Damascus, Aleppo, Latakia' },
        { name: 'Lebanon', cities: 'Beirut, Tripoli' },
        { name: 'Bahrain', cities: 'Manama, Hidd' },
        { name: 'Oman', cities: 'Muscat, Sohar, Salalah' },
        { name: 'Yemen', cities: 'Aden, Mukalla' },
        { name: 'Tunisia', cities: 'Tunis, Sfax, Rades' },
        { name: 'Algeria', cities: 'Algiers, Oran, Skikda' },
        { name: 'Morocco', cities: 'Casablanca, Tangier Med' },
      ],
      egyptCities: [
        'Cairo', 'Giza', 'Alexandria', 'Port Said', 'Suez',
        '10th of Ramadan', '6th of October', 'Sadat City',
        'Damietta', 'Mansoura', 'Tanta', 'Ismailia',
        'Hurghada', 'Sharm El-Sheikh', 'Luxor', 'Aswan'
      ],
    },
    fleet: {
      badge: 'Fleet & Equipment',
      title: 'Modern Fleet Built For',
      titleHighlight: 'Every Load & Dimension',
      subtitle: 'Combining our company-owned trucks with verified partner networks to guarantee vehicle availability anytime, anywhere.',
      ownedTag: 'Owned Fleet',
      partnerTag: 'Partner Fleet',
      ownedDesc: 'Full mechanical control, branded, dedicated drivers',
      partnerDesc: 'On-demand scaling, specialized equipment trailers',
      capacityLabel: 'Payload Capacity',
      bestForLabel: 'Best Suited For',
      trucks: [
        {
          name: 'Heavy Duty Semi-Trailer',
          type: 'Owned Fleet',
          capacity: '30 - 45 Tons',
          use: 'Cross-border long haul & heavy manufacturing cargo',
          features: ['Pneumatic suspension', 'Live GPS tracker', 'Reinforced chassis', 'Double-lock doors'],
        },
        {
          name: 'Flatbed & Low-Bed Transporter',
          type: 'Owned Fleet',
          capacity: 'Up to 70 Tons',
          use: 'Excavators, cranes, oversized steel structures & plant gear',
          features: ['Hydraulic loading ramps', 'High-tensile tie-downs', 'Wide-load escort permits', 'Multi-axle options'],
        },
        {
          name: 'Thermo Refrigerated Reefer',
          type: 'Owned Fleet',
          capacity: '10 - 25 Tons',
          use: 'Perishable foodstuffs, medical supplies & chemicals',
          features: ['Precise -25C to +25C control', 'Digital temperature logger', 'Food-grade sanitary interior', 'Dual cooling units'],
        },
        {
          name: 'Closed Box Cargo Truck',
          type: 'Partner Fleet',
          capacity: '5 - 15 Tons',
          use: 'Airport cargo pickups, commercial electronics & dry goods',
          features: ['Hydraulic tail-lift', 'Weatherproof seal', 'Fast urban terminal clearance', 'E-track cargo restraints'],
        },
        {
          name: 'Multi-Compartment Tanker',
          type: 'Partner Fleet',
          capacity: '20,000 - 36,000 Liters',
          use: 'Non-hazardous industrial fluids & bulk liquids',
          features: ['Stainless steel tanks', 'Vapor recovery system', 'Certified discharge pumps', 'ADR safety compliant'],
        },
        {
          name: 'Curtainsider / Tautliner',
          type: 'Partner Fleet',
          capacity: '20 - 30 Tons',
          use: 'Palletized commercial products with rapid side-loading',
          features: ['Full side access', 'Weatherproof PVC curtains', 'Fast forklift loading', 'Customs bonded sealable'],
        },
      ],
      features: [
        { title: '24/7 Telematics & GPS', desc: 'Real-time vehicle telemetry and location tracking on every haul' },
        { title: 'Full Marine & Road Insurance', desc: 'Comprehensive cargo liability policies covering transit risks' },
        { title: 'Certified Heavy Drivers', desc: 'Experienced commercial operators with multi-border clearance' },
        { title: 'Rigorous Preventive Maintenance', desc: 'Strict multi-point inspections prior to every intercity dispatch' },
      ],
    },
    howItWorks: {
      badge: 'Seamless Process',
      title: 'How Shipping With Truckzita',
      titleHighlight: 'Works in 5 Simple Steps',
      subtitle: 'From initial booking to final destination sign-off, our streamlined workflow removes friction at every mile.',
      steps: [
        { step: '01', title: 'Request a Quote', desc: 'Submit your cargo dimensions, weight, pickup location, and destination via form, phone, or WhatsApp.' },
        { step: '02', title: 'Custom Logistics Plan', desc: 'Our dispatch team determines the optimal truck type, route permits, and transparent all-inclusive rate.' },
        { step: '03', title: 'Secure Loading & Inspection', desc: 'Our truck arrives on schedule. Cargo is professionally lashed, weighed, inspected, and sealed.' },
        { step: '04', title: 'Live Transit Monitoring', desc: 'Track your shipment progress in real time with continuous milestone notifications until arrival.' },
        { step: '05', title: 'Safe Delivery & POD', desc: 'On-time delivery at the airport, port terminal, or warehouse with signed Proof of Delivery (POD).' },
      ],
      pills: ['Fast response within 2 hours', 'Live GPS milestone tracking', 'End-to-end cargo insurance', '24/7 Dedicated operations desk'],
    },
    stats: {
      badge: 'Proven Track Record',
      title: 'The Numbers Behind Our',
      titleHighlight: 'Shipping Reliability',
      subtitle: 'Years of logistics excellence serving major Egyptian manufacturers, exporters, and international importers.',
      stat1: 'Trucks in Active Fleet',
      stat1Desc: 'Owned & contracted transport units',
      stat2: 'Corporate Clients',
      stat2Desc: 'Across commercial and industrial sectors',
      stat3: 'Arab Countries Served',
      stat3Desc: 'Direct highway and port transit lanes',
      stat4: 'Completed Deliveries',
      stat4Desc: 'Safe deliveries without lost cargo',
      stat5: 'On-Time Arrival Rate',
      stat5Desc: 'Strict dispatch schedule adherence',
      stat6: 'Live Support & Tracking',
      stat6Desc: 'Dedicated coordinators around the clock',
      partnersTitle: 'Trusted By Leading Regional Enterprises',
    },
    testimonials: {
      badge: 'Client Testimonials',
      title: 'What Enterprise Shippers Say About',
      titleHighlight: 'Our Freight Performance',
      subtitle: 'Hear from operations directors, procurement managers, and logistics leads who rely on Truckzita daily.',
      reviews: [
        {
          name: 'Eng. Ahmed Mansour',
          role: 'Supply Chain Director',
          company: 'Cairo Heavy Industries',
          country: 'Egypt',
          text: 'Truckzita transported 120 tons of heavy production equipment directly from Alexandria Port to our plant in 10th of Ramadan without a single hitch. Their low-bed trailers and permit handling were world-class.',
        },
        {
          name: 'Fahad Al-Otaibi',
          role: 'Regional Logistics Lead',
          company: 'Gulf Infrastructure Group',
          country: 'Saudi Arabia',
          text: 'We regularly move building equipment between Egypt and Saudi Arabia. Truckzita delivers every single time with zero border delays and transparent updates. The most reliable partner in the region.',
        },
        {
          name: 'Tarek El-Sayed',
          role: 'Operations Head',
          company: 'Nile Port Logistics',
          country: 'Egypt',
          text: 'Handling cargo transfers to Cairo International Airport requires precision timing. Truckzita guarantees prompt gate delivery every time. Their drivers are certified and extremely professional.',
        },
        {
          name: 'Youssef Al-Sabah',
          role: 'Commercial Procurement Manager',
          company: 'Kuwait International Trade',
          country: 'Kuwait',
          text: 'Shipping oversized containers from Egypt to Kuwait used to be our biggest logistics headache. Truckzita simplified customs, port drayage, and road haulage into one seamless contract.',
        },
        {
          name: 'Dr. Nadia Hassan',
          role: 'Supply Operations Lead',
          company: 'Arab Med Pharma Logistics',
          country: 'Egypt',
          text: 'Their refrigerated fleet maintained strict temperature consistency from pickup to airport tarmac delivery. Detailed temperature logs gave our QA team complete confidence.',
        },
        {
          name: 'Rashid Al-Nuaimi',
          role: 'Managing Director',
          company: 'Emirates Industrial Materials',
          country: 'United Arab Emirates',
          text: 'The communication, vehicle tracking, and customer service are outstanding. When we need heavy cargo moved across borders, Truckzita is our first and only call.',
        },
      ],
    },
    contact: {
      badge: 'Get in Touch',
      title: 'Ready to Move Your Cargo?',
      titleHighlight: 'Request a Direct Quote Today',
      subtitle: 'Our logistics specialists are ready to calculate pricing, verify trailer availability, and schedule your route.',
      callTitle: '24/7 Operations Hotline',
      emailTitle: 'Logistics Desk Email',
      officeTitle: 'Main Headquarters',
      officeValue: 'Cairo, Egypt',
      officeSub: 'Logistics District, Nasr City, Cairo',
      hoursTitle: 'Dispatch Schedule',
      hoursValue: '24/7 Road Dispatch',
      hoursSub: 'Office: Sun - Thu, 8:00 AM - 6:00 PM',
      whatsappBtn: 'Chat on WhatsApp with Dispatch',
      formTitle: 'Request a Free Shipping Quote',
      formSubtitle: 'Receive custom pricing within 2 hours',
      fieldName: 'Full Name / Company Representative *',
      fieldPhone: 'Phone Number / WhatsApp *',
      fieldEmail: 'Email Address',
      fieldPickup: 'Pickup Location (City / Port / Airport) *',
      fieldDest: 'Destination (City / Country) *',
      fieldCargo: 'Cargo Type & Estimated Weight (e.g., Heavy Machinery, 25 Tons)',
      fieldNotes: 'Special Requirements / Dimensions / Schedule',
      submitBtn: 'Submit Quote Request',
      successTitle: 'Quote Request Received Successfully!',
      successDesc: 'Our logistics routing team has received your shipment details and will contact you within 2 hours with pricing and equipment availability.',
      submitAnotherBtn: 'Submit Another Shipment Request',
      placeholders: {
        name: 'e.g. Mahmoud Ahmed',
        phone: '+20 100 123 4567',
        email: 'name@company.com',
        pickup: 'e.g. Alexandria Port / Cairo Airport',
        dest: 'e.g. Riyadh, KSA / Suez, Egypt',
        cargo: 'e.g. 2 x Steel coils, 32 Tons',
        notes: 'Provide any crane requirements, delivery deadlines, or access notes...',
      },
    },
    footer: {
      tagline: 'Leading shipping and heavy transport enterprise operating dedicated and partner fleets across all Egyptian governorates and 22+ Arab nations.',
      servicesTitle: 'Our Services',
      coverageTitle: 'Coverage Network',
      contactTitle: 'Direct Contact',
      rights: 'All rights reserved. Truckzita Heavy Transport & Shipping Co.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Transport',
      security: 'Cargo Security Standards',
      operations24: 'Operations & Tracking: Active 24/7',
      officeHours: 'Administrative Office: Sun - Thu',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      coverage: 'التغطية الجغرافية',
      fleet: 'أسطول الشاحنات',
      howItWorks: 'كيف نعمل',
      stats: 'إحصائياتنا',
      contact: 'تواصل معنا',
      getQuote: 'طلب عرض سعر',
      tagline: 'شحن ونقل ثقيل بري وبحري وجوي',
    },
    hero: {
      badge: 'الشريك الأول للشحن الثقيل في مصر والعالم العربي',
      titleMain: 'ننقل',
      titleHighlight: 'كل شيء',
      titleSub: 'عبر كافة دول',
      titleRegion: 'الوطن العربي',
      description: 'تمتلك شركة تروكزيتا أسطولاً متطوراً من الشاحنات الخاصة وشاحنات الشركاء لتغطية جميع محافظات مصر وكافة الدول العربية. متخصصون في النقل الثقيل والمعدات الضخمة والشحن للمطارات والموانئ البحرية.',
      getQuoteBtn: 'احصل على عرض سعر مجاني',
      callNowBtn: 'اتصل بنا الآن',
      statCountries: 'دولة عربية',
      statTrucks: 'شاحنة في الأسطول',
      statClients: 'عميل وشركة تثق بنا',
      badgeCoverage: 'تغطية أكثر من 22 دولة عربية',
      badgeInsured: 'شحنات مؤمنة بالكامل',
      badgeExpress: 'شحن سريع ومحدد المواعيد',
    },
    services: {
      badge: 'خدمات الشحن المتكاملة',
      title: 'حلول لوجستية متطورة تلبي',
      titleHighlight: 'كافة متطلبات الشحن والنقل',
      subtitle: 'سواء كانت شحنتك طروداً تجارية أو معدات صناعية ثقيلة بأوزان قياسية، نوفر لك الأسطول المتخصص والخبرة الميدانية لضمان وصولها بأمان تام.',
      ftlTitle: 'شحن الشاحنة الكاملة (FTL)',
      ftlDesc: 'تخصيص شاحنة بالكامل لشحنتك لضمان أعلى درجات الأمان والسرعة من نقطة التحميل إلى الوجهة النهائية مباشرة.',
      ftlBadge: 'الأكثر طلباً',
      ltlTitle: 'شحن البضائع الجزئية (LTL)',
      ltlDesc: 'حلول اقتصادية مرنة لنقل الأحمال التي لا تتطلب شاحنة كاملة، مع جدول زمني منتظم يغطي كافة المحافظات والوجهات الإقليمية.',
      heavyTitle: 'نقل الحمولات الثقيلة والضخمة',
      heavyDesc: 'معدات متخصصة ومقطورات منخفضة وتريلات عملاقة لنقل الآلات الصناعية، المحولات، والمعدات الإنشائية مع استخراج كافة التصاريح.',
      heavyBadge: 'تخصصنا الأبرز',
      airportTitle: 'لوجستيات الشحن الجوي والمطارات',
      airportDesc: 'خدمة نقل مباشرة من وإلى مطار القاهرة والمطارات الإقليمية، منسقة بدقة متناهية مع جداول رحلات الشحن الجوي وتسهيل الإجراءات.',
      portTitle: 'خدمات الموانئ والشحن البحري',
      portDesc: 'نقل الحاويات والبضائع العامة من وإلى موانئ الإسكندرية، بورسعيد، دمياط، العين السخنة، وموانئ الدول العربية بكفاءة وسرعة.',
      warehouseTitle: 'التخزين والمستودعات الآمنة',
      warehouseDesc: 'مستودعات مؤمنة ومجهزة بأحدث أنظمة المراقبة في مواقع استراتيجية بالقاهرة والمحافظات لتخزين بضائعك حتى موعد الشحن.',
      expressTitle: 'الشحن السريع بين المدن',
      expressDesc: 'أولوية قصوى للشحنات العاجلة مع إمكانية التوصيل في نفس اليوم أو خلال 24 ساعة بين كبرى المدن والمناطق الصناعية.',
      expressBadge: 'أولوية قصوى',
      insuredTitle: 'تأمين شامل على البضائع',
      insuredDesc: 'وثائق تأمين معتمدة تغطي كامل قيمة حمولتك أثناء النقل على الطرق، لتشحن بضائعك براحة بال وثقة مطلقة.',
      learnMore: 'المزيد من التفاصيل',
      customTitle: 'هل تبحث عن خطة نقل مخصصة لمشروعك؟',
      customSubtitle: 'فريقنا من مهندسي وخبراء اللوجستيات جاهز لتصميم خطة شحن متكاملة تناسب مواصفات بضائعك بدقة.',
      supportText: 'غرفة عمليات ومتابعة 24/7',
    },
    coverage: {
      badge: 'نطاق التغطية الجغرافية',
      title: 'شبكة نقل بري عملاقة تغطي',
      titleHighlight: 'مصر وكافة الدول العربية',
      subtitle: 'من الإسكندرية شمالاً حتى أسوان جنوباً، وبخطوط شحن بري وبحري تربط مصر بدول الخليج والمشرق العربي والمغرب العربي.',
      mapCaption: 'شبكة مسارات شحن تروكزيتا — مركز العمليات الرئيسي في مصر متصلاً بكافة العواصم والموانئ العربية',
      egyptTitle: 'كافة محافظات ومدن جمهورية مصر العربية',
      arabTitle: 'الدول العربية التي نخدمها بانتظام',
      specialTitle: 'الموانئ والمطارات والمنافذ اللوجستية الرئيسية',
      ports: [
        'قرية البضائع بمطار القاهرة الدولي',
        'مطار برج العرب الدولي بالإسكندرية',
        'ميناء الإسكندرية ومحطة الدخيلة (البحر المتوسط)',
        'ميناء بورسعيد ومحطة شرق بورسعيد (قناة السويس)',
        'ميناء دمياط البحري',
        'ميناء العين السخنة ومحطات البحر الأحمر',
      ],
      countries: [
        { name: 'المملكة العربية السعودية', cities: 'الرياض، جدة، الدمام، الجبيل' },
        { name: 'الإمارات العربية المتحدة', cities: 'دبي، أبوظبي، الشارقة، جبل علي' },
        { name: 'دولة الكويت', cities: 'مدينة الكويت، الشويخ، الأحمدي' },
        { name: 'دولة قطر', cities: 'الدوحة، مسيعيد، رأس لفان' },
        { name: 'المملكة الأردنية الهاشمية', cities: 'عمان، الزرقاء، العقبة' },
        { name: 'دولة ليبيا', cities: 'طرابلس، بنغازي، مصراتة' },
        { name: 'جمهورية السودان', cities: 'الخرطوم، بورتسودان' },
        { name: 'جمهورية العراق', cities: 'بغداد، البصرة، أربيل' },
        { name: 'الجمهورية العربية السورية', cities: 'دمشق، حلب، اللاذقية' },
        { name: 'الجمهورية اللبنانية', cities: 'بيروت، طرابلس' },
        { name: 'مملكة البحرين', cities: 'المنامة، ميناء خليفة بن سلمان' },
        { name: 'سلطنة عمان', cities: 'مسقط، صحار، صلالة' },
        { name: 'الجمهورية اليمنية', cities: 'عدن، المكلا' },
        { name: 'الجمهورية التونسية', cities: 'تونس العاصمة، صفاقس، رادس' },
        { name: 'الجمهورية الجزائرية', cities: 'الجزائر العاصمة، وهران، سكيكدة' },
        { name: 'المملكة المغربية', cities: 'الدار البيضاء، طنجة المتوسط' },
      ],
      egyptCities: [
        'القاهرة', 'الجيزة', 'الإسكندرية', 'بورسعيد', 'السويس',
        'العاشر من رمضان', 'السادس من أكتوبر', 'مدينة السادات',
        'دمياط', 'المنصورة', 'طنطا', 'الإسماعيلية',
        'الغردقة', 'شرم الشيخ', 'الأقصر', 'أسوان'
      ],
    },
    fleet: {
      badge: 'الأسطول والتجهيزات',
      title: 'شاحنات ومعدات عملاقة',
      titleHighlight: 'جاهزة لكافة الأحمال والأوزان',
      subtitle: 'أسطول هجين يجمع بين شاحناتنا المملوكة للشركة وأقوى شبكة شاحنات معتمدة لتوفير الشاحنة المناسبة لشحنتك في أي وقت.',
      ownedTag: 'أسطولنا الخاص',
      partnerTag: 'أسطول الشركاء المعتمدين',
      ownedDesc: 'صيانة دورية صارمة وسائقون مدربون وتحت إدارتنا المباشرة',
      partnerDesc: 'طاقة استيعابية مفتوحة وتجهيزات متخصصة لكافة المهام',
      capacityLabel: 'الحمولة القصوى',
      bestForLabel: 'الاستخدام الأمثل',
      trucks: [
        {
          name: 'شاحنات التريلا والمقطورات الثقيلة',
          type: 'أسطولنا الخاص',
          capacity: '30 - 45 طن',
          use: 'النقل الدولي والشحن الصناعي للمصانع والشركات الكبرى',
          features: ['نظام تعليق هوائي متطور', 'تتبع حي بالأقمار الصناعية GPS', 'هيكل حديدي معزز', 'أبواب مزدوجة الإغلاق'],
        },
        {
          name: 'مقطورات مسطحة ولوبد (Low-Bed)',
          type: 'أسطولنا الخاص',
          capacity: 'تصل حتى 70 طن',
          use: 'الحفارات والأوناش والمحولات والمعدات الإنشائية الضخمة',
          features: ['منحدرات هيدروليكية صلبة', 'أحزمة وجنازير تثبيت فائقة القوة', 'تصاريح أبعاد استثنائية وسيارات مرافقة', 'محاور متعددة لتوزيع الوزن'],
        },
        {
          name: 'شاحنات تبريد وتجميد حراري',
          type: 'أسطولنا الخاص',
          capacity: '10 - 25 طن',
          use: 'المواد الغذائية والأدوية واللقاحات والمستحضرات الطبية',
          features: ['تحكم دقيق بدرجة الحرارة من -25 إلى +25 مئوية', 'سجل رقمي لمتابعة درجات الحرارة لحظياً', 'صناديق مطابقة للمعايير الصحية', 'محرك تبريد مزدوج للطوارئ'],
        },
        {
          name: 'شاحنات الصندوق المغلق (Box Trucks)',
          type: 'أسطول الشركاء المعتمدين',
          capacity: '5 - 15 طن',
          use: 'شحنات المطارات والأجهزة الإلكترونية والبضائع الحساسة',
          features: ['رافعة هيدروليكية خلفية لسهولة التحميل', 'عزل تام ضد العوامل الجوية والأتربة', 'سهولة الحركة داخل المدن والموانئ', 'أحزمة تثبيت داخلية'],
        },
        {
          name: 'صهاريج السوائل المتعددة',
          type: 'أسطول الشركاء المعتمدين',
          capacity: '20,000 - 36,000 لتر',
          use: 'نقل السوائل الصناعية والزيوت والمواد الكيماوية غير الخطرة',
          features: ['خزانات ستانلس ستيل معقمة', 'أنظمة صمامات أمان مانعة للتسرب', 'مضخات تفريغ معتمدة', 'مطابقة لمعايير السلامة المهنية'],
        },
        {
          name: 'مقطورات الستائر الجانبية (Jumbo Curtains)',
          type: 'أسطول الشركاء المعتمدين',
          capacity: '20 - 30 طن',
          use: 'البضائع المرصوصة على باليتات والتحميل والتفريغ الجانبي السريع',
          features: ['فتح جانبي كامل بواسطة الرافعات الشوكية', 'ستائر PVC مقاومة للمياه والشمس', 'سرعة قياسية في التفريغ', 'قابلة للترصيص الجمركي'],
        },
      ],
      features: [
        { title: 'تتبع لحظي GPS على مدار الساعة', desc: 'نظام تتبع مباشر لموقع وحالة الشاحنة طوال خط السير' },
        { title: 'تأمين شامل على الطرق والموانئ', desc: 'تغطية تأمينية كاملة على البضائع أثناء النقل البري والبحري' },
        { title: 'سائقون محترفون ورخص دولية', desc: 'فريق قيادة معتمد خبير بالطرق الدولية والمعابر الحدودية' },
        { title: 'فحص فني وميكانيكي قبل الانطلاق', desc: 'فحص دوري دقيق لإطارات ومحركات الشاحنات لضمان وصول الشحنة دون أعطال' },
      ],
    },
    howItWorks: {
      badge: 'آلية العمل البسيطة',
      title: 'كيف يتم الشحن مع تروكزيتا',
      titleHighlight: 'في 5 خطوات سهلة ومنظمة',
      subtitle: 'منذ اتصالك الأول وحتى التوقيع على إشعار الاستلام، ندير كل التفاصيل لنمنحك تجربة شحن سلسة بدون أي قلق.',
      steps: [
        { step: '01', title: 'طلب عرض السعر', desc: 'أرسل تفاصيل حمولتك (الوزن، الأبعاد، مكان الاستلام، ووجهة التسليم) عبر النموذج أو الهاتف أو واتساب.' },
        { step: '02', title: 'تحديد الخطة والمسار', desc: 'يحدد فريقنا اللوجستي نوع الشاحنة المثالي وأنسب مسار مع تقديم سعر نهائي شفاف بدون أي تكاليف خفية.' },
        { step: '03', title: 'التحميل الآمن والفحص', desc: 'تصل الشاحنة في الموعد المحدد، ويتم تربيط الشحنة وتأمينها وفق أعلى معايير السلامة المهنية قبل الانطلاق.' },
        { step: '04', title: 'التتبع المباشر أثناء الرحلة', desc: 'تابع موقع شاحنتك خطوة بخطوة عبر نظام التتبع المباشر وتحديثات مستمرة حتى وصولها للوجهة.' },
        { step: '05', title: 'التسليم الآمن وإثبات الوصول', desc: 'تسليم البضاعة بأمان في المطار أو الميناء أو موقع شركتك، واستلام إشعار الاستلام الرسمي المعتمد (POD).' },
      ],
      pills: ['رد سريع خلال ساعتين بحد أقصى', 'تتبع حي بالأقمار الصناعية GPS', 'تأمين معتمد على كافة المنقولات', 'فريق دعم فني ولوجستي متاح 24/7'],
    },
    stats: {
      badge: 'أرقام تتحدث عن جدارتنا',
      title: 'إحصائيات تبرهن على',
      titleHighlight: 'التزامنا واحترافيتنا في الشحن',
      subtitle: 'سنوات من الخبرة اللوجستية الممتدة في خدمة كبرى المصانع والمؤسسات التصديرية والاستيرادية في مصر والعالم العربي.',
      stat1: 'شاحنة في الأسطول المشترك',
      stat1Desc: 'شاحنات مملوكة وشاحنات شركاء جاهزة دائماً',
      stat2: 'شركة وعميل دائم',
      stat2Desc: 'في مختلف القطاعات التجارية والصناعية',
      stat3: 'دولة عربية نصل إليها',
      stat3Desc: 'خطوط نقل بري وبحري نشطة على مدار العام',
      stat4: 'شحنة تم تسليمها بنجاح',
      stat4Desc: 'وصول سليم وآمن بدون أي فقد في البضائع',
      stat5: 'نسبة الالتزام بالمواعيد',
      stat5Desc: 'دقة فائقة في مواعيد التحميل والوصول',
      stat6: 'خدمة دعم وتتبع متواصلة',
      stat6Desc: 'غرفة تحكم ومتابعة لا تتوقف 24 ساعة يومياً',
      partnersTitle: 'شركات وكيانات كبرى تعتمد على تروكزيتا لنقل بضائعها',
    },
    testimonials: {
      badge: 'شهادات العملاء',
      title: 'ماذا يقول كبار العملاء عن',
      titleHighlight: 'مستوى الأداء والالتزام لدينا',
      subtitle: 'آراء مسؤولي سلاسل الإمداد ومديري المشتريات والخدمات اللوجستية في كبرى الشركات بالمنطقة.',
      reviews: [
        {
          name: 'م. أحمد منصور',
          role: 'مدير سلاسل الإمداد',
          company: 'شركة القاهرة للصناعات الثقيلة',
          country: 'مصر',
          text: 'قامت تروكزيتا بنقل 120 طناً من معدات الإنتاج الحساسة من ميناء الإسكندرية إلى مصنعنا بالعاشر من رمضان دون أدنى تأخير. تعاملهم مع المقطورات المنخفضة واستخراج التصاريح كان احترافياً للغاية.',
        },
        {
          name: 'فهد العتيبي',
          role: 'مدير العمليات اللوجستية',
          company: 'مجموعة الخليج للإنشاءات',
          country: 'السعودية',
          text: 'نشحن معدات بناء ومواد بانتظام بين مصر والمملكة العربية السعودية. تروكزيتا تلتزم دائماً بالمواعيد دون أي تأخير عند المعابر، والتتبع المباشر للشاحنات يمنحنا راحة بال تامة.',
        },
        {
          name: 'طارق السيد',
          role: 'رئيس العمليات',
          company: 'نايل بورت للخدمات اللوجستية',
          country: 'مصر',
          text: 'نقل الشحنات إلى قرية البضائع بمطار القاهرة يتطلب التزاماً صارماً بالوقت قبل إقلاع الطائرات. تروكزيتا تقدم أفضل أداء وسائقوها ملتزمون وخبيرون بجميع الإجراءات.',
        },
        {
          name: 'يوسف الصباح',
          role: 'مدير المشتريات والتعاقدات',
          company: 'الكويت للتجارة الدولية',
          country: 'الكويت',
          text: 'كان نقل الحاويات والمعدات من مصر إلى الكويت يمثل تحدياً لوجستياً كبيراً بالنسبة لنا. قامت تروكزيتا بتبسيط النقل البحري والبري والتخليص في عقد واحد مريح وموثوق.',
        },
        {
          name: 'د. نادية حسن',
          role: 'مديرة الإمداد الطبي',
          company: 'المتحدة للأدوية والمستلزمات الطبية',
          country: 'مصر',
          text: 'أسطول التبريد لديهم حافظ على ثبات درجات الحرارة طوال الرحلة حتى التسليم داخل مهبط المطار. التقارير الحرارية الرقمية أكدت التزامهم الكامل بمعايير السلامة الدوائية.',
        },
        {
          name: 'راشد النعيمي',
          role: 'المدير التنفيذي',
          company: 'الإمارات للمواد الصناعية',
          country: 'الإمارات',
          text: 'سرعة الاستجابة والتواصل وخدمة العملاء من أرقى ما رأيت. عندما نحتاج لنقل شحنات ثقيلة عبر الحدود، فإن تروكزيتا هي خيارنا الدائم والأول.',
        },
      ],
    },
    contact: {
      badge: 'تواصل معنا الآن',
      title: 'جاهز لبدء نقل شحنتك؟',
      titleHighlight: 'اطلب عرض سعر مباشر وسريع',
      subtitle: 'مهندسو اللوجستيات لدينا بانتظارك لمراجعة تفاصيل حمولتك وتحديد السعر وتجهيز الشاحنة المناسبة فوراً.',
      callTitle: 'الخط الساخن لغرفة العمليات (24/7)',
      emailTitle: 'البريد الإلكتروني للعمليات',
      officeTitle: 'المقر الرئيسي للشركة',
      officeValue: 'القاهرة، مصر',
      officeSub: 'حي اللوجستيات، مدينة نصر، القاهرة',
      hoursTitle: 'أوقات العمل والتشغيل',
      hoursValue: 'غرفة العمليات والشاحنات: 24 ساعة يومياً',
      hoursSub: 'المكتب الإداري: الأحد - الخميس، 8:00 ص - 6:00 م',
      whatsappBtn: 'تواصل فوراً عبر واتساب مع العمليات',
      formTitle: 'طلب عرض سعر شحن مجاني',
      formSubtitle: 'سنوافيك بالتكلفة والمواعيد خلال ساعتين',
      fieldName: 'الاسم بالكامل / ممثل الشركة *',
      fieldPhone: 'رقم الهاتف / واتساب *',
      fieldEmail: 'البريد الإلكتروني',
      fieldPickup: 'نقطة التحميل (المدينة / الميناء / المطار) *',
      fieldDest: 'مكان التسليم (المدينة / الدولة) *',
      fieldCargo: 'نوع الحمولة والوزن التقديري (مثلاً: ماكينات ومعدات ثقيلة، 25 طن)',
      fieldNotes: 'متطلبات خاصة / الأبعاد / مواعيد التسليم المفضلة',
      submitBtn: 'إرسال طلب عرض السعر',
      successTitle: 'تم استلام طلبك بنجاح!',
      successDesc: 'تلقى فريق العمليات اللوجستية تفاصيل شحنتك وسنتواصل معك خلال ساعتين لتزويدك بخطة النقل والتسعير المناسب.',
      submitAnotherBtn: 'إرسال طلب شحنة أخرى',
      placeholders: {
        name: 'مثال: محمود أحمد / شركة مصر للصناعة',
        phone: '+20 100 123 4567',
        email: 'info@company.com',
        pickup: 'مثال: ميناء الإسكندرية / مطار القاهرة الدولي',
        dest: 'مثال: الرياض، السعودية / العاشر من رمضان، مصر',
        cargo: 'مثال: معدات حفر، 35 طن',
        notes: 'اذكر أي تفاصيل خاصة بالأبعاد أو الرافعات أو اشتراطات الموعد...',
      },
    },
    footer: {
      tagline: 'شركة رائدة في خدمات الشحن البري والنقل الثقيل تمتلك وتدير أسطولاً متطوراً يربط كافة محافظات مصر بـ 22 دولة عربية بأعلى معايير الأمان.',
      servicesTitle: 'خدماتنا',
      coverageTitle: 'نطاق الشحن',
      contactTitle: 'بيانات التواصل',
      rights: 'جميع الحقوق محفوظة. شركة تروكزيتا للشحن والنقل الثقيل.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط النقل والخدمة',
      security: 'معايير أمان البضائع',
      operations24: 'غرفة العمليات والتتبع: نشطة 24/7',
      officeHours: 'المقر الإداري: الأحد - الخميس',
    },
  },
};

/* ==========================================================================
   4. CONTEXT & STATE HOOK
   ========================================================================== */
const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

/* ==========================================================================
   5. COMPONENT: COUNT UP ANIMATION
   ========================================================================== */
function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ==========================================================================
   6. COMPONENT: ANIMATED TRUCK SVG
   ========================================================================== */
function TruckSVG({ isRTL }) {
  const WY = 198; // مركز العجل
  const wheels = [70, 145, 322, 455]; // محورين ورا + محورين تحت الكابينة (مسافات كافية بينهم)

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 560,
        transform: isRTL ? 'scaleX(-1)' : 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75%',
          height: 60,
          background: 'radial-gradient(ellipse, rgba(26,111,212,0.45) 0%, transparent 70%)',
          filter: 'blur(22px)',
        }}
      />
      <svg viewBox="0 0 560 250" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%">
        <defs>
          <linearGradient id="cargoGradSingle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A6FD4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0D3A8C" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cabGradSingle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1456B0" />
            <stop offset="100%" stopColor="#071E50" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E9BF5" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#071E50" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Road */}
        <rect x="0" y="219" width="560" height="31" fill="#07152A" rx="4" />
        <rect x="0" y="230" width="560" height="3" fill="#0C1E3A" />
        {[0, 90, 180, 270, 360, 450].map((x, i) => (
          <motion.rect
            key={i}
            x={x}
            y="236"
            width="50"
            height="5"
            rx="2.5"
            fill="#1A6FD4"
            opacity="0.5"
            animate={{ x: [x, x - 90] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
          />
        ))}

        {/* Chassis */}
        <rect x="20" y="170" width="474" height="10" rx="3" fill="#0C1E3A" stroke="#1A6FD4" strokeWidth="1.5" />

        {/* Cargo box */}
        <rect x="20" y="34" width="330" height="138" rx="8" fill="url(#cargoGradSingle)" stroke="#1A6FD4" strokeWidth="2" />
        <rect x="20" y="34" width="330" height="10" rx="5" fill="#2E9BF5" fillOpacity="0.35" />
        {/* خط ديكور */}
        <rect x="20" y="146" width="330" height="4" fill="#2E9BF5" fillOpacity="0.5" />
        {/* تنورة جانبية */}
        <rect x="20" y="160" width="330" height="12" rx="4" fill="#0D3A8C" fillOpacity="0.9" />
        {/* لوجو */}
        <circle cx="76" cy="92" r="26" fill="#0D3A8C" stroke="#2E9BF5" strokeWidth="2" />

        <text x="160" y="90" fontFamily="Poppins,sans-serif" fontWeight="800" fontSize="20" fill="white">
          TRUCKZITA
        </text>
        <text x="180" y="110" fontFamily="Inter,sans-serif" fontSize="9.5" fill="#8BAFD4" fontWeight="600" letterSpacing="0.5">
          SHIPPING &amp; HEAVY CARGO
        </text>

        {/* فتحات العجل (Wheel arches) */}
        {wheels.map((cx) => (
          <path
            key={`arch-${cx}`}
            d={`M ${cx - 29} ${WY} A 29 29 0 0 1 ${cx + 29} ${WY} Z`}
            fill="#04122E"
            stroke="#1A6FD4"
            strokeWidth="1.5"
          />
        ))}

        {/* فاصل مطاطي بين الصندوق والكابينة */}
        <rect x="350" y="60" width="9" height="112" rx="3" fill="#0C1E3A" stroke="#1A6FD4" strokeWidth="1" />

        {/* Roof deflector (سبويلر الكابينة) */}
        <path d="M359 68 V46 Q359 42 365 42 H382 Q412 42 432 68 Z" fill="url(#cabGradSingle)" stroke="#1A6FD4" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Cab (كابينة حديثة بواجهة مائلة) */}
        <path
          d="M359 180 V88 Q359 68 380 68 H436 L484 118 Q492 127 492 140 V180 Z"
          fill="url(#cabGradSingle)"
          stroke="#1A6FD4"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* زجاج */}
        <path d="M372 82 H430 L466 120 H372 Z" fill="url(#glassGrad)" stroke="#2E9BF5" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M380 88 H402 L414 100 H380 Z" fill="#fff" fillOpacity="0.12" />
        {/* باب ومقبض */}
        <path d="M417 124 V176" stroke="#1A6FD4" strokeOpacity="0.7" strokeWidth="1.5" />
        <rect x="402" y="138" width="12" height="3.5" rx="1.75" fill="#2E9BF5" />
        {/* مرايا */}
        <rect x="486" y="96" width="5" height="20" rx="2.5" fill="#0C1E3A" stroke="#1A6FD4" strokeWidth="1" />

        {/* الشبكة الأمامية */}
        <rect x="466" y="146" width="26" height="22" rx="4" fill="#071E50" stroke="#2E9BF5" strokeWidth="1" />
        {[151, 157, 163].map((y) => (
          <line key={y} x1="470" y1={y} x2="488" y2={y} stroke="#2E9BF5" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
        ))}

        {/* Headlight (LED) + beam */}
        <motion.rect
          x="470"
          y="128"
          width="22"
          height="7"
          rx="3.5"
          fill="#CDEBFF"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <motion.path
          d="M492 131 L558 114 L558 150 Z"
          fill="rgba(46,155,245,0.14)"
          animate={{ opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />

        {/* Bumper */}
        <rect x="462" y="170" width="38" height="11" rx="5" fill="#1A6FD4" />

        {/* Wheels */}
        {wheels.map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy={WY} r="21" fill="#0C1E3A" stroke="#1A6FD4" strokeWidth="2.5" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${cx}px ${WY}px` }}
            >
              <circle cx={cx} cy={WY} r="11" fill="#07152A" stroke="#1A6FD4" strokeWidth="1" />
              {[0, 72, 144, 216, 288].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={angle}
                    x1={cx + Math.cos(rad) * 4}
                    y1={WY + Math.sin(rad) * 4}
                    x2={cx + Math.cos(rad) * 16}
                    y2={WY + Math.sin(rad) * 16}
                    stroke="#2E9BF5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.g>
            <circle cx={cx} cy={WY} r="3" fill="#2E9BF5" />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

/* ==========================================================================
   7. COMPONENT: ARAB WORLD MAP SVG
   ========================================================================== */
function ArabWorldMap({ caption }) {
  const dots = [
    { x: 300, y: 150, size: 10, main: true },
    { x: 420, y: 190, size: 8 },
    { x: 500, y: 210, size: 6 },
    { x: 480, y: 170, size: 5 },
    { x: 500, y: 185, size: 5 },
    { x: 370, y: 155, size: 6 },
    { x: 240, y: 155, size: 7 },
    { x: 350, y: 230, size: 7 },
    { x: 380, y: 170, size: 6 },
    { x: 370, y: 148, size: 6 },
    { x: 360, y: 140, size: 5 },
    { x: 500, y: 220, size: 4 },
    { x: 520, y: 230, size: 6 },
    { x: 450, y: 240, size: 6 },
    { x: 170, y: 150, size: 6 },
    { x: 130, y: 148, size: 7 },
    { x: 80, y: 148, size: 6 },
  ];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 620 350" width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="mapGlowSingle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A6FD4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#040D1A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="620" height="350" fill="url(#mapGlowSingle)" rx="20" />

        {/* Lines */}
        {dots.filter((d) => !d.main).map((dot, i) => (
          <motion.line
            key={i}
            x1={300}
            y1={150}
            x2={dot.x}
            y2={dot.y}
            stroke="#2E9BF5"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.55 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: i * 0.05 }}
          />
        ))}

        {/* Dots */}
        {dots.map((dot, i) => (
          <g key={i}>
            {dot.main && (
              <>
                <motion.circle
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.size + 16}
                  fill="#1A6FD4"
                  opacity="0.12"
                  animate={{ r: [dot.size + 10, dot.size + 24, dot.size + 10] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
                <motion.circle
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.size + 6}
                  fill="#2E9BF5"
                  opacity="0.25"
                  animate={{ r: [dot.size + 4, dot.size + 12, dot.size + 4] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
                />
              </>
            )}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill={dot.main ? '#FFFFFF' : '#2E9BF5'}
              stroke="#0D3A8C"
              strokeWidth={dot.main ? 3 : 1.5}
            />
            {dot.main && (
              <text x={dot.x} y={dot.y - 18} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Poppins, sans-serif">
                EGYPT (OPERATIONS HUB)
              </text>
            )}
          </g>
        ))}
      </svg>

      <div style={{ textAlign: 'center', marginTop: 12, color: '#8BAFD4', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Globe2 size={16} color="#2E9BF5" />
        <span>{caption}</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   8. MAIN UNIFIED PAGE COMPONENT
   ========================================================================== */
export default function TruckzitaLandingPage({ page } = {}) {
  const [lang, setLang] = useState('ar');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Backend section data integration
  const announcement = page?.sections?.announcement;
  const headerSection = page?.sections?.header;
  const contactSection = page?.sections?.contact;
  const brandName = headerSection?.brandName;
  const logoUrl = getPublicAssetUrl(headerSection?.logo);
  const contactPhone = contactSection?.phone;
  const contactEmail = contactSection?.email;

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', origin: '', dest: '', cargo: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const isRTL = lang === 'ar';
  const t = translations[lang] || translations.en;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(7,21,42,0.8)',
    border: '1px solid rgba(26,111,212,0.3)',
    borderRadius: 12,
    color: 'white',
    fontSize: '0.92rem',
    outline: 'none',
    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif',
  };

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.coverage, href: '#coverage' },
    { label: t.nav.fleet, href: '#fleet' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.stats, href: '#stats' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const servicesData = [
    { icon: <Truck size={26} />, title: t.services.ftlTitle, desc: t.services.ftlDesc, color: '#2E9BF5', badge: t.services.ftlBadge },
    { icon: <Package size={26} />, title: t.services.ltlTitle, desc: t.services.ltlDesc, color: '#3B8EE8', badge: null },
    { icon: <Weight size={26} />, title: t.services.heavyTitle, desc: t.services.heavyDesc, color: '#1A6FD4', badge: t.services.heavyBadge },
    { icon: <Plane size={26} />, title: t.services.airportTitle, desc: t.services.airportDesc, color: '#2E9BF5', badge: null },
    { icon: <Anchor size={26} />, title: t.services.portTitle, desc: t.services.portDesc, color: '#3B8EE8', badge: null },
    { icon: <Building2 size={26} />, title: t.services.warehouseTitle, desc: t.services.warehouseDesc, color: '#1A6FD4', badge: null },
    { icon: <Zap size={26} />, title: t.services.expressTitle, desc: t.services.expressDesc, color: '#2E9BF5', badge: t.services.expressBadge },
    { icon: <Shield size={26} />, title: t.services.insuredTitle, desc: t.services.insuredDesc, color: '#3B8EE8', badge: null },
  ];

  const statsData = [
    { icon: <Truck size={28} />, value: 500, suffix: '+', label: t.stats.stat1, desc: t.stats.stat1Desc, color: '#2E9BF5' },
    { icon: <Users size={28} />, value: 10000, suffix: '+', label: t.stats.stat2, desc: t.stats.stat2Desc, color: '#3B8EE8' },
    { icon: <Globe2 size={28} />, value: 22, suffix: '+', label: t.stats.stat3, desc: t.stats.stat3Desc, color: '#1A6FD4' },
    { icon: <Package size={28} />, value: 50000, suffix: '+', label: t.stats.stat4, desc: t.stats.stat4Desc, color: '#2E9BF5' },
    { icon: <Star size={28} />, value: 98, suffix: '%', label: t.stats.stat5, desc: t.stats.stat5Desc, color: '#3B8EE8' },
    { icon: <Clock size={28} />, value: 24, suffix: '/7', label: t.stats.stat6, desc: t.stats.stat6Desc, color: '#1A6FD4' },
  ];

  const stepIcons = [
    <PhoneCall key="phone" size={26} />,
    <FileText key="file" size={26} />,
    <Truck key="truck" size={26} />,
    <ShieldCheck key="shield" size={26} />,
    <CheckCircle2 key="check" size={26} />,
  ];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, isRTL, t }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: '#040D1A', color: '#FFFFFF' }}>
        <GlobalStyles />

        {/* Announcement Bar if provided by Backend */}
        {announcement && announcement.isVisible !== false && announcement.text && (
          <div
            style={{
              backgroundColor: announcement.bgColor || '#ff0000',
              color: announcement.textColor || '#ffffff',
              textAlign: 'center',
              padding: '9px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              position: 'relative',
              zIndex: 1001,
            }}
          >
            {announcement.text}
          </div>
        )}

        {/* =================================================================
            NAVBAR
            ================================================================= */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            top: announcement && announcement.isVisible !== false && announcement.text ? 36 : 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '10px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: scrolled ? 'blur(22px)' : 'none',
            backgroundColor: scrolled ? 'rgba(4,13,26,0.96)' : 'rgba(4,13,26,0.6)',
            borderBottom: scrolled ? '1px solid rgba(26,111,212,0.25)' : '1px solid rgba(26,111,212,0.1)',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Brand */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            {logoUrl ? (
              <img src={logoUrl} alt={brandName || "Logo"} style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
            ) : (
              <TruckzitaLogo size={48} />
            )}
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'white' }}>
                {brandName ? (
                  brandName
                ) : (
                  <>TRUCK<span style={{ color: '#2E9BF5' }}>ZITA</span></>
                )}
              </div>
              <div style={{ color: '#8BAFD4', fontSize: '0.64rem', letterSpacing: isRTL ? '0' : '1px', fontWeight: 600, textTransform: 'uppercase' }}>
                {t.nav.tagline}
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: 500, fontSize: '0.92rem' }}
              >
                {link.label}
              </a>
            ))}

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              style={{
                background: 'rgba(26,111,212,0.18)',
                border: '1px solid rgba(46,155,245,0.4)',
                color: '#FFFFFF',
                padding: '7px 15px',
                borderRadius: 30,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                fontSize: '0.86rem',
                fontWeight: 700,
                fontFamily: isRTL ? 'Inter, sans-serif' : 'Cairo, sans-serif',
              }}
            >
              <Globe size={16} color="#2E9BF5" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <a href="#contact" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
              <PhoneCall size={15} />
              {t.nav.getQuote}
            </a>
          </div>

          {/* Mobile burger & toggle */}
          <div className="mobile-controls" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
            <button
              onClick={toggleLanguage}
              style={{
                background: 'rgba(26,111,212,0.2)',
                border: '1px solid rgba(46,155,245,0.4)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              <Globe size={14} color="#2E9BF5" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'rgba(4,13,26,0.98)',
                  backdropFilter: 'blur(20px)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  borderBottom: '1px solid rgba(26,111,212,0.25)',
                }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem', padding: '6px 0' }}
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ justifyContent: 'center' }}>
                  <PhoneCall size={16} />
                  {t.nav.getQuote}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* =================================================================
            HERO SECTION
            ================================================================= */}
        <section
          id="home"
          style={{
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #040D1A 0%, #07152A 50%, #040D1A 100%)',
          }}
        >
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 50, alignItems: 'center', padding: '130px 0 80px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(26,111,212,0.15)', border: '1px solid rgba(46,155,245,0.4)', borderRadius: 50, padding: '6px 18px 6px 10px', marginBottom: 24 }}>
                  <TruckzitaLogo size={28} />
                  <span style={{ color: '#2E9BF5', fontWeight: 700, fontSize: '0.88rem' }}>{t.hero.badge}</span>
                </div>

                <h1 className="section-title" style={{ marginBottom: 20 }}>
                  {t.hero.titleMain} <span style={{ color: '#2E9BF5' }}>{t.hero.titleHighlight}</span>
                  <br />
                  {t.hero.titleSub}{' '}
                  <span style={{ background: 'linear-gradient(135deg, #1A6FD4, #2E9BF5, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {t.hero.titleRegion}
                  </span>
                </h1>

                <p className="section-subtitle" style={{ marginBottom: 36 }}>{t.hero.description}</p>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 44 }}>
                  <a href="#contact" className="btn-primary">
                    {t.hero.getQuoteBtn} <ArrowIcon size={18} />
                  </a>
                  <a href="tel:+201001234567" className="btn-outline">
                    <Phone size={18} /> {t.hero.callNowBtn}
                  </a>
                </div>

                <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
                  {[
                    { value: '22+', label: t.hero.statCountries },
                    { value: '500+', label: t.hero.statTrucks },
                    { value: '10K+', label: t.hero.statClients },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#2E9BF5', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif' }}>
                        {s.value}
                      </div>
                      <div style={{ color: '#8BAFD4', fontSize: '0.85rem', fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <TruckSVG isRTL={isRTL} />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SERVICES SECTION
            ================================================================= */}
        <section id="services" className="section" style={{ background: '#040D1A', position: 'relative' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-badge">
                <Truck size={16} />
                <span>{t.services.badge}</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                {t.services.title}
                <br />
                <span className="blue-text">{t.services.titleHighlight}</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.services.subtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 22 }}>
              {servicesData.map((svc) => (
                <div
                  key={svc.title}
                  style={{
                    background: 'linear-gradient(145deg, #07152A, #0C1E3A)',
                    border: '1px solid rgba(26,111,212,0.25)',
                    borderRadius: 20,
                    padding: 26,
                    position: 'relative',
                  }}
                >
                  {svc.badge && (
                    <div style={{ position: 'absolute', top: 16, [isRTL ? 'left' : 'right']: 16, background: 'linear-gradient(135deg, #1A6FD4, #2E9BF5)', borderRadius: 20, padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {svc.badge}
                    </div>
                  )}
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${svc.color}18`, border: `1.5px solid ${svc.color}45`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: svc.color }}>
                    {svc.icon}
                  </div>
                  <h3 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.08rem', marginBottom: 10 }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: '#8BAFD4', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>{svc.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2E9BF5', fontWeight: 600, fontSize: '0.86rem' }}>
                    <span>{t.services.learnMore}</span>
                    <ArrowIcon size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            COVERAGE SECTION
            ================================================================= */}
        <section id="coverage" className="section" style={{ background: 'linear-gradient(180deg, #040D1A 0%, #07152A 50%, #040D1A 100%)', position: 'relative' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-badge">
                <Globe2 size={16} />
                <span>{t.coverage.badge}</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                {t.coverage.title}
                <br />
                <span className="blue-text">{t.coverage.titleHighlight}</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.coverage.subtitle}</p>
            </div>

            <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, alignItems: 'start' }}>
              <div>
                <div style={{ background: 'rgba(7,21,42,0.85)', border: '1px solid rgba(26,111,212,0.3)', borderRadius: 24, padding: 24 }}>
                  <ArabWorldMap caption={t.coverage.mapCaption} />
                </div>
                <div style={{ marginTop: 28 }}>
                  <h3 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Building size={20} color="#2E9BF5" />
                    {t.coverage.egyptTitle}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {t.coverage.egyptCities.map((city) => (
                      <div key={city} style={{ background: 'rgba(26,111,212,0.15)', border: '1px solid rgba(46,155,245,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: '0.84rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, color: '#E0EEFF' }}>
                        <MapPin size={13} color="#2E9BF5" />
                        <span>{city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.25rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={22} color="#2E9BF5" />
                  {t.coverage.arabTitle}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {t.coverage.countries.map((c) => (
                    <div key={c.name} style={{ background: 'rgba(7,21,42,0.7)', border: '1px solid rgba(26,111,212,0.2)', borderRadius: 14, padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2E9BF5', boxShadow: '0 0 8px #2E9BF5' }} />
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</span>
                      </div>
                      <div style={{ color: '#8BAFD4', fontSize: '0.76rem', [isRTL ? 'paddingRight' : 'paddingLeft']: 16 }}>{c.cities}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 26, background: 'linear-gradient(135deg, rgba(26,111,212,0.18), rgba(7,21,42,0.85))', border: '1px solid rgba(46,155,245,0.35)', borderRadius: 18, padding: '20px 24px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 14, color: '#2E9BF5', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Anchor size={18} />
                    <span>{t.coverage.specialTitle}</span>
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {t.coverage.ports.map((port) => (
                      <div key={port} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E0EEFF', fontSize: '0.88rem', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2E9BF5' }} />
                        <span>{port}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            FLEET SECTION
            ================================================================= */}
        <section id="fleet" className="section" style={{ background: '#040D1A', position: 'relative' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 55 }}>
              <div className="section-badge">
                <Truck size={16} />
                <span>{t.fleet.badge}</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                {t.fleet.title}
                <br />
                <span className="blue-text">{t.fleet.titleHighlight}</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.fleet.subtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
              {t.fleet.trucks.map((truck) => (
                <div key={truck.name} style={{ background: 'linear-gradient(145deg, #07152A, #0C1E3A)', border: '1px solid rgba(26,111,212,0.25)', borderRadius: 20, overflow: 'hidden' }}>
                  <div style={{ height: 4, background: 'linear-gradient(90deg, #1A6FD4, #2E9BF5)' }} />
                  <div style={{ padding: '22px 22px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(26,111,212,0.2)', border: '1.5px solid rgba(46,155,245,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2E9BF5' }}>
                      <Truck size={24} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2E9BF5', textTransform: 'uppercase' }}>{truck.type}</span>
                      <h3 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem' }}>{truck.name}</h3>
                    </div>
                  </div>
                  <div style={{ padding: '14px 22px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 12, background: 'rgba(4,13,26,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <div style={{ color: '#8BAFD4', fontSize: '0.74rem' }}>{t.fleet.capacityLabel}</div>
                      <div style={{ fontWeight: 800, color: '#2E9BF5' }}>{truck.capacity}</div>
                    </div>
                    <div>
                      <div style={{ color: '#8BAFD4', fontSize: '0.74rem' }}>{t.fleet.bestForLabel}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.84rem', color: '#E0EEFF' }}>{truck.use}</div>
                    </div>
                  </div>
                  <div style={{ padding: '16px 22px' }}>
                    {truck.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: '0.84rem', color: '#8BAFD4' }}>
                        <CheckCircle size={14} color="#2E9BF5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            HOW IT WORKS
            ================================================================= */}
        <section id="how-it-works" className="section" style={{ background: '#040D1A', position: 'relative' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 65 }}>
              <div className="section-badge">
                <Zap size={16} />
                <span>{t.howItWorks.badge}</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                {t.howItWorks.title}
                <br />
                <span className="blue-text">{t.howItWorks.titleHighlight}</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.howItWorks.subtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 22 }}>
              {t.howItWorks.steps.map((st, i) => (
                <div key={st.step} style={{ background: 'linear-gradient(145deg, #07152A, #0C1E3A)', border: '1px solid rgba(26,111,212,0.25)', borderRadius: 20, padding: '28px 20px', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 14, [isRTL ? 'left' : 'right']: 14, width: 26, height: 26, borderRadius: '50%', background: 'rgba(26,111,212,0.25)', border: '1px solid #2E9BF5', color: '#2E9BF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                    {i + 1}
                  </div>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(26,111,212,0.25), rgba(46,155,245,0.1))', border: '1.5px solid #2E9BF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#2E9BF5' }}>
                    {stepIcons[i]}
                  </div>
                  <h3 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{st.title}</h3>
                  <p style={{ color: '#8BAFD4', fontSize: '0.82rem', lineHeight: 1.6 }}>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            STATS SECTION
            ================================================================= */}
        <section id="stats" style={{ padding: '90px 0', background: '#040D1A', position: 'relative' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 55 }}>
              <div className="section-badge">
                <BarChart3 size={16} />
                <span>{t.stats.badge}</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                {t.stats.title}
                <br />
                <span className="blue-text">{t.stats.titleHighlight}</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.stats.subtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 22 }}>
              {statsData.map((stat) => (
                <div key={stat.label} style={{ background: 'linear-gradient(145deg, #07152A, #0C1E3A)', border: '1px solid rgba(26,111,212,0.25)', borderRadius: 20, padding: 28, textAlign: 'center' }}>
                  <div style={{ width: 58, height: 58, borderRadius: 16, background: 'rgba(26,111,212,0.18)', border: `1.5px solid ${stat.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: '2.6rem', fontWeight: 900, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', color: stat.color, lineHeight: 1.1, marginBottom: 8 }}>
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ color: '#8BAFD4', fontSize: '0.82rem' }}>{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            TESTIMONIALS
            ================================================================= */}
        <section style={{ padding: '90px 0', background: 'linear-gradient(180deg, #040D1A, #07152A, #040D1A)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-badge">
                <MessageSquare size={16} />
                <span>{t.testimonials.badge}</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                {t.testimonials.title}
                <br />
                <span className="blue-text">{t.testimonials.titleHighlight}</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.testimonials.subtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
              {t.testimonials.reviews.map((rev) => (
                <div key={rev.name} style={{ background: 'linear-gradient(145deg, #07152A, #0C1E3A)', border: '1px solid rgba(26,111,212,0.25)', borderRadius: 20, padding: 26, position: 'relative' }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={15} fill="#2E9BF5" color="#2E9BF5" />
                    ))}
                  </div>
                  <p style={{ color: '#C5D8F0', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 20 }}>"{rev.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #1A6FD4, #2E9BF5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{rev.name}</div>
                      <div style={{ color: '#8BAFD4', fontSize: '0.78rem' }}>{rev.role} · {rev.company} ({rev.country})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            CONTACT & QUOTE FORM
            ================================================================= */}
        <section id="contact" className="section" style={{ background: '#040D1A', position: 'relative' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-badge">
                <Phone size={16} />
                <span>{t.contact.badge}</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                {t.contact.title}
                <br />
                <span className="blue-text">{t.contact.titleHighlight}</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.contact.subtitle}</p>
            </div>

            <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 45 }}>
              <div>
                {[
                  { icon: <Phone size={22} />, label: t.contact.callTitle, value: '+20 100 123 4567', sub: '+20 112 987 6543', link: 'tel:+201001234567' },
                  { icon: <Mail size={22} />, label: t.contact.emailTitle, value: 'shipping@truckzita.com', sub: 'operations@truckzita.com', link: 'mailto:shipping@truckzita.com' },
                  { icon: <MapPin size={22} />, label: t.contact.officeTitle, value: t.contact.officeValue, sub: t.contact.officeSub, link: '#' },
                  { icon: <Clock size={22} />, label: t.contact.hoursTitle, value: t.contact.hoursValue, sub: t.contact.hoursSub, link: '#' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.link}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 16,
                      background: 'rgba(7,21,42,0.7)',
                      border: '1px solid rgba(26,111,212,0.22)',
                      borderRadius: 16,
                      padding: '16px 20px',
                      textDecoration: 'none',
                      color: 'white',
                      marginBottom: 14,
                    }}
                  >
                    <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(26,111,212,0.2)', border: '1px solid rgba(46,155,245,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2E9BF5', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ color: '#8BAFD4', fontSize: '0.78rem', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.96rem', marginBottom: 2 }}>{item.value}</div>
                      <div style={{ color: '#8BAFD4', fontSize: '0.82rem' }}>{item.sub}</div>
                    </div>
                  </a>
                ))}

                <a
                  href="https://wa.me/201001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '15px',
                    background: 'linear-gradient(135deg, #128C7E, #25D366)',
                    borderRadius: 16,
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    marginBottom: 20,
                  }}
                >
                  <MessageSquare size={20} />
                  <span>{t.contact.whatsappBtn}</span>
                </a>
              </div>

              {/* Form */}
              <div style={{ background: 'linear-gradient(145deg, #07152A, #0C1E3A)', border: '1px solid rgba(26,111,212,0.3)', borderRadius: 24, padding: '32px' }}>
                {!submitted ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(26,111,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2E9BF5' }}>
                        <Headphones size={22} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.2rem' }}>
                          {t.contact.formTitle}
                        </h3>
                        <p style={{ color: '#8BAFD4', fontSize: '0.82rem' }}>{t.contact.formSubtitle}</p>
                      </div>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                        <div>
                          <label style={{ display: 'block', color: '#8BAFD4', fontSize: '0.8rem', marginBottom: 6 }}>{t.contact.fieldName}</label>
                          <input name="name" value={formData.name} onChange={handleFormChange} required placeholder={t.contact.placeholders.name} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#8BAFD4', fontSize: '0.8rem', marginBottom: 6 }}>{t.contact.fieldPhone}</label>
                          <input name="phone" value={formData.phone} onChange={handleFormChange} required placeholder={t.contact.placeholders.phone} style={inputStyle} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', color: '#8BAFD4', fontSize: '0.8rem', marginBottom: 6 }}>{t.contact.fieldEmail}</label>
                        <input name="email" type="email" value={formData.email} onChange={handleFormChange} placeholder={t.contact.placeholders.email} style={inputStyle} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                        <div>
                          <label style={{ display: 'block', color: '#8BAFD4', fontSize: '0.8rem', marginBottom: 6 }}>{t.contact.fieldPickup}</label>
                          <input name="origin" value={formData.origin} onChange={handleFormChange} required placeholder={t.contact.placeholders.pickup} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#8BAFD4', fontSize: '0.8rem', marginBottom: 6 }}>{t.contact.fieldDest}</label>
                          <input name="dest" value={formData.dest} onChange={handleFormChange} required placeholder={t.contact.placeholders.dest} style={inputStyle} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', color: '#8BAFD4', fontSize: '0.8rem', marginBottom: 6 }}>{t.contact.fieldCargo}</label>
                        <input name="cargo" value={formData.cargo} onChange={handleFormChange} placeholder={t.contact.placeholders.cargo} style={inputStyle} />
                      </div>

                      <div style={{ marginBottom: 22 }}>
                        <label style={{ display: 'block', color: '#8BAFD4', fontSize: '0.8rem', marginBottom: 6 }}>{t.contact.fieldNotes}</label>
                        <textarea name="message" value={formData.message} onChange={handleFormChange} rows={3} placeholder={t.contact.placeholders.notes} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>

                      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.98rem', padding: '14px' }}>
                        <span>{t.contact.submitBtn}</span>
                        <Send size={18} />
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                    <CheckCircle2 size={60} color="#2E9BF5" style={{ margin: '0 auto 16px' }} />
                    <h3 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.4rem', marginBottom: 10 }}>
                      {t.contact.successTitle}
                    </h3>
                    <p style={{ color: '#8BAFD4', marginBottom: 24, lineHeight: 1.7, fontSize: '0.95rem' }}>{t.contact.successDesc}</p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline">
                      <span>{t.contact.submitAnotherBtn}</span>
                      <ArrowIcon size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            FOOTER
            ================================================================= */}
        <footer style={{ background: '#030B16', borderTop: '1px solid rgba(26,111,212,0.25)', position: 'relative' }}>
          <div className="container" style={{ padding: '60px 24px 36px' }}>
            <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1.1fr 1.1fr 1.4fr', gap: 40 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  {logoUrl ? (
                    <img src={logoUrl} alt={brandName || "Logo"} style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
                  ) : (
                    <TruckzitaLogo size={46} />
                  )}
                  <div style={{ lineHeight: 1.15 }}>
                    <div style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem' }}>
                      {brandName ? (
                        brandName
                      ) : (
                        <>TRUCK<span style={{ color: '#2E9BF5' }}>ZITA</span></>
                      )}
                    </div>
                    <div style={{ color: '#8BAFD4', fontSize: '0.64rem', letterSpacing: isRTL ? '0' : '1px', fontWeight: 600, textTransform: 'uppercase' }}>
                      {t.nav.tagline}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#8BAFD4', fontSize: '0.86rem', lineHeight: 1.7, marginBottom: 20, maxWidth: 300 }}>{t.footer.tagline}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    <FbIcon key="fb" />,
                    <IgIcon key="ig" />,
                    <TwIcon key="tw" />,
                    <LiIcon key="li" />,
                    <YtIcon key="yt" />
                  ].map((icon, idx) => (
                    <div key={idx} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(26,111,212,0.12)', border: '1px solid rgba(26,111,212,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8BAFD4' }}>
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, marginBottom: 18, color: '#2E9BF5', fontSize: '0.98rem' }}>
                  {t.footer.servicesTitle}
                </h4>
                {[t.services.ftlTitle, t.services.ltlTitle, t.services.heavyTitle, t.services.airportTitle, t.services.portTitle, t.services.warehouseTitle].map((it) => (
                  <div key={it} style={{ color: '#8BAFD4', fontSize: '0.84rem', marginBottom: 9 }}>{it}</div>
                ))}
              </div>

              <div>
                <h4 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, marginBottom: 18, color: '#2E9BF5', fontSize: '0.98rem' }}>
                  {t.footer.coverageTitle}
                </h4>
                {['Egypt Hub (All Cities)', 'Saudi Arabia (KSA)', 'United Arab Emirates (UAE)', 'Kuwait & Qatar', 'Jordan & Levant', 'Libya & North Africa'].map((it) => (
                  <div key={it} style={{ color: '#8BAFD4', fontSize: '0.84rem', marginBottom: 9 }}>{it}</div>
                ))}
              </div>

              <div>
                <h4 style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Poppins, sans-serif', fontWeight: 700, marginBottom: 18, color: '#2E9BF5', fontSize: '0.98rem' }}>
                  {t.footer.contactTitle}
                </h4>
                <div style={{ color: '#8BAFD4', fontSize: '0.84rem', marginBottom: 8 }}>{contactPhone || '+20 100 123 4567'}</div>
                <div style={{ color: '#8BAFD4', fontSize: '0.84rem', marginBottom: 8 }}>{contactEmail || 'shipping@truckzita.com'}</div>
                <div style={{ color: '#8BAFD4', fontSize: '0.84rem', marginBottom: 14 }}>{t.contact.officeSub}</div>
                <div style={{ background: 'rgba(26,111,212,0.12)', border: '1px solid rgba(46,155,245,0.25)', borderRadius: 12, padding: '10px 14px' }}>
                  <div style={{ color: '#00C853', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>● {t.footer.operations24}</div>
                  <div style={{ color: '#8BAFD4', fontSize: '0.76rem' }}>{t.footer.officeHours}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 45, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
              <div style={{ color: '#5A7FA8', fontSize: '0.82rem' }}>
                © {new Date().getFullYear()} Truckzita. {t.footer.rights}
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {[t.footer.privacy, t.footer.terms, t.footer.security].map((item) => (
                  <span key={item} style={{ color: '#5A7FA8', fontSize: '0.82rem' }}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: 24,
              [isRTL ? 'left' : 'right']: 24,
              width: 46,
              height: 46,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #1A6FD4, #2E9BF5)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(26,111,212,0.5)',
              zIndex: 999,
            }}
          >
            <ArrowUp size={20} />
          </button>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
}
