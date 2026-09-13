import { MedicalAdviceItem, AdviceCategory } from '../types';

export interface CategoryMeta {
  id: AdviceCategory;
  label: string;
  shortDesc: string;
}

export const ADVICE_CATEGORIES: CategoryMeta[] = [
  {
    id: 'emergency_first_aid',
    label: 'Emergency First Aid',
    shortDesc: 'Life-saving resuscitation, trauma care, burn cooling, and venomous snakebite management.'
  },
  {
    id: 'personal_care_advice',
    label: 'Personal Care Advice',
    shortDesc: 'Weight-based pediatric dosing, antibiotic stewardship, tropical drug storage, and pain management.'
  },
  {
    id: 'skin_care',
    label: 'Skin Care',
    shortDesc: 'Tropical fungal management, eczema relief, UV photoprotection, and antiseptic wound recovery.'
  },
  {
    id: 'communicable_diseases',
    label: 'Communicable Diseases',
    shortDesc: 'Dengue fever alert protocols, leptospirosis prophylaxis, and WHO oral rehydration.'
  },
  {
    id: 'non_communicable_diseases',
    label: 'Non-Communicable Diseases',
    shortDesc: 'Type 2 diabetes glycemic control, hypertension monitoring, and asthma inhaler spacer technique.'
  }
];

export const MEDICAL_ADVICE_ITEMS: MedicalAdviceItem[] = [
  // --- EMERGENCY FIRST AID ---
  {
    id: 'ADV-FA-001',
    category: 'emergency_first_aid',
    categoryLabel: 'Emergency First Aid',
    title: "Venomous Snakebite Protocol (Russell's Viper, Cobra, Krait)",
    subtitle: 'Sri Lanka National Clinical Guideline for immediate pre-hospital immobilization',
    severity: 'emergency',
    urgencyLabel: 'Immediate 1990',
    summary: 'Sri Lanka has one of the highest snakebite incident rates worldwide. Prompt immobilization of the bitten limb and zero tourniquet application saves renal and circulatory function.',
    symptoms: [
      'Two distinct puncture fang marks with bleeding or swelling',
      'Rapid local pain, edema spreading up the limb within 30 minutes',
      'Ptosis (drooping eyelids), blurred vision, difficulty swallowing (neurotoxicity - Cobra/Krait)',
      'Spontaneous bleeding from gums, hematuria, prolonged bleeding (hemotoxicity - Viper)'
    ],
    immediateSteps: [
      'Reassure the patient and keep them completely calm and motionless.',
      'Immobilize the bitten limb using a rigid splint or sling (do NOT elevate above heart level).',
      'Remove rings, bracelets, anklets, and tight clothing immediately before edema sets in.',
      'Immediately call Suwa Seriya 1990 ambulance or transport to Kurunegala Teaching Hospital Casualty Unit.',
      'Keep the dead snake safely in a secure container ONLY if already killed safely, without delaying transport.'
    ],
    doNotList: [
      'DO NOT apply a tight arterial tourniquet (causes tissue necrosis and gangrene).',
      'DO NOT cut, incise, or suction venom with mouth or vacuum devices.',
      'DO NOT apply ice, potassium permanganate, or herbal pastes to the wound.',
      'DO NOT administer aspirin or NSAIDs which worsen internal bleeding.'
    ],
    recommendedSupplies: ['Crepe bandage for gentle splinting', 'Rigid cardboard or wooden splint', 'Antivenom available at Teaching Hospital'],
    kurunegalaContext: 'Kurunegala Teaching Hospital operates a dedicated toxicology unit with immediate polyvalent antivenom stock.',
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-FA-002',
    category: 'emergency_first_aid',
    categoryLabel: 'Emergency First Aid',
    title: 'Adult & Pediatric Cardiopulmonary Resuscitation (CPR)',
    subtitle: 'High-quality chest compressions and AED deployment protocol',
    severity: 'emergency',
    urgencyLabel: 'Immediate 1990',
    summary: 'Sudden cardiac arrest requires immediate bystander CPR. Every minute without compressions reduces survival chance by 10%.',
    symptoms: [
      'Unresponsive patient (no reaction to loud voice or shoulder tap)',
      'Absent normal breathing (agonal gasps or no chest rise)',
      'No carotid pulse detectable within 10 seconds'
    ],
    immediateSteps: [
      'Check scene safety, tap shoulders firmly, and shout "Are you okay?".',
      'Call Suwa Seriya 1990 immediately and put the phone on speaker mode.',
      'Place hands in the center of the chest (lower half of sternum).',
      'Push hard and fast: 100–120 compressions per minute at a depth of 5–6 cm (adults).',
      'Allow complete chest recoil between each compression. Minimize interruptions.',
      'If trained: provide 2 rescue breaths after every 30 compressions; otherwise continue hands-only CPR.'
    ],
    doNotList: [
      'DO NOT stop compressions for more than 10 seconds.',
      'DO NOT place cushions or soft pads underneath the patient’s back (surface must be hard and flat).'
    ],
    recommendedSupplies: ['Automated External Defibrillator (AED)', 'Pocket CPR face shield'],
    kurunegalaContext: 'Ambulance response time within Kurunegala Municipal limits averages 8–12 minutes with trained Suwa Seriya paramedics.',
    reviewedBy: 'Dr. N. Jayawardena, MBBS, MD (Emergency Medicine)'
  },
  {
    id: 'ADV-FA-003',
    category: 'emergency_first_aid',
    categoryLabel: 'Emergency First Aid',
    title: 'Acute Choking & Airway Obstruction (Heimlich Maneuver)',
    subtitle: 'Abdominal thrusts for adults and back blows for infants under 1 year',
    severity: 'emergency',
    urgencyLabel: 'Immediate 1990',
    summary: 'Foreign object inhalation obstructing the trachea requires rapid clearing before cerebral hypoxia ensues.',
    symptoms: [
      'Universal choking sign: patient clutching hands to throat',
      'Inability to speak, cry, or cough forcefully',
      'Cyanosis (blue discoloration of lips and nail beds)'
    ],
    immediateSteps: [
      'For Adults: Stand behind the person, wrap arms around waist.',
      'Make a fist with one hand, place thumb side slightly above navel and well below xiphoid.',
      'Grasp fist with other hand, deliver quick inward and upward thrusts.',
      'For Infants (< 1 yr): 5 gentle back blows between shoulder blades followed by 5 chest thrusts with 2 fingers.',
      'If patient becomes unresponsive, lower to the floor and initiate CPR immediately.'
    ],
    doNotList: [
      'DO NOT perform blind finger sweeps in the mouth (can push the object deeper into the vocal cords).',
      'DO NOT hit an upright adult on the back if they can still cough effectively.'
    ],
    recommendedSupplies: ['Dechoker airway suction device', 'Medical flashlight for direct visualization'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-FA-004',
    category: 'emergency_first_aid',
    categoryLabel: 'Emergency First Aid',
    title: 'Thermal & Hot Liquid Burn Management',
    subtitle: 'Cool running water protocol and blister preservation',
    severity: 'warning',
    urgencyLabel: 'Urgent Same-Day',
    summary: 'Immediate cooling halts thermal heat transfer through cutaneous dermis layers and significantly prevents deep scarring.',
    symptoms: [
      'Erythema (redness), intense pain, swelling (1st Degree)',
      'Blister formation, weeping dermis, severe pain (2nd Degree)',
      'Painless leathery charred or white skin (3rd Degree - deep tissue injury)'
    ],
    immediateSteps: [
      'Cool the burn immediately under cool, running tap water for at least 20 continuous minutes.',
      'Gently remove rings, watches, and loose clothing from the affected area before swelling starts.',
      'Cover the burn loosely with clean, sterile plastic cling wrap or sterile non-adherent gauze.',
      'Administer weight-appropriate Paracetamol for acute pain relief.'
    ],
    doNotList: [
      'DO NOT apply ice or freezing ice water (induces tissue vasoconstriction and frostbite damage).',
      'DO NOT apply butter, oil, toothpaste, or traditional herbal powders.',
      'DO NOT burst, puncture, or peel intact fluid-filled blisters.'
    ],
    recommendedSupplies: ['Silver Sulfadiazine cream (Flamazine)', 'Sterile paraffin gauze (Bactigras)', 'Sterile clingfilm'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },

  // --- PERSONAL CARE ADVICE ---
  {
    id: 'ADV-PC-001',
    category: 'personal_care_advice',
    categoryLabel: 'Personal Care Advice',
    title: 'Weight-Based Pediatric Paracetamol Dosing',
    subtitle: 'Sri Lanka Paediatric Association 15mg/kg standard dosing guidelines',
    severity: 'guideline',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Paracetamol is the safest antipyretic for children, but must NEVER be dosed by age alone. Body weight is the only safe clinical metric.',
    symptoms: ['Fever above 38°C (100.4°F)', 'Post-immunization soreness', 'Teething discomfort and headache'],
    immediateSteps: [
      'Weigh your child on an accurate infant or electronic scale before administering.',
      'Calculate dose: 15 mg per kilogram of body weight per single dose.',
      'Wait at least 4 to 6 hours between doses. Never exceed 4 doses in any 24-hour cycle.',
      'Use an accurate oral dosing syringe, never household kitchen spoons which vary widely in volume.',
      'Ensure adequate oral hydration with breastmilk, water, or oral rehydration solution.'
    ],
    doNotList: [
      'DO NOT exceed 60 mg/kg total dose in 24 hours (hepatotoxicity risk).',
      'DO NOT combine with adult cold-and-flu remedies containing hidden paracetamol.',
      'DO NOT give Aspirin or Ibuprofen to children with suspected Dengue fever.'
    ],
    recommendedSupplies: ['Paracetamol Syrup 120mg/5ml', 'Paracetamol Forte Syrup 250mg/5ml', 'Oral dosing syringe (5ml)'],
    kurunegalaContext: 'MediQuick Kurunegala provides complimentary 5ml measuring oral syringes with every pediatric fever syrup purchase.',
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-PC-002',
    category: 'personal_care_advice',
    categoryLabel: 'Personal Care Advice',
    title: 'Antibiotic Stewardship: Completing the Prescribed Course',
    subtitle: 'Preventing antimicrobial resistance (AMR) in community practice',
    severity: 'warning',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Discontinuing antibiotics prematurely as soon as symptoms subside enables resilient surviving bacterial colonies to mutate into multi-drug resistant superbugs.',
    symptoms: ['Bacterial tonsillitis, urinary tract infection, or impetigo under active treatment'],
    immediateSteps: [
      'Take doses at evenly spaced intervals (e.g. every 8 hours means 6:00 AM, 2:00 PM, 10:00 PM).',
      'Finish the complete 5 to 7-day course even if fever resolves after 48 hours.',
      'If a dose is forgotten, take it as soon as remembered unless close to the next scheduled dose.'
    ],
    doNotList: [
      'DO NOT save leftover antibiotic tablets for "next time" a family member gets sick.',
      'DO NOT demand or take antibiotics for viral colds, flu, or simple watery diarrhea.',
      'DO NOT double up doses to compensate for a missed tablet.'
    ],
    recommendedSupplies: ['Amoxicillin', 'Azithromycin (prescription only)', 'Probiotic supplements for gut flora balance'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-PC-003',
    category: 'personal_care_advice',
    categoryLabel: 'Personal Care Advice',
    title: 'Medication Storage in Tropical Heat & Humidity',
    subtitle: 'Preserving active chemical stability in Kurunegala climatic conditions',
    severity: 'guideline',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Kurunegala frequently experiences temperatures above 32°C and relative humidity surpassing 80%. Poor storage accelerates drug hydrolysis and thermal degradation.',
    immediateSteps: [
      'Store medicines in a dedicated cool, dry cupboard away from direct sunlight.',
      'Keep tablets in their original airtight aluminium blister packaging until the moment of consumption.',
      'Keep opened eye drops, insulins, and reconstituted antibiotic syrups in the central refrigerator compartment (2°C–8°C).',
      'Check expiry date and discard eye drops 28 days after first breaking the sterile cap seal.'
    ],
    doNotList: [
      'DO NOT store medicines inside steamy bathroom cabinets or kitchen drawers near the stove.',
      'DO NOT freeze insulin or vaccines (freezing permanently denatures protein molecules).',
      'DO NOT leave medicine packs inside parked cars under direct tropical sun.'
    ],
    recommendedSupplies: ['Moisture-absorbing silica gel packs', 'Insulin cooling pouch for travel'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },

  // --- SKIN CARE ---
  {
    id: 'ADV-SC-001',
    category: 'skin_care',
    categoryLabel: 'Skin Care',
    title: 'Tropical Fungal Infections (Tinea / Ringworm / Sweat Rash)',
    subtitle: 'Targeted topical antifungal regimen and moisture management',
    severity: 'guideline',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'High humidity and perspiration in Wayamba Province create an ideal breeding environment for dermatophyte fungal infections.',
    symptoms: [
      'Circular, reddish, raised, scaling rash with clear center',
      'Intense pruritus (itching) that worsens after sweating',
      'Interdigital maceration (athlete’s foot between toes) or groin rash (jock itch)'
    ],
    immediateSteps: [
      'Wash affected areas daily with mild, unscented soap and pat dry thoroughly with a clean, dedicated towel.',
      'Apply Clotrimazole 1% or Terbinafine 1% cream extending 2 cm beyond the visible rash edge.',
      'Continue application twice daily for at least 14 days AFTER the visible rash has disappeared.',
      'Wear loose-fitting, breathable cotton clothing and change undergarments twice daily.'
    ],
    doNotList: [
      'DO NOT apply high-potency steroid creams (e.g., Clobetasol, Betamethasone) to fungal rashes (creates "Tinea Incognito").',
      'DO NOT share bath towels, clothing, or footwear with other household members.'
    ],
    recommendedSupplies: ['Clotrimazole 1% Cream', 'Terbinafine 1% Gel', 'Antifungal dusting powder (Miconazole)'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-SC-002',
    category: 'skin_care',
    categoryLabel: 'Skin Care',
    title: 'Atopic Eczema & Dry Barrier Repair',
    subtitle: 'Steroid-sparing emollient therapy for reactive and sensitive skin',
    severity: 'guideline',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Eczema flare-ups compromise the skin lipid barrier, leading to secondary bacterial colonization. Generous emollient hydration is fundamental.',
    symptoms: ['Dry, scaly, erythematous patches on flexural creases (elbows, knees, neck)', 'Severe nocturnal itching disrupting sleep'],
    immediateSteps: [
      'Take short, lukewarm baths (maximum 10 minutes) using soap-free lipid cleansers.',
      'Apply generous emollient cream within 3 minutes of stepping out of the shower ("Soak and Seal").',
      'Use prescribed mild Hydrocortisone 1% cream only on active red patches for up to 5 days.'
    ],
    doNotList: [
      'DO NOT use hot water or vigorously scrub inflamed skin with loofahs.',
      'DO NOT apply perfumed lotions with artificial fragrances or alcohol denat.'
    ],
    recommendedSupplies: ['Aqueous cream BP', 'Cetomacrogol Emollient', 'Hydrocortisone 1% cream (prescription/OTC gated)'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-SC-003',
    category: 'skin_care',
    categoryLabel: 'Skin Care',
    title: 'Tropical Photoprotection & UV Barrier Defense',
    subtitle: 'Broad-spectrum SPF 50+ application in equatorial latitudes',
    severity: 'guideline',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Sri Lanka experiences UV index ratings exceeding 11+ year-round. Consistent photoprotection minimizes melanoma risk, photoaging, and melasma pigmentation.',
    immediateSteps: [
      'Select broad-spectrum sunscreen with SPF 50+ and PA++++ protection against UVA and UVB rays.',
      'Apply two full finger-lengths of sunscreen to face and neck 20 minutes before stepping outdoors.',
      'Reapply every 2 hours if outdoors, or immediately after excessive sweating or swimming.'
    ],
    doNotList: [
      'DO NOT rely solely on cosmetics with SPF 15 (insufficient application thickness).',
      'DO NOT skip sunscreen on cloudy or rainy days (up to 80% of UVA penetrates cloud cover).'
    ],
    recommendedSupplies: ['Broad Spectrum SPF 50+ Mineral/Chemical Sunscreen', 'UV-protective wide-brim umbrella'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },

  // --- COMMUNICABLE DISEASES ---
  {
    id: 'ADV-CD-001',
    category: 'communicable_diseases',
    categoryLabel: 'Communicable Diseases',
    title: 'Dengue Fever Warning Signs & Monitoring Protocol',
    subtitle: 'Ministry of Health Sri Lanka National Guidelines on Dengue Hemorrhagic Fever',
    severity: 'emergency',
    urgencyLabel: 'Urgent Same-Day',
    summary: 'Dengue is endemic throughout Kurunegala. The critical phase typically occurs on Day 3 to Day 6 as fever begins to settle. Early recognition of plasma leakage prevents dengue shock syndrome.',
    symptoms: [
      'Sudden onset high grade continuous fever with severe headache and retro-orbital eye pain',
      'Severe generalized myalgia, arthralgia ("break-bone fever"), and macular rash',
      'CRITICAL WARNING SIGNS: Persistent vomiting, severe abdominal pain, extreme lethargy, bleeding from gums or nose, black tarry stools'
    ],
    immediateSteps: [
      'Ensure strict physical bed rest from Day 1 of fever.',
      'Administer ONLY Paracetamol (10–15 mg/kg per dose, max 4 times/day) for fever reduction.',
      'Perform a Full Blood Count (FBC) by Day 3 of fever (or Day 2 if fever is unusually severe).',
      'Maintain adequate oral fluid intake: Jeevani ORS, King Coconut water (Thambili), kanji, fresh fruit juice.',
      'If ANY critical warning sign appears, transfer immediately to Kurunegala Teaching Hospital.'
    ],
    doNotList: [
      'DO NOT TAKE Ibuprofen, Mefenamic Acid, Aspirin, or Diclofenac (causes life-threatening gastric haemorrhage).',
      'DO NOT take red, black, or brown fluids (interferes with assessing vomit for internal bleeding).',
      'DO NOT administer prophylactic antibiotics (Dengue is caused by an arbovirus, not bacteria).'
    ],
    recommendedSupplies: ['Paracetamol 500mg', 'WHO Jeevani Oral Rehydration Salts', 'Digital clinical thermometer'],
    kurunegalaContext: 'The Dengue High Dependency Unit (HDU) at Kurunegala Teaching Hospital provides 24-hour microhematocrit and platelet monitoring.',
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-CD-002',
    category: 'communicable_diseases',
    categoryLabel: 'Communicable Diseases',
    title: 'Leptospirosis (Rat Fever / "Mee-Una") Agricultural Advisory',
    subtitle: 'Doxycycline prophylaxis and early clinical intervention for paddy farmers',
    severity: 'warning',
    urgencyLabel: 'Urgent Same-Day',
    summary: 'Leptospira bacteria shed in rodent urine contaminate muddy paddy fields and irrigation canals around Kurunegala, entering through minor skin cuts.',
    symptoms: [
      'Sudden high fever with intense calf and lumbar muscle tenderness',
      'Conjunctival suffusion (redness in the eyes without pus or discharge)',
      'Jaundice (yellowing of skin/sclera) and marked reduction in urine volume'
    ],
    immediateSteps: [
      'Paddy farmers and drain workers should take Doxycycline 200mg prophylaxis once weekly as advised by the regional MOH.',
      'Cover skin cuts with waterproof bandages before entering muddy fields.',
      'Wash thoroughly with clean soap and water immediately upon returning from fields.',
      'Report fever accompanied by calf muscle pain to the hospital within 24 hours.'
    ],
    doNotList: [
      'DO NOT delay seeking medical care when fever follows working in paddy fields.',
      'DO NOT walk barefoot in stagnant muddy water during heavy monsoon flooding.'
    ],
    recommendedSupplies: ['Waterproof occlusive dressings', 'Doxycycline 100mg (prescription only via MOH/doctor)'],
    kurunegalaContext: 'Public health midwives and MOH officers in Kurunegala distribute free Doxycycline tablets to registered agrarian farmers before the Maha and Yala harvesting seasons.',
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-CD-003',
    category: 'communicable_diseases',
    categoryLabel: 'Communicable Diseases',
    title: 'Acute Gastroenteritis & Dehydration (WHO Jeevani Protocol)',
    subtitle: 'Electrolyte balance preservation during watery diarrhea episodes',
    severity: 'warning',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Food-borne bacterial and viral infections cause rapid fluid loss. Preventing hypovolemic dehydration using WHO oral rehydration formula is the primary treatment priority.',
    symptoms: ['Frequent watery stools', 'Nausea, abdominal cramping, low-grade fever', 'Sunken eyes, extreme thirst, dry tongue'],
    immediateSteps: [
      'Dissolve one full packet of WHO Jeevani Oral Rehydration Salts in exactly 1 Liter of clean boiled and cooled water.',
      'Sip small amounts frequently (50–100 ml after every loose bowel movement for children, 200–400 ml for adults).',
      'Continue breastfeeding infants without interruption; offer light starches (boiled rice, toasted bread).',
      'Monitor urine output (urine should remain pale yellow, passed at least every 4–6 hours).'
    ],
    doNotList: [
      'DO NOT dilute ORS packets with less or more than 1 liter of water (upsets osmolarity).',
      'DO NOT take anti-motility drugs (e.g. Loperamide) in infectious bloody diarrhea or high fever.',
      'DO NOT consume sugary commercial carbonated sodas or heavy dairy.'
    ],
    recommendedSupplies: ['WHO Jeevani Oral Rehydration Salts', 'Zinc Sulfate 20mg dispersible tablets (pediatric diarrhea)', 'Digital thermometer'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },

  // --- NON-COMMUNICABLE DISEASES ---
  {
    id: 'ADV-NCD-001',
    category: 'non_communicable_diseases',
    categoryLabel: 'Non-Communicable Diseases',
    title: 'Type 2 Diabetes: Glycemic Targets & Hypoglycemia Emergency Protocol',
    subtitle: 'Blood glucose targets, insulin pen rotation, and the Rule of 15',
    severity: 'warning',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Over 20% of Sri Lankan urban adults live with Type 2 Diabetes. Proper medication compliance, regular HbA1c testing, and knowing the symptoms of low blood sugar save lives.',
    symptoms: [
      'Hyperglycemia: excessive thirst, polyuria, slow-healing wounds, fatigue',
      'HYPOGLYCEMIA (< 70 mg/dL): Sudden sweating, trembling hands, rapid heart palpitations, dizziness, hunger, confusion'
    ],
    immediateSteps: [
      'Hypoglycemia "Rule of 15": Consume 15 grams of fast-acting sugar (3 teaspoons of table sugar dissolved in water, or 1/2 cup fruit juice).',
      'Wait 15 minutes and recheck capillary blood glucose on your glucometer.',
      'If still below 70 mg/dL, repeat 15g of sugar. Once normal, eat a complex carbohydrate snack (rice or biscuit).',
      'Take oral Metformin with or immediately following meals to minimize gastrointestinal discomfort.',
      'Rotate insulin injection sites daily across abdomen, thighs, and upper arms to prevent lipohypertrophy.'
    ],
    doNotList: [
      'DO NOT skip regular meals after taking gliclazide, glimepiride, or insulin injections.',
      'DO NOT treat hypoglycemia with fatty foods like chocolate or ice cream (fat delays glucose absorption).',
      'DO NOT stop taking diabetes medication because blood sugar is normal (it is normal BECAUSE of the medicine).'
    ],
    recommendedSupplies: ['Accu-Chek / OneTouch Blood Glucose Monitor & Strips', 'Metformin 500mg/850mg', 'Glucose sweets/sachets'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-NCD-002',
    category: 'non_communicable_diseases',
    categoryLabel: 'Non-Communicable Diseases',
    title: 'Hypertension Management: DASH Diet & Daily BP Monitoring',
    subtitle: 'Blood pressure targets (< 130/80 mmHg) and sodium restriction',
    severity: 'guideline',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Known as the "silent killer", hypertension often produces zero symptoms until a stroke or myocardial infarction occurs. Regular home blood pressure checks are essential.',
    symptoms: ['Usually asymptomatic. Occasional morning occipital headache, dizziness, or visual blurriness in severe elevation.'],
    immediateSteps: [
      'Measure blood pressure at the same time each morning after resting quietly for 5 minutes.',
      'Keep arm supported at heart level; do not smoke, exercise, or consume caffeinated tea 30 minutes prior.',
      'Strictly limit dietary salt intake to less than 1 level teaspoon (5 grams) per day.',
      'Increase potassium-rich local vegetables (gotukola, kankun, murunga) and reduce oily fried foods.',
      'Take anti-hypertensive medication (e.g. Losartan, Amlodipine) consistently every single day.'
    ],
    doNotList: [
      'DO NOT stop medication when you "feel fine" — hypertension is chronic and asymptomatic.',
      'DO NOT measure BP immediately following emotional stress, argument, or physical rushing.'
    ],
    recommendedSupplies: ['Digital Upper Arm Blood Pressure Monitor (Omron)', 'Losartan Potassium 50mg', 'Amlodipine 5mg'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  },
  {
    id: 'ADV-NCD-003',
    category: 'non_communicable_diseases',
    categoryLabel: 'Non-Communicable Diseases',
    title: 'Bronchial Asthma & Inhaler Spacer Technique',
    subtitle: 'Reliever (Blue Salbutamol) vs Preventer (Brown Inhaled Corticosteroid) guidelines',
    severity: 'warning',
    urgencyLabel: 'Routine Clinical Care',
    summary: 'Up to 70% of inhaled medication is wasted in the back of the mouth when metered dose inhalers (MDIs) are used without a spacer chamber.',
    symptoms: ['Wheezing, dry nocturnal cough, chest tightness, shortness of breath triggered by dust, pollen, or cold air'],
    immediateSteps: [
      'Always attach a spacer chamber to your Metered Dose Inhaler (MDI) for optimal lung deposition.',
      'Shake the inhaler vigorously for 5 seconds, insert into spacer, exhale completely.',
      'Press the canister ONCE into the spacer, then take 5 slow, deep breaths through the mouthpiece.',
      'Wait 60 seconds before delivering a second puff.',
      'Rinse mouth with clean water and spit it out after using steroid preventer inhalers (prevents oral thrush/candidiasis).'
    ],
    doNotList: [
      'DO NOT fire multiple puffs simultaneously into the spacer chamber.',
      'DO NOT rely solely on blue reliever (Salbutamol) without daily brown preventer (Corticosteroid) if wheezing occurs more than twice weekly.'
    ],
    recommendedSupplies: ['AeroChamber / Volumatic Spacer with Mask', 'Salbutamol 100mcg MDI Inhaler', 'Beclomethasone / Budesonide Inhaler'],
    reviewedBy: 'Kasun B. Senanayake, B.Pharm (SLMC-P8821)'
  }
];
