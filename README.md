# Asif Istiaque — Cyber-Tech Portfolio

Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Firebase (Firestore + Storage) দিয়ে বানানো একটা ডার্ক, নিও-গ্রিন/অরেঞ্জ অ্যাকসেন্টের cyber-tech পোর্টফোলিও। প্রজেক্ট এবং সার্টিফিকেট ডায়নামিকভাবে Firestore থেকে লোড হয়, এবং ফুটারে লুকানো একটা Admin Dashboard আছে যেখান থেকে পাসকি দিয়ে লগইন করে নতুন প্রজেক্ট/সার্টিফিকেট আপলোড করা যায়।

---

## 📁 Project Structure (প্রজেক্ট স্ট্রাকচার)

```
portfolio/
├── .env.example              # Environment variables এর টেমপ্লেট
├── .gitignore
├── next.config.js            # Firebase Storage image domain config
├── tailwind.config.js        # কাস্টম কালার প্যালেট, glow shadows, animations
├── postcss.config.js
├── jsconfig.json             # @/ import alias
├── package.json
├── firestore.rules           # Firestore security rules
├── storage.rules             # Firebase Storage security rules
├── public/
│   └── manifest.json
└── src/
    ├── app/
    │   ├── layout.js         # Root layout + SEO metadata + fonts + Toaster
    │   ├── page.js           # Home page (সব সেকশন একত্রে)
    │   ├── globals.css       # Tailwind + cyber theme utility classes
    │   ├── robots.js         # Dynamic robots.txt
    │   └── sitemap.js        # Dynamic sitemap.xml
    ├── lib/
    │   ├── firebase.js       # Firebase client init (Firestore + Storage)
    │   └── firestoreActions.js # getProjects, addProject, getCertificates, addCertificate
    └── components/
        ├── ui/
        │   ├── CyberBackground.jsx   # গ্রিড + গ্লো ব্যাকগ্রাউন্ড
        │   ├── SectionHeading.jsx
        │   └── Modal.jsx
        ├── sections/
        │   ├── Navbar.jsx
        │   ├── Hero.jsx
        │   ├── About.jsx              # Stats strip
        │   ├── Projects.jsx           # Firestore থেকে প্রজেক্ট fetch
        │   ├── ProjectCard.jsx
        │   ├── Certificates.jsx       # Firestore থেকে সার্টিফিকেট + Education timeline
        │   ├── Contact.jsx            # ফর্ম সাবমিট → Firestore `messages` কালেকশন
        │   └── Footer.jsx             # লুকানো "admin" বাটন
        └── admin/
            ├── AdminGateway.jsx       # পাসকি modal
            ├── AdminDashboard.jsx     # Tab switcher
            ├── AddProjectForm.jsx     # ইমেজ আপলোড + Firestore write
            └── AddCertificateForm.jsx # Firestore write
```

---

## 🛠️ ধাপে ধাপে সেটআপ (Step-by-Step Setup in Bangla)

### ধাপ ১: প্রজেক্ট ফাইলগুলো রেডি করা

ডাউনলোড করা zip ফাইলটা extract করে একটা ফোল্ডারে রাখুন, তারপর টার্মিনাল/cmd সেই ফোল্ডারে নিয়ে যান:

```bash
cd portfolio
```

### ধাপ ২: ডিপেন্ডেন্সি ইনস্টল করা

```bash
npm install
```

এটা `firebase`, `framer-motion`, `lucide-react`, `react-hot-toast` সহ সব প্যাকেজ ইনস্টল করবে (এগুলো ইতিমধ্যে `package.json`-এ যোগ করা আছে)।

### ধাপ ৩: Firebase প্রজেক্ট তৈরি করা

1. [https://console.firebase.google.com](https://console.firebase.google.com) এ যান এবং **"Add project"** ক্লিক করুন।
2. প্রজেক্টের একটা নাম দিন (যেমন `asif-portfolio`), Google Analytics অপশনাল — চাইলে বাদ দিতে পারেন।
3. প্রজেক্ট তৈরি হলে বাম পাশের মেনু থেকে **Build > Firestore Database** এ যান → **Create database** → production mode সিলেক্ট করুন → একটা location (যেমন `asia-south1`) বেছে নিন।
4. একই মেনু থেকে **Build > Storage** এ যান → **Get started** → production mode → একই location।
5. **Project Settings (⚙️ আইকন) > General** ট্যাবে যান, নিচে scroll করে **"Your apps"** সেকশনে `</>` (Web) আইকনে ক্লিক করুন।
6. একটা nickname দিন (যেমন `portfolio-web`), **Register app** ক্লিক করুন।
7. এখন আপনি `firebaseConfig` অবজেক্ট দেখতে পাবেন — এই মান গুলো কপি করে রাখুন, পরের ধাপে দরকার হবে।

### ধাপ ৪: Environment Variables সেটআপ করা

প্রজেক্ট রুটে `.env.example` ফাইলটা কপি করে `.env.local` নাম দিন:

```bash
cp .env.example .env.local
```

এরপর `.env.local` ফাইলটা খুলে Firebase Console থেকে পাওয়া মানগুলো বসান:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=asif-portfolio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=asif-portfolio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=asif-portfolio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

NEXT_PUBLIC_ADMIN_PASSKEY=Asif@2766

NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

⚠️ **জরুরি:** `.env.local` ফাইলটা কখনো GitHub-এ পুশ করবেন না (`.gitignore`-এ এটা আগে থেকেই বাদ দেওয়া আছে)।

### ধাপ ৫: Firestore ও Storage Security Rules আপলোড করা

`firestore.rules` ফাইলের কন্টেন্ট কপি করে Firebase Console-এ **Firestore Database > Rules** ট্যাবে পেস্ট করুন এবং **Publish** করুন।

একইভাবে `storage.rules` ফাইলের কন্টেন্ট কপি করে **Storage > Rules** ট্যাবে পেস্ট করে **Publish** করুন।

> এই rules গুলো পাবলিক রিড + সীমিত/validated রাইট অ্যাক্সেস দেয়, যাতে ভিজিটররা ডেটা দেখতে পারে কিন্তু সহজে গার্বেজ ডেটা ঢোকাতে না পারে। আরও শক্তিশালী সিকিউরিটির জন্য rules ফাইলের ভেতরের কমেন্ট দেখুন — সেখানে Firebase Authentication দিয়ে আপগ্রেড করার গাইডলাইন আছে।

### ধাপ ৬: লোকালি প্রজেক্ট রান করা

```bash
npm run dev
```

ব্রাউজারে `http://localhost:3000` ওপেন করুন — পোর্টফোলিও সাইট দেখতে পাবেন।

### ধাপ ৭: Admin Dashboard ব্যবহার করা

1. সাইটের একদম নিচে (Footer) একটা ছোট্ট, হালকা **"admin"** বাটন আছে — সেখানে ক্লিক করুন।
2. পাসকি চাইবে — `.env.local`-এ যা সেট করেছেন তা লিখুন (ডিফল্ট: `Asif@2766`)।
3. সঠিক পাসকি দিলে Admin Dashboard খুলবে, যেখানে দুটো ট্যাব আছে:
   - **Add Project** — Title, Description, Tags, Live Link, GitHub Link, এবং ইমেজ আপলোড করে প্রজেক্ট পাবলিশ করুন (ইমেজ Firebase Storage-এ যাবে, বাকি ডেটা Firestore-এর `projects` কালেকশনে সেভ হবে)।
   - **Add Certificate** — Title, Issuer, Issue Date, Credential URL, এবং একটা ব্যাজ আইকন সিলেক্ট করে সাবমিট করুন (`certificates` কালেকশনে সেভ হবে)।
4. সাবমিট করার পর সাথে সাথে success/error toast দেখাবে, এবং হোমপেজের Projects/Certificates সেকশনে নতুন ডেটা রিফ্রেশ দিলে দেখা যাবে।

### ধাপ ৮: কনটেন্ট কাস্টমাইজ করা

- **নাম/হেডলাইন:** `src/components/sections/Hero.jsx`
- **Education timeline:** `src/components/sections/Certificates.jsx` ফাইলের `education` array
- **Social links:** `Hero.jsx` ও `Contact.jsx`-এর `socials` array
- **Resume PDF:** আপনার resume `public/resume.pdf` নামে রাখুন (Hero সেকশনের Download বাটন এটাই খোঁজে)
- **OG ইমেজ (SEO):** `public/og-image.png` (1200x630px) যোগ করুন
- **Favicon:** `public/favicon.ico` ও `public/apple-touch-icon.png` যোগ করুন

### ধাপ ৯: Production Build ও Deploy

লোকালি বিল্ড টেস্ট করতে:

```bash
npm run build
npm run start
```

**Vercel-এ ডিপ্লয় করার জন্য** (সবচেয়ে সহজ ও Next.js-এর অফিসিয়াল প্ল্যাটফর্ম):

1. কোডটা GitHub repo-তে পুশ করুন।
2. [vercel.com](https://vercel.com) এ গিয়ে GitHub repo Import করুন।
3. Environment Variables সেকশনে `.env.local`-এর সব ভ্যারিয়েবল যোগ করুন।
4. Deploy ক্লিক করুন — কয়েক মিনিটেই লাইভ হয়ে যাবে।

---

## 🎨 Design System

| Token | Value | ব্যবহার |
|---|---|---|
| Background | `#0F172A` | Deep slate base |
| Neon Green | `#22C55E` | Primary accent, CTA, glow |
| Neon Orange | `#F97316` | Secondary accent, hover states |
| Glassmorphism | `bg-white/[0.03] backdrop-blur-xl border-white/10` | কার্ড স্টাইল |

সব glow effects, glass cards, এবং animation utility classes `src/app/globals.css`-এর `@layer components` সেকশনে কাস্টম ক্লাস হিসেবে ডিফাইন করা আছে (`.glass-card`, `.btn-primary`, `.input-cyber`, ইত্যাদি) — এডিট করতে চাইলে ওখানেই পরিবর্তন করুন এবং পুরো সাইটে রিফ্লেক্ট হবে।

---

## 🔒 Security Note

Admin passkey (`NEXT_PUBLIC_ADMIN_PASSKEY`) শুধু **UI gate** — এটা Firebase Authentication না, তাই এই env variable ব্রাউজারে visible থাকে (যেকোনো `NEXT_PUBLIC_*` variable client-এ exposed হয়)। বাস্তব প্রোডাকশন সিকিউরিটি নির্ভর করে `firestore.rules` ও `storage.rules`-এর উপর, যেগুলো ইতিমধ্যে field-validation সহ রেস্ট্রিক্টেড করা আছে। আরও শক্তিশালী সিকিউরিটি দরকার হলে Firebase Authentication (Email/Password) যোগ করে rules-এ `request.auth.uid` চেক করার পরামর্শ দেওয়া হলো — rules ফাইলের কমেন্টে এই আপগ্রেড পাথের বিস্তারিত আছে।
