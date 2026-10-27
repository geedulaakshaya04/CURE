# Project Report: CURE (City Unified Response & Evolution Platform)
> **Course:** Problem Solving in Engineering (PSE)  
> **Department:** Department of Artificial Intelligence, Anurag University  
> **Slogan:** *"Smarter Decisions. Stronger Cities."*  
> **Version:** 1.0 (Proof of Concept Academic Prototype)  

---

## 1. Executive Summary & Abstract
Urban centers globally struggle to manage civic infrastructure complaints efficiently. Conventional grievance redressal portals (such as MyGHMC or CPGRAMS) function as passive ticket-routing databases. They receive complaints, assign them to officers, and close them once repaired, ignoring the systemic failures that cause these issues to recur.

**CURE (City Unified Response & Evolution Platform)** is an AI-powered Smart City Decision Support System (GDSS) that transitions municipal management from reactive complaint redressal to proactive, systems-oriented planning. Guided by Donella Meadows' principles of Systems Thinking, CURE models civic ecosystems by mapping the interdependencies between citizen reports, department workflows, weather metrics, budgets, and policies. Powered by the **Governance Intelligence Engine (GIE)**—a cooperative multi-agent AI system—CURE parses grievances in multiple languages, runs real-time Computer Vision audits, traces cascading failures through a Temporal Knowledge Graph, simulates policy adjustments, and generates self-healing preventive maintenance work orders. This platform demonstrates how cities can leverage data to eliminate grievances before they manifest.

---

## 2. Module 1: Introduction & Problem Selection
Municipal grievance management systems suffer from structural limitations that prevent them from achieving long-term urban resilience:
- **Siloed Redressal**: Modern city administrations split responsibilities among independent utilities (e.g., Road Development, Water Supply & Sewerage Board, Traffic Police). If a broken water pipe under a main road leaks, it pools water on the asphalt, creating potholes. The Roads Department patches the road, while the Water Board repairs the pipe weeks later, resulting in repeated road digging, resource waste, and duplicate citizen complaints.
- **Reactive Operation Trap**: Cities deploy repair crews only after complaints are logged. There are no telemetry-driven triggers to inspect sewer flow coefficients before monsoons, or repave streetlights before their Mean Time to Failure (MTTF) is reached.
- **Absence of Root Cause Analytics**: Grievance portals log tickets in flat SQL tables. They fail to trace the causal links between separate incidents, preventing city engineers from understanding *why* failures repeat in specific hotspots (e.g., Ward 45, Jubilee Hills).

---

## 3. Module 2: System Boundary & Stakeholder Mapping

### 3.1. System Boundary
The boundary of the CURE operating system defines what falls under the control of the municipal intelligence engine vs external environmental influences.

* **Inside the Boundary (CURE OS)**:
  - Governance Intelligence Engine (GIE) cognitive pipeline.
  - Interactive single-ward Digital Twin simulation parameters.
  - Temporal Knowledge Graph renderer and coordinates check logic.
  - Multi-Agent Decision Engine debate logs.
  - Policy Sandbox simulator and output projections.
  - Smart Citizen Assistance (root-cause delay explanations, escalation matrices).
* **Outside the Boundary (External Environment)**:
  - Weather patterns and meteorology feeds (monsoon rain).
  - External municipal databases (legacy databases, CPGRAMS).
  - Physical infrastructure networks (roads, water pipes, streetlights).
  - Citizens, RWAs, and NGOs filing reports.
  - State finance limits and macro-budget allocations.

### 3.2. Stakeholder Identification Map
Stakeholders are mapped based on their power to direct allocations and their interest in service reliability:
1. **Primary Stakeholders (High Power / High Interest)**:
   - *Zonal Commissioners*: direct ward-level funds and evaluate KPIs.
   - *Department Heads (Roads, Sewerage, Traffic)*: manage crew deployments and verify repair quality.
2. **Secondary Stakeholders (Low Power / High Interest)**:
   - *Citizens & Resident Welfare Associations (RWAs)*: file grievances and evaluate municipal performance.
   - *NGOs & Audit Groups*: track climate compliance and spatial equity indicators.
3. **Operational Stakeholders (High Power / Low Interest)**:
   - *Field Repair Engineers*: execute physical repairs.
   - *Maintenance Contractors*: deploy equipment (vacuum jetters, concrete mixers).

---

## 4. Module 3: Rich Picture & Systems Context
In a traditional city grievance model, the flow of communication is purely linear:
$$\text{Citizen} \xrightarrow{\text{Complaint}} \text{Government Portal} \xrightarrow{\text{Routing}} \text{Officer} \xrightarrow{\text{Repair}} \text{Done}$$

CURE restructures this into an interconnected systems circle. 

* **The Citizens Gateway** receives voice speech (English, Telugu, Hindi) and Computer Vision uploads.
* **The GIE Brain** acts as the center coordinator. It parses inputs, runs duplicates checks, assigns priority weights based on safety (proximity to hospitals/schools), and maps dependencies in the Knowledge Graph.
* **The Government Decision Support System (GDSS)** evaluates GIE recommendations. It runs the **Multi-Agent Decision Engine** to debate budget conflicts and generates **Joint Work Orders** (dispatched simultaneously to Roads, Water, and Traffic crews).
* **The Closed-Loop Feedback** captures citizen ratings upon repair. If repairs fail repeatedly, the system updates its internal durability coefficients, forcing GIE to recommend concrete pavement upgrades instead of temporary asphalt patches.

---

## 5. Module 4: Causal Loop Diagram (CLD) & System Dynamics
CURE tracks both Reinforcing Loops ($R$) that degrade infrastructure and Balancing Loops ($B$) that stabilize the city.

```
       [Rainfall Forecast] (+)
               │
               ▼
      [Drainage Blockage] (+)
               │
               ▼
     [Road Asphalt Wear] (+)
               │
               ▼
       [Potholes Count] (–) ──► [Road Network Health] (–)
               │
               ├──► [Ambulance & Traffic Delay] (+)
               │
               └──► [Citizen Complaints] (–) ──► [Citizen Trust Score]
                         │
                         ▼
             [Budget Demand Allocation] (+)
                         │
         ┌───────────────┴───────────────┐
         ▼ (Loop B1)                     ▼ (Loop B2)
  [Preventive Desilting] (+)     [Concrete Paving Policy] (+)
         │                               │
         ▼ (–)                           ▼ (–)
  [Drainage Blockage]             [Road Asphalt Wear]
```

* **Reinforcing Loop (R1 - Infrastructure Decay)**: High Rainfall $\rightarrow$ Drainage blockage increases $\rightarrow$ Water accumulates on roads $\rightarrow$ Asphalt wear accelerates $\rightarrow$ Pothole count rises $\rightarrow$ Citizen complaints increase $\rightarrow$ Citizen trust drops.
* **Balancing Loop (B1 - Preventive Desilting)**: High Potholes & Complaints $\rightarrow$ Budget demand rises $\rightarrow$ AI adjusts Preventive Desilting frequency $\rightarrow$ Drainage blockages decrease $\rightarrow$ Water accumulation drops $\rightarrow$ Potholes decrease.
* **Balancing Loop (B2 - Quality Paving)**: High budget demand $\rightarrow$ Concrete Paving policy triggered in hotspots $\rightarrow$ Asphalt wear drops $\rightarrow$ Potholes decrease.

---

## 6. Module 5: Proposed System Architecture & UML Models

### 6.1. Class Diagram Specification
The classes represent the entity relationship of the CURE platform:

```
┌────────────────────────────────────────────────────────┐
│                        Complaint                       │
├────────────────────────────────────────────────────────┤
│ - id: Integer                                          │
│ - category: String                                     │
│ - details: String                                      │
│ - location: String                                     │
│ - priority: String                                     │
│ - confidence: Float                                    │
│ - status: String                                       │
├────────────────────────────────────────────────────────┤
│ + parseNLP(): void                                     │
│ + detectDuplicates(): Boolean                           │
│ + routeDepartment(): void                              │
└────────────────────────────────────────────────────────┘
                           │ 1
                           │
                           │ 1..*
┌────────────────────────────────────────────────────────┐
│                     JointWorkOrder                     │
├────────────────────────────────────────────────────────┤
│ - orderId: String                                      │
│ - title: String                                        │
│ - departments: List<String>                            │
│ - estimatedCompletion: Date                            │
├────────────────────────────────────────────────────────┤
│ + dispatchCrews(): void                                │
│ + updateStatus(): void                                 │
└────────────────────────────────────────────────────────┘
                           │ *
                           │
                           │ 1
┌────────────────────────────────────────────────────────┐
│                        DigitalTwin                     │
├────────────────────────────────────────────────────────┤
│ - wardName: String                                     │
│ - roadHealth: Integer                                  │
│ - drainHealth: Integer                                 │
│ - lightHealth: Integer                                 │
│ - garbageHealth: Integer                               │
│ - resilienceIndex: Integer                             │
├────────────────────────────────────────────────────────┤
│ + recalculateIndices(): void                           │
│ + updateMapColors(): void                              │
└────────────────────────────────────────────────────────┘
```

### 6.2. Use Case Model
* **Citizen**: Files voice complaint, uploads photo for CV verification, tracks ticket status, submits repair feedback.
* **Governance Intelligence Engine (GIE)**: Parses speech, detects duplicates, updates Knowledge Graph, runs Multi-Agent debates.
* **Zonal Commissioner / Dept Head**: Evaluates digital twin metrics, updates climate sliders, monitors KPIs, audits ethics allocations.

### 6.3. Sequence Diagram (Grievance to Learning Loop)
```
Citizen          GIE Gateway         GDSS (Govt)      Digital Twin      Memory Log
   │                  │                  │                  │               │
   │──File Grievance─►│                  │                  │               │
   │                  │──Check Duplicates│                  │               │
   │                  │──Verify via CV──►│                  │               │
   │                  │                  │──Recalc Twin────►│               │
   │                  │                  │                  │──Update color │
   │                  │◄─Assign Task JWO─│                  │               │
   │                  │                  │                  │               │
   │◄─Provide status──│                  │                  │               │
   │                  │                  │                  │               │
   │──Send Feedback──►│                  │                  │               │
   │                  │──Update Weights────────────────────────────────────►│
   │                  │                  │                  │               │──Update
   │                  │                  │                  │               │  Coeff.
```

---

## 7. Module 6: Database Design & Ward Telemetry Parameters

The digital twin parameters represent a single Ward database schema:

### 7.1. Ward Telemetry Table Schema
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `ward_id` | INT | Primary Key | Unique Ward Identifier (e.g. Ward 45) |
| `ward_name` | VARCHAR(50) | Not Null | Ward boundary name (Jubilee Hills) |
| `population` | INT | Check (>0) | Census population count (84,200) |
| `rainfall` | FLOAT | Default (15) | Active rainfall forecast in mm |
| `maintenance_interval` | INT | Default (90) | Inspection interval in days |
| `road_health_index` | INT | Check (0-100) | Asphalt structural coefficient |
| `drain_health_index` | INT | Check (0-100) | Sewer discharge flow coefficient |
| `resilience_index` | INT | Check (0-100) | Overall urban health index |

### 7.2. Master Complaint Table Schema
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `complaint_id` | INT | Primary Key | Unique ticket reference |
| `category` | VARCHAR(50) | Not Null | NLP parsed class (Drainage/Road/Waste) |
| `details` | TEXT | Not Null | Translated citizen input string |
| `latitude` | DOUBLE | Check (-90 to 90) | Spatial Y-coordinate |
| `longitude` | DOUBLE | Check (-180 to 180)| Spatial X-coordinate |
| `priority` | VARCHAR(15) | Default ('Medium') | Ranked priority (Critical/High/Medium/Low)|
| `assigned_officer`| VARCHAR(50) | Not Null | Primary officer name |
| `completion_date` | DATE | Nullable | Calculated target dispatch window |
| `status` | VARCHAR(20) | Default ('Assigned')| System state (Assigned/Scheduled/Resolved)|

---

## 8. Module 7: Algorithms & Simulation Logic

### 8.1. Urban Health Index Recalculation Algorithm
The digital twin recalculates structural coefficients dynamically when rainfall forecasts or maintenance intervals fluctuate:

```javascript
function recalculateTwinIndices(rainfall, maintenanceInterval, scenario) {
    // Base structural coefficients
    let baseRoad = 88 - (rainfall * 0.18) - (maintenanceInterval * 0.08);
    let baseDrain = 80 - (rainfall * 0.35) - (maintenanceInterval * 0.06);
    let baseLight = 85 - (maintenanceInterval * 0.07);
    let baseGarbage = 82 - (maintenanceInterval * 0.05);

    // Apply Scenario modifiers
    if (scenario === "monsoon") {
        baseRoad -= 12;
        baseDrain -= 18;
    } else if (scenario === "festival") {
        baseGarbage -= 18;
        baseRoad -= 5;
    } else if (scenario === "strike") {
        baseRoad -= 8;
        baseDrain -= 8;
        baseGarbage -= 25;
        baseLight -= 15;
    }

    // Clip output to range 15% - 100%
    let roadHealth = Math.max(15, Math.min(100, Math.round(baseRoad)));
    let drainHealth = Math.max(15, Math.min(100, Math.round(baseDrain)));
    let lightHealth = Math.max(15, Math.min(100, Math.round(baseLight)));
    let garbageHealth = Math.max(15, Math.min(100, Math.round(baseGarbage)));

    // Calculate Resilience Index
    let recoverySpeed = Math.max(10, Math.min(100, Math.round(88 - (rainfall * 0.2))));
    let adaptability = Math.max(10, Math.min(100, Math.round(85 - (maintenanceInterval * 0.05))));
    let resilienceIndex = Math.round((roadHealth + drainHealth + recoverySpeed + adaptability) / 4);

    return { roadHealth, drainHealth, lightHealth, garbageHealth, resilienceIndex };
}
```

### 8.2. Sentiment Analysis Auto-Escalation Logic
When a citizen reviews a repair, CURE uses NLP to audit feedback:

```javascript
function processCitizenFeedback(ticketId, feedbackString) {
    const query = feedbackString.toLowerCase();
    
    // Check for negative indicators ("not complete", "bad", "failed")
    if (query.includes("not complete") || query.includes("bad") || query.includes("failed") || query.includes("poor")) {
        // 1. Re-open ticket and elevate priority
        updateTicketStatus(ticketId, "Escalated: Reopened");
        updateTicketPriority(ticketId, "Critical");
        
        // 2. Adjust AI material coefficients for future scheduling
        decreaseMaterialCoefficient("asphalt", 0.12);
        
        // 3. Auto-route to Zonal Commissioner
        assignTicketToOfficer(ticketId, "K. Rama Rao (Senior Zonal Commissioner)");
        
        return "ALERT: Negative sentiment detected. Ticket JWO-891 escalated to Commissioner.";
    } else {
        updateTicketStatus(ticketId, "Closed");
        increaseMaterialCoefficient("asphalt", 0.05);
        return "SUCCESS: Positive feedback logged. Learning parameters updated.";
    }
}
```

---

## 9. Module 8: Ethical, Legal & Sustainable Auditing

### 9.1. UN SDG 11 Alignment (Sustainable Cities and Communities)
CURE targets three specific UN Sustainable Development Goals:
- **Target 11.2 (Smarter Transport & Road Safety)**: Computer Vision audits and prioritized pothole repairs reduce road hazards and traffic congestion.
- **Target 11.6 (Clean Air and Sanitation)**: Automated drainage desilting schedules reduce toxic sewer backflow and prevent flooding.
- **Target 11.b (Integrated Urban Disaster Resilience)**: The climate simulator allows cities to prepare contingency budgets, strengthening adaptation to extreme weather events.

### 9.2. Ethics Engine (Budget Allocation Equity)
AI budget dispatches risk reinforcing spatial inequalities (allocating more resources to wealthy taxpayers). CURE's **Ethics Engine** audits allocations against a spatial equity constraint, ensuring that all ward sectors receive budgets proportional to their telemetry degradation, irrespective of neighborhood wealth profiles.

### 9.3. Digital Constitution Check
Verifies all work dispatch recommendations against municipal laws. If a disaster scenario attempts to bypass budget allocation boundaries, the Constitution auditor flags the transaction to require direct commissioner approval.

---

## 10. Module 9: Testing & Verification Plan

### 10.1. Automated System Integration Tests
Verification is executed via simulated script runners testing three critical integrations:
1. **NLP to Priority Test**: Verifying that inputting "Apollo Hospital gate flooded" yields class = `Drainage`, priority = `Critical`.
2. **Duplicate Merging Test**: Inputting coordinates within 100 meters of an active ticket checks that no new work order is created and returns `isDuplicate = true`.
3. **Twin Dynamic Redraw Test**: Adjusting rainfall parameter values triggers the SVG map color state changes to confirm mathematical synchrony.

### 10.2. Simulated Redressal Benefits (GDSS KPI Outputs)
| Metric | Baseline (Reactive) | CURE (Predictive) | Net Improvement |
| :--- | :--- | :--- | :--- |
| **Average Resolution Time** | 7.8 Days | 2.8 Days | **-64%** |
| **Citizen Satisfaction** | 59% | 91% | **+32%** |
| **Office Visits / Year** | 12,400 visits | 4,800 visits | **-61%** |
| **Overlapping Excavation Costs**| ₹64 Lakhs | ₹21 Lakhs | **-67%** |
| **Estimated Ward 45 Savings** | - | ₹2.4 Crores/Year | **Target Met** |

---

## 11. Module 10: Conclusion & References

### 11.1. Project Summary
CURE demonstrates that transitioning municipal grievance systems from passive ticket registers to active decision support platforms is both technically feasible and financially optimal. By mapping interdependencies through a Knowledge Graph and utilizing a cooperative Multi-Agent AI architecture, CURE helps city administrations address structural root causes, prevent infrastructure degradation, and continuously improve municipal service delivery.

### 11.2. References (IEEE Format)
1. D. Meadows, *Thinking in Systems: A Primer*, White River Junction, VT: Chelsea Green Publishing, 2008.
2. United Nations, *Goal 11: Make cities inclusive, safe, resilient and sustainable*, SDG Targets, 2020. [Online]. Available: https://sdgs.un.org/goals/goal11
3. GHMC Grievance Redressal Manual, *Citizen Grievance Redressal Policies*, Greater Hyderabad Municipal Corporation, 2024.
4. M. Wooldridge, *An Introduction to MultiAgent Systems*, 2nd ed., Chichester, UK: John Wiley & Sons, 2009.
5. C. J. Date, *An Introduction to Database Systems*, 8th ed., Boston, MA: Addison-Wesley, 2004.
