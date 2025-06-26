
-- Create enhanced tables for the comprehensive patient portal

-- Table for storing Hint Health patient matching and sync data
CREATE TABLE public.hint_patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  hint_patient_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone TEXT,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  hint_tags TEXT[],
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for family contacts and authorized callers
CREATE TABLE public.family_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  permissions JSONB NOT NULL DEFAULT '{"may_call": false, "may_receive_updates": false}',
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for communication logs (calls, SMS, video sessions)
CREATE TABLE public.communication_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  communication_type TEXT NOT NULL CHECK (communication_type IN ('voice_call', 'sms', 'video_call', 'email')),
  provider_type TEXT CHECK (provider_type IN ('doctor', 'concierge', 'emergency')),
  external_id TEXT, -- Bland AI call ID, conversation ID, etc.
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status TEXT NOT NULL CHECK (status IN ('initiated', 'connected', 'completed', 'failed', 'cancelled')),
  duration_seconds INTEGER,
  summary TEXT,
  metadata JSONB DEFAULT '{}',
  family_contact_id UUID REFERENCES public.family_contacts(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for SMS conversations and threading
CREATE TABLE public.sms_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  conversation_id TEXT UNIQUE, -- Bland AI conversation ID
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
  last_message_at TIMESTAMP WITH TIME ZONE,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for individual SMS messages
CREATE TABLE public.sms_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.sms_conversations(id) ON DELETE CASCADE NOT NULL,
  external_message_id TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message_content TEXT NOT NULL,
  sender_phone TEXT,
  recipient_phone TEXT,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.hint_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hint_patients
CREATE POLICY "Users can view their own Hint patient data" 
  ON public.hint_patients 
  FOR SELECT 
  USING (profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update their own Hint patient data" 
  ON public.hint_patients 
  FOR UPDATE 
  USING (profile_id IN (SELECT id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "System can insert Hint patient data" 
  ON public.hint_patients 
  FOR INSERT 
  WITH CHECK (true);

-- RLS Policies for family_contacts
CREATE POLICY "Users can manage their own family contacts" 
  ON public.family_contacts 
  FOR ALL 
  USING (profile_id = auth.uid());

-- RLS Policies for communication_logs
CREATE POLICY "Users can view their own communication logs" 
  ON public.communication_logs 
  FOR SELECT 
  USING (profile_id = auth.uid());

CREATE POLICY "System can insert communication logs" 
  ON public.communication_logs 
  FOR INSERT 
  WITH CHECK (true);

-- RLS Policies for sms_conversations
CREATE POLICY "Users can view their own SMS conversations" 
  ON public.sms_conversations 
  FOR ALL 
  USING (profile_id = auth.uid());

-- RLS Policies for sms_messages
CREATE POLICY "Users can view messages from their conversations" 
  ON public.sms_messages 
  FOR SELECT 
  USING (conversation_id IN (
    SELECT id FROM public.sms_conversations WHERE profile_id = auth.uid()
  ));

CREATE POLICY "System can insert SMS messages" 
  ON public.sms_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_hint_patients_profile_id ON public.hint_patients(profile_id);
CREATE INDEX idx_hint_patients_hint_id ON public.hint_patients(hint_patient_id);
CREATE INDEX idx_hint_patients_email ON public.hint_patients(email);
CREATE INDEX idx_family_contacts_profile_id ON public.family_contacts(profile_id);
CREATE INDEX idx_communication_logs_profile_id ON public.communication_logs(profile_id);
CREATE INDEX idx_communication_logs_created_at ON public.communication_logs(created_at DESC);
CREATE INDEX idx_sms_conversations_profile_id ON public.sms_conversations(profile_id);
CREATE INDEX idx_sms_messages_conversation_id ON public.sms_messages(conversation_id);
CREATE INDEX idx_sms_messages_created_at ON public.sms_messages(created_at DESC);
