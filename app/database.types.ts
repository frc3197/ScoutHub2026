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
  public: {
    Tables: {
      "Fetched Team Data": {
        Row: {
          ai_overview: string | null
          epa: number
          last_updated: string
          primary_hex: string | null
          robot_image: string | null
          secondary_hex: string | null
          team: number
          team_icon: string | null
          team_name: string
        }
        Insert: {
          ai_overview?: string | null
          epa?: number
          last_updated?: string
          primary_hex?: string | null
          robot_image?: string | null
          secondary_hex?: string | null
          team?: number
          team_icon?: string | null
          team_name?: string
        }
        Update: {
          ai_overview?: string | null
          epa?: number
          last_updated?: string
          primary_hex?: string | null
          robot_image?: string | null
          secondary_hex?: string | null
          team?: number
          team_icon?: string | null
          team_name?: string
        }
        Relationships: []
      }
      "Live Data": {
        Row: {
          auto_climb: boolean
          auto_climb_position:
            | Database["public"]["Enums"]["climbpositionsrebuilt"]
            | null
          auto_depot: boolean
          auto_fuel_taken_NZ: number
          auto_issues: string | null
          auto_outpost: boolean
          auto_sos: number
          auto_start_position: Database["public"]["Enums"]["autostartpositionsrebuilt"]
          climb_type: Database["public"]["Enums"]["endgametyperebuilt"]
          comments: string
          created_at: string
          defend_AZ: boolean | null
          defend_bump_trench: boolean | null
          defend_NZ: boolean | null
          defense_strength: number | null
          disabled: boolean
          driver_rating: number
          driver_station: Database["public"]["Enums"]["driverstation"]
          endgame_points: number
          how_defendable: number | null
          id: string
          incurred_penalties: boolean | null
          lost_comms: boolean
          match_number: number
          match_type: Database["public"]["Enums"]["matchscouttype"]
          played_defense: boolean
          scout_name: string
          shot_locations: Database["public"]["Enums"]["shotlocationsrebuilt"]
          strategies: string
          team_number: number
          tele_fuel_dozed: number
          tele_fuel_impacted: number
          tele_fuel_passed: number
          tele_fuel_scored: number
          tele_points: number
          throughput_speed: number
          tioi_rating: number
        }
        Insert: {
          auto_climb: boolean
          auto_climb_position?:
            | Database["public"]["Enums"]["climbpositionsrebuilt"]
            | null
          auto_depot?: boolean
          auto_fuel_taken_NZ?: number
          auto_issues?: string | null
          auto_outpost?: boolean
          auto_sos: number
          auto_start_position: Database["public"]["Enums"]["autostartpositionsrebuilt"]
          climb_type?: Database["public"]["Enums"]["endgametyperebuilt"]
          comments?: string
          created_at?: string
          defend_AZ?: boolean | null
          defend_bump_trench?: boolean | null
          defend_NZ?: boolean | null
          defense_strength?: number | null
          disabled?: boolean
          driver_rating?: number
          driver_station?: Database["public"]["Enums"]["driverstation"]
          endgame_points?: number
          how_defendable?: number | null
          id: string
          incurred_penalties?: boolean | null
          lost_comms?: boolean
          match_number?: number
          match_type?: Database["public"]["Enums"]["matchscouttype"]
          played_defense: boolean
          scout_name?: string
          shot_locations?: Database["public"]["Enums"]["shotlocationsrebuilt"]
          strategies: string
          team_number?: number
          tele_fuel_dozed?: number
          tele_fuel_impacted: number
          tele_fuel_passed?: number
          tele_fuel_scored: number
          tele_points: number
          throughput_speed: number
          tioi_rating: number
        }
        Update: {
          auto_climb?: boolean
          auto_climb_position?:
            | Database["public"]["Enums"]["climbpositionsrebuilt"]
            | null
          auto_depot?: boolean
          auto_fuel_taken_NZ?: number
          auto_issues?: string | null
          auto_outpost?: boolean
          auto_sos?: number
          auto_start_position?: Database["public"]["Enums"]["autostartpositionsrebuilt"]
          climb_type?: Database["public"]["Enums"]["endgametyperebuilt"]
          comments?: string
          created_at?: string
          defend_AZ?: boolean | null
          defend_bump_trench?: boolean | null
          defend_NZ?: boolean | null
          defense_strength?: number | null
          disabled?: boolean
          driver_rating?: number
          driver_station?: Database["public"]["Enums"]["driverstation"]
          endgame_points?: number
          how_defendable?: number | null
          id?: string
          incurred_penalties?: boolean | null
          lost_comms?: boolean
          match_number?: number
          match_type?: Database["public"]["Enums"]["matchscouttype"]
          played_defense?: boolean
          scout_name?: string
          shot_locations?: Database["public"]["Enums"]["shotlocationsrebuilt"]
          strategies?: string
          team_number?: number
          tele_fuel_dozed?: number
          tele_fuel_impacted?: number
          tele_fuel_passed?: number
          tele_fuel_scored?: number
          tele_points?: number
          throughput_speed?: number
          tioi_rating?: number
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
          auto_description: string
          bump: boolean
          climb_type: Database["public"]["Enums"]["climber_type_rebuilt"]
          comments: string
          created_at: string
          driver_experience: string
          hopper_size: number
          id: number
          shooter_type: Database["public"]["Enums"]["shooter_type_rebuilt"]
          team_number: number
          trench: boolean
        }
        Insert: {
          auto_description: string
          bump: boolean
          climb_type: Database["public"]["Enums"]["climber_type_rebuilt"]
          comments: string
          created_at?: string
          driver_experience: string
          hopper_size?: number
          id?: number
          shooter_type: Database["public"]["Enums"]["shooter_type_rebuilt"]
          team_number?: number
          trench: boolean
        }
        Update: {
          auto_description?: string
          bump?: boolean
          climb_type?: Database["public"]["Enums"]["climber_type_rebuilt"]
          comments?: string
          created_at?: string
          driver_experience?: string
          hopper_size?: number
          id?: number
          shooter_type?: Database["public"]["Enums"]["shooter_type_rebuilt"]
          team_number?: number
          trench?: boolean
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
      autostartpositionsrebuilt:
        | "center-hub"
        | "outpost-bump"
        | "depot-bump"
        | "outpost-trench"
        | "depot-trench"
      autostartpositionsreefscape: "Far" | "Center" | "Processor"
      climber_type_rebuilt: "No Climber" | "L1" | "L2" | "L3"
      climbpositionsrebuilt: "center" | "outpost" | "depot"
      driverstation: "B1" | "B2" | "B3" | "R1" | "R2" | "R3"
      endgametyperebuilt: "L3" | "L2" | "L1" | "None" | "Failed"
      endgametypereefscape: "Nothing" | "Park" | "Shallow" | "Deep"
      matchscouttype: "match" | "pre" | "practice"
      shooter_type_rebuilt:
        | "None"
        | "Turret/s"
        | "Fixed Single"
        | "Fixed Double"
        | "Fixed 3+"
      shotlocationsrebuilt:
        | "hub-close"
        | "anywhere"
        | "known-medium"
        | "cannot-shoot"
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
    Enums: {
      autostartpositionsrebuilt: [
        "center-hub",
        "outpost-bump",
        "depot-bump",
        "outpost-trench",
        "depot-trench",
      ],
      autostartpositionsreefscape: ["Far", "Center", "Processor"],
      climber_type_rebuilt: ["No Climber", "L1", "L2", "L3"],
      climbpositionsrebuilt: ["center", "outpost", "depot"],
      driverstation: ["B1", "B2", "B3", "R1", "R2", "R3"],
      endgametyperebuilt: ["L3", "L2", "L1", "None", "Failed"],
      endgametypereefscape: ["Nothing", "Park", "Shallow", "Deep"],
      matchscouttype: ["match", "pre", "practice"],
      shooter_type_rebuilt: [
        "None",
        "Turret/s",
        "Fixed Single",
        "Fixed Double",
        "Fixed 3+",
      ],
      shotlocationsrebuilt: [
        "hub-close",
        "anywhere",
        "known-medium",
        "cannot-shoot",
      ],
    },
  },
} as const
