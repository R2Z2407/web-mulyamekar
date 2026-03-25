// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🔥 Ekspor Secret Key untuk Enkripsi Dukcapil
export const SECRET_KEY = import.meta.env.PUBLIC_SECRET_KEY;
