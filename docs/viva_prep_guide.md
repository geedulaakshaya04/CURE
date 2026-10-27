# Viva Preparation Guide - CURE Platform
> **Slogan:** *"Smarter Decisions. Stronger Cities."*

---

## Category 1: Systems Thinking & Core Philosophy

### Q1: What is "Systems Thinking" and how does CURE apply it?
**A:** Systems Thinking is a framework for looking at the "whole" system rather than individual parts. Guided by Donella Meadows' principles, CURE does not treat a grievance as an isolated ticket. Instead, it models relationships between rainfall, drainage, road wear, budget allocations, and citizen trust. It focuses on the loops and connections causing recurring failures.

### Q2: How does the "Continuous Learning Loop" function?
**A:** When a ticket is completed, citizen feedback is evaluated. If a repair fails again quickly (negative feedback), GIE decreases the durability coefficients of the materials used in that weather condition. Future AI dispatches then suggest stronger concrete paving instead of asphalt.

### Q3: What is a "Causal Loop"? Can you trace one in CURE?
**A:** A Causal Loop is a reinforcing or balancing feedback loop. For example: `High Rainfall (Input) ➔ Clogged Drains (Degradation) ➔ Weaker Asphalt (Road Health drops) ➔ More Potholes ➔ Traffic Delays ➔ Lowers Trust ➔ Highers Budget demand`.

### Q4: Why is it called CURE (City Unified Response & Evolution Platform)?
**A:** "Response" represents the reactive filing gateway. "Evolution" represents the system's learning loop where past repairs change future policy, helping the city's governance model adapt and evolve.

---

## Category 2: Governance Intelligence Engine (GIE) & Multi-Agent AI

### Q5: What is a "Multi-Agent System" in the context of CURE?
**A:** It is a cooperative network of AI agents, each modeling a specific urban sector (e.g. Roads Agent, Water Agent, Budget Agent). Instead of running a single monolithic script, agents debate conflicting constraints (e.g., roads wants dry asphalt, sewerage highlights pipe bursts, safety demands instant hospital access) to propose an optimal joint resolution.

### Q6: How does GIE parse speech inputs?
**A:** In the prototype, speech is simulated through multi-lingual presets (EN, TE, HI) which feed into an NLP semantic parser. The parser extracts keywords (like "Apollo", "Garbage", "Water") to map them to categories, locations, departments, and priority levels.

### Q7: How is duplicate complaint detection handled?
**A:** GIE checks coordinates and categories of incoming complaints. If another report is filed within a 100-meter radius of an active complaint of the same type, GIE merges it into a "Master Ticket" and links the citizen to it, preventing duplicate work orders.

### Q8: What does the "Explainable AI (XAI)" engine do?
**A:** Instead of outputting a black-box priority score, CURE explains *why* the priority is assigned (e.g. "Critical because Hospital is within 50m, rainfall is high"). This justifies dispatches to municipal engineers.

---

## Category 3: Ward 45 Digital Twin & Telemetry Simulation

### Q9: What is a "Digital Twin" and why did you limit it to "One Ward"?
**A:** A Digital Twin is a virtual representation of physical assets. We scoped it to **Ward 45 (Jubilee Hills)** to build a high-fidelity, realistic prototype that models actual telemetry (roads, drains, streetlights, budget) without the complexity of representing a whole city.

### Q10: How do the sliders simulate the Digital Twin?
**A:** Changing the Rainfall or Maintenance sliders triggers mathematical recalculation functions in `app.js` that update road/drainage health variables, recalculate the Resilience Index, alter the vector SVG map path colors, and generate preventive desilting tasks.

### Q11: What are the parameters in the "Urban Health Index"?
**A:** The Urban Health Index is composed of:
1. **Resilience Index %** (Averages road health, drain health, recovery, and adaptability).
2. **Recovery Speed %** (Estimated time to dispatch and repair).
3. **Adaptability %** (Proactivity factor based on maintenance frequency).

### Q12: How does the "Future Scenario Simulator" work?
**A:** Selecting a scenario (like *Monsoon Storm* or *Workers Strike*) locks telemetry inputs to extreme states (e.g., rainfall to 110mm, resources to blocked), immediately recalculating city indices and showing how CURE's agents adapt dispatches.

---

## Category 4: Temporal Knowledge Graph & Graph Databases

### Q13: What is a Knowledge Graph?
**A:** A Knowledge Graph represents entities as "nodes" and relations as "edges" (links). In CURE, nodes are Rainfall, Drains, Apollo Hospital, Potholes, Budget, and Trust. Hovering over a node displays how a failure in one node cascades to affect the others.

### Q14: How is the Knowledge Graph drawn in your prototype?
**A:** It is drawn on an HTML5 `<canvas>` element using the Canvas 2D Context API in `app.js`. Node positions are mapped using coordinates, and we draw links using canvas bezier/linear vector lines.

### Q15: How does mouse-hover detection work on the canvas?
**A:** We bind mousemove event listeners to the canvas, mapping cursor positions to the coordinate space. We compute the Euclidean distance:
$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$
If the distance is less than or equal to the node's radius, it registers as hovered, drawing glowing rings and revealing detail sidebars.

---

## Category 5: SDG 11 & Municipal Operations

### Q16: How does CURE align with UN SDG 11 (Sustainable Cities)?
**A:** SDG 11 focuses on making cities inclusive, safe, resilient, and sustainable. CURE directly tracks progress metrics (Clean sanitation water logging drops, road pothole hazard drops) that feed the SDG indicators dashboard.

### Q17: What is the "Ecosystem Joint Work Order" and how does it save money?
**A:** If a water pipe burst destroys a road, standard systems issue separate tickets. CURE creates a single **Joint Work Order (JWO)** dispatching the Water Board, Roads Dept, and Traffic Police simultaneously. This reduces excavation repeat costs, contributing to an estimated **₹2.4 Cr / Year** savings in Ward 45.

### Q18: What are the "Ethics Engine" and "Digital Constitution" checks?
**A:** The **Ethics Engine** audits budget dispatches to ensure funds are distributed equitably across all ward sectors (preventing bias towards rich areas). The **Digital Constitution Check** validates that dispatches comply with Municipal Code laws.

---

## Category 6: Technical Stack & Frontend Architecture

### Q19: Why did you build this as an SPA using Vanilla JS/HTML/CSS?
**A:** Standardizing on vanilla ES6 JS, CSS3, and HTML5 allows the platform to run client-side without compilation. This guarantees offline capability, fast startup, zero database configuration issues during presentations, and clean, responsive performance.

### Q20: How are the animations implemented?
**A:** 
1. **Scanning beam**: CSS keyframe translation styling (`top: 0%` to `100%`).
2. **Audio Wave**: Randomly timed bounce animations in CSS.
3. **Pulsing red marker**: Radial scale keyframes.
4. **Systems Loop**: JavaScript rotation interval switching the `.active` class on elements.
