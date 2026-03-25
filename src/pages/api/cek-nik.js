// src/pages/api/cek-nik.js
import { createClient } from "@supabase/supabase-js";
import CryptoJS from "crypto-js";

export async function POST({ request }) {
  try {
    const body = await request.json();
    const nikInput = body.nik;

    if (!nikInput || nikInput.length !== 16) {
      return new Response(JSON.stringify({ status: "error", pesan: "NIK tidak valid" }), { status: 400 });
    }

    // 1. Panggil URL dan Kunci Master dari .env
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_KEY; // Kunci sakti penembus RLS
    const SECRET_KEY = import.meta.env.PUBLIC_SECRET_KEY;

    // 2. Bikin koneksi Supabase khusus Admin
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Tarik data (Pasti berhasil karena pakai akun Admin, RLS diabaikan)
    const { data: dbPenduduk, error } = await supabaseAdmin.from("data_penduduk").select("nik");

    if (error) throw error;

    let isWargaSah = false;

    // 4. Proses Dekripsi & Pencocokan NIK
    for (let p of dbPenduduk) {
      try {
        const bytes = CryptoJS.AES.decrypt(p.nik, SECRET_KEY);
        const decNik = bytes.toString(CryptoJS.enc.Utf8);
        if (decNik === nikInput) {
          isWargaSah = true;
          break;
        }
      } catch (err) {
        continue;
      }
    }

    // 5. Berikan Jawaban ke Browser Warga
    if (isWargaSah) {
      return new Response(JSON.stringify({ status: "sukses", pesan: "NIK Cocok" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ status: "gagal", pesan: "NIK tidak ditemukan di Buku Induk" }), { status: 404 });
    }
  } catch (error) {
    console.error("API Cek NIK Error:", error);
    return new Response(JSON.stringify({ status: "error", pesan: "Terjadi kesalahan sistem" }), { status: 500 });
  }
}
