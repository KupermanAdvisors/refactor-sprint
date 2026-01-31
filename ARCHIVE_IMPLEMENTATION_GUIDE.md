# Refactor Sprint Archive & Web Presentation - Implementation Guide

## 🎯 OVERVIEW

We're building:
1. **Archive System** - Store sprints in Supabase, list all past sprints, download as ZIP
2. **Web Presentations** - Temporary (30-day) password-protected presentation pages
3. **Auto-save** - Save sprint data when exporting blueprints

---

## 📋 STEP-BY-STEP IMPLEMENTATION

### ⚠️ PREREQUISITES

Before starting:
- [ ] You have Supabase project set up
- [ ] You have `OPENAI_API_KEY` in Vercel environment variables
- [ ] Command Center is working at `refactorsprint.com/app`

---

## PHASE 1: DATABASE SETUP (Supabase)

### Step 1: Create the Sprints Table

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy and paste this SQL:

```sql
-- Create sprints table
CREATE TABLE public.sprints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days') NOT NULL,
  
  -- Client info
  client_name TEXT NOT NULL,
  annual_revenue TEXT,
  burn_rate TEXT,
  hypothesis TEXT,
  
  -- Agent outputs
  agent_1_transcript TEXT,
  agent_1_output TEXT,
  agent_2_competitors JSONB,
  agent_2_output TEXT,
  agent_3_csv_filename TEXT,
  agent_3_csv_content TEXT,
  agent_3_output TEXT,
  
  -- Analysis
  growth_thesis TEXT,
  roadmap_items JSONB DEFAULT '[]'::jsonb,
  
  -- Uploaded files
  uploaded_files JSONB DEFAULT '[]'::jsonb,
  
  -- Presentation
  presentation_slug TEXT UNIQUE NOT NULL,
  presentation_password TEXT NOT NULL,
  
  -- Metadata
  status TEXT DEFAULT 'completed' CHECK (status IN ('draft', 'completed', 'archived')),
  
  -- Indexes for faster queries
  CONSTRAINT sprints_client_name_check CHECK (char_length(client_name) > 0)
);

-- Create indexes
CREATE INDEX sprints_client_name_idx ON public.sprints(client_name);
CREATE INDEX sprints_created_at_idx ON public.sprints(created_at DESC);
CREATE INDEX sprints_presentation_slug_idx ON public.sprints(presentation_slug);
CREATE INDEX sprints_expires_at_idx ON public.sprints(expires_at);

-- Enable Row Level Security
ALTER TABLE public.sprints ENABLE ROW LEVEL SECURITY;

-- Create policy (for now, allow all - we'll refine this later)
CREATE POLICY "Allow all access for now" ON public.sprints
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sprints_updated_at
  BEFORE UPDATE ON public.sprints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to clean up expired presentations
CREATE OR REPLACE FUNCTION delete_expired_sprints()
RETURNS void AS $$
BEGIN
  DELETE FROM public.sprints
  WHERE expires_at < NOW() AND status != 'archived';
END;
$$ LANGUAGE plpgsql;
```

6. Click **Run** (or press `Cmd+Enter`)
7. You should see: "Success. No rows returned"

---

### Step 2: Set Up Environment Variables

1. In your project, create/update `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI (already have this)
OPENAI_API_KEY=your_openai_key
```

2. Get your Supabase credentials:
   - Go to **Project Settings** → **API**
   - Copy **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy **service_role** key → paste as `SUPABASE_SERVICE_ROLE_KEY`

3. Add these to Vercel:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all 3 Supabase variables
   - Check all environments (Production, Preview, Development)

---

### Step 3: Install Supabase Client

Run in your terminal:

```bash
cd /Users/thor/refactor-sprint
npm install @supabase/supabase-js
```

---

## PHASE 2: CREATE API ROUTES

I'll create the following API routes for you:
1. `POST /api/sprints/save` - Save a sprint
2. `GET /api/sprints/list` - Get all sprints
3. `GET /api/sprints/[slug]` - Get a specific sprint by slug
4. `POST /api/sprints/download` - Generate ZIP download

Would you like me to create all these files now?

---

## PHASE 3: CREATE ARCHIVE PAGE

Create `/app/archive/page.tsx` with:
- Password protection (same as Command Center)
- List of all sprints
- Download ZIP button for each
- View presentation button for each

---

## PHASE 4: CREATE PRESENTATION PAGE

Create `/app/presentation/[slug]/page.tsx` with:
- Password check (client name + date)
- Slide-style layout
- All sprint content formatted beautifully
- Refactor Sprint branding

---

## PHASE 5: UPDATE COMMAND CENTER

1. Add "Archive" link to top nav
2. Add "Save Sprint" functionality to both export buttons
3. Add third button: "Generate Web Presentation"

---

## 📊 ARCHITECTURE OVERVIEW

```
Command Center (/app)
    ↓
    Save Sprint → Supabase (sprints table)
    ↓
    ├─→ Generate Blueprint (existing)
    ├─→ Generate Gamma Blueprint (existing)
    └─→ Generate Web Presentation (NEW)
         ↓
         Creates: /presentation/clientname-01312026
         Password: clientname01312026
         Expires: 30 days

Archive Page (/archive)
    ↓
    Lists all sprints from Supabase
    ↓
    ├─→ Download ZIP (all files)
    └─→ View Presentation (opens /presentation/[slug])
```

---

## ⚙️ IMPLEMENTATION ORDER

1. ✅ **Database Setup** (above)
2. ⏳ **Install dependencies**
3. ⏳ **Create Supabase client utilities**
4. ⏳ **Create API routes**
5. ⏳ **Build Archive page**
6. ⏳ **Build Presentation page**
7. ⏳ **Update Command Center**
8. ⏳ **Test everything**
9. ⏳ **Deploy**

---

## 🚨 IMPORTANT NOTES

### Security Considerations:
- Presentations expire after 30 days
- Password is required for each presentation
- RLS (Row Level Security) is enabled on sprints table
- Service role key is server-side only

### URL Slug Generation:
- Client name: lowercase, remove spaces and special characters
- Format: `clientname-mmddyyyy`
- Example: "Tech & Flow Analytics" → `techflowanalytics-01312026`

### Password Format:
- Client name (sanitized) + date (mmddyyyy)
- Example: `techflowanalytics01312026`

---

## 📝 NEXT STEPS

**Tell me when you've completed Step 1 (Database Setup) and I'll proceed with creating all the code files!**

The setup will take about 2-3 minutes. After that, I'll:
1. Create all API routes
2. Build the Archive page
3. Build the Presentation page
4. Update the Command Center
5. Deploy everything

Ready to continue? Just say "Database is set up" and I'll start building! 🚀
