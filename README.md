# 🌍 Lost and Found

Lost and Found is a scalable, location-based platform that helps people report, discover, and recover lost items securely through verification and real-time communication.

The system is designed as a full-stack application that can be used by individuals, campuses, offices, and communities anywhere.

---

# 🚀 Vision

To build a secure and centralized ecosystem where people can reconnect with their lost belongings quickly, safely, and efficiently.

---

# ❗ Problem Statement

Every day, people lose valuable items, but:

- There is no centralized reporting system
- Communication between finder and owner is unsafe
- Manual systems are inefficient
- No verification mechanism exists
- No smart matching between lost and found posts

Lost and Found solves these issues using authentication, location-based filtering, and real-time communication.

---

# ✨ Core Features

## 🔐 Authentication & Security
- Email / Phone authentication
- Secure login using Supabase Auth
- Role-based access control (User / Admin)
- Row Level Security (RLS)
- Secure session management

---

## 📍 Lost & Found Reporting

### Report Lost Item
- Title & description
- Category selection
- Location tagging (City / Area)
- Date & time selection
- Image upload
- Status tracking

### Report Found Item
- Image upload
- Description field
- Location tagging
- Admin moderation

---

## 🔎 Smart Search & Filtering
- Keyword search
- Category filter
- Location filter
- Sort by latest
- Status filtering

---

## 🤝 Secure Claim System
- Claim request submission
- Verification questions
- Owner approval workflow
- Status updates (Pending / Approved / Returned)

---

## 💬 Real-Time Communication
- In-app chat
- Realtime messaging
- Push notifications (FCM)
- Secure communication without sharing phone numbers

---

## 🛠 Admin Portal
- Approve / reject posts
- Manage users
- Moderate suspicious content
- View reports and analytics
- Restrict or ban users

---

# 🏗 System Architecture

Mobile App / Admin Portal  
        ↓  
Supabase Authentication  
        ↓  
PostgreSQL Database  
        ↓  
Storage (Images)  
        ↓  
Realtime Messaging  
        ↓  
Push Notifications  

---

# 🛠 Tech Stack

## 📱 Mobile App
- Flutter
- Dart

## 🖥 Admin Portal
- Flutter Web

## ☁ Backend
- Supabase
  - Authentication
  - PostgreSQL Database
  - Storage
  - Realtime
  - Row Level Security

## 🔔 Notifications
- Firebase Cloud Messaging (FCM)

---

# 📂 Project Structure

```
lost-and-found/
│
├── apps/
│   ├── mobile_app/
│   └── admin_portal/
│
├── backend/
│   └── supabase/
│
├── docs/
│
├── .env.example
└── README.md
```

---

# 🌳 Branching Strategy

We follow a simplified Git Flow model:

- `main` → Stable production-ready code
- `develop` → Active development branch
- `feature/*` → Feature development
- `hotfix/*` → Urgent fixes

All changes must go through Pull Requests before merging.

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/lost-and-found.git
cd lost-and-found
```

---

## 2️⃣ Setup Supabase

- Create a Supabase project
- Add your API URL and anon key to `.env`

Example:

```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

---

## 3️⃣ Run Mobile App

```
cd apps/mobile_app
flutter pub get
flutter run
```

---

## 4️⃣ Run Admin Portal

```
cd apps/admin_portal
flutter run -d chrome
```

---

# 🔐 Security Model

- Users can edit only their own posts
- Only admins can approve/reject posts
- Database protected using Row Level Security
- No direct privilege handling on client side

---

# 🔮 Future Improvements

- AI-based matching system
- GPS map integration
- QR code tagging
- Multi-language support
- Advanced moderation tools

---

# 👨‍💻 Team Project

Built as a scalable real-world full-stack application using modern development practices.
