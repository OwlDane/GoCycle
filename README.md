# GoCycle

Platform edukasi dan showcase untuk produk daur ulang serta tutorial DIY ramah lingkungan. Menampilkan karya eco-makers Indonesia dengan storytelling yang menginspirasi dan impact metrics yang terukur.

## Deskripsi

GoCycle adalah platform showcase yang menghubungkan eco-makers dengan komunitas untuk berbagi inspirasi, tutorial, dan dampak positif dari daur ulang sampah. Platform ini fokus pada edukasi dan awareness, bukan transaksi komersial. Dilengkapi dengan sistem admin CMS yang aman untuk mengelola konten.

## Fitur Utama

### Untuk Pengguna
- **Showcase Produk**: Galeri produk daur ulang dengan cerita inspiratif di balik setiap karya
- **Tutorial DIY**: Panduan langkah demi langkah membuat produk dari sampah dengan tingkat kesulitan bervariasi
- **Statistik Dampak**: Metrik real-time dampak lingkungan (CO2 berkurang, sampah terselamatkan)
- **Simulasi Perjalanan Sampah**: Visualisasi interaktif lifecycle sampah (recycle vs dispose)
- **Profil Eco Makers**: Informasi lengkap pembuat karya dan studio mereka
- **Halaman Edukasi**: Konten edukatif tentang pengelolaan sampah dan daur ulang

### Untuk Admin
- **Dashboard Analytics**: Overview statistik platform dengan visualisasi data
- **Manajemen Produk**: CRUD produk showcase dengan upload gambar
- **Manajemen Tutorial**: CRUD tutorial DIY dengan step-by-step instructions
- **Manajemen Eco Makers**: CRUD profil maker dan studio
- **Statistik Dampak**: Monitor dan update impact metrics
- **Media Library**: Pengelolaan file media (coming soon)
- **Pengaturan**: Konfigurasi aplikasi dan preferensi sistem
- **Autentikasi Aman**: Login dengan JWT dan HTTP-only cookies

## Teknologi

### Backend
- **Runtime**: Node.js 18+ dengan TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase dengan Session Pooler)
- **ORM**: TypeORM
- **Cache**: Redis (opsional, non-blocking)
- **Authentication**: JWT dengan bcrypt
- **Architecture**: Clean Architecture Pattern
- **Logging**: Winston dengan daily rotate
- **Upload**: Multer + Sharp untuk image processing

### Frontend
- **Framework**: Next.js 15 dengan TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Custom components dengan Tabler Icons
- **Animation**: Framer Motion
- **State Management**: React Context API
- **HTTP Client**: Fetch API dengan credentials

## Instalasi dan Konfigurasi

### Prasyarat
- Node.js versi 18 atau lebih tinggi
- PostgreSQL atau akun Supabase
- Redis (opsional untuk caching)
- npm atau yarn

### Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Konfigurasi environment
cp .env.example .env
# Edit .env dengan kredensial database Anda

# Build TypeScript
npm run build

# Seed database dengan data dummy
npm run seed

# Generate password hash untuk admin (opsional)
npm run generate-password your-password

# Jalankan development server
npm run dev
```

Server backend berjalan di `http://localhost:5000`

#### Konfigurasi Environment Backend

File `.env` harus berisi:
```env
# Server
PORT=5000
NODE_ENV=development

# Database (Supabase)
DATABASE_URL=your-postgresql-connection-string
DB_SSL=false
TYPEORM_SYNC=true
TYPEORM_LOGGING=true

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000
CORS_ALLOW_CREDENTIALS=true

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=generated-hash
JWT_SECRET=your-secret-key-min-32-chars

# Redis (Optional)
REDIS_URL=redis://localhost:6379

# Upload
UPLOADS_BASE_URL=http://localhost:5000/uploads
```

### Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Konfigurasi environment
cp .env.example .env
# Edit .env dengan URL backend

# Jalankan development server
npm run dev
```

Server frontend berjalan di `http://localhost:3000`

```
gocycle/
├── backend/
│   ├── src/
│   │   ├── application/        # Business logic & services
│   │   │   ├── auth/           # Authentication services
│   │   │   ├── diy/            # DIY tutorial services
│   │   │   ├── impact/         # Impact metrics services
│   │   │   ├── journey/        # Waste journey services
│   │   │   ├── makers/         # Eco makers services
│   │   │   ├── product/        # Product services
│   │   │   └── showcase/       # Showcase services
│   │   ├── config/             # Configuration files
│   │   ├── domain/             # Domain entities & enums
│   │   ├── infrastructure/     # Database, Redis, Logging
│   │   ├── interfaces/         # HTTP controllers & routes
│   │   ├── middlewares/        # Express middlewares
│   │   └── app.ts              # Express app setup
│   ├── scripts/                # Utility scripts
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── (main)/            # Public pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── showcase/      # Product showcase
│   │   │   ├── edukasi/       # Education pages
│   │   │   ├── impakers/      # Eco makers profiles
│   │   │   └── tentang/       # About page
│   │   └── admin/             # Admin CMS
│   │       ├── login/         # Admin login
│   │       ├── products/      # Product management
│   │       ├── tutorials/     # Tutorial management
│   │       ├── makers/        # Maker management
│   │       ├── impact/        # Impact stats
│   │       ├── media/         # Media library
│   │       └── settings/      # Settings
│   ├── components/            # React components
│   ├── contexts/              # React contexts (Auth)
│   ├── lib/                   # Utilities & API client
│   └── package.json
│
└── README.md
```

## API Endpoints

### Public Endpoints
- `GET /api/showcase/products` - List produk showcase
- `GET /api/showcase/products/:id` - Detail produk
- `GET /api/showcase/featured` - Produk featured
- `GET /api/diy/tutorials` - List tutorial DIY
- `GET /api/diy/tutorials/:id` - Detail tutorial
- `POST /api/diy/tutorials/:id/complete` - Mark tutorial selesai
- `GET /api/impact/stats` - Statistik dampak lingkungan
- `POST /api/impact/increment` - Increment counter
- `POST /api/journey/simulate` - Simulasi perjalanan sampah
- `GET /api/makers` - List eco makers
- `GET /api/makers/:id` - Detail maker

### Auth Endpoints
- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout admin
- `GET /api/auth/verify` - Verify session

## Kategori dan Enumerasi

### Kategori Produk
`HOME_DECOR`, `FASHION`, `FURNITURE`, `ACCESSORIES`, `TOYS`, `STORAGE`, `GARDEN`, `LIGHTING`

### Jenis Sampah
`PLASTIC`, `GLASS`, `METAL`, `CARDBOARD`, `TEXTILE`, `ORGANIC`, `ELECTRONIC`

### Tingkat Kesulitan
`EASY`, `MEDIUM`, `HARD`

### Aksi Perjalanan Sampah
`RECYCLE`, `DISPOSE`

## Development

### Backend Commands
```bash
npm run dev          # Development server dengan hot reload
npm run build        # Build TypeScript ke JavaScript
npm run start        # Production server
npm run seed         # Seed database dengan data dummy
npm run generate-password  # Generate password hash
```

### Frontend Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Lint code
```

## Security Best Practices

1. **Ganti kredensial default** sebelum deployment
2. **Gunakan HTTPS** di production
3. **Set strong JWT_SECRET** minimal 32 karakter
4. **Enable rate limiting** untuk endpoint login
5. **Regular security updates** untuk dependencies
6. **Backup database** secara berkala
7. **Monitor logs** untuk aktivitas mencurigakan

## Kontribusi

Proyek ini dikembangkan untuk kompetisi dan edukasi. Kontribusi dan saran sangat diterima.

## Lisensi

Proyek ini dikembangkan untuk tujuan edukasi dan kompetisi.

---

Dibangun dengan fokus pada keberlanjutan dan edukasi lingkungan.
