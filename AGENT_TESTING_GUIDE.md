# Agent 2 & 3 Integration - Testing Guide

## ✅ What's Been Deployed

Both **Agent 2 (The Spy)** and **Agent 3 (The Analyst)** are now LIVE with full OpenAI integration!

---

## 🕵️ AGENT 2: THE SPY (Competitor Intelligence)

### How It Works:
1. Takes 1-3 competitor URLs
2. **Scrapes each website** using Axios + Cheerio
3. Extracts:
   - Page title
   - Main headline (H1)
   - Meta description
   - Key content (first 5 paragraphs)
   - Pricing indicators (any text with "$")
4. Sends scraped data to **OpenAI GPT-4o**
5. AI analyzes positioning, pricing, target market, and identifies gaps

### Test It:
**Example Competitor URLs to Try:**
```
hubspot.com
salesforce.com
pipedrive.com
```

**What You'll Get:**
- Positioning summary for each competitor
- Price point analysis
- Key messaging extracted
- Target customer (SMB vs Enterprise)
- Gap analysis (what they're missing)
- Strategic recommendation

### Potential Issues:
- **Blocked by bot detection:** Some sites (like Cloudflare-protected ones) may block scraping
  - Solution: The API gracefully handles errors and reports which sites failed
- **Timeout:** If a site is slow, it has a 10-second timeout
- **No pricing visible:** Some sites don't show pricing on homepage
  - AI will note "Not disclosed"

---

## 📊 AGENT 3: THE ANALYST (CRM Forensics)

### How It Works:
1. Reads uploaded CSV file content from browser
2. **Parses CSV** using PapaParse library
3. Performs statistical analysis:
   - Win rate calculation
   - Deal size metrics (avg, min, max)
   - Status breakdown
   - Sample lost reasons
4. Sends sample data + stats to **OpenAI GPT-4o**
5. AI provides forensic insights and recommendations

### Test It:

#### Step 1: Create a Sample CRM CSV
Create a file called `deals.csv` with this content:

```csv
Deal Name,Status,Amount,Close Date,Lost Reason
Acme Corp,Closed Won,50000,2024-01-15,
Big Co,Closed Lost,75000,2024-01-20,Pricing too high
StartupXYZ,Closed Won,15000,2024-02-01,
MegaCorp,Closed Lost,120000,2024-02-10,Unclear value proposition
SmallBiz,Closed Won,8000,2024-02-15,
TechCo,Closed Lost,95000,2024-03-01,Competitor chosen
GrowthCo,Closed Won,42000,2024-03-10,
ScaleCo,Closed Lost,60000,2024-03-15,Feature gap
InnovateCorp,Closed Won,30000,2024-04-01,
EnterpriseCo,Closed Lost,200000,2024-04-10,Pricing too high
```

#### Step 2: Upload and Analyze
1. Upload the `deals.csv` file in Pane 1
2. Go to Agent 3 in Pane 2
3. Select "deals.csv" from dropdown
4. Click "RUN AUTOPSY"

### What You'll Get:
- CSV structure analysis (rows, columns)
- Status breakdown (won vs lost)
- Win rate percentage
- Average deal size
- Sample lost reasons
- AI-identified patterns (e.g., "pricing objections correlate with larger deals")
- Strategic recommendations

### CSV Format Requirements:
The agent is smart and looks for common column names:
- **Status/Stage/Outcome** → Calculates win rate
- **Amount/Value/Revenue/Price** → Calculates deal size
- **Date/Created/Closed** → Time-based analysis (future enhancement)
- **Reason/Lost/Note** → Extracts lost reasons

**It's flexible** - column names don't have to be exact matches!

---

## 🧪 FULL END-TO-END TEST SCENARIO

### "The Complete Sprint Simulation"

**Step 1: Set Client Vitals**
```
Company Name: TechStartup Inc
Annual Revenue: $5M
Burn Rate: $200K/mo
Hypothesis: Marketing and Sales aren't aligned on target customer
```

**Step 2: Upload CRM Data**
- Upload the `deals.csv` file above

**Step 3: Run Agent 1 (Transcript Analysis)**
Paste this sample transcript:
```
CEO: We need to focus on enterprise. That's where the big deals are.

Sales VP: I disagree. Our best wins are mid-market companies. We close those in 30 days. Enterprise deals take 6 months and we're losing 80% of them.

CEO: But enterprise is where we get $100k+ deals.

Sales VP: We closed 10 mid-market deals at $40k each last quarter. That's $400k. We closed ONE enterprise deal at $150k and lost 4 others.

CMO: The website messaging is all enterprise-focused though. "Built for Fortune 500 companies." That's pushing away mid-market buyers.

CEO: Well, we need to scale. Enterprise is the only way.

Sales VP: We can't scale if we're targeting the wrong customer.
```

**Step 4: Run Agent 2 (Competitor Intel)**
Use these URLs:
```
monday.com
asana.com
clickup.com
```

**Step 5: Run Agent 3 (CRM Forensics)**
- Select `deals.csv`
- Click "RUN AUTOPSY"

**Step 6: Synthesize in Pane 3**
The Growth Thesis should emerge from the agent outputs:
- Agent 1 shows CEO/Sales misalignment
- Agent 2 shows competitor positioning gaps
- Agent 3 confirms mid-market deals actually convert better

**Step 7: Build Must-Fix Roadmap**
Add items like:
```
1. Fix messaging to reflect mid-market target (not enterprise)
2. Retrain sales team on mid-market playbook
3. Audit pricing page - remove enterprise positioning
4. Create mid-market case studies
```

**Step 8: Export Blueprint**
Click "GENERATE BLUEPRINT" and the full markdown report copies to clipboard!

---

## ⚠️ COMMON ISSUES & SOLUTIONS

### Issue 1: "Failed to scrape" error for competitor
**Cause:** Site has bot protection (Cloudflare, etc.)
**Solution:** 
- Try the site's subdomain (e.g., `about.competitor.com`)
- Or manually paste their homepage text into Agent 1 as additional context

### Issue 2: CSV parsing fails
**Cause:** CSV has weird formatting or encoding
**Solution:**
- Open in Excel/Google Sheets
- Export as clean CSV with UTF-8 encoding
- Ensure headers are in first row

### Issue 3: OpenAI API timeout
**Cause:** Slow AI response (rare)
**Solution:**
- Wait 30 seconds and try again
- Check Vercel logs for actual error

### Issue 4: Agent outputs are too generic
**Cause:** Insufficient data in inputs
**Solution:**
- Provide longer transcripts
- Add more CSV rows (at least 10+)
- Use real competitor URLs (not examples)

---

## 📈 PERFORMANCE NOTES

- **Agent 1:** ~3-5 seconds (OpenAI API)
- **Agent 2:** ~10-20 seconds (scraping 3 sites + AI analysis)
- **Agent 3:** ~4-6 seconds (CSV parsing + AI analysis)

All processing happens server-side (Vercel Edge Functions), so large CSVs won't slow down the browser!

---

## 🚀 WHAT'S NEXT?

### Phase 2 Enhancements:
1. **Save Sprint Sessions** - Store data in database
2. **Multi-user Support** - Client login portal
3. **Agent 4: Ad Spend Auditor** - Connect to Google/Meta APIs
4. **Agent 5: SEO Analyzer** - Keyword gap analysis
5. **Automated Report Generation** - PDF export with charts
6. **Slack/Email Notifications** - When agents complete
7. **Calendar Integration** - Track 72-hour deadline

---

## 🎯 SUCCESS CRITERIA

You'll know it's working when:
- ✅ Agent 2 returns real competitor positioning (not mocked)
- ✅ Agent 3 shows actual win rate from your CSV
- ✅ All 3 agents produce unique, data-driven insights
- ✅ Export button generates coherent markdown report
- ✅ No "ERROR" messages in agent outputs

---

## 🐛 DEBUGGING

If something breaks:

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for API route errors

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for failed fetch() calls
   - Check network tab for 500 errors

3. **Verify OpenAI Key:**
   - Ensure `OPENAI_API_KEY` is set in Vercel Environment Variables
   - Key should start with `sk-`

4. **Test API Routes Directly:**
   ```bash
   # Test Agent 2
   curl -X POST https://refactorsprint.com/api/agent-spy \
     -H "Content-Type: application/json" \
     -d '{"competitors": ["hubspot.com"]}'

   # Test Agent 3
   curl -X POST https://refactorsprint.com/api/agent-analyst \
     -H "Content-Type: application/json" \
     -d '{"csvContent": "Status,Amount\nWon,50000\nLost,75000", "fileName": "test.csv"}'
   ```

---

**AGENTS ARE LIVE AND READY TO ANALYZE!** 🚀
