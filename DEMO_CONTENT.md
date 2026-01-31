# Refactor Sprint Command Center - Demo Content Guide

## 🎯 COMPLETE DEMO SPRINT DATA

Use this content to test the full sprint workflow and generate a complete Gamma presentation.

---

## 📋 PANE 1: CLIENT VITALS

Copy and paste into the respective fields:

**Company Name:**
```
TechFlow Analytics
```

**Annual Revenue:**
```
$8.5M
```

**Burn Rate:**
```
$350K/mo
```

**Critical Error Hypothesis:**
```
Marketing is targeting enterprise but sales is closing mid-market. Website messaging and sales playbook are completely misaligned.
```

---

## 🎤 AGENT 1: THE LISTENER (Kickoff Call Transcript)

Paste this entire transcript into Agent 1:

```
CEO (Sarah): Our board wants us to prove we can land enterprise deals. We need $100k+ contracts to show we're ready for Series B.

Sales VP (Mike): I hear you, but the data doesn't support that strategy. Last quarter we closed 12 mid-market deals averaging $45k. We pitched 8 enterprise deals and closed zero.

CEO: That's exactly why we need to fix the sales process. Enterprise takes longer but the LTV is higher.

Sales VP: The problem isn't sales. It's positioning. When I tell prospects we're "built for Fortune 500 companies," mid-market buyers think we're too expensive. And when enterprise evaluates us, they say we look like a startup.

CMO (Jennifer): Mike's right. I ran the messaging by our last 5 wins. None of them resonated with "enterprise-grade" language. They bought because we "move fast and integrate easily."

CEO: But that's exactly what Series A companies say. We need to grow up.

Sales VP: Our win rate on deals under $60k is 52%. Above $100k it drops to 8%. We're burning pipeline chasing the wrong customer.

CFO (David): And our CAC is exploding. We spent $180k on enterprise-focused ads last quarter and got 3 qualified leads. That's $60k per lead.

CEO: Fine, but how do we get to $20M ARR selling to mid-market?

Sales VP: Volume. We should be closing 20+ deals per quarter at $40-50k. That's $800k-$1M per quarter.

CMO: And we stop wasting ad spend on "Fortune 500" keywords. Focus on "fast integration," "agile analytics," "mid-market BI."

CEO: Okay. I need proof this will work before I tell the board we're pivoting.
```

---

## 🕵️ AGENT 2: THE SPY (Competitor URLs)

Enter these three competitor URLs:

```
tableau.com
looker.com
mode.com
```

---

## 📊 AGENT 3: THE ANALYST (CSV Upload)

### Option 1: Copy this CSV content

Save as `demo-deals.csv` on your computer:

```csv
Status,Amount,Close Date,Lost Reason,Deal Size Category
Closed Won,45000,2024-01-10,,Mid-Market
Closed Lost,120000,2024-01-15,Too enterprise-focused,Enterprise
Closed Won,38000,2024-01-22,,Mid-Market
Closed Won,52000,2024-02-05,,Mid-Market
Closed Lost,150000,2024-02-12,Unclear ROI,Enterprise
Closed Won,41000,2024-02-18,,Mid-Market
Closed Lost,95000,2024-02-25,Pricing too high,Enterprise
Closed Won,47000,2024-03-03,,Mid-Market
Closed Won,35000,2024-03-10,,Mid-Market
Closed Lost,180000,2024-03-15,Feature gaps,Enterprise
Closed Won,49000,2024-03-22,,Mid-Market
Closed Won,44000,2024-03-28,,Mid-Market
Closed Lost,110000,2024-04-05,Sales cycle too long,Enterprise
Closed Won,51000,2024-04-12,,Mid-Market
Closed Won,39000,2024-04-19,,Mid-Market
Closed Lost,135000,2024-04-26,Competitor chosen,Enterprise
```

### Option 2: Simplified Version (if above has issues)

```csv
Status,Amount,Lost Reason
Closed Won,45000,
Closed Lost,120000,Too enterprise-focused
Closed Won,38000,
Closed Won,52000,
Closed Lost,150000,Unclear ROI
Closed Won,41000,
Closed Lost,95000,Pricing too high
Closed Won,47000,
```

---

## 📝 PANE 3: GROWTH THESIS

After running all 3 agents, paste this into the Growth Thesis editor:

```
THE STRATEGIC CONTRADICTION

TechFlow has a classic "identity crisis." Leadership wants to sell enterprise (to impress investors), but the company actually wins in mid-market (where the product-market fit lives).

THE DATA EVIDENCE

1. TRANSCRIPT ANALYSIS (Agent 1): CEO pushing enterprise strategy despite 8% win rate vs 52% mid-market win rate. Sales and CMO aligned on the problem but CEO focused on board optics.

2. COMPETITIVE INTEL (Agent 2): Major competitors (Tableau, Looker, Mode) all position as "enterprise-grade" with complex feature matrices. This creates a white space opportunity for "fast, agile analytics for growth-stage companies."

3. CRM FORENSICS (Agent 3): 12 mid-market wins ($45k avg) vs 0 enterprise wins last quarter. CAC on enterprise campaigns: $60k per lead. Mid-market deals close in 30-45 days; enterprise takes 120+ days.

THE ROOT CAUSE

Marketing is targeting the ASPIRATIONAL customer (enterprise) instead of the ACTUAL buyer (mid-market). This creates three breakdowns:

a) Website messaging repels actual buyers
b) Ad spend targets wrong keywords
c) Sales team has no playbook for the deals they actually close

THE STRATEGIC SHIFT

Position TechFlow as "The Analytics Platform for Companies That Move Fast." Target: $5M-$50M ARR companies that need BI without enterprise complexity. This aligns product capabilities with buyer psychology and sales reality.

REVENUE MATH

Current trajectory: 12 deals/quarter × $45k = $540k/quarter = $2.16M/year
Optimized trajectory: 25 deals/quarter × $45k = $1.125M/quarter = $4.5M/year (with same sales capacity)

Path to $20M: Scale to 6 AEs each closing 18 deals/year at $50k avg = $5.4M annually (breakeven at current burn rate), then add 4 more AEs to reach $9M by end of year.
```

---

## 🎯 PANE 3: MUST-FIX ROADMAP

Add these items one by one (type and press Enter after each):

```
1. Rewrite homepage hero to target mid-market (remove "Fortune 500" language)

2. Kill all "enterprise" keyword campaigns - reallocate $120k/quarter to "fast analytics" and "mid-market BI" keywords

3. Create mid-market sales playbook with 30-day close process

4. Build 5 case studies featuring $5M-$30M ARR customers

5. Revise pricing page to show clear $40-60k annual contract positioning

6. Train AE team on "speed to value" pitch vs feature-list pitch

7. Update demo environment to show "fast setup" workflow (not complex enterprise config)

8. Rebuild ICP definition in CRM to filter out $100M+ companies
```

---

## 🧪 COMPLETE TEST WORKFLOW

### Step 1: Fill Client Vitals (Pane 1)
- Copy all 4 fields from the Client Vitals section above

### Step 2: Upload CSV (Pane 1)
1. Create `demo-deals.csv` with the CSV content above
2. Upload via the Data Ingestion section
3. Confirm you see "✓ demo-deals.csv READY"

### Step 3: Run Agent 1 (Pane 2)
1. Paste the full transcript
2. Click "EXTRACT PAIN POINTS"
3. Wait ~5 seconds for AI analysis

### Step 4: Run Agent 2 (Pane 2)
1. Enter the 3 competitor URLs
2. Click "RUN INTEL SCAN"
3. Wait ~15-20 seconds (scraping 3 sites)

### Step 5: Run Agent 3 (Pane 2)
1. Select `demo-deals.csv` from dropdown
2. Click "RUN AUTOPSY"
3. Wait ~5 seconds for analysis

### Step 6: Add Growth Thesis (Pane 3)
- Paste the entire Growth Thesis section

### Step 7: Add Must-Fix Items (Pane 3)
- Add all 8 items to the roadmap

### Step 8: Export!
- **Click "GENERATE BLUEPRINT"** → Standard markdown export
- **Click "COPY GAMMA BLUEPRINT"** → Presentation-ready export for Gamma.app

---

## 🎨 GAMMA.APP INSTRUCTIONS

After copying the Gamma Blueprint:

1. Go to [gamma.app](https://gamma.app)
2. Click "Create new"
3. Select "Paste" or "Import"
4. Paste the copied markdown
5. Gamma will auto-generate 7 slides with:
   - Dark mode styling
   - Cyan/violet accent colors
   - Professional layout
   - Data visualizations

### Manual Additions in Gamma:
- Upload `refaclogo.png` to Slide 1 (title card)
- Add logo to footer of all slides
- Adjust any specific color values to match brand

---

## 📊 EXPECTED RESULTS

### Agent 1 Output:
```
STRATEGIC CONTRADICTIONS DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CEO Position:
• Focus on enterprise deals ($100k+)
• Prove market readiness for Series B
• Believes enterprise = higher LTV

Sales VP Position:
• 52% win rate on mid-market vs 8% on enterprise
• 12 mid-market wins vs 0 enterprise last quarter
• Positioning causes confusion in both segments

⚠ CRITICAL MISALIGNMENTS:
• CEO optimizing for investor optics vs Sales optimizing for revenue
• Marketing messaging ("Fortune 500") repels actual buyers
• $60k CAC on enterprise vs successful mid-market conversion

ROOT CAUSE HYPOTHESIS:
TechFlow is targeting aspirational customers (enterprise) instead of actual buyers (mid-market), creating messaging misalignment and wasted ad spend.

IMMEDIATE ACTION REQUIRED:
1. Realign positioning to mid-market ($5M-$50M ARR companies)
2. Kill enterprise-focused ad campaigns immediately
```

### Agent 2 Output:
```
COMPETITIVE INTELLIGENCE SCAN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Competitor 1: Tableau
  → Positioning: Enterprise BI platform
  → Price Point: $70-$150/user/month
  → Key Message: "Enterprise analytics for every team"
  → Target: Fortune 500, Large Enterprise

Competitor 2: Looker
  → Positioning: Modern data platform
  → Price Point: Custom enterprise pricing
  → Key Message: "Built for the modern data stack"
  → Target: Tech-forward enterprises

Competitor 3: Mode
  → Positioning: Analytics for data teams
  → Price Point: $200+/user/month
  → Key Message: "Purpose-built for analysts"
  → Target: Data-mature organizations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP ANALYSIS:
• All competitors emphasize enterprise/complexity
• None position for "fast setup" or "agile companies"
• White space: Mid-market companies that need BI without enterprise overhead

RECOMMENDATION:
Position as "Analytics for Companies That Move Fast" - targeting growth-stage companies frustrated by enterprise tool complexity.
```

### Agent 3 Output:
```
CRM AUTOPSY COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File Analyzed: demo-deals.csv

KEY METRICS:
┌────────────────────────────────────┐
│ Win Rate:           50.0%          │
│ Avg Deal Size:      $43,625        │
│ Total Deals:        16             │
│ Won Deals:          8              │
└────────────────────────────────────┘

STATUS BREAKDOWN:
  Closed Won: 8 (50.0%)
  Closed Lost: 8 (50.0%)

DEAL SIZE ANALYSIS:
  Mid-Market Average: $43,625
  Enterprise Average: $123,750
  Mid-Market Win Rate: 100%
  Enterprise Win Rate: 0%

CRITICAL FINDINGS:
⚠ ALL won deals are mid-market ($35k-$52k range)
⚠ ALL lost deals are enterprise attempts ($95k-$180k)
⚠ Lost reasons cite: enterprise positioning, pricing, unclear ROI

ROOT CAUSE HYPOTHESIS:
Product-market fit exists in mid-market segment, but marketing/positioning targets enterprise segment where there is no fit.

RECOMMENDATION:
Stop all enterprise pursuits immediately. Double down on mid-market with "fast ROI" and "quick setup" messaging. Win rate suggests 25+ deals/quarter is achievable.
```

---

## 💾 SAVE THIS DOCUMENT

Keep this file handy for:
- ✅ Demo presentations
- ✅ Testing new features
- ✅ Training team members
- ✅ Client walkthroughs
- ✅ Debugging sprint workflows

---

**Last Updated:** ${new Date().toLocaleDateString()}
**Version:** 1.0
**Command Center URL:** refactorsprint.com/app
