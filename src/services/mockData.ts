
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  complaint: string;
  entry: string;
  entryMethod: string;
  room: string;
  arrivalTime: string;
  arrivalTimestamp: string;
  lastUpdate: string;
  phone: string;
  status: string;
  physicianSeen: boolean;
  family: string;
  acuity?: number; // Only assigned after triage
  section: 'untriaged' | 'triaged-awaiting' | 'tests-ordered' | 'results-ready' | 'concierge';
  test?: string;
  results?: string;
  triageTimestamp?: string;
  expectedTestCompletion?: string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
    painScale?: number;
    respiratoryRate?: number;
  };
  messageType?: 'request' | 'question' | 'concern';
}

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 34,
    gender: "F",
    complaint: "Chest pain, difficulty breathing",
    entry: "📱",
    entryMethod: "app",
    room: "01",
    arrivalTime: "1:12 PM",
    arrivalTimestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    lastUpdate: "3 min ago",
    phone: "+1-555-0123",
    status: "⏳ Awaiting initial physician evaluation",
    physicianSeen: false,
    family: "Mike (Husband)",
    section: "untriaged",
    vitalSigns: {
      bloodPressure: "140/90",
      heartRate: 98,
      temperature: 98.6,
      oxygenSaturation: 96,
      painScale: 7,
      respiratoryRate: 22
    }
  },
  {
    id: "P002",
    name: "Michael Torres",
    age: 42,
    gender: "M",
    complaint: "Severe headache with nausea",
    entry: "📞",
    entryMethod: "phone",
    room: "02",
    arrivalTime: "1:06 PM",
    arrivalTimestamp: new Date(Date.now() - 9 * 60000).toISOString(),
    lastUpdate: "9 min ago",
    phone: "+1-555-0124",
    status: "🚨 URGENT - 9min wait time - needs immediate evaluation",
    physicianSeen: false,
    family: "Elena (Wife)",
    section: "untriaged",
    vitalSigns: {
      bloodPressure: "160/100",
      heartRate: 110,
      temperature: 99.2,
      oxygenSaturation: 98,
      painScale: 9,
      respiratoryRate: 18
    }
  },
  {
    id: "P003",
    name: "David Kim",
    age: 28,
    gender: "M",
    complaint: "Ankle injury from sports",
    entry: "🚗",
    entryMethod: "walk-in",
    room: "03",
    arrivalTime: "1:10 PM",
    arrivalTimestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    lastUpdate: "5 min ago",
    phone: "+1-555-0125",
    status: "⏳ Awaiting initial physician evaluation",
    physicianSeen: false,
    family: "Lisa (Wife)",
    section: "untriaged",
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: 82,
      temperature: 98.4,
      oxygenSaturation: 99,
      painScale: 6,
      respiratoryRate: 16
    }
  },
  {
    id: "P004",
    name: "Maria Rodriguez",
    age: 45,
    gender: "F",
    complaint: "Abdominal pain",
    entry: "🚑",
    entryMethod: "ambulance",
    room: "04",
    arrivalTime: "12:30 PM",
    arrivalTimestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    lastUpdate: "20 min ago",
    phone: "+1-555-0126",
    status: "✅ Triaged (Acuity 2) - Awaiting full evaluation",
    physicianSeen: false,
    acuity: 2,
    family: "Carlos (Husband)",
    section: "triaged-awaiting",
    triageTimestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    vitalSigns: {
      bloodPressure: "130/85",
      heartRate: 95,
      temperature: 100.1,
      oxygenSaturation: 97,
      painScale: 8,
      respiratoryRate: 20
    }
  },
  {
    id: "P005",
    name: "Robert Wilson",
    age: 67,
    gender: "M",
    complaint: "Chest discomfort",
    entry: "📞",
    entryMethod: "phone",
    room: "05",
    arrivalTime: "11:45 AM",
    arrivalTimestamp: new Date(Date.now() - 90 * 60000).toISOString(),
    lastUpdate: "30 min ago",
    phone: "+1-555-0127",
    status: "🧪 CT scan and blood work in progress",
    physicianSeen: true,
    acuity: 1,
    test: "CT chest, Troponin, BNP - Expected: 2:30 PM",
    family: "Linda (Wife)",
    section: "tests-ordered",
    expectedTestCompletion: new Date(Date.now() + 30 * 60000).toISOString(),
    vitalSigns: {
      bloodPressure: "150/95",
      heartRate: 88,
      temperature: 98.8,
      oxygenSaturation: 95,
      painScale: 4,
      respiratoryRate: 18
    }
  },
  {
    id: "P006",
    name: "Lisa Park",
    age: 52,
    gender: "F",
    complaint: "Severe headache",
    entry: "📱",
    entryMethod: "app",
    room: "06",
    arrivalTime: "10:45 AM",
    arrivalTimestamp: new Date(Date.now() - 150 * 60000).toISOString(),
    lastUpdate: "Just now",
    phone: "+1-555-0128",
    status: "📋 CT results available - Normal findings",
    physicianSeen: true,
    acuity: 2,
    results: "CT head: No acute findings - Ready for discharge planning",
    family: "David (Son)",
    section: "results-ready",
    vitalSigns: {
      bloodPressure: "125/80",
      heartRate: 75,
      temperature: 98.2,
      oxygenSaturation: 99,
      painScale: 2,
      respiratoryRate: 16
    }
  },
  {
    id: "P007",
    name: "Jennifer Adams",
    age: 38,
    gender: "F",
    complaint: "Question about medication refill",
    entry: "💬",
    entryMethod: "message",
    room: "N/A",
    arrivalTime: "Yesterday 4:30 PM",
    arrivalTimestamp: new Date(Date.now() - 20 * 60 * 60000).toISOString(),
    lastUpdate: "20hrs ago",
    phone: "+1-555-0129",
    status: "💬 Medication refill request - needs physician approval",
    physicianSeen: false,
    family: "Tom (Husband)",
    section: "concierge",
    messageType: "request"
  },
  {
    id: "P008",
    name: "Thomas Brown",
    age: 55,
    gender: "M",
    complaint: "Follow-up question about discharge instructions",
    entry: "💬",
    entryMethod: "message",
    room: "N/A",
    arrivalTime: "Today 8:00 AM",
    arrivalTimestamp: new Date(Date.now() - 6 * 60 * 60000).toISOString(),
    lastUpdate: "6hrs ago",
    phone: "+1-555-0130",
    status: "💬 Discharge instruction clarification needed",
    physicianSeen: false,
    family: "Mary (Wife)",
    section: "concierge",
    messageType: "question"
  }
];

export const mockStats = {
  activePatients: 8,
  untriagedPatients: 3,
  awaitingFullEvaluation: 1,
  testsInProgress: 1,
  resultsReady: 1,
  conciergeMessages: 2,
  consultationsToday: 12,
  urgentAlerts: 2
};
