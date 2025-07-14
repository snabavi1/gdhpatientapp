export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      communication_logs: {
        Row: {
          communication_type: string
          created_at: string
          direction: string
          duration_seconds: number | null
          external_id: string | null
          family_contact_id: string | null
          id: string
          metadata: Json | null
          profile_id: string
          provider_type: string | null
          status: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          communication_type: string
          created_at?: string
          direction: string
          duration_seconds?: number | null
          external_id?: string | null
          family_contact_id?: string | null
          id?: string
          metadata?: Json | null
          profile_id: string
          provider_type?: string | null
          status: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          communication_type?: string
          created_at?: string
          direction?: string
          duration_seconds?: number | null
          external_id?: string | null
          family_contact_id?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string
          provider_type?: string | null
          status?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "communication_logs_family_contact_id_fkey"
            columns: ["family_contact_id"]
            isOneToOne: false
            referencedRelation: "family_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communication_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          agreed_at: string
          consent_type: string
          created_at: string
          document_url: string | null
          id: string
          profile_id: string
          signature_data: Json | null
          status: string
          updated_at: string
          version: string
          witness_info: Json | null
        }
        Insert: {
          agreed_at?: string
          consent_type: string
          created_at?: string
          document_url?: string | null
          id?: string
          profile_id: string
          signature_data?: Json | null
          status?: string
          updated_at?: string
          version?: string
          witness_info?: Json | null
        }
        Update: {
          agreed_at?: string
          consent_type?: string
          created_at?: string
          document_url?: string | null
          id?: string
          profile_id?: string
          signature_data?: Json | null
          status?: string
          updated_at?: string
          version?: string
          witness_info?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "consents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          document_type: string
          expiration_date: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          metadata: Json | null
          profile_id: string
          updated_at: string
          upload_date: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          document_type: string
          expiration_date?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          metadata?: Json | null
          profile_id: string
          updated_at?: string
          upload_date?: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          document_type?: string
          expiration_date?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          metadata?: Json | null
          profile_id?: string
          updated_at?: string
          upload_date?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          created_at: string
          enrolling_user_id: string | null
          enrollment_status: string
          enrollment_type: string
          family_group_id: string | null
          id: string
          metadata: Json | null
          plan_type: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enrolling_user_id?: string | null
          enrollment_status?: string
          enrollment_type: string
          family_group_id?: string | null
          id?: string
          metadata?: Json | null
          plan_type: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enrolling_user_id?: string | null
          enrollment_status?: string
          enrollment_type?: string
          family_group_id?: string | null
          id?: string
          metadata?: Json | null
          plan_type?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      family_contacts: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          permissions: Json
          phone_number: string
          profile_id: string
          relationship: string
          updated_at: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          permissions?: Json
          phone_number: string
          profile_id: string
          relationship: string
          updated_at?: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          permissions?: Json
          phone_number?: string
          profile_id?: string
          relationship?: string
          updated_at?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_contacts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_contacts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hint_patients: {
        Row: {
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string | null
          hint_patient_id: string
          hint_tags: string[] | null
          id: string
          last_name: string | null
          last_sync_at: string | null
          phone: string | null
          profile_id: string | null
          updated_at: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          hint_patient_id: string
          hint_tags?: string[] | null
          id?: string
          last_name?: string | null
          last_sync_at?: string | null
          phone?: string | null
          profile_id?: string | null
          updated_at?: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          hint_patient_id?: string
          hint_tags?: string[] | null
          id?: string
          last_name?: string | null
          last_sync_at?: string | null
          phone?: string | null
          profile_id?: string | null
          updated_at?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "hint_patients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hint_patients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_info: {
        Row: {
          card_images: Json | null
          company_name: string
          created_at: string
          group_number: string | null
          id: string
          insurance_type: string
          policy_holder_dob: string | null
          policy_holder_name: string
          policy_number: string
          profile_id: string
          relationship_to_patient: string
          updated_at: string
        }
        Insert: {
          card_images?: Json | null
          company_name: string
          created_at?: string
          group_number?: string | null
          id?: string
          insurance_type?: string
          policy_holder_dob?: string | null
          policy_holder_name: string
          policy_number: string
          profile_id: string
          relationship_to_patient?: string
          updated_at?: string
        }
        Update: {
          card_images?: Json | null
          company_name?: string
          created_at?: string
          group_number?: string | null
          id?: string
          insurance_type?: string
          policy_holder_dob?: string | null
          policy_holder_name?: string
          policy_number?: string
          profile_id?: string
          relationship_to_patient?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_info_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_info_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_authority: {
        Row: {
          authority_type: string
          created_at: string
          documents: Json | null
          enrolling_profile_id: string
          id: string
          patient_profile_id: string
          relationship: string
          updated_at: string
          verification_status: string
          verified_at: string | null
        }
        Insert: {
          authority_type: string
          created_at?: string
          documents?: Json | null
          enrolling_profile_id: string
          id?: string
          patient_profile_id: string
          relationship: string
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
        }
        Update: {
          authority_type?: string
          created_at?: string
          documents?: Json | null
          enrolling_profile_id?: string
          id?: string
          patient_profile_id?: string
          relationship?: string
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_authority_enrolling_profile_id_fkey"
            columns: ["enrolling_profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_authority_enrolling_profile_id_fkey"
            columns: ["enrolling_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_authority_patient_profile_id_fkey"
            columns: ["patient_profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_authority_patient_profile_id_fkey"
            columns: ["patient_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      physician_state_licenses: {
        Row: {
          created_at: string | null
          expiration_date: string
          id: string
          issue_date: string | null
          license_number: string
          license_status: string | null
          physician_id: string
          state_code: string
          state_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expiration_date: string
          id?: string
          issue_date?: string | null
          license_number: string
          license_status?: string | null
          physician_id: string
          state_code: string
          state_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expiration_date?: string
          id?: string
          issue_date?: string | null
          license_number?: string
          license_status?: string | null
          physician_id?: string
          state_code?: string
          state_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "physician_state_licenses_physician_id_fkey"
            columns: ["physician_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physician_state_licenses_physician_id_fkey"
            columns: ["physician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          backup_codes: string[] | null
          created_at: string
          date_of_birth: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          full_name: string | null
          id: string
          medical_license_number: string | null
          phone: string | null
          phone_number: string | null
          role: string
          specialty: string | null
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
          updated_at: string
          verified_physician: boolean | null
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name?: string | null
          id: string
          medical_license_number?: string | null
          phone?: string | null
          phone_number?: string | null
          role?: string
          specialty?: string | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          verified_physician?: boolean | null
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name?: string | null
          id?: string
          medical_license_number?: string | null
          phone?: string | null
          phone_number?: string | null
          role?: string
          specialty?: string | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string
          verified_physician?: boolean | null
        }
        Relationships: []
      }
      sms_conversations: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: string
          last_message_at: string | null
          message_count: number | null
          phone_number: string
          profile_id: string
          status: string
          updated_at: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          message_count?: number | null
          phone_number: string
          profile_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          message_count?: number | null
          phone_number?: string
          profile_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_conversations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "physician_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_conversations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_messages: {
        Row: {
          conversation_id: string
          created_at: string
          direction: string
          external_message_id: string | null
          id: string
          message_content: string
          metadata: Json | null
          recipient_phone: string | null
          sender_phone: string | null
          status: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          direction: string
          external_message_id?: string | null
          id?: string
          message_content: string
          metadata?: Json | null
          recipient_phone?: string | null
          sender_phone?: string | null
          status?: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          direction?: string
          external_message_id?: string | null
          id?: string
          message_content?: string
          metadata?: Json | null
          recipient_phone?: string | null
          sender_phone?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "sms_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      physician_management: {
        Row: {
          created_at: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          full_name: string | null
          id: string | null
          licensed_states: string | null
          medical_license_number: string | null
          phone_number: string | null
          specialty: string | null
          state_license_count: number | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          verified_physician: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_physician_state_license: {
        Args: {
          p_physician_id: string
          p_state_code: string
          p_state_name: string
          p_license_number: string
          p_expiration_date: string
          p_issue_date?: string
        }
        Returns: Json
      }
      create_physician_account: {
        Args:
          | {
              p_email: string
              p_full_name: string
              p_medical_license: string
              p_specialty: string
            }
          | {
              p_email: string
              p_full_name: string
              p_medical_license: string
              p_specialty: string
              p_phone_number?: string
              p_emergency_contact_name?: string
              p_emergency_contact_relationship?: string
              p_emergency_contact_phone?: string
            }
        Returns: Json
      }
      enable_physician_2fa: {
        Args: { p_user_id: string; p_secret: string }
        Returns: Json
      }
      get_expiring_physician_licenses: {
        Args: { p_days_ahead?: number }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
