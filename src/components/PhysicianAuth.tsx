import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2, Stethoscope, UserPlus, LogIn } from 'lucide-react';

type AuthMode = 'signin' | 'signup';

const PhysicianAuth = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [medicalLicense, setMedicalLicense] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/physician');
    }
  }, [user, navigate]);

  const handleTestLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn('physician@test.com', 'testpass123');
      if (result.error) {
        toast({
          title: "Test login failed",
          description: "Test physician account may not exist yet. Try creating it first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Test login successful!",
          description: "Logged in as test physician",
        });
        navigate('/physician');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong with test login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (mode === 'signin') {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, fullName);
      }

      if (result.error) {
        toast({
          title: "Authentication failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: mode === 'signin' ? "Welcome back, Doctor!" : "Physician account created successfully!",
        });
        if (mode === 'signin') {
          navigate('/physician');
        } else {
          toast({
            title: "Check your email",
            description: "Please check your email to confirm your account.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setEmail('');
    setPassword('');
    setFullName('');
    setMedicalLicense('');
    setSpecialty('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Green Dot Health</h1>
          <p className="text-gray-600 mt-2">Physician Portal</p>
        </div>

        {/* Test Credentials Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-lg">Quick Test Access</CardTitle>
            <p className="text-center text-sm text-gray-600">
              Use test credentials for easy access
            </p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleTestLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Sign in as Test Physician
            </Button>
            <div className="text-xs text-gray-500 text-center mt-2">
              <p><strong>Test Physician:</strong> physician@test.com / testpass123</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {mode === 'signin' ? 'Welcome Back, Doctor' : 'Join Our Medical Team'}
            </CardTitle>
            <p className="text-center text-gray-600">
              {mode === 'signin' 
                ? 'Sign in to access your physician dashboard' 
                : 'Create your physician account'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Dr. John Smith"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="medicalLicense">Medical License Number</Label>
                    <Input
                      id="medicalLicense"
                      type="text"
                      value={medicalLicense}
                      onChange={(e) => setMedicalLicense(e.target.value)}
                      placeholder="Enter your medical license number"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      type="text"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="Internal Medicine, Cardiology, etc."
                      className="mt-1"
                    />
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="doctor@hospital.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="mt-1"
                  minLength={6}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {mode === 'signin' ? (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signin' 
                  ? "Don't have a physician account? " 
                  : "Already have an account? "
                }
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Looking for patient access?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="text-healthcare-primary hover:underline font-medium"
                >
                  Go to Patient Portal
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhysicianAuth;