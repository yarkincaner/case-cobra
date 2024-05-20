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
      BillingAddress: {
        Row: {
          city: string
          country: string
          created_at: string
          id: number
          name: string
          phoneNumber: string | null
          postalCode: string
          state: string | null
          street: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          id?: number
          name: string
          phoneNumber?: string | null
          postalCode: string
          state?: string | null
          street: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: number
          name?: string
          phoneNumber?: string | null
          postalCode?: string
          state?: string | null
          street?: string
        }
        Relationships: []
      }
      configuration: {
        Row: {
          color: Database["public"]["Enums"]["CaseColor"] | null
          created_at: string
          croppedImageUrl: string | null
          finish: Database["public"]["Enums"]["CaseFinish"] | null
          height: number
          id: number
          imageUrl: string
          material: Database["public"]["Enums"]["CaseMaterial"] | null
          model: Database["public"]["Enums"]["PhoneModel"] | null
          width: number
        }
        Insert: {
          color?: Database["public"]["Enums"]["CaseColor"] | null
          created_at?: string
          croppedImageUrl?: string | null
          finish?: Database["public"]["Enums"]["CaseFinish"] | null
          height: number
          id?: number
          imageUrl: string
          material?: Database["public"]["Enums"]["CaseMaterial"] | null
          model?: Database["public"]["Enums"]["PhoneModel"] | null
          width: number
        }
        Update: {
          color?: Database["public"]["Enums"]["CaseColor"] | null
          created_at?: string
          croppedImageUrl?: string | null
          finish?: Database["public"]["Enums"]["CaseFinish"] | null
          height?: number
          id?: number
          imageUrl?: string
          material?: Database["public"]["Enums"]["CaseMaterial"] | null
          model?: Database["public"]["Enums"]["PhoneModel"] | null
          width?: number
        }
        Relationships: []
      }
      Order: {
        Row: {
          amount: number
          billingAddress: number | null
          configuration: number
          created_at: string
          id: number
          isPaid: boolean
          shippingAddress: number | null
          status: Database["public"]["Enums"]["OrderStatus"]
          user: string
        }
        Insert: {
          amount: number
          billingAddress?: number | null
          configuration: number
          created_at?: string
          id?: number
          isPaid?: boolean
          shippingAddress?: number | null
          status?: Database["public"]["Enums"]["OrderStatus"]
          user: string
        }
        Update: {
          amount?: number
          billingAddress?: number | null
          configuration?: number
          created_at?: string
          id?: number
          isPaid?: boolean
          shippingAddress?: number | null
          status?: Database["public"]["Enums"]["OrderStatus"]
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_billingAddress_fkey"
            columns: ["billingAddress"]
            isOneToOne: false
            referencedRelation: "BillingAddress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_configuration_fkey"
            columns: ["configuration"]
            isOneToOne: false
            referencedRelation: "configuration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_shippingAddress_fkey"
            columns: ["shippingAddress"]
            isOneToOne: false
            referencedRelation: "ShippingAddress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ShippingAddress: {
        Row: {
          city: string
          country: string
          created_at: string
          id: number
          name: string
          phoneNumber: string | null
          postalCode: string
          state: string | null
          street: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          id?: number
          name: string
          phoneNumber?: string | null
          postalCode: string
          state?: string | null
          street: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: number
          name?: string
          phoneNumber?: string | null
          postalCode?: string
          state?: string | null
          street?: string
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
      CaseColor: "black" | "blue" | "rose"
      CaseFinish: "smooth" | "textured"
      CaseMaterial: "silicone" | "polycarbonate"
      OrderStatus: "fulfilled" | "shipped" | "awaiting_shipment"
      PhoneModel:
        | "iphonex"
        | "iphone11"
        | "iphone12"
        | "iphone13"
        | "iphone14"
        | "iphone15"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
