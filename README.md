# Flask Dashboard - Sistem Manajemen Pelanggan & Produk

Aplikasi dashboard berbasis web yang dibangun dengan Flask dan MySQL untuk mengelola pelanggan, produk, pengguna, dan transaksi.

## Fitur

- **Manajemen Pelanggan**: Operasi CRUD lengkap untuk data pelanggan
- **Manajemen Produk**: Menambah, melihat, memperbarui, dan menghapus informasi produk
- **Manajemen Pengguna**: Mengelola pengguna sistem dengan fungsionalitas CRUD lengkap
- **Sistem Transaksi**: Memproses dan mencatat transaksi pelanggan
- **interface Dashboard**: interface web yang bersih dan intuitif untuk manajemen data

## Stack Teknologi

- **Backend**: Python Flask
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript (Vanilla)

## Prasyarat

Sebelum menjalankan Web ini, pastikan Anda telah menginstal:

- Python 3.8 atau lebih
- MySQL Server
- pip (pengelola paket Python)

## Instalasi

1. **Clone repositori**
   ```bash
   git clone https://github.com/K4ZED/WAOWS6_Ken_Day1.git
   cd WAOWS6_Ken_Day1
   ```

2. **Buat virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Di Windows: venv\Scripts\activate
   ```

3. **Install dependensi**
   ```bash
   pip install -r requirements.txt
   ```

4. **Konfigurasi database**
   
   Buat file `.env` di direktori root dan tambahkan konfigurasi database Anda:
   ```env
   MYSQL_HOST=localhost
   MYSQL_USER=username_anda
   MYSQL_PASSWORD=password_anda
   MYSQL_DB=nama_database_anda
   SECRET_KEY=kunci_rahasia_anda
   ```

5. **Inisialisasi tabel database**
   ```bash
   python init_db.py  # Atau jalankan skrip migrasi database Anda
   ```

## Menjalankan Web

1. **Jalankan server development Flask**
   ```bash
   python app.py
   # atau
   flask run
   ```

2. **Akses Web**
   
   Buka browser Anda dan navigasi ke:
   ```
   http://localhost:5000
   ```

## Struktur Proyek

```
project-root/
│
├── __pycache__/          # File cache Python
├── venv/                 # Virtual environment
│
├── config/              # File konfigurasi
│   ├── __init__.py
│   └── db.py            # Konfigurasi database
│
├── static/              # File statis
│   ├── css/
│   │   └── style.css    # Stylesheet utama
│   └── js/              # File JavaScript
│       ├── auth.js
│       ├── customers.js
│       ├── home.js
│       ├── products.js
│       ├── transactions.js
│       └── users.js
│
├── templates/           # Template HTML
│   ├── admin_login.html
│   ├── base.html        # Template dasar
│   ├── customers.html
│   ├── index.html       # Beranda/Dashboard
│   ├── login.html
│   ├── products.html
│   ├── register.html
│   ├── transactions.html
│   └── users.html
│
├── .env                # Variabel environment
├── .gitignore          # File Git ignore
├── app.py              # File Web utama
├── README.md           # File ini
└── requirements.txt    # Dependensi Python
```

## Skema Database

### Tabel Users
- `UserId` (Primary Key, INT)
- `Email` (VARCHAR(255), NN)
- `Password` (VARCHAR(255), NN - ter-hash)
- `Roles` (VARCHAR - untuk manajemen role: admin/user)
- `IsActive` (BOOLEAN, NN)
- `created_at` (DATETIME)

### Tabel mall_customer
- `CustomerID` (Primary Key, INT)
- `UserId` (Foreign Key → users.UserId, INT)
- `Gender` (VARCHAR(10), NN)
- `Age` (INT, NN)
- `Annual_Income` (INT, NN)
- `Spending_Score` (INT, NN)
- `created_at` (DATETIME)

### Tabel products
- `ProductID` (Primary Key, INT)
- `CategoryID` (Foreign Key → product_categories.CategoryID, INT, NN)
- `Name` (VARCHAR(100), NN)
- `Price` (DECIMAL(10,2), NN)
- `Stock` (INT, NN)
- `created_at` (DATETIME)

### Tabel product_categories
- `CategoryID` (Primary Key, INT)
- `Name` (VARCHAR(100), NN)
- `Description` (TEXT)

### Tabel transactions
- `TransactionID` (Primary Key, INT)
- `CustomerID` (Foreign Key → mall_customer.CustomerID, INT, NN)
- `TransactionDate` (DATETIME)
- `TotalAmount` (DECIMAL(12,2), NN)
- `PaymentMethod` (VARCHAR(50))

### Tabel transaction_details
- `DetailID` (Primary Key, INT)
- `TransactionID` (Foreign Key → transactions.TransactionID, INT, NN)
- `ProductID` (Foreign Key → products.ProductID, INT, NN)
- `Quantity` (INT, NN)
- `UnitPrice` (DECIMAL(10,2), NN)
- `Subtotal` (DECIMAL(12,2), NN)

## Relasi Entitas

- Satu **User** dapat memiliki satu profil **Customer** (1:1)
- Satu **Customer** dapat memiliki banyak **Transactions** (1:N)
- Satu **Transaction** dapat memiliki banyak **Transaction Details** (1:N)
- Satu **Product** dapat muncul di banyak **Transaction Details** (1:N)
- Satu **Category** dapat memiliki banyak **Products** (1:N)

## API Endpoints

### Autentikasi
- `GET /` - Halaman beranda/dashboard
- `GET /login` - Halaman login
- `POST /login` - Proses login
- `GET /register` - Halaman registrasi
- `POST /register` - Proses registrasi
- `GET /admin_login` - Halaman login admin
- `GET /logout` - Logout

### Pelanggan
- `GET /customers` - Lihat semua pelanggan
- `POST /customers` - Buat pelanggan baru
- `PUT /customers/<id>` - Perbarui pelanggan
- `DELETE /customers/<id>` - Hapus pelanggan

### Produk
- `GET /products` - Lihat semua produk
- `POST /products` - Buat produk baru
- `PUT /products/<id>` - Perbarui produk
- `DELETE /products/<id>` - Hapus produk

### Transaksi
- `GET /transactions` - Lihat semua transaksi
- `POST /transactions` - Buat transaksi baru
- `GET /transactions/<id>` - Dapatkan detail transaksi

### Pengguna (Tersembunyi - Akses URL Langsung)
- `GET /user` - Lihat semua pengguna (interface CRUD)
- `POST /user` - Buat pengguna baru
- `PUT /user/<id>` - Perbarui pengguna
- `DELETE /user/<id>` - Hapus pengguna

## Penggunaan

1. **Login** ke dashboard dengan kredensial pengguna Anda
2. **Navigasi** melalui menu navbar untuk mengakses berbagai bagian:
   - **Home** - Ikhtisar dashboard
   - **Customers** - Kelola data pelanggan
   - **Products** - Kelola katalog produk
   - **Transactions** - Proses dan lihat transaksi
   - **{user_mail}** - Menampilkan pengguna yang sedang login
   - **Logout** - Keluar dari sistem

### Mengakses Manajemen Pengguna (Khusus Admin)

Manajemen Pengguna tidak terlihat di navbar karena alasan keamanan. Untuk mengakses interface CRUD Pengguna:

- **URL**: `http://127.0.0.1:5000/user`
- Halaman ini memungkinkan pengguna admin untuk mengelola pengguna sistem (Create, Read, Update, Delete)
- Diperlukan akses URL langsung - tidak ditautkan di navigasi utama

3. **Kelola Data** menggunakan operasi CRUD yang tersedia di setiap bagian
4. **Buat Transaksi** dengan memilih pelanggan dan produk, lalu memasukkan kuantitas dan detail pembayaran

## Kontribusi

1. Fork repositori
2. Buat branch fitur Anda (`git checkout -b feature`)
3. Commit perubahan Anda (`git commit -m 'feature'`)
4. Push ke branch (`git push origin feature`)
5. Buat Pull Request

## Kontak

Kenza Athallah Nandana Wijaya - kenzaathallah.wijaya@gmail.com

Link Proyek: [https://github.com/K4ZED/WAOWS6_Ken_Day1.git](https://github.com/K4ZED/WAOWS6_Ken_Day1.git)

## Terima Kasih

- Dokumentasi Flask
- Dokumentasi MySQL