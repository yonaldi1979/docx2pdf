# DOCX to PDF Converter - Flask Web App

Aplikasi web sederhana berbasis Flask untuk mengkonversi file **DOCX** menjadi **PDF** secara otomatis menggunakan **LibreOffice CLI**.

---

## 📦 Fitur

- Upload file DOCX melalui antarmuka web.
- Konversi otomatis ke PDF menggunakan **LibreOffice**.
- PDF hasil konversi langsung bisa diunduh.
- File disimpan sementara di folder **uploads**.

---

## 💻 Prasyarat

### 1. Python
Pastikan Python 3 sudah terinstal. Direkomendasikan Python 3.8 ke atas.

### 2. Instalasi Dependensi
Install paket-paket yang dibutuhkan:
```bash
pip install -r requirements.txt

sudo apt update
sudo apt install libreoffice

.
├── app.py                 # Main Flask app
├── templates/
│   └── index.html         # Form upload file
├── uploads/                # Tempat simpan file sementara
├── README.md               # Dokumentasi
└── requirements.txt        # (Opsional) File dependensi

python app.py

http://localhost:5000

📥 Cara Penggunaan
Akses halaman utama.
Upload file DOCX.
Klik Convert.
Tunggu beberapa detik hingga file PDF otomatis terunduh.

📌 Catatan
Hanya mendukung file dengan ekstensi .docx.
Konversi menggunakan LibreOffice, pastikan CLI soffice bisa diakses dari path.
Semua file yang diupload dan hasil konversi disimpan di folder uploads/.

📃 Lisensi
Proyek ini bersifat open-source, silakan dimodifikasi sesuai kebutuhan.
