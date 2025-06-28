
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
  acuity: number;
  section: string;
  test?: string;
  results?: string;
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
    status: "⏳ Awaiting physician evaluation",
    physicianSeen: false,
    family: "Mike (Husband)",
    acuity: 1,
    section: "triage"
  },
  {
    id: "P002",
    name: "Michael Torres",
    age: 42,
    gender: "M",
    complaint: "Severe headache",
    entry: "📞",
    entryMethod: "phone",
    room: "02",
    arrivalTime: "1:09 PM",
    arrivalTimestamp: new Date(Date.now() - 6 * 60000).toISOString(),
    lastUpdate: "6 min ago",
    phone: "+1-555-0124",
    status: "⚠️ HIGH PRIORITY - 6min wait, backup call due in 1min",
    physicianSeen: false,
    family: "Elena (Wife)",
    acuity: 2,
    section: "triage"
  },
  {
    id: "P003",
    name: "Maria Rodriguez",
    age: 28,
    gender: "F",
    complaint: "Pregnancy concerns",
    entry: "🎥",
    entryMethod: "video",
    room: "03",
    arrivalTime: "12:15 PM",
    arrivalTimestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    lastUpdate: "15 min ago",
    phone: "+1-555-0125",
    status: "✅ Physician evaluated → Lab work ordered",
    physicianSeen: true,
    test: "Blood work (hCG, CBC) - Quest Lab",
    family: "Carlos (Husband)",
    acuity: 2,
    section: "pending"
  },
  {
    id: "P004",
    name: "Robert Kim",
    age: 67,
    gender: "M",
    complaint: "Abdominal pain",
    entry: "📞",
    entryMethod: "phone",
    room: "04",
    arrivalTime: "11:45 AM",
    arrivalTimestamp: new Date(Date.now() - 90 * 60000).toISOString(),
    lastUpdate: "30 min ago",
    phone: "+1-555-0126",
    status: "✅ Physician evaluated → CT scan in progress",
    physicianSeen: true,
    test: "CT abdomen - Green Imaging",
    family: "Linda (Wife)",
    acuity: 2,
    section: "pending"
  },
  {
    id: "P005",
    name: "Lisa Park",
    age: 52,
    gender: "F",
    complaint: "Severe headache",
    entry: "📱",
    entryMethod: "app",
    room: "05",
    arrivalTime: "10:45 AM",
    arrivalTimestamp: new Date(Date.now() - 150 * 60000).toISOString(),
    lastUpdate: "Just now",
    phone: "+1-555-0127",
    status: "📋 CT results available - Normal findings",
    physicianSeen: true,
    results: "No acute findings - Ready for discharge planning",
    family: "David (Son)",
    acuity: 2,
    section: "disposition"
  },
  {
    id: "P006",
    name: "Tom Anderson",
    age: 35,
    gender: "M",
    complaint: "COVID symptoms",
    entry: "📞",
    entryMethod: "phone",
    room: "06",
    arrivalTime: "Yesterday 3:00 PM",
    arrivalTimestamp: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
    lastUpdate: "24hrs ago",
    phone: "+1-555-0128",
    status: "✅ Care completed → 48hr symptom check due",
    physicianSeen: true,
    family: "Jenny (Wife)",
    acuity: 4,
    section: "followup"
  }
];

export const mockStats = {
  activePatients: 6,
  pendingFollowups: 3,
  consultationsToday: 12,
  urgentAlerts: 2
};
