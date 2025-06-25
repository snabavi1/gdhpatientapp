
import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import PatientDashboard from "@/components/PatientDashboard";
import CareTimeline from "@/components/CareTimeline";
import ConciergeSection from "@/components/ConciergeSection";
import TalkToDoctorSection from "@/components/TalkToDoctorSection";
import Footer from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  // This would normally come from authentication state
  const [isAuthenticated] = useState(false);
  const [patientData] = useState({
    name: "Sarah Johnson",
    currentStatus: 'awaiting-results' as const,
    lastUpdated: new Date('2024-01-15T10:30:00'),
    nextAppointment: new Date('2024-01-20T14:00:00'),
    careInstructions: [
      "Continue taking prescribed medication twice daily with meals",
      "Stay hydrated and get adequate rest",
      "Monitor symptoms and report any changes",
      "Schedule follow-up appointment as discussed"
    ]
  });

  const timelineEvents = [
    {
      id: '1',
      title: 'Initial Consultation',
      description: 'Comprehensive health assessment and discussion of symptoms',
      date: new Date('2024-01-10T09:00:00'),
      status: 'completed' as const,
      type: 'appointment' as const
    },
    {
      id: '2',
      title: 'Lab Tests Ordered',
      description: 'Blood work and diagnostic tests scheduled',
      date: new Date('2024-01-12T11:00:00'),
      status: 'completed' as const,
      type: 'test' as const
    },
    {
      id: '3',
      title: 'Lab Results Review',
      description: 'Waiting for test results and analysis',
      date: new Date('2024-01-15T10:30:00'),
      status: 'current' as const,
      type: 'result' as const
    },
    {
      id: '4',
      title: 'Follow-up Consultation',
      description: 'Review results and discuss treatment plan',
      date: new Date('2024-01-20T14:00:00'),
      status: 'upcoming' as const,
      type: 'followup' as const
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pb-16 md:pb-0"> {/* Add bottom padding for mobile nav */}
        {isAuthenticated ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Dashboard */}
              <div className="lg:col-span-2">
                <PatientDashboard
                  patientName={patientData.name}
                  currentStatus={patientData.currentStatus}
                  lastUpdated={patientData.lastUpdated}
                  nextAppointment={patientData.nextAppointment}
                  careInstructions={patientData.careInstructions}
                />
              </div>
              
              {/* Timeline Sidebar */}
              <div className="lg:col-span-1">
                <CareTimeline events={timelineEvents} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <WelcomeHero />
            <ConciergeSection />
            <TalkToDoctorSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
