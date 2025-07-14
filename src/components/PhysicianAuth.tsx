import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2, Stethoscope, LogIn } from 'lucide-react';
import Header from '@/components/Header';

const PhysicianAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, user } = useAuth();
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
      const result = await signIn(email, password);

      if (result.error) {
        toast({
          title: "Authentication failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back, Doctor!",
          description: "Successfully signed in to your physician dashboard.",
        });
        navigate('/physician');
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


  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-16">{/* Added pt-16 to account for header */}
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
            <CardTitle className="text-center">Welcome Back, Doc</CardTitle>
            <p className="text-center text-gray-600">
              Sign in to Your Physician Dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </form>
            
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
    </>
  );
};

export default PhysicianAuth;