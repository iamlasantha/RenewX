# 🚀 RenewX

RenewX is a modern, responsive subscription tracker. It helps users manage their recurring payments, visualize monthly spending, and receive smart reminders for upcoming renewals. 

Built with the modern **Next.js App Router**, **Supabase**, and optimized for production with highly secure multi-stage **Docker** containerization.

---

## ✨ Features

- **🔐 Authentication**: Secure Email/Password registration and login using Supabase Auth.
- **📊 Interactive Dashboard**: Visual summary of total monthly spend and an interactive category distribution pie chart.
- **🛠️ Full CRUD Management**: Easily add, edit, and delete scheduled subscriptions.
- **🛎️ Smart Reminders**: Built-in intelligent notification bell dropdown highlighting upcoming immediate renewals.
- **🌍 Dynamic Currency Preference**: Users can switch preferred currencies (e.g. USD, EUR, GBP, LKR) on-the-fly, persisting their preference across devices securely.
- **📱 Auto-Responsive Design**: Tailored UI scaling perfectly from ultra-wide desktops down to mobile phones via Tailwind CSS.

## 💻 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Auth API)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + Radix Primitives
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **DevOps**: Multi-stage **Docker** with minimal Alpine footprint and `standalone` output caching. Release Please GitHub Actions for Semantic Versioning.

---

## 🛠️ Getting Started (Local Node.js Development)

### 1. Requirements
Ensure you have **Node.js 20+** installed on your machine.

### 2. Configure Environment Variables
Copy the sample environment file to configure your Supabase connection.

```bash
cp .env.example .env.local
```
Then, populate `.env.local` with your exact Supabase project keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🐳 Docker Deployment (DevOps)

RenewX is thoroughly optimized for containerized environments. The deployment uses Next.js `standalone` mode, shrinking the production image size down dramatically (~150MB instead of 1.5GB) and running under a secure non-root `nextjs` user namespace.

### Build the Image
```bash
docker build -t renewx-app .
```

### Run the Container
You must pass your Supabase environment variables into the container at runtime.

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key \
  renewx-app
```
Then open [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Database Setup (Supabase)

If you are setting up the database yourself from scratch, run the following SQL inside your Supabase SQL Editor:

```sql
-- Create the Subscriptions Table
CREATE TABLE subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  category text not null,
  amount numeric not null,
  billing_cycle text not null,
  renewal_date date not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow users to manage exactly their own subscriptions
CREATE POLICY "Users can manage their own subscriptions" 
ON subscriptions FOR ALL USING (auth.uid() = user_id);
```

*(Note: User preferences like Currency are stored seamlessly inside Supabase's built in `auth.users` metadata JSONB field, requiring no schema changes).*

---

## 📄 License
This original software is provided under the [MIT License](LICENSE).
