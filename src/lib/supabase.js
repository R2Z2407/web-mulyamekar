// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SECRET_KEY = import.meta.env.PUBLIC_SECRET_KEY;

export const URL_CEK_NIK = import.meta.env.PUBLIC_URL_CEK_NIK;
export const URL_DOWNLOAD_ZIP = import.meta.env.PUBLIC_DOWNLOAD;
