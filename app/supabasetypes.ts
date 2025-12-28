export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
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
  public: {
    Tables: {
      "Live Data": {
        Row: {
          auto_l1: number
          auto_l2: number
          auto_l3: number
          auto_l4: number
          auto_made_net: number
          auto_made_processor: number
          auto_missed_coral: number
          auto_missed_net: number
          auto_mobility: boolean
          auto_points: number
          auto_start_position: Database["public"]["Enums"]["autostartpositionsreefscape"]
          comments: string
          created_at: string
          disabled: boolean
          driver_rating: number
          driver_station: Database["public"]["Enums"]["driverstation"]
          endgame_points: number
          endgame_type: Database["public"]["Enums"]["endgametypereefscape"]
          id: number
          lost_comms: boolean
          match_number: number
          match_type: Database["public"]["Enums"]["matchscouttype"]
          scout_name: string
          team_number: number
          tele_l1: number
          tele_l2: number
          tele_l3: number
          tele_l4: number
          tele_made_net: number
          tele_missed_coral: number
          tele_missed_net: number
          tele_points: number
          tele_processor: number
          total_algae: number
          total_coral: number
          total_gamepieces: number
          total_points: number
        }
        Insert: {
          auto_l1?: number
          auto_l2?: number
          auto_l3?: number
          auto_l4?: number
          auto_made_net?: number
          auto_made_processor?: number
          auto_missed_coral?: number
          auto_missed_net?: number
          auto_mobility?: boolean
          auto_points: number
          auto_start_position: Database["public"]["Enums"]["autostartpositionsreefscape"]
          comments?: string
          created_at?: string
          disabled?: boolean
          driver_rating?: number
          driver_station?: Database["public"]["Enums"]["driverstation"]
          endgame_points?: number
          endgame_type?: Database["public"]["Enums"]["endgametypereefscape"]
          id?: number
          lost_comms?: boolean
          match_number?: number
          match_type?: Database["public"]["Enums"]["matchscouttype"]
          scout_name?: string
          team_number?: number
          tele_l1?: number
          tele_l2?: number
          tele_l3: number
          tele_l4?: number
          tele_made_net?: number
          tele_missed_coral?: number
          tele_missed_net?: number
          tele_points: number
          tele_processor?: number
          total_algae?: number
          total_coral?: number
          total_gamepieces?: number
          total_points?: number
        }
        Update: {
          auto_l1?: number
          auto_l2?: number
          auto_l3?: number
          auto_l4?: number
          auto_made_net?: number
          auto_made_processor?: number
          auto_missed_coral?: number
          auto_missed_net?: number
          auto_mobility?: boolean
          auto_points?: number
          auto_start_position?: Database["public"]["Enums"]["autostartpositionsreefscape"]
          comments?: string
          created_at?: string
          disabled?: boolean
          driver_rating?: number
          driver_station?: Database["public"]["Enums"]["driverstation"]
          endgame_points?: number
          endgame_type?: Database["public"]["Enums"]["endgametypereefscape"]
          id?: number
          lost_comms?: boolean
          match_number?: number
          match_type?: Database["public"]["Enums"]["matchscouttype"]
          scout_name?: string
          team_number?: number
          tele_l1?: number
          tele_l2?: number
          tele_l3?: number
          tele_l4?: number
          tele_made_net?: number
          tele_missed_coral?: number
          tele_missed_net?: number
          tele_points?: number
          tele_processor?: number
          total_algae?: number
          total_coral?: number
          total_gamepieces?: number
          total_points?: number
        }
        Relationships: []
      }
      "Pick List": {
        Row: {
          event_rank: number
          our_rank: number | null
          team_number: number
        }
        Insert: {
          event_rank?: number
          our_rank?: number | null
          team_number?: number
        }
        Update: {
          event_rank?: number
          our_rank?: number | null
          team_number?: number
        }
        Relationships: []
      }
      "Pit Scouting": {
        Row: {
          algae_description: string
          auto_description: string
          comments: string
          created_at: string
          driver_experience: string
          endgame_description: string
          id: number
          team_number: number
        }
        Insert: {
          algae_description: string
          auto_description: string
          comments: string
          created_at?: string
          driver_experience: string
          endgame_description: string
          id?: number
          team_number?: number
        }
        Update: {
          algae_description?: string
          auto_description?: string
          comments?: string
          created_at?: string
          driver_experience?: string
          endgame_description?: string
          id?: number
          team_number?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      autostartpositionsreefscape: "Far" | "Center" | "Processor"
      driverstation: "B1" | "B2" | "B3" | "R1" | "R2" | "R3"
      endgametypereefscape: "Nothing" | "Park" | "Shallow" | "Deep"
      matchscouttype: "match" | "pre" | "practice"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      autostartpositionsreefscape: ["Far", "Center", "Processor"],
      driverstation: ["B1", "B2", "B3", "R1", "R2", "R3"],
      endgametypereefscape: ["Nothing", "Park", "Shallow", "Deep"],
      matchscouttype: ["match", "pre", "practice"],
    },
  },
} as const
