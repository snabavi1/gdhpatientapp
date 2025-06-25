
import Header from "@/components/Header";
import WelcomeHero from "@/components/WelcomeHero";
import ConciergeSection from "@/components/ConciergeSection";
import TalkToDoctorSection from "@/components/TalkToDoctorSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <WelcomeHero />
        <ConciergeSection />
        <TalkToDoctorSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
