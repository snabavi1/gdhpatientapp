import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Phone } from "lucide-react";

const TalkToDoctorSection = () => {
  const handleVideoCall = () => {
    window.open('https://greendothealth.doxy.me/', '_blank');
  };

  const handlePhoneCall = () => {
    window.open('tel:815-473-3663', '_self');
  };

  const handleTextMessage = () => {
    window.open('sms:815-473-3663', '_self');
  };

  const handleSpruceMessaging = () => {
    window.open('https://spruce.care/greendothealth', '_blank');
  };

  const communicationOptions = [
    {
      icon: Video,
      title: "Video Visit",
      description: "Face-to-face consultation with your healthcare provider from anywhere",
      buttons: [
        {
          text: "Start Video Call",
          color: "bg-healthcare-primary",
          hoverColor: "hover:bg-healthcare-primary/90",
          onClick: handleVideoCall
        }
      ],
      iconColor: "text-white",
      bgColor: "bg-healthcare-primary"
    },
    {
      icon: Phone,
      title: "Phone Communication",
      description: "Call directly or send a text message to your healthcare team",
      buttons: [
        {
          text: "Call Doctor",
          color: "bg-healthcare-ocean",
          hoverColor: "hover:bg-healthcare-ocean/90",
          onClick: handlePhoneCall
        },
        {
          text: "Send Text",
          color: "bg-healthcare-ocean",
          hoverColor: "hover:bg-healthcare-ocean/90",
          variant: "outline" as const,
          onClick: handleTextMessage
        }
      ],
      iconColor: "text-white",
      bgColor: "bg-healthcare-ocean"
    },
    {
      icon: MessageSquare,
      title: "Spruce Messaging",
      description: "Secure HIPAA-compliant messaging through our Spruce platform",
      buttons: [
        {
          text: "Open Spruce Chat",
          color: "bg-peach-500",
          hoverColor: "hover:bg-peach-500/90",
          onClick: handleSpruceMessaging
        }
      ],
      iconColor: "text-white",
      bgColor: "bg-peach-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-mint-50 to-healthcare-sky/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Talk to Your{" "}
            <span className="text-healthcare-primary">Doctor Now</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Need immediate medical attention? Connect with a healthcare professional 
            instantly through your preferred communication method. All options are 
            secure and HIPAA-compliant.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <p className="text-sm text-yellow-800">
              <strong>Privacy Notice:</strong> Please do not text sensitive health information via SMS. 
              For confidential matters, use Spruce messaging, video calls, or call and leave a message with our HIPAA-compliant voicemail system.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {communicationOptions.map((option, index) => (
            <Card key={index} className="bg-white border-mint-200 hover-lift transition-all duration-300 overflow-hidden">
              <CardHeader className="text-center pb-6">
                <div className={`w-20 h-20 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <option.icon className={`h-10 w-10 ${option.iconColor}`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                  {option.description}
                </CardDescription>
                <div className="space-y-3">
                  {option.buttons.map((button, buttonIndex) => (
                    <Button 
                      key={buttonIndex}
                      size="lg" 
                      variant={(button.variant as "outline" | "default") || "default"}
                      className={`w-full ${
                        button.variant === 'outline' 
                          ? `border-2 border-healthcare-ocean text-healthcare-ocean hover:bg-healthcare-ocean hover:text-white` 
                          : `${button.color} ${button.hoverColor} text-white`
                      } hover-lift`}
                      onClick={button.onClick}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-healthcare-primary/10 via-mint-100 to-peach-100 border-healthcare-primary/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Emergency? Call 911 Immediately
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                For life-threatening emergencies, always call 911 or go to your nearest emergency room. 
                These communication options are for non-emergency medical consultations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  Emergency Resources
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TalkToDoctorSection;
