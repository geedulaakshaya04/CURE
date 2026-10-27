# UML & Flowchart Specifications - CURE Platform
> **Slogan:** *"Smarter Decisions. Stronger Cities."*  

This document provides copy-pasteable Mermaid diagrams representing the structural and behavioral UML models of the CURE platform. Copy these directly into Markdown viewers or PowerPoint slides.

---

## 1. Use Case Diagram
Models user roles (Actors) and their interactions with the platform's features.

```mermaid
usecaseDiagram
    actor Citizen
    actor GIE_Brain as Governance Intelligence Engine (AI)
    actor Commissioner as Zonal Commissioner
    actor Engineer as Field Engineer

    rectangle CURE_System {
        usecase UC1 as "File Multi-lingual Grievance"
        usecase UC2 as "Scan Photo via Computer Vision"
        usecase UC3 as "Track Timeline & Delay Explanation"
        usecase UC4 as "Recalculate Ward Health Indices"
        usecase UC5 as "Simulate Complex Scenarios"
        usecase UC6 as "Audit Budgets (Ethics Engine)"
        usecase UC7 as "Complete Joint Work Order (JWO)"
        usecase UC8 as "Submit Repair Feedback (AI Learning)"
    }

    Citizen --> UC1
    Citizen --> UC2
    Citizen --> UC3
    Citizen --> UC8

    GIE_Brain --> UC1
    GIE_Brain --> UC2
    GIE_Brain --> UC4
    GIE_Brain --> UC6

    Commissioner --> UC4
    Commissioner --> UC5
    Commissioner --> UC6

    Engineer --> UC7
```

---

## 2. Class Diagram
Represents the structural static classes, attribute data types, and method signatures inside CURE.

```mermaid
classDiagram
    class CitizenGateway {
        +complaintText: String
        +activeLanguage: String
        +activeVisionImage: Object
        +recordVoice(): void
        +submitGrievance(): void
        +giveFeedback(rating: int): void
    }

    class Complaint {
        +complaintId: Integer
        +category: String
        +details: String
        +location: String
        +priority: String
        +confidence: Float
        +status: String
        +parseNLP(): void
        +detectDuplicates(): Boolean
        +routeDepartment(): void
    }

    class JointWorkOrder {
        +orderId: String
        +title: String
        +assignedDepartments: List
        +estimatedCompletion: Date
        +dispatchCrews(): void
        +resolveOrder(): void
    }

    class DigitalTwin {
        +wardName: String
        +roadHealth: Integer
        +drainHealth: Integer
        +lightHealth: Integer
        +garbageHealth: Integer
        +resilienceIndex: Integer
        +recalculateIndices(): void
        +updateMapColors(): void
    }

    class MultiAgentEngine {
        +activeAgents: List
        +activeScenario: String
        +triggerDebate(): String
        +allocateContingency(): void
    }

    class TemporalGraph {
        +nodes: List
        +edges: List
        +hoveredNode: Object
        +drawCanvas(): void
        +calculateDistance(): Float
    }

    CitizenGateway "1" --> "1..*" Complaint : files
    Complaint "1" --> "0..1" JointWorkOrder : generates
    JointWorkOrder "*" --> "1" DigitalTwin : updates
    MultiAgentEngine "1" --> "*" JointWorkOrder : coordinates
    Complaint "*" --> "1" TemporalGraph : updates_nodes
```

---

## 3. Sequence Diagram (Grievance to Learning Loop)
Models the dynamic step-by-step interactions and message passing between components.

```mermaid
sequenceDiagram
    autonumber
    actor Citizen
    participant Gate as Citizen Gateway
    participant Brain as GIE Core AI
    participant Twin as Ward Digital Twin
    participant Ops as Operations Hub
    participant Log as Learning Log

    Citizen->>Gate: Inputs Voice / Scans Photo
    Gate->>Brain: Sends raw text & image data
    Note over Brain: Runs NLP Classifier & CV Object Scan
    Brain->>Brain: Checks duplicate coordinates (<100m)
    alt is duplicate
        Brain-->>Gate: Merges ticket & links citizen
    else is unique
        Brain->>Brain: Applies Proximity & Priority Weights
        Brain->>Ops: Creates Joint Work Order (JWO)
        Brain->>Twin: Recalculates Health Scores
        Twin-->>Gate: Redraws SVG map path colors (Green -> Red)
        Gate-->>Citizen: Renders Timeline Tracker & Root-cause Explanation
    end
    
    Note over Ops: Crews complete repairs
    Citizen->>Gate: Submits feedback rating (e.g., negative rating)
    Gate->>Brain: Evaluates Sentiment Analyzer
    Brain->>Log: Appends adaptive learning row
    Log->>Brain: Reinforces material coefficients (Concrete +18%)
    Brain->>Twin: Restores overall Resilience Index
```

---

## 4. Activity Diagram
Represents the procedural workflow of CURE's internal GIE engine when a citizen logs a ticket.

```mermaid
stateDiagram-v2
    [*] --> VoiceTextFiled : Citizen logs Complaint
    VoiceTextFiled --> NLP_Parsing : Runs Language Parser
    NLP_Parsing --> LocationExtraction : Identifies Ward coordinates
    
    state DuplicateCheck <<choice>>
    LocationExtraction --> DuplicateCheck : Within 100m of active ticket?
    
    DuplicateCheck --> MergeTicket : Yes
    MergeTicket --> [*] : Citizen linked to Master Ticket
    
    DuplicateCheck --> PriorityRouting : No
    
    state PriorityEvaluation <<choice>>
    PriorityRouting --> PriorityEvaluation : Near Apollo Hospital (<50m)?
    
    PriorityEvaluation --> EmergencyPriority : Yes (Elevate Safety Weight)
    PriorityEvaluation --> StandardPriority : No (Residential Area)
    
    EmergencyPriority --> JWO_Creation : Create Joint Roads + Sewerage Order
    StandardPriority --> SingleDeptRoute : Create Single Department Dispatch
    
    JWO_Creation --> DigitalTwinRecalc : Recalculate Ward Indicators
    SingleDeptRoute --> DigitalTwinRecalc
    
    DigitalTwinRecalc --> MapColorSync : Redraw SVG Map Network
    MapColorSync --> TrackerActive : Display Timeline to Citizen
    TrackerActive --> [*] : Awaiting Repair Completion
```

---

## 5. Flowchart: Duplicate Search & Routing Logic
Details the programmatic conditional logic checks executed by GIE.

```mermaid
flowchart TD
    Start([Receive Complaint Query]) --> NLP[Run NLP Parser: Extract Category & Location]
    NLP --> SQL[Query Active Complaint Logs]
    SQL --> DistCheck{Is coordinate distance < 100m from active ticket?}
    
    DistCheck -- Yes --> CatCheck{Is Category identical?}
    CatCheck -- Yes --> Merge[Merge into Master Ticket & Notify Citizen] --> End([End Process])
    
    DistCheck -- No --> NewTicket[Create New Master Complaint ID]
    CatCheck -- No --> NewTicket
    
    NewTicket --> Proximity{Is location < 50m from Hospital / School?}
    Proximity -- Yes --> HighPriority[Assign EMERGENCY / CRITICAL Priority]
    Proximity -- No --> RainCheck{Is current weather Rainfall > 60mm?}
    
    RainCheck -- Yes --> HighPriority
    RainCheck -- No --> Standard[Assign MEDIUM / LOW Priority]
    
    HighPriority --> MultiDept{Does issue affect multiple sectors?}
    Standard --> MultiDept
    
    MultiDept -- Yes --> JWO[Generate Joint Work Order roads + water + traffic]
    MultiDept -- No --> Single[Generate Standard Single Department order]
    
    JWO --> TwinSync[Sync Digital Twin & Redraw Map]
    Single --> TwinSync
    
    TwinSync --> Active([Dispatcher Active])
```
