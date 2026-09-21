import { EmergencyContact, KitItem } from '../types';

export const officialEmergencyContacts: EmergencyContact[] = [
  {
    id: '112',
    name: 'National Emergency Helpline',
    number: '112',
    description: 'All-in-one unified emergency response service across India (Police, Fire, Medical, Disaster). Available 24/7/365 free of cost from any mobile or landline.',
    category: 'national',
    badge: 'Primary 24/7'
  },
  {
    id: '101',
    name: 'Fire & Rescue Service',
    number: '101',
    description: 'Immediate fire brigade dispatch and structural rescue operations.',
    category: 'national',
    badge: 'Urgent'
  },
  {
    id: '102',
    name: 'Ambulance & Medical Emergency',
    number: '102',
    description: 'Government ambulance dispatch and basic life support patient transport.',
    category: 'medical'
  },
  {
    id: '108',
    name: 'Disaster Emergency Medical Services',
    number: '108',
    description: 'Emergency response service for medical, police, and fire emergencies in participating states.',
    category: 'medical',
    badge: 'EMS'
  },
  {
    id: '1078',
    name: 'NDMA Disaster Management Helpline',
    number: '1078',
    description: 'National Disaster Management Authority central control room for earthquake, flood, cyclone, and major disaster alerts.',
    category: 'disaster',
    badge: 'Disaster'
  },
  {
    id: '1070',
    name: 'State Disaster Management Helpline',
    number: '1070',
    description: 'State emergency operation centers for localized disaster alerts and relief coordinates.',
    category: 'disaster'
  },
  {
    id: '1033',
    name: 'National Highway Emergency Helpline',
    number: '1033',
    description: '24x7 highway safety, breakdown support, and road accident emergency services on National Highways.',
    category: 'safety'
  },
  {
    id: '1091',
    name: 'Women Helpline',
    number: '1091',
    description: '24/7 emergency response and assistance for women facing distress, domestic crisis, or safety threats.',
    category: 'safety'
  },
  {
    id: '1098',
    name: 'Childline Emergency',
    number: '1098',
    description: 'National 24-hour emergency phone outreach service for children in need of care and protection.',
    category: 'safety'
  },
  {
    id: '1554',
    name: 'Indian Coast Guard Maritime Helpline',
    number: '1554',
    description: 'Maritime emergency, coastal distress, and cyclone evacuation coordination at sea.',
    category: 'disaster'
  }
];

export const initialKitItems: KitItem[] = [
  {
    id: 'kit-1',
    category: 'Water & Food',
    name: 'Drinking Water (1 gallon / 4 liters per person per day)',
    recommended: 'Minimum 3-day supply for evacuation, 7-day for home shelter',
    checked: false
  },
  {
    id: 'kit-2',
    category: 'Water & Food',
    name: 'Non-Perishable Food (Canned, energy bars, dry fruits)',
    recommended: 'Minimum 3-day supply, manual can opener',
    checked: false
  },
  {
    id: 'kit-3',
    category: 'Tools & Light',
    name: 'Battery-powered or Hand-crank Flashlight',
    recommended: 'Extra batteries, inspect every 6 months',
    checked: false
  },
  {
    id: 'kit-4',
    category: 'Communication',
    name: 'Battery-powered or Hand-crank Emergency Radio (AM/FM/NOAA)',
    recommended: 'For receiving disaster alerts when cell towers fail',
    checked: false
  },
  {
    id: 'kit-5',
    category: 'Medical',
    name: 'Standard First-Aid Kit',
    recommended: 'Sterile gauze, bandages, antiseptic, tweezers, scissors, burn ointment',
    checked: false
  },
  {
    id: 'kit-6',
    category: 'Medical',
    name: 'Essential Prescription Medications & Medical Devices',
    recommended: '7-14 day backup supply with prescriptions',
    checked: false
  },
  {
    id: 'kit-7',
    category: 'Tools & Light',
    name: 'High-Decibel Emergency Whistle',
    recommended: 'To signal for help to rescue workers from under debris',
    checked: false
  },
  {
    id: 'kit-8',
    category: 'Tools & Light',
    name: 'Dust Masks (N95) & Leather Work Gloves',
    recommended: 'To filter contaminated air and protect against broken glass',
    checked: false
  },
  {
    id: 'kit-9',
    category: 'Communication',
    name: 'Heavy-Duty Power Bank & Phone Charging Cables',
    recommended: 'Fully charged 20,000mAh+ capacity',
    checked: false
  },
  {
    id: 'kit-10',
    category: 'Documents & Cash',
    name: 'Waterproof Bag with Key Identification & Insurance Papers',
    recommended: 'Passports, Aadhar/ID cards, insurance deeds, property records',
    checked: false
  },
  {
    id: 'kit-11',
    category: 'Documents & Cash',
    name: 'Emergency Cash in Small Denominations',
    recommended: 'ATMs and digital UPI fail during prolonged grid outages',
    checked: false
  },
  {
    id: 'kit-12',
    category: 'Tools & Light',
    name: 'Multi-tool or Utility Knife with Pliers and Screwdriver',
    recommended: 'For emergency utility shutoffs and repairs',
    checked: false
  }
];
