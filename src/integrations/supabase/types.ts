export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          date_of_birth: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
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
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
