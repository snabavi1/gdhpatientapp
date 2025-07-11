
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, User, Stethoscope } from 'lucide-react';

type AuthMode = 'signin' | 'signup' | 'unified-signup';

const SimpleAuth = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Unified signup state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    planId: 'basic',
    userType: 'patient' as const
  });

  const { signIn, signUp, signUpWithUnifiedBackend, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleTestLogin = async (email: string, password: string, userType: 'patient' | 'physician') => {
    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.error) {
        toast({
          title: "Test login failed",
          description: "Test account may not exist yet. Try creating it first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Test login successful!",
          description: `Logged in as test ${userType}`,
        });
        // Navigate based on user type
        if (userType === 'physician') {
          navigate('/physician');
        } else {
          navigate('/');
        }
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
          description: mode === 'signin' ? "Welcome back!" : "Account created successfully!",
        });
        if (mode === 'signup') {
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

  // Unified signup handler
  const handleUnifiedSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpWithUnifiedBackend(signupData);
      console.log('🎉 Patient created in all systems:', result);
      toast({
        title: "Account created successfully!",
        description: "Welcome to Green Dot Health! You're now logged in.",
      });
      // User is automatically logged in and redirected by the auth context
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    if (mode === 'signin') {
      setMode('unified-signup');
    } else {
      setMode('signin');
    }
    setEmail('');
    setPassword('');
    setFullName('');
  };

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

        {/* Test Credentials Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-lg">Quick Test Access</CardTitle>
            <p className="text-center text-sm text-gray-600">
              Use test credentials for easy navigation
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => handleTestLogin('patient@test.com', 'testpass123', 'patient')}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Sign in as Test Patient
            </Button>
            <div className="text-xs text-gray-500 text-center mt-2">
              <p><strong>Patient:</strong> patient@test.com / testpass123</p>
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">
              {mode === 'signin' ? 'Welcome Back' : mode === 'unified-signup' ? 'Join Green Dot Health' : 'Create Account'}
            </CardTitle>
            <p className="text-center text-gray-600">
              {mode === 'signin' 
                ? 'Sign in to access your dashboard' 
                : mode === 'unified-signup'
                ? 'Complete membership signup with all benefits'
                : 'Join Green Dot Health today'
              }
            </p>
          </CardHeader>
          <CardContent>
            {mode === 'unified-signup' ? (
              <form onSubmit={handleUnifiedSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    className="mt-1"
                    minLength={6}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={signupData.dateOfBirth}
                    onChange={(e) => setSignupData({...signupData, dateOfBirth: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="planId">Membership Plan</Label>
                  <Select
                    value={signupData.planId}
                    onValueChange={(value) => setSignupData({...signupData, planId: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Plan - $89/month</SelectItem>
                      <SelectItem value="premium">Premium Plan - $149/month</SelectItem>
                      <SelectItem value="family">Family Plan - $249/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {loading ? 'Creating Account...' : 'Sign Up for Green Dot Health'}
                </Button>
              </form>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
              )}
              
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
                className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signin' 
                  ? "Don't have an account? " 
                  : mode === 'unified-signup'
                  ? "Already have an account? "
                  : "Already have an account? "
                }
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-healthcare-primary hover:underline font-medium"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Are you a healthcare provider?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/physician/auth')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Go to Physician Portal
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleAuth;
