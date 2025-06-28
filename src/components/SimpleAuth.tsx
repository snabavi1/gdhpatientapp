
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, User, Stethoscope } from 'lucide-react';

type AuthMode = 'signin' | 'signup';

const SimpleAuth = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, user } = useAuth();
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

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
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
            <Button
              onClick={() => handleTestLogin('physician@test.com', 'testpass123', 'physician')}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Sign in as Test Physician
            </Button>
            <div className="text-xs text-gray-500 text-center mt-2">
              <p><strong>Patient:</strong> patient@test.com / testpass123</p>
              <p><strong>Physician:</strong> physician@test.com / testpass123</p>
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <p className="text-center text-gray-600">
              {mode === 'signin' 
                ? 'Sign in to access your dashboard' 
                : 'Join Green Dot Health today'
              }
            </p>
          </CardHeader>
          <CardContent>
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
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signin' 
                  ? "Don't have an account? " 
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleAuth;
