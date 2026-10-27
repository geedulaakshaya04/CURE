# Systems Diagrams Guide - CURE Platform
> **Slogan:** *"Smarter Decisions. Stronger Cities."*

These diagrams use Mermaid syntax, which you can render directly in Markdown viewers, Mermaid Live Editor, or copy-paste into your PowerPoint presentations.

---

## 1. System Architecture Diagram
Illustrates how data flows from the citizen, through the GIE brain, to the GDSS, and back to the infrastructure.

```mermaid
graph TD
    A[Citizen Grievance Gateway] -->|Voice/Text/Image| B[Governance Intelligence Engine - GIE]
    B -->|NLP Parsing & CV Scan| C[Category & Location Match]
    C -->|Duplicate Search| D[Duplicate Detector]
    D -->|Merge/Link| E[Master Complaint Database]
    E -->|Priority Engine + Proximity weights| F[Explainable Priority Router]
    F -->|Routing & dispatches| G[Ecosystem Joint Work Orders]
    G -->|Water/Roads/Traffic| H[Officer Operations]
    H -->|Resolution| I[Smart Citizen Assistance]
    I -->|Feedback & Sentiment| J[Governance Memory Log]
    J -->|Durability Updates| B
    J -->|Health Score updates| K[Ward 45 Digital Twin]
    K -->|Risk Index thresholds| L[Preventive Maintenance Engine]
    L -->|Schedule dispatches| G
```

---

## 2. Causal Loop Diagram (CLD)
Traces the systemic reinforcing ($R$) and balancing ($B$) loops within CURE.

```mermaid
graph TD
    Rainfall[Rainfall Forecast] -->|Positive +| DrainClog[Drainage Blockage]
    DrainClog -->|Positive +| RoadWear[Road Asphalt Wear]
    RoadWear -->|Positive +| Potholes[Potholes Count]
    Potholes -->|Negative -| RoadHealth[Road Network Health]
    Potholes -->|Positive +| SafetyHazard[Ambulance & Traffic Delay]
    Potholes -->|Positive +| Complaints[Citizen Complaints]
    Complaints -->|Negative -| CitizenTrust[Citizen Trust Score]
    Complaints -->|Positive +| BudgetDemand[Budget allocation demand]
    
    %% Balancing Loop (B1: Preventive desilting)
    BudgetDemand -->|Positive +| PrevMaint[Preventive desilting frequency]
    PrevMaint -->|Negative -| DrainClog
    
    %% Balancing Loop (B2: Repaving upgrades)
    BudgetDemand -->|Positive +| RepaveConcrete[Concrete Repaving Policy]
    RepaveConcrete -->|Negative -| RoadWear
```

---

## 3. Feedback Loop Diagram
Shows the continuous learning loop, highlighting the feedback path from citizens to GIE AI learning coefficients.

```mermaid
flowchart LR
    A[Citizen Report] --> B[GIE AI Analysis]
    B --> C[Government Dispatch]
    C --> D[Infrastructure Repair]
    D --> E[Citizen Feedback]
    E -->|Sentiment Audit| F[GIE Durability Coefficients Update]
    F --> B
```

---

## 4. Stakeholder Map
Categorizes stakeholders based on power and interest.

```mermaid
graph TD
    subgraph Primary [High Power / High Interest]
        Commissioner[Zonal Commissioner]
        DeptHeads[Road/Water Department Heads]
    end
    subgraph Secondary [Low Power / High Interest]
        Citizens[Citizens & RWAs]
        NGOs[NGOs & Community groups]
    end
    subgraph Operational [High Power / Low Interest]
        Contractors[Maintenance Contractors]
        Officers[Field Repair Engineers]
    end
```

---

## 5. System Boundary Diagram
Defines what resides inside the CURE operating system vs what are external environment inputs.

```mermaid
rect rgba(0, 229, 255, 0.05)
    subgraph Inside CURE Boundary
        GIE[Governance Intelligence Engine]
        GDSS[Decision Support System]
        Twin[Ward 45 Digital Twin]
        Graph[Knowledge Graph]
        Rules[Digital Constitution rules]
    end
end
subgraph External Environment
    Weather[Rainfall / Climate API]
    CPGRAMS[State Databases]
    Public[Citizen Complaints]
    Finance[State Budget caps]
end
Weather -.-> GIE
CPGRAMS -.-> GIE
Public -.-> GIE
Finance -.-> GDSS
```
