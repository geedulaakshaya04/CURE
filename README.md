# CURE — City Unified Response & Evolution Platform (v6.1)

> **"Your City. Your Voice. Better Governance."**  
> *Closed-Loop Civic Response & Municipal Systems Intelligence*

CURE is an authentic Indian public-service governance platform designed around a foundational principle: **Citizens should only have to explain the problem. CURE should handle the complexity behind it.**

Aligned with the **GHMC Citizen Charter** and systems engineering frameworks, CURE transitions civic grievance management from disconnected, open-loop surface repairs into an integrated, closed-loop municipal intelligence system.

---

## 🏛️ Key Architectural Modules

1. **Citizen Passwordless Gateway (Mobile + Simulated OTP):**
   * Accessible grievance reporting across 12 natural civic categories without requiring password creation.
   * Auto-routes issues to relevant municipal bodies (GHMC, HMWS&SB, TSSPDCL, Traffic Police) behind the scenes.
2. **Officer Operations Work Desk:**
   * Role-restricted queue for Assistant Engineers (AE) and field supervisors to inspect, coordinate, and log works.
3. **Closed-Loop Citizen Verification Engine:**
   * Tickets cannot be closed without citizen confirmation (*"Was the problem actually fixed?"*).
   * Unresolved cases trigger automatic escalation and recurrence detection.
4. **Systems Thinking Root Cause Engine & Knowledge Graph:**
   * Correlates recurring defects (e.g., repeated road cave-ins on Road 36) with infrastructure root causes (e.g., Drain D-104 subgrade saturation).
5. **Ward 45 Digital Twin & Multi-Agency Joint Work Orders (JWO):**
   * Issues synchronized work orders across multiple agencies (Drainage + Roads + Traffic).
6. **Policy Simulator Sandbox:**
   * Predictive decision support system modeling maintenance intervals, flood risks, budgets, and citizen trust.
7. **1-Click Presentation Autoplay:**
   * Built-in 7-scene automated walkthrough designed for academic viva and external evaluation panels.

---

## 📁 Repository Structure

```text
.
├── index.html                                      # Unified single-page application structure
├── styles.css                                      # Civic design system (Deep Navy & Teal palette)
├── app.js                                          # Reactive state machine & systems engine
├── PSE External Evaluation Presentation Template.pptx # 13-slide external evaluation deck
└── README.md                                       # Platform overview and documentation
```

---

## 🚀 Running Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/CURE.git
   cd CURE
   ```
2. Serve locally using Python:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser at **`http://localhost:8000/`**.
   * **Citizen Demo:** Use mobile `+91 98765 43210` and OTP `246810`.
   * **Officer Demo:** Use ID `GHMC-ENG-4501` and PIN `4501`.

---

## ⚖️ Academic Prototype Notice
*All values, telemetry scores, and projections shown are illustrative for systems engineering analysis and require local validation before operational municipal deployment.*
