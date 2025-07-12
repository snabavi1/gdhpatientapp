import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Settings, CreditCard, LogOut, User, Save, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  role: string;
}

const ProfileDropdown = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    date_of_birth: ''
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      setProfileForm({
        full_name: data.full_name || '',
        phone: data.phone || '',
        date_of_birth: data.date_of_birth || ''
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileForm.full_name,
          phone: profileForm.phone,
          date_of_birth: profileForm.date_of_birth || null
        })
        .eq('id', user.id);

      if (error) throw error;

      await loadProfile();
      setShowProfileModal(false);
      toast({
        title: "Profile updated",
        description: "Your healthcare profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentUpdate = () => {
    // Placeholder for payment integration
    toast({
      title: "Payment Settings",
      description: "Payment integration will be available soon.",
    });
    setShowPaymentModal(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-2 hover:bg-brand-primary/10"
          >
            <UserCircle className="h-5 w-5 text-brand-primary" />
            <span className="hidden sm:inline text-sm">
              {profile?.full_name || 
               (user?.user_metadata?.first_name && user?.user_metadata?.last_name 
                 ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` 
                 : user?.user_metadata?.full_name || user?.email)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-64 bg-white border border-accent shadow-lg">
          <div className="px-3 py-2 border-b border-accent">
            <p className="font-medium text-sm text-foreground">
              {profile?.full_name || 
               (user?.user_metadata?.first_name && user?.user_metadata?.last_name 
                 ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` 
                 : user?.user_metadata?.full_name || 'Patient')}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          
          <DropdownMenuItem 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center space-x-2 hover:bg-brand-primary/10"
          >
            <User className="h-4 w-4 text-brand-primary" />
            <span>Healthcare Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => setShowPaymentModal(true)}
            className="flex items-center space-x-2 hover:bg-brand-primary/10"
          >
            <CreditCard className="h-4 w-4 text-brand-peach" />
            <span>Payment Information</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={signOut}
            className="flex items-center space-x-2 hover:bg-destructive/10 text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Healthcare Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-brand-primary" />
              <span>Healthcare Profile</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profileForm.full_name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileForm.phone}
                onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={profileForm.date_of_birth}
                onChange={(e) => setProfileForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
              />
            </div>

            {profile && (
              <div className="bg-accent/30 p-3 rounded-lg space-y-1">
                <p className="text-sm"><strong>Email:</strong> {profile.email}</p>
                <p className="text-sm"><strong>Role:</strong> {profile.role}</p>
                <p className="text-sm"><strong>Member since:</strong> {new Date(user?.created_at || '').toLocaleDateString()}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowProfileModal(false)}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleProfileUpdate}
                disabled={isLoading}
                className="bg-brand-primary hover:bg-brand-primary/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Information Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-brand-peach" />
              <span>Payment Information</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-brand-peach/20 to-brand-purple/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                Manage your payment methods and billing information for Green Dot Health services.
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Plan</span>
                  <span className="text-sm text-brand-primary">Free Plan</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Payment Method</span>
                  <span className="text-sm text-muted-foreground">Not added</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowPaymentModal(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handlePaymentUpdate}
                className="bg-brand-peach hover:bg-brand-peach/90"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDropdown;