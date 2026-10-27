# Walkthrough — CURE Indian Civic & Public-Service Platform Redesign
> **Product Direction:** *"Citizens should only have to explain the problem. CURE should handle the complexity behind it."*

We have rebuilt CURE (City Unified Response & Evolution) with an authentic, trustworthy Indian public-service design system, aligned directly with the GHMC Citizen Charter.

---

## 🎨 1. Visual Identity & Color System
CURE departs completely from generic AI neon-purple aesthetics to embrace a calm, professional, authoritative civic palette:
* **Primary Deep Navy (`#123B5D`)**: Headers, primary buttons, active stage pins, and typography.
* **Midnight Navy (`#0B263D`)**: Welcome splash screen, footer, and code blocks.
* **Secondary Teal (`#0F766E`)**: Brand accents, sub-problem chips, review badges, and progress meters.
* **Civic Blue (`#2563EB`)**: Pathway vectors and location indicators.
* **Success Green (`#16A34A`)**: Resolved badges, impact summaries, and positive confirmations.
* **Warning Amber (`#D97706`)**: Watch alerts, delays, and recurrence notices.
* **Danger Red (`#DC2626`)**: Critical indicators and immediate emergency warnings.
* **Background Soft Grey (`#F6F8FA`)**: Global canvas background.
* **Card White (`#FFFFFF`)**: Clean, crisp card surfaces with subtle borders (`#E2E8F0`).

### Civic Seal Logo
A circular city ring (**C**), connected pathway (**U**), response/route vector (**R**), and three horizontal civic foundation lines (**E**) paired with the tagline:
> *"Your City. Your Voice. Better Governance."*

---

## 🛣️ 2. Comprehensive 12-Problem Citizen Taxonomy
Instead of asking citizens to know municipal departments, CURE asks **"What's wrong?"** across 12 civic categories, mapping each to its specific GHMC or inter-agency authority:

1. **🛣️ Roads & Footpaths** (14 sub-problems) ➔ *GHMC Roads & Infrastructure Engineering*
2. **🌧️ Drainage & Flooding** (12 sub-problems) ➔ *HMWS&SB + GHMC Stormwater Drainage*
3. **🗑️ Garbage & Cleanliness** (11 sub-problems) ➔ *GHMC Solid Waste Management*
4. **💡 Streetlights & Electricity** (7 sub-problems) ➔ *TSSPDCL Electrical Wing + GHMC*
5. **💧 Water Supply** (9 sub-problems) ➔ *HMWS&SB (Hyderabad Water Board)*
6. **🚦 Traffic & Safety** (9 sub-problems) ➔ *Hyderabad Traffic Police + GHMC*
7. **🌳 Parks & Public Spaces** (10 sub-problems) ➔ *GHMC Urban Biodiversity*
8. **🏗️ Construction Issues** (8 sub-problems) ➔ *GHMC Town Planning & Enforcement*
9. **🏥 Sanitation & Public Health** (7 sub-problems) ➔ *Directorate of Public Health*
10. **🐕 Animal Concerns** (5 sub-problems) ➔ *GHMC Veterinary Section*
11. **🌿 Trees & Environment** (7 sub-problems) ➔ *Forest & Biodiversity Wing*
12. **🚨 Emergency Danger** ➔ *112 Emergency Dispatch Banner (Instant Detection)*

---

## 👤 3. Simple Citizen Journey
1. **Step 1 — What happened?**: Tap a category card.
2. **Step 2 — Describe it**: Instant chips for common sub-problems, with Type, Voice (English/Telugu/Hindi), or Photo scanning.
3. **Step 3 — Where is it?**: 📍 One-tap GPS capture (Ward 45, Jubilee Hills).
4. **Step 4 — Review**: Plain-language summary showing auto-identified agency and the promise: *"You don't need to choose a department. We'll route it."*
5. **Step 5 — Done**: Receipt `🎫 CURE-2026-00142` with the strongest civic promise: *"🔔 You don't need to visit the office. CURE will update you."*

---

## 📍 4. Transparent Tracking & Office Visit Eliminator
* **6-Stage Pipeline**: Report received ➔ Responsible team identified ➔ Inspection scheduled ➔ Field action ➔ Verification ➔ Resolved.
* **Delay Transparency**: *"Taking longer than expected — Coordinating joint inspection between HMWS&SB and GHMC Roads."*
* **🔁 Recurrence Alert ("Why is this happening again?")**:
  * *Citizen sees*: *"We've noticed similar reports at this location. CURE is analyzing the drainage network underneath to eliminate the root cause."*
  * *Government sees*: *"Recurrence Alert: Same location + Similar complaint type + Repeated reports ➔ Potential recurring infrastructure issue ➔ Investigate root cause."*
* **Verification Loop**: *"Is the problem actually fixed? [YES — Fixed] [NO — Still there]"* — Clicking "NO" immediately reopens the complaint, increments the failure log, and escalates to the Zonal Commissioner.

---

## 🏛️ 5. Government Intelligence Dashboard
* **Breadcrumb**: Hyderabad ➔ Khairatabad Zone ➔ Circle 18 ➔ Ward 45 (Jubilee Hills).
* **City Health Scoreboard**: Progressive disclosure cards (Roads: Watch, Drainage: Critical, Waste: Healthy, Citizen: Watch) expand detailed diagnostics on click.
* **The Root Cause Engine**: Visual causal chain:
  `HEAVY RAIN ➔ DRAINAGE BLOCKAGE ➔ WATER STAGNATION ➔ ROAD BASE WEAKENING ➔ POTHOLE ➔ CITIZEN REPORT ➔ QUICK REPAIR ➔ PROBLEM MAY RETURN`
* **Ward 45 Digital Twin**: Interactive telemetry layers for Drain D-104, Road R-36, and Streetlight SL-12 with explicit academic simulation disclaimers.
* **Multi-Agency Joint Work Orders (JWOs)**: Binds HMWS&SB (desilting), Traffic Police (diversion), and GHMC (polymer repaving) into a single unified dispatch to stop repetitive road digging.
* **Policy Simulator**: Sandbox slider (15 to 120 days) projecting municipal maintenance budget vs complaint drops in real time.

---

## 🚀 How to Test
1. **Server Status**: Python HTTP server is running at [http://localhost:8000/](http://localhost:8000/).
2. **Autoplay Demo**: Click **▶ Run Presentation Autoplay** in the header to observe the complete civic loop execute smoothly across screens.
