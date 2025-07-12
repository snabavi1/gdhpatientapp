
import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import PatientDashboard from "@/components/PatientDashboard";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  
  // Extract user name reactively based on current user metadata
  const getUserName = () => {
    console.log('getUserName called, user:', user);
    console.log('user metadata:', user?.user_metadata);
    
    if (!user) {
      console.log('No user, returning Patient');
      return "Patient";
    }
    
    const firstName = user.user_metadata?.first_name;
    const lastName = user.user_metadata?.last_name;
    const fullName = user.user_metadata?.full_name;
    
    console.log('firstName:', firstName, 'lastName:', lastName, 'fullName:', fullName);
    
    if (firstName && lastName) {
      const result = `${firstName} ${lastName}`;
      console.log('Using first + last name:', result);
      return result;
    }
    
    if (fullName) {
      console.log('Using full name:', fullName);
      return fullName;
    }
    
    console.log('Falling back to email:', user.email);
    return user.email || "Patient";
  };

  // Mock patient data - in a real app this would come from Supabase
  const patientData = {
    name: getUserName(),
    currentStatus: 'care-plan-updated' as const,
    lastUpdated: new Date('2024-01-15T10:30:00'),
    nextAppointment: new Date('2024-01-20T14:00:00')
  };

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
          <WelcomeHero />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
