export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
}

export interface ChatRequest {
  message: string;
  history?: Array<{
    role: 'user' | 'model';
    text: string;
  }>;
  language?: string;
}

export interface ChatResponse {
  reply?: string;
  error?: boolean;
  message?: string;
}

export interface DisasterGuide {
  id: string;
  title: string;
  icon: string;
  severity: 'extreme' | 'high' | 'moderate';
  summary: string;
  before: string[];
  during: string[];
  after: string[];
  warnings: string[];
  emergencyContacts: Array<{ label: string; number: string }>;
}

export interface FirstAidGuide {
  id: string;
  title: string;
  icon: string;
  urgency: 'critical' | 'high' | 'medium';
  immediateActions: string[];
  steps: string[];
  doNot: string[];
  seekHelpWhen: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  category: 'national' | 'medical' | 'disaster' | 'safety' | 'personal';
  badge?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  medicalNotes: string;
  bloodGroup: string;
}

export interface FamilySafetyPlan {
  familyName: string;
  primaryMeetingPoint: string;
  secondaryMeetingPoint: string;
  evacuationDestination: string;
  outOfTownContact: {
    name: string;
    phone: string;
  };
  members: FamilyMember[];
  specialNotes: string;
  lastUpdated: string;
}

export interface KitItem {
  id: string;
  category: 'Water & Food' | 'Medical' | 'Tools & Light' | 'Communication' | 'Documents & Cash';
  name: string;
  recommended: string;
  checked: boolean;
}
