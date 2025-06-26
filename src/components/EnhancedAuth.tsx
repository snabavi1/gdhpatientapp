import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { hintHealthService } from '@/services/hintHealthService';
import { blandAIService } from '@/services/blandAIService';
import { Loader2, Phone, ArrowLeft } from 'lucide-react';

type AuthStep = 'email' | '2fa' | 'signup' | 'complete';

const EnhancedAuth = () => {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [actualCode, setActualCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [hintPatient, setHintPatient] = useState<any>(null);
  
  // Signup form data
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    zipCode: ''
  });

  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Look up patient in Hint Health system
      const patient = await hintHealthService.findPatientByEmail(email);
      
      if (patient) {
        // Existing patient - proceed with 2FA
        setHintPatient(patient);
        if (patient.phone) {
          const { success, code } = await blandAIService.send2FACode(patient.phone);
          if (success && code) {
            setActualCode(code);
            setPhone(patient.phone);
            setStep('2fa');
            toast({
              title: "Verification code sent",
              description: `A 6-digit code has been sent to ${patient.phone}`,
            });
          } else {
            toast({
              title: "Error",
              description: "Failed to send verification code. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Phone number required",
            description: "Please contact support to update your phone number.",
            variant: "destructive",
          });
        }
      } else {
        // New user - proceed with signup
        setStep('signup');
        toast({
          title: "Welcome!",
          description: "Let's get you started as a new member.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (verificationCode === actualCode) {
        // Create user account with existing patient data
        const { error } = await signUp(
          email, 
          `temp_${Date.now()}`, // Temporary password
          hintPatient.first_name + ' ' + hintPatient.last_name
        );

        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Account created successfully. Welcome back!",
          });
          setStep('complete');
        }
      } else {
        toast({
          title: "Invalid code",
          description: "Please check your code and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send 2FA code to verify phone number
      const { success, code } = await blandAIService.send2FACode(signupData.phoneNumber);
      
      if (success && code) {
        setActualCode(code);
        setPhone(signupData.phoneNumber);
        
        // Create patient in Hint Health system
        const hintPatient = await hintHealthService.createPatient({
          email,
          first_name: signupData.firstName,
          last_name: signupData.lastName,
          phone: signupData.phoneNumber,
          date_of_birth: signupData.dateOfBirth
        });
        
        setHintPatient(hintPatient);
        setStep('2fa');
        
        toast({
          title: "Verification code sent",
          description: `A 6-digit code has been sent to ${signupData.phoneNumber}`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send verification code. Please check your phone number.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderEmailStep = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Welcome to Green Dot Health</CardTitle>
        <p className="text-center text-gray-600">Enter your email to get started</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const render2FAStep = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep('email')}
            className="p-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>Verify Your Phone</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>Code sent to {phone}</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerificationSubmit} className="space-y-4">
          <div>
            <Label htmlFor="code">6-Digit Verification Code</Label>
            <Input
              id="code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              placeholder="000000"
              maxLength={6}
              className="mt-1 text-center text-lg tracking-widest"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
            disabled={loading || verificationCode.length !== 6}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Verify & Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderSignupStep = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep('email')}
            className="p-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>Join Green Dot Health</CardTitle>
        </div>
        <p className="text-sm text-gray-600">Please provide your information to create your account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={signupData.firstName}
                onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                required
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={signupData.lastName}
                onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                required
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={signupData.phoneNumber}
              onChange={(e) => setSignupData({...signupData, phoneNumber: e.target.value})}
              required
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={signupData.dateOfBirth}
              onChange={(e) => setSignupData({...signupData, dateOfBirth: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              type="text"
              value={signupData.zipCode}
              onChange={(e) => setSignupData({...signupData, zipCode: e.target.value})}
              required
              placeholder="12345"
              maxLength={5}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-healthcare-primary rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Green Dot Health</h1>
        </div>

        {step === 'email' && renderEmailStep()}
        {step === '2fa' && render2FAStep()}
        {step === 'signup' && renderSignupStep()}
        {step === 'complete' && (
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
              <h2 className="text-xl font-semibold mb-2">Welcome to Green Dot Health!</h2>
              <p className="text-gray-600 mb-4">Your account has been created successfully.</p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-healthcare-primary hover:bg-healthcare-primary/90"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedAuth;
