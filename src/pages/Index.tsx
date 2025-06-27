
import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import PatientDashboard from "@/components/PatientDashboard";
import ConciergeSection from "@/components/ConciergeSection";
import TalkToDoctorSection from "@/components/TalkToDoctorSection";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  
  // Mock patient data - in a real app this would come from Supabase
  const [patientData] = useState({
    name: user?.user_metadata?.full_name || user?.email || "Patient",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-brand-teal">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-16 md:pb-0">
        {user ? (
          <PatientDashboard
            patientName={patientData.name}
            currentStatus={patientData.currentStatus}
            lastUpdated={patientData.lastUpdated}
            nextAppointment={patientData.nextAppointment}
            careInstructions={patientData.careInstructions}
            timelineEvents={timelineEvents}
          />
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
