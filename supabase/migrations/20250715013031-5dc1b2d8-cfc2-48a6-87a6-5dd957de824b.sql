-- Add missing columns to profiles table for physician functionality
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT;