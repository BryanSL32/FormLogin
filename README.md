# FormLogin — Authentication System (React Native & Expo)

Aplikasi autentikasi dua halaman (**Login** dan **Register**) yang dibangun menggunakan **React Native** dan **Expo** dengan validasi form *real-time*, *error handling* yang jelas, manajemen *keyboard* dengan `KeyboardAvoidingView`, serta *styling* responsif.

## Fitur Utama

### 1. Login Screen (`Welcome Back`)
- **Input Fields:** Email dan Password
- **Validasi Real-Time:**
  - Email wajib diisi dan harus sesuai format (`nama@domain.com`)
  - Password wajib diisi dan minimal **6 karakter**
- **Submit Button:**
  - Nonaktif (`disabled`) apabila ada input kosong atau masih mengandung error
  - Menampilkan teks `"Loading..."` saat proses login berlangsung
  - Menampilkan notifikasi `Alert` (`Login successful!`) saat berhasil
- **Navigasi:** Link `"Don't have an account? Sign Up"` menuju ke **Register Screen**

### 2. Register Screen (`Create Account`)
- **Input Fields:** Full Name, Email, Password, dan Confirm Password
- **Validasi Real-Time:**
  - **Full Name:** Minimal **3 karakter**, hanya huruf dan spasi (tanpa angka atau karakter spesial)
  - **Email:** Format email valid (`nama@domain.com`)
  - **Password:** Minimal **8 karakter**, mengandung minimal **1 huruf kapital** dan **1 angka**
  - **Confirm Password:** Harus sama persis dengan Password
- **Checkbox:** `"I agree with Terms & Conditions"` (wajib dicentang)
- **Submit Button:** Tombol Register dengan status *loading* (`"Loading..."`) dan `Alert` saat berhasil
- **Navigasi:** Link `"Already have an account? Login"` kembali ke **Login Screen**

### 3. UI/UX & Keyboard Management
- Menggunakan `KeyboardAvoidingView` dan `ScrollView` (`keyboardShouldPersistTaps="handled"`) agar form tetap nyaman diakses saat *keyboard* muncul di iOS maupun Android
- Indikator warna *border* input dinamis:
  - Normal: `#e0e0e0`
  - Fokus: `#00b894`
  - Error: `#f44336`
- Pesan error berwarna merah (`#f44336`) muncul tepat di bawah field terkait
- *State* form otomatis ter-reset saat berpindah antara Login dan Register

## Struktur Folder

```text
FormLogin/
├── screens/
│   ├── LoginScreen.js
│   └── RegisterScreen.js
├── utils/
│   └── validators.js
├── App.js
├── package.json
└── README.md
