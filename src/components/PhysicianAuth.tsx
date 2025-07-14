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
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome Back!</CardTitle>
            <p className="text-center text-gray-600">
              Sign into your Physician Dashboard. May the Force Be With You.
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