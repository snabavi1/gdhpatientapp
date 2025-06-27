
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
    nextAppointment: new Date('2024-01-20T14:00:00')
  });

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
