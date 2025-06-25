import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, HelpCircle, Users, Calendar, MessageSquare } from "lucide-react";

const ConciergeSection = () => {
  const handleConciergeContact = () => {
    window.open('sms:470-470-9108', '_self');
  };

  const conciergeServices = [
    {
      icon: Pill,
      title: "Medication Refills",
      description: "Quick and easy prescription renewals for your ongoing medications",
      color: "text-healthcare-primary"
    },
    {
      icon: HelpCircle,
      title: "Non-Urgent Questions",
      description: "Get answers to general health questions and concerns",
      color: "text-peach-500"
    },
    {
      icon: Users,
      title: "Referrals",
      description: "Seamless connections to specialists and healthcare providers",
      color: "text-healthcare-ocean"
    },
    {
      icon: Calendar,
      title: "Care Coordination",
      description: "Help organizing your healthcare appointments and follow-ups",
      color: "text-olive-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-mint-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Your Personal Health{" "}
            <span className="text-healthcare-primary">Concierge</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            For non-urgent health needs, our dedicated concierge team is here to assist you. 
            From medication refills to care coordination, we make healthcare simple and accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {conciergeServices.map((service, index) => (
            <Card key={index} className="bg-white border-mint-200 hover-lift transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <service.icon className={`h-12 w-12 mx-auto mb-4 ${service.color}`} />
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-mint-100 to-peach-100 border-mint-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-healthcare-primary mr-3" />
                Contact Your Concierge
              </CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Ready to get started? Our concierge team is standing by to help with all your non-urgent healthcare needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                size="lg" 
                className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white px-8 py-3 text-lg hover-lift"
                onClick={handleConciergeContact}
              >
                Reach Your Concierge Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConciergeSection;
