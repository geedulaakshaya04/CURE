/**
 * CURE: City Unified Response & Evolution Platform
 * Core Application Controller - Version 6.1
 * Closed-Loop Civic Response & Systems Intelligence
 * Rule: every major screen consumes or produces shared CURE state.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DATA TAXONOMY & STATE MANAGEMENT
    // ==========================================
    
    const TAXONOMY = {
        "Roads & Footpaths": {
            icon: "🛣️",
            agency: "GHMC Roads & Infrastructure Engineering",
            subproblems: [
                "Pothole", "Damaged road", "Broken footpath", "Uneven pavement",
                "Open manhole", "Damaged manhole cover", "Road cracks", "Road cave-in",
                "Missing road markings", "Damaged speed breaker", "Broken divider",
                "Damaged railing", "Dangerous road edge", "Construction debris on road"
            ],
            defaultDesc: "Pothole and road surface deterioration causing vehicle traffic hazard."
        },
        "Drainage & Waterlogging": {
            icon: "🌧️",
            agency: "HMWS&SB (Water & Sewerage) + GHMC Stormwater Drainage",
            subproblems: [
                "Water stagnation", "Drain blockage", "Overflowing drain", "Open drain",
                "Broken drain", "Sewage overflow", "Flooded road", "Manhole overflow",
                "Bad smell from drain", "Rainwater not flowing", "Drain cover missing", "Mosquito breeding area"
            ],
            defaultDesc: "Blocked stormwater drain causing water stagnation and flooding road surface."
        },
        "Garbage & Cleanliness": {
            icon: "🗑️",
            agency: "GHMC Solid Waste Management (Sanitation Wing)",
            subproblems: [
                "Garbage not collected", "Garbage dumped illegally", "Overflowing bin",
                "Garbage burning", "Construction waste", "Dead animal", "Dirty public area",
                "Street cleaning issue", "Waste collection vehicle issue", "Bad smell", "Littering hotspot"
            ],
            defaultDesc: "Uncollected garbage and waste accumulation causing foul smell and health concern."
        },
        "Streetlights & Electrical Issues": {
            icon: "💡",
            agency: "TSSPDCL Electrical Wing + GHMC Electrical",
            subproblems: [
                "Streetlight not working", "Multiple lights not working", "Flickering light",
                "Broken light pole", "Damaged electrical box", "Dark street", "Dangerous exposed wiring"
            ],
            defaultDesc: "Dark street with non-functional light pole creating pedestrian safety concern."
        },
        "Water Problems": {
            icon: "💧",
            agency: "HMWS&SB (Hyderabad Metropolitan Water Supply & Sewerage Board)",
            subproblems: [
                "No water supply", "Low water pressure", "Water leakage", "Pipeline leakage",
                "Contaminated-looking water", "Broken water pipe", "Overflowing water",
                "Illegal connection concern", "Damaged water infrastructure"
            ],
            defaultDesc: "Underground drinking water pipeline leakage flooding the street."
        },
        "Traffic & Road Safety": {
            icon: "🚦",
            agency: "Hyderabad Traffic Police + GHMC Traffic Engineering",
            subproblems: [
                "Broken traffic signal", "Signal not working", "Missing road sign",
                "Damaged sign", "Illegal obstruction", "Unsafe junction", "Parking obstruction",
                "Missing pedestrian crossing", "Damaged traffic infrastructure"
            ],
            defaultDesc: "Traffic signal malfunction causing traffic gridlock at intersection."
        },
        "Parks & Public Places": {
            icon: "🌳",
            agency: "GHMC Urban Biodiversity & Parks Division",
            subproblems: [
                "Park maintenance issue", "Broken bench", "Broken play equipment",
                "Damaged fencing", "Poor lighting", "Unclean park", "Fallen tree",
                "Overgrown vegetation", "Damaged walking path", "Public toilet issue"
            ],
            defaultDesc: "Public park walkway damaged and lighting not operational."
        },
        "Construction & Obstructions": {
            icon: "🏗️",
            agency: "GHMC Town Planning & Enforcement Section",
            subproblems: [
                "Construction debris", "Unsafe excavation", "Road obstruction",
                "Building-related civic complaint", "Drain blocked by construction",
                "Encroachment concern", "Footpath obstruction", "Dust from construction"
            ],
            defaultDesc: "Unsafe excavation and building debris blocking pedestrian footpath."
        },
        "Sanitation & Public Health": {
            icon: "🏥",
            agency: "GHMC Directorate of Public Health",
            subproblems: [
                "Mosquito breeding", "Unsanitary public area", "Open sewage",
                "Waste accumulation", "Animal-related sanitation issue",
                "Public toilet issue", "Potential health hazard"
            ],
            defaultDesc: "Open sewage stagnation creating mosquito breeding hotspot."
        },
        "Animal-Related Issues": {
            icon: "🐕",
            agency: "GHMC Veterinary Section & Animal Care",
            subproblems: [
                "Stray animal concern", "Dead animal", "Animal-related obstruction",
                "Injured animal", "Animal nuisance"
            ],
            defaultDesc: "Stray animal group causing safety hazard near public crossing."
        },
        "Trees & Environment": {
            icon: "🌿",
            agency: "GHMC Urban Biodiversity & Forest Wing",
            subproblems: [
                "Fallen tree", "Dangerous branch", "Tree obstruction",
                "Illegal dumping", "Water pollution concern", "Public-area environmental issue", "Open burning"
            ],
            defaultDesc: "Fallen tree branch obstructing traffic flow following heavy rain."
        },
        "Emergency / Immediate Danger": {
            icon: "🚨",
            agency: "112 National Emergency Response Dispatch",
            subproblems: [
                "Fire in building", "Severe road cave-in", "Exposed high voltage wire",
                "Building structural collapse", "Major hazardous gas leak"
            ],
            defaultDesc: "Immediate public safety hazard requiring direct emergency services dispatch."
        }
    };

    // Aliases for backwards compatibility
    TAXONOMY["Drainage & Flooding"] = TAXONOMY["Drainage & Waterlogging"];
    TAXONOMY["Streetlights & Electricity"] = TAXONOMY["Streetlights & Electrical Issues"];
    TAXONOMY["Water Supply"] = TAXONOMY["Water Problems"];
    TAXONOMY["Traffic & Safety"] = TAXONOMY["Traffic & Road Safety"];
    TAXONOMY["Parks & Public Spaces"] = TAXONOMY["Parks & Public Places"];
    TAXONOMY["Construction / Building"] = TAXONOMY["Construction & Obstructions"];
    TAXONOMY["Public Health / Sanitation"] = TAXONOMY["Sanitation & Public Health"];
    TAXONOMY["Animals"] = TAXONOMY["Animal-Related Issues"];
    TAXONOMY["Emergency Situation"] = TAXONOMY["Emergency / Immediate Danger"];

    const LIFECYCLE_STAGES = ["RECEIVED", "ASSIGNED", "INSPECTION", "ACTION", "VERIFICATION", "CLOSED"];

    function createInitialCureState() {
        return {
            selectedCategory: "Drainage & Waterlogging",
            selectedSubproblem: "Water stagnation",
            reportedLocation: "Road No. 36, Ward 45 (Jubilee Hills), Hyderabad",
            inputDescription: "",
            inputMethod: "type",
            activeTicket: {
                id: "CURE-2026-00142",
                citizenQuote: "The road is breaking apart and water is overflowing from the drain.",
                location: "Road No. 36, Ward 45 (Jubilee Hills), Hyderabad",
                assets: ["Drain D-104", "Road R-36"]
            },
            ticketStatus: "INSPECTION",
            lifecycle: {
                currentStage: 3,
                selectedAuditStage: 3
            },
            recurrenceDetected: false,
            recurrenceAlerts: [],
            rootCauseSelection: null,
            knowledgeGraphSelection: "pothole",
            selectedAsset: "drain-104",
            jointWorkOrder: {
                id: "CURE-JWO-2026-009",
                status: "draft",
                authorized: false
            },
            officerOps: {
                clearanceRequested: false,
                trafficNotified: false,
                worksCompleted: false
            },
            auth: {
                citizen: {
                    isAuthenticated: false,
                    mobile: "9876543210",
                    name: "Akshaya"
                },
                officer: {
                    isAuthenticated: false,
                    empId: "GHMC-ENG-4501",
                    role: "Assistant Engineer — Ward 45"
                },
                pendingCitizenSubtab: "subtab-report"
            },
            isDemoPlaying: false,
            demoInterval: null
        };
    }

    let state = createInitialCureState();

    // DOM Elements cache
    const elements = {
        // Welcome
        welcomeScreen: document.getElementById('welcome-screen'),
        welcomeFill: document.getElementById('welcome-loader-fill'),
        welcomeStatus: document.getElementById('welcome-status-lbl'),
        
        // Navigation & Views
        navButtons: document.querySelectorAll('.nav-tab-btn'),
        portalViews: document.querySelectorAll('.portal-view'),
        citizenSubnavBtns: document.querySelectorAll('.citizen-subnav .subnav-btn'),
        citizenSubtabViews: document.querySelectorAll('.citizen-subtab-view'),
        
        // Home Action Cards
        btnHomeReport: document.getElementById('btn-home-report'),
        btnHomeTrack: document.getElementById('btn-home-track'),
        btnHomeMycure: document.getElementById('btn-home-mycure'),
        btnHomeOpenGov: document.getElementById('btn-home-open-gov'),
        
        // Citizen Wizard
        wizardSteps: document.querySelectorAll('.w-step'),
        wizardStepContents: document.querySelectorAll('.wizard-step-content'),
        categoryCards: document.querySelectorAll('.friendly-category-card'),
        subproblemChipsBox: document.getElementById('subproblem-chips-box'),
        chipsCloudTarget: document.getElementById('chips-cloud-target'),
        subproblemCatTitle: document.getElementById('subproblem-cat-title'),
        btnStep1Next: document.getElementById('btn-wizard-step1-next'),
        emergencyAlertBanner: document.getElementById('emergency-alert-banner'),
        
        // Inputs
        methodTabs: document.querySelectorAll('.method-tab'),
        methodPanes: document.querySelectorAll('.method-pane'),
        inputText: document.getElementById('citizen-input-text'),
        langButtons: document.querySelectorAll('.btn-lang'),
        voiceSimBox: document.getElementById('voice-sim-box'),
        voiceStatusMsg: document.getElementById('voice-status-msg'),
        photoUploadTrigger: document.getElementById('citizen-photo-upload-trigger'),
        photoPreview: document.getElementById('citizen-photo-preview'),
        photoImg: document.getElementById('citizen-photo-img'),
        scanProgressBar: document.getElementById('scan-progress-bar'),
        scanResultLbl: document.getElementById('scan-result-lbl'),
        
        // Location
        btnCitizenGps: document.getElementById('btn-citizen-gps'),
        inputLocation: document.getElementById('citizen-input-location'),
        lblSelectedCoords: document.getElementById('lbl-selected-coords'),
        
        // Review & Submit
        lblReviewSummary: document.getElementById('lbl-review-summary'),
        lblReviewCategory: document.getElementById('lbl-review-category'),
        lblReviewLocation: document.getElementById('lbl-review-location'),
        lblReviewAgency: document.getElementById('lbl-review-agency'),
        btnSubmitFinal: document.getElementById('btn-citizen-submit-final'),
        
        // Receipt
        citizenWizardCard: document.getElementById('citizen-wizard-card'),
        ticketReceipt: document.getElementById('ticket-receipt'),
        receiptTicketId: document.getElementById('receipt-ticket-id'),
        btnReceiptTrack: document.getElementById('btn-receipt-track'),
        
        // Tracking
        timelineNodes: document.querySelectorAll('.swiggy-timeline .timeline-node'),
        btnVerifyYes: document.getElementById('btn-verify-yes'),
        btnVerifyNo: document.getElementById('btn-verify-no'),
        verifyVerdictMsg: document.getElementById('verify-verdict-msg'),
        recurrenceActionBox: document.getElementById('recurrence-action-box'),
        btnGotoRootcause: document.getElementById('btn-goto-rootcause'),
        citizenTicketStatus: document.getElementById('citizen-ticket-status'),
        queueStatusQ1: document.getElementById('queue-status-q1'),
        officerLifecycleTrack: document.getElementById('officer-lifecycle-track'),
        officerStageAudit: document.getElementById('officer-stage-audit-details'),
        govRecurrenceAlertStrip: document.getElementById('gov-recurrence-alert-strip'),
        btnInspectRecurrence: document.getElementById('btn-inspect-recurrence'),
        rcNodes: document.querySelectorAll('.rc-node[data-rc]'),
        rcNodeDrawer: document.getElementById('rc-node-drawer'),
        rcDrawerTitle: document.getElementById('rc-drawer-title'),
        rcDrawerBody: document.getElementById('rc-drawer-body'),
        btnCloseRcDrawer: document.getElementById('btn-close-rc-drawer'),
        gnodeTree: document.getElementById('gnode-tree'),
        twinAssetHistory: document.getElementById('twin-asset-history'),
        jwoGeneratedCard: document.getElementById('jwo-generated-card'),
        jwoIdLabel: document.getElementById('jwo-id-label'),
        jwoStatusBadge: document.getElementById('jwo-status-badge'),
        jwoStatusTrack: document.getElementById('jwo-status-track'),
        
        // Chatbot
        chatLogs: document.getElementById('chat-logs'),
        chatInput: document.getElementById('chat-input'),
        btnChatSend: document.getElementById('btn-chat-send'),
        chatPresetBtns: document.querySelectorAll('.chat-preset-btn'),
        
        // Officer Desk Elements
        queueRows: document.querySelectorAll('.officer-table .queue-row'),
        officerDetailTitle: document.getElementById('officer-detail-title'),
        officerDetailPriority: document.getElementById('officer-detail-priority'),
        officerDetailReport: document.getElementById('officer-detail-report'),
        officerDetailLocation: document.getElementById('officer-detail-location'),
        officerDetailInfra: document.getElementById('officer-detail-infra'),
        officerDetailHistory: document.getElementById('officer-detail-history'),
        officerDetailAgencies: document.getElementById('officer-detail-agencies'),
        btnReqClearance: document.getElementById('btn-request-clearance'),
        btnNotifyTraffic: document.getElementById('btn-notify-traffic'),
        btnIssueWorkOrder: document.getElementById('btn-issue-workorder'),
        officerCoordinationLog: document.getElementById('officer-coordination-log'),
        logLine2: document.getElementById('log-line-2'),
        logLine3: document.getElementById('log-line-3'),
        badgeDepRoads: document.getElementById('badge-dep-roads'),
        badgeDepWater: document.getElementById('badge-dep-water'),
        badgeDepPolice: document.getElementById('badge-dep-police'),

        // Gov Dashboard
        healthScoreCards: document.querySelectorAll('.health-score-card'),
        govDiagnosticDrawer: document.getElementById('gov-diagnostic-drawer'),
        diagTitle: document.getElementById('diag-title'),
        diagBody: document.getElementById('diag-body'),
        btnCloseDiagnostic: document.getElementById('btn-close-diagnostic'),
        
        // Evidence Modal & Root Cause Engine
        evidenceModal: document.getElementById('evidence-modal'),
        btnViewEvidence: document.getElementById('btn-view-evidence'),
        btnInvestigateCause: document.getElementById('btn-investigate-cause'),
        btnCloseEvidence: document.getElementById('btn-close-evidence'),
        btnModalInvestigate: document.getElementById('btn-modal-investigate'),

        // Knowledge Graph
        graphNodes: document.querySelectorAll('.graph-node'),
        gnodeDetailTitle: document.getElementById('gnode-detail-title'),
        gnodeDetailConnections: document.getElementById('gnode-detail-connections'),
        gnodeDesc: document.getElementById('gnode-desc'),
        
        // Digital Twin
        twinLayers: document.querySelectorAll('.twin-layer'),
        twinTitle: document.getElementById('twin-title'),
        twinType: document.getElementById('twin-type'),
        twinStatus: document.getElementById('twin-status'),
        twinComplaints: document.getElementById('twin-complaints'),
        twinInspection: document.getElementById('twin-inspection'),
        btnTwinInspect: document.getElementById('btn-twin-inspect'),
        btnTwinWorkorder: document.getElementById('btn-twin-workorder'),
        btnTwinComplaints: document.getElementById('btn-twin-view-complaints'),
        
        // Joint Work Order & Simulator
        btnDispatchJwo: document.getElementById('btn-dispatch-jwo'),
        sliderSimInterval: document.getElementById('slider-sim-interval'),
        valSimInterval: document.getElementById('val-sim-interval'),
        outSimComplaints: document.getElementById('out-sim-complaints'),
        outSimCost: document.getElementById('out-sim-cost'),
        outSimFlood: document.getElementById('out-sim-flood'),
        outSimTrust: document.getElementById('out-sim-trust'),
        
        // Autoplay
        btnAutoplayDemo: document.getElementById('btn-autoplay-demo'),
        demoProgressBox: document.getElementById('demo-progress-box'),
        demoStatusLbl: document.getElementById('demo-status-lbl'),
        demoFill: document.getElementById('demo-fill'),
        demoCompleteModal: document.getElementById('demo-complete-modal'),
        btnCloseDemoModal: document.getElementById('btn-close-demo-modal'),
        liveClock: document.getElementById('live-clock'),

        // Authentication & Session Elements
        authSessionContainer: document.getElementById('auth-session-container'),
        
        // Citizen Login Gate
        citizenLoginGate: document.getElementById('citizen-login-gate'),
        citizenAuthWrapper: document.getElementById('citizen-authenticated-wrapper'),
        citizenAuthStep1: document.getElementById('citizen-auth-step-1'),
        citizenAuthStep2: document.getElementById('citizen-auth-step-2'),
        citizenMobileInput: document.getElementById('citizen-mobile-input'),
        btnCitizenQuickMobile: document.getElementById('btn-citizen-quick-mobile'),
        btnCitizenSendOtp: document.getElementById('btn-citizen-send-otp'),
        dispCitizenMobileTarget: document.getElementById('disp-citizen-mobile-target'),
        citizenOtpInput: document.getElementById('citizen-otp-input'),
        btnCitizenBackMobile: document.getElementById('btn-citizen-back-mobile'),
        btnCitizenQuickOtp: document.getElementById('btn-citizen-quick-otp'),
        btnCitizenVerifyOtp: document.getElementById('btn-citizen-verify-otp'),
        btnHomeQuickSignin: document.getElementById('btn-home-quick-signin'),
        btnLoginSkipToHome: document.getElementById('btn-login-skip-to-home'),

        // Officer Login Gate
        officerLoginGate: document.getElementById('officer-login-gate'),
        officerAuthWrapper: document.getElementById('officer-authenticated-wrapper'),
        officerIdInput: document.getElementById('officer-id-input'),
        officerPinInput: document.getElementById('officer-pin-input'),
        btnOfficerDemoAutofill: document.getElementById('btn-officer-demo-autofill'),
        btnOfficerLoginSubmit: document.getElementById('btn-officer-login-submit'),

        // Gov Login Gate
        govLoginGate: document.getElementById('gov-login-gate'),
        govAuthWrapper: document.getElementById('gov-authenticated-wrapper'),
        govOfficerIdInput: document.getElementById('gov-officer-id-input'),
        govOfficerPinInput: document.getElementById('gov-officer-pin-input'),
        btnGovDemoAutofill: document.getElementById('btn-gov-demo-autofill'),
        btnGovLoginSubmit: document.getElementById('btn-gov-login-submit')
    };

    // ==========================================
    // 2. TOAST SYSTEM
    // ==========================================
    function showToast(message, type = 'teal') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconClass = 'fa-circle-info';
        if (type === 'green') iconClass = 'fa-circle-check';
        if (type === 'rose') iconClass = 'fa-triangle-exclamation';
        if (type === 'amber') iconClass = 'fa-bell';
        if (type === 'purple') iconClass = 'fa-brain';

        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
            <div class="toast-text">${message}</div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ==========================================
    // 2b. SHARED CURE STATE → ALL SCREENS
    // ==========================================
    const LIFECYCLE_AUDIT = {
        1: {
            title: "RECEIVED",
            when: "2026-08-14 09:12 AM",
            who: "CURE Intake Router",
            what: "Citizen report accepted and classified as drainage overflow with associated road-surface damage.",
            evidence: "Ticket CURE-2026-00142 created from Citizen Portal.",
            remarks: "Multi-agency routing flagged because the report mentions both road and drain."
        },
        2: {
            title: "ASSIGNED",
            when: "2026-08-14 09:18 AM",
            who: "Assistant Engineer — Ward 45",
            what: "Case assigned to Field Inspection Team — Ward 45, with HMWS&SB Sub-Division 3 copied.",
            evidence: "Assignment log AE-W45-142",
            remarks: "Role-based assignment. No personal officer identity is stored in this prototype."
        },
        3: {
            title: "INSPECTION",
            when: "2026-08-14 04:05 PM",
            who: "Field Inspection Team — Ward 45",
            what: "On-site inspection recorded water overflow at Drain D-104 and pavement break on Road R-36.",
            evidence: "Field Photo Log #PH-887",
            remarks: "Surface patching without drain clearance flagged as insufficient."
        },
        4: {
            title: "ACTION",
            when: "2026-08-15 11:30 AM",
            who: "Field Inspection Team — Ward 45 & HMWS&SB Sub-Division 3",
            what: "Coordinated desilting suction deployed to Drain D-104; road sub-base dried and surface sealed.",
            evidence: "Field Photo Log #PH-892 (silt clearing recorded)",
            remarks: "Works marked complete pending citizen verification."
        },
        5: {
            title: "VERIFICATION",
            when: "Awaiting citizen response",
            who: "Citizen — Ward 45",
            what: "Citizen asked: Was the problem actually fixed?",
            evidence: "Verification prompt on Citizen Portal",
            remarks: "Case cannot close without citizen confirmation."
        },
        6: {
            title: "CLOSED",
            when: "—",
            who: "CURE Closed-Loop Controller",
            what: "Awaiting citizen confirmation.",
            evidence: "—",
            remarks: "Not closed until the citizen confirms the problem was actually fixed."
        }
    };

    const ROOT_CAUSE_DIAGNOSTICS = {
        rain: {
            title: "Heavy Rain",
            observed: "The prototype dataset records rainfall events coinciding with waterlogging and road-condition complaints at Ward 45, Road No. 36.",
            analysis: "Complaint timestamps cluster after precipitation events rather than appearing uniformly across dry periods.",
            hypothesis: "Intense rainfall may exceed local drain outflow and leave standing water on the carriageway.",
            validation: "Local rainfall logs and on-site ponding duration measurements during the next storm event."
        },
        drainage: {
            title: "Drainage Blockage",
            observed: "Drain D-104 is associated with the selected complaint cluster in the prototype dataset.",
            analysis: "Related complaints involve drainage/waterlogging and nearby road damage.",
            hypothesis: "Drainage obstruction may contribute to repeated water accumulation.",
            validation: "Field inspection and drain-condition verification."
        },
        waterlogging: {
            title: "Water Stagnation",
            observed: "Citizen reports describe standing water overflowing from the side drain onto Road R-36.",
            analysis: "Waterlogging records sit between drainage complaints and later pavement-damage tickets in the same coordinate cluster.",
            hypothesis: "Standing water may keep the pavement and sub-base wet long enough to weaken load-bearing capacity.",
            validation: "Field observation of ponding depth, duration, and whether water recedes after drain clearance."
        },
        roadbase: {
            title: "Road Base Weakening",
            observed: "The prototype dataset contains repeated pavement-damage tickets at the same stretch after prior surface repairs.",
            analysis: "Pothole complaints are associated with locations experiencing drainage-related waterlogging and road-condition issues.",
            hypothesis: "Persistent drainage-related waterlogging may contribute to weakening of the road sub-base and recurring pavement damage. Field validation required.",
            validation: "Subgrade inspection and comparison of repair durability after drainage works versus surface-only patches."
        },
        pothole: {
            title: "Pothole Formation",
            observed: "Ticket CURE-2026-00142 and related cluster records describe breaking pavement at Road No. 36.",
            analysis: "Pothole complaints reappear at coordinates also tagged with drain overflow, rather than as isolated surface defects.",
            hypothesis: "Repeated surface repair without addressing nearby drainage conditions may allow the same failure to return.",
            validation: "Post-repair citizen verification plus a follow-up field check after the next rainfall."
        },
        report: {
            title: "Citizen Report",
            observed: "Citizen stated: “The road is breaking apart and water is overflowing from the drain.”",
            analysis: "CURE classified one report as two related municipal domains (drainage and roads) instead of two disconnected tickets.",
            hypothesis: "A single field observation can be a systems signal when it names more than one failing asset.",
            validation: "Officer inspection confirming whether both assets are involved at the reported location."
        },
        patch: {
            title: "Quick Surface Repair",
            observed: "Prototype history for Road R-36 includes prior surface patching at this cluster.",
            analysis: "Complaints return after patching in locations also associated with drainage issues.",
            hypothesis: "Asphalt patching alone may not hold if water continues to collect at Drain D-104.",
            validation: "Compare durability of coordinated drain-plus-road works against surface-only repairs."
        }
    };

    const GRAPH_NODE_DETAILS = {
        pothole: {
            title: "Pothole",
            connections: "Road • Waterlogging • Drainage • Weather • Maintenance • Citizen complaints",
            tree: "Pothole\n ├─ Road condition (R-36)\n ├─ Waterlogging\n │   └─ Drainage (D-104)\n └─ Citizen complaint cluster",
            why: "This connection is shown because the prototype dataset associates pothole tickets at this coordinate cluster with drainage-related waterlogging records. It is a working relationship for investigation, not a validated statistical correlation."
        },
        weather: {
            title: "Weather",
            connections: "Drainage network • Waterlogging • Citizen reports after rainfall",
            tree: "Weather\n └─ Drainage (D-104)\n     └─ Waterlogging\n         └─ Road / Pothole complaints",
            why: "This connection is shown because complaint timestamps in the prototype set cluster after rainfall events at Ward 45. Local meteorological validation is still required."
        },
        drainage: {
            title: "Drainage",
            connections: "Weather • Maintenance • Waterlogging • Road R-36",
            tree: "Drainage (D-104)\n ├─ Weather / rainfall load\n ├─ Maintenance history\n └─ Waterlogging\n     └─ Road damage / pothole",
            why: "This connection is shown because Drain D-104 is the infrastructure ID attached to the selected complaint cluster. The link is dataset association, pending field confirmation of blockage."
        },
        waterlogging: {
            title: "Waterlogging",
            connections: "Drainage • Road subgrade • Pothole • Citizen reports",
            tree: "Waterlogging\n ├─ Drainage obstruction (D-104)\n └─ Road R-36\n     └─ Pothole / citizen report",
            why: "This connection is shown because citizen language and nearby tickets describe standing water together with pavement damage. The causal direction remains a hypothesis."
        },
        maintenance: {
            title: "Maintenance",
            connections: "Drainage • Road infrastructure • Coordinated work orders",
            tree: "Maintenance\n ├─ Drain desilting (D-104)\n └─ Pavement repair (R-36)\n     └─ Citizen verification",
            why: "This connection is shown to contrast isolated surface patching with coordinated drain-and-road work. Historical sequencing in the prototype is illustrative."
        },
        road: {
            title: "Road",
            connections: "Waterlogging • Maintenance • Pothole",
            tree: "Road (R-36)\n ├─ Waterlogging from D-104\n ├─ Maintenance / patching\n └─ Pothole complaints",
            why: "This connection is shown because Road R-36 is the pavement asset recorded against the active ticket and nearby cluster. Condition still requires local inspection."
        },
        complaint: {
            title: "Complaint",
            connections: "Citizen • Pothole • Waterlogging • Drain D-104",
            tree: "Complaint CURE-2026-00142\n ├─ Citizen verification loop\n ├─ Pothole / road surface\n └─ Drainage overflow",
            why: "This connection is shown because one citizen report named both overflowing drain and breaking road, so CURE keeps them on the same ticket instead of splitting the signal."
        },
        citizen: {
            title: "Citizen",
            connections: "Complaint • Verification loop • Recurrence detection",
            tree: "Citizen\n ├─ Report\n └─ “Was it actually fixed?”\n     ├─ YES → Close\n     └─ NO → Reopen / recurrence",
            why: "This connection is shown because citizen verification is the accountability gate: CURE does not treat officer completion as closure until the citizen confirms the problem is gone."
        }
    };

    const TWIN_DETAILS = {
        "drain-104": {
            title: "Drain ID: D-104",
            type: "Storm-water drain",
            status: "Needs review",
            complaints: "12 (prototype cluster)",
            inspection: "Last recorded inspection in prototype log",
            history: ["inspection:done", "maintenance:done", "complaint:active", "action:pending", "verification:pending"]
        },
        "road-36": {
            title: "Road ID: R-36",
            type: "Bituminous pavement",
            status: "Watch",
            complaints: "Associated pothole cluster",
            inspection: "Surface condition pending post-drain clearance",
            history: ["inspection:done", "maintenance:done", "complaint:active", "action:pending", "verification:pending"]
        },
        "light-12": {
            title: "Streetlight ID: SL-12",
            type: "Street lighting asset",
            status: "Healthy",
            complaints: "1 (separate ticket)",
            inspection: "Prototype record only",
            history: ["inspection:done", "maintenance:done", "complaint:done", "action:done", "verification:pending"]
        }
    };

    function statusBadgeClass(status) {
        if (status === "CLOSED") return "badge badge-success";
        if (status === "REOPENED" || status === "POSSIBLE RECURRENCE") return "badge badge-danger";
        if (status === "VERIFICATION") return "badge badge-info";
        if (status === "ACTION") return "badge badge-info";
        return "badge badge-warning";
    }

    function renderLifecycleAudit(stageNum) {
        const audit = LIFECYCLE_AUDIT[stageNum];
        if (!audit || !elements.officerStageAudit) return;

        let extra = "";
        if (state.ticketStatus === "REOPENED" && stageNum >= 5) {
            extra = `<div style="margin-top:6px;color:var(--danger-red);"><strong>Remarks:</strong> Citizen reported the problem still exists. Ticket reopened. Possible recurrence detected.</div>`;
        }
        if (state.ticketStatus === "CLOSED" && stageNum === 6) {
            extra = `<div style="margin-top:6px;color:var(--success-green);"><strong>Remarks:</strong> Citizen confirmed the problem was fixed. Case closed.</div>`;
        }

        elements.officerStageAudit.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <strong style="color: var(--primary-navy);">Stage: ${audit.title}</strong>
                <span style="color: var(--muted-slate);">${state.ticketStatus === "CLOSED" && stageNum === 6 ? "Citizen confirmed" : audit.when}</span>
            </div>
            <div><strong>When:</strong> ${state.ticketStatus === "CLOSED" && stageNum === 6 ? "After citizen verification" : audit.when}</div>
            <div><strong>Who:</strong> ${audit.who}</div>
            <div><strong>What happened:</strong> ${audit.what}</div>
            <div><strong>Evidence:</strong> ${audit.evidence}</div>
            <div><strong>Remarks:</strong> ${audit.remarks}</div>
            ${extra}
        `;
    }

    function renderOfficerLifecycle() {
        const steps = document.querySelectorAll('#officer-lifecycle-track .lc-step');
        const current = state.lifecycle.currentStage;
        steps.forEach((step) => {
            const stageNum = parseInt(step.getAttribute('data-stage'), 10);
            const iconEl = step.querySelector('.lc-dot');
            step.classList.remove('completed', 'active', 'reopened');
            if (state.ticketStatus === "REOPENED" && stageNum === current) {
                step.classList.add('reopened');
                if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
            } else if (stageNum < current) {
                step.classList.add('completed');
                if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else if (stageNum === current) {
                step.classList.add('active');
                if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-circle-dot"></i>';
            } else {
                if (iconEl) iconEl.textContent = '○';
            }
        });
        renderLifecycleAudit(state.lifecycle.selectedAuditStage || current);
    }

    function renderCitizenTimeline() {
        const stageIndex = state.lifecycle.currentStage;
        elements.timelineNodes.forEach((node, idx) => {
            const stepNum = idx + 1;
            node.classList.remove('active', 'completed');
            const iconEl = node.querySelector('.node-icon');
            if (stepNum < stageIndex || (state.ticketStatus === "CLOSED" && stepNum <= 6)) {
                node.classList.add('completed');
                if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else if (stepNum === stageIndex) {
                node.classList.add('active');
                if (iconEl) iconEl.innerHTML = state.ticketStatus === "REOPENED"
                    ? '<i class="fa-solid fa-rotate-left"></i>'
                    : '<i class="fa-solid fa-circle-dot"></i>';
            } else if (iconEl) {
                iconEl.textContent = '○';
            }
        });
    }

    function renderTwinHistory(assetKey) {
        const data = TWIN_DETAILS[assetKey] || TWIN_DETAILS["drain-104"];
        if (!elements.twinAssetHistory) return;
        const labels = ["Inspection", "Maintenance", "Complaint", "Action", "Verification"];
        const keys = ["inspection", "maintenance", "complaint", "action", "verification"];
        elements.twinAssetHistory.innerHTML = keys.map((key, i) => {
            const rec = (data.history || []).find(h => h.startsWith(key)) || `${key}:pending`;
            const mode = rec.split(":")[1];
            const cls = mode === "done" ? "completed" : (mode === "active" ? "active" : "");
            const arrow = i < keys.length - 1 ? `<div class="twin-h-arrow">↓</div>` : "";
            return `<div class="twin-h-step ${cls}"><span>${labels[i]}</span></div>${arrow}`;
        }).join("");
    }

    function renderJointWorkOrder() {
        if (!elements.jwoGeneratedCard) return;
        const jwo = state.jointWorkOrder;
        if (!jwo.authorized && jwo.status === "draft") {
            elements.jwoGeneratedCard.style.display = "none";
            if (elements.btnDispatchJwo) {
                elements.btnDispatchJwo.disabled = false;
                elements.btnDispatchJwo.innerHTML = '<i class="fa-solid fa-bolt"></i> Authorize Coordinated Intervention';
            }
            return;
        }
        elements.jwoGeneratedCard.style.display = "block";
        if (elements.jwoIdLabel) elements.jwoIdLabel.textContent = jwo.id;
        if (elements.jwoStatusBadge) {
            elements.jwoStatusBadge.textContent = jwo.status.charAt(0).toUpperCase() + jwo.status.slice(1);
            elements.jwoStatusBadge.className = jwo.status === "dispatched" ? "badge badge-success" : "badge badge-info";
        }
        const pills = document.querySelectorAll('#jwo-status-track .jwo-st');
        const order = ["draft", "authorized", "dispatched"];
        const idx = order.indexOf(jwo.status);
        pills.forEach((p) => {
            const key = p.getAttribute('data-jwo');
            p.classList.remove('active', 'done');
            const pIdx = order.indexOf(key);
            if (pIdx < idx) p.classList.add('done');
            if (pIdx === idx) p.classList.add('active');
        });
        if (elements.btnDispatchJwo && jwo.authorized) {
            elements.btnDispatchJwo.disabled = true;
            elements.btnDispatchJwo.innerHTML = '<i class="fa-solid fa-check"></i> Coordinated Intervention Authorized';
        }
    }

    function openRootCauseNode(key) {
        const diag = ROOT_CAUSE_DIAGNOSTICS[key];
        if (!diag) return;
        state.rootCauseSelection = key;
        elements.rcNodes.forEach(n => n.classList.toggle('active-rc', n.getAttribute('data-rc') === key));
        if (elements.rcNodeDrawer) elements.rcNodeDrawer.style.display = "block";
        if (elements.rcDrawerTitle) elements.rcDrawerTitle.textContent = diag.title;
        if (elements.rcDrawerBody) {
            elements.rcDrawerBody.innerHTML = `
                <div class="diag-block observed"><strong>Observed</strong>${diag.observed}</div>
                <div class="diag-block analysis"><strong>Analysis</strong>${diag.analysis}</div>
                <div class="diag-block hypothesis"><strong>Hypothesis</strong>${diag.hypothesis}</div>
                <div class="diag-block validation"><strong>Validation required</strong>${diag.validation}</div>
            `;
        }
    }

    function selectKnowledgeGraphNode(key) {
        state.knowledgeGraphSelection = key;
        elements.graphNodes.forEach(n => n.classList.toggle('active', n.id === `gnode-${key}`));
        const info = GRAPH_NODE_DETAILS[key];
        if (!info) return;
        if (elements.gnodeDetailTitle) elements.gnodeDetailTitle.textContent = `Relationship: ${info.title}`;
        if (elements.gnodeDetailConnections) elements.gnodeDetailConnections.textContent = `Connected to: ${info.connections}`;
        if (elements.gnodeTree) {
            elements.gnodeTree.innerHTML = info.tree
                .split('\n')
                .map((line, i) => i === 0
                    ? `<div class="tree-root">${line}</div>`
                    : `<div class="tree-branch">${line.replace(/ /g, '&nbsp;')}</div>`)
                .join('');
        }
        if (elements.gnodeDesc) elements.gnodeDesc.textContent = info.why;
    }

    function selectTwinAsset(key) {
        state.selectedAsset = key;
        elements.twinLayers.forEach(l => l.classList.toggle('active', l.getAttribute('data-twin') === key));
        const data = TWIN_DETAILS[key];
        if (!data) return;
        if (elements.twinTitle) elements.twinTitle.textContent = data.title;
        if (elements.twinType) elements.twinType.textContent = data.type;
        if (elements.twinStatus) {
            elements.twinStatus.textContent = data.status;
            elements.twinStatus.className = data.status === "Healthy" ? "badge badge-success" : "badge badge-warning";
        }
        if (elements.twinComplaints) elements.twinComplaints.textContent = data.complaints;
        if (elements.twinInspection) elements.twinInspection.textContent = data.inspection;
        renderTwinHistory(key);
    }

    function syncCureScreens() {
        const status = state.ticketStatus;
        if (elements.citizenTicketStatus) {
            elements.citizenTicketStatus.textContent = status;
            elements.citizenTicketStatus.className = statusBadgeClass(status);
        }
        const mycureStage = document.getElementById('mycure-active-stage');
        if (mycureStage) {
            mycureStage.textContent = status;
            mycureStage.className = statusBadgeClass(status);
        }
        if (elements.queueStatusQ1) {
            const label = status === "REOPENED" ? "Reopened" : (status.charAt(0) + status.slice(1).toLowerCase());
            elements.queueStatusQ1.textContent = label;
            elements.queueStatusQ1.className = statusBadgeClass(status);
        }
        if (elements.officerDetailTitle) {
            const reopenTag = status === "REOPENED" ? " — REOPENED" : (status === "CLOSED" ? " — CLOSED" : "");
            elements.officerDetailTitle.innerHTML = `<i class="fa-solid fa-file-invoice" style="color: var(--primary-navy);"></i> Complaint Details: #${state.activeTicket.id}${reopenTag}`;
        }

        renderCitizenTimeline();
        renderOfficerLifecycle();
        renderJointWorkOrder();
        renderTwinHistory(state.selectedAsset);

        if (elements.recurrenceActionBox) {
            elements.recurrenceActionBox.style.display = state.recurrenceDetected ? "block" : "none";
        }
        if (elements.govRecurrenceAlertStrip) {
            elements.govRecurrenceAlertStrip.style.display = state.recurrenceDetected ? "flex" : "none";
        }

        if (status === "CLOSED" && elements.verifyVerdictMsg) {
            elements.verifyVerdictMsg.style.display = "block";
            elements.verifyVerdictMsg.style.color = "var(--success-green)";
            elements.verifyVerdictMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Ticket status: CLOSED. Citizen confirmed the problem was fixed.';
        } else if (status === "REOPENED" && elements.verifyVerdictMsg) {
            elements.verifyVerdictMsg.style.display = "block";
            elements.verifyVerdictMsg.style.color = "var(--danger-red)";
            elements.verifyVerdictMsg.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Ticket status: <strong>REOPENED</strong>. Possible recurrence detected.';
        }
    }

    function goToRecurrenceIntelligence() {
        state.rootCauseSelection = "drainage";
        state.knowledgeGraphSelection = "drainage";
        state.selectedAsset = "drain-104";
        switchPortalView('view-government');
        selectKnowledgeGraphNode("drainage");
        selectTwinAsset("drain-104");
        openRootCauseNode("drainage");
        const engine = document.querySelector('#view-government .root-cause-visual-flow');
        if (engine) engine.scrollIntoView({ behavior: "smooth", block: "center" });
        showToast("Recurrence case selected in Government Intelligence", "purple");
    }

    function setLifecycleStage(stageNum, statusLabel) {
        state.lifecycle.currentStage = stageNum;
        state.lifecycle.selectedAuditStage = stageNum;
        if (statusLabel) state.ticketStatus = statusLabel;
        syncCureScreens();
    }

    // ==========================================
    // 2c. AUTHENTICATION & SESSION MANAGEMENT
    // ==========================================
    function formatMobile(raw) {
        if (!raw) return "";
        const clean = String(raw).replace(/\D/g, '');
        if (clean.length === 10) {
            return `${clean.slice(0, 5)} ${clean.slice(5)}`;
        }
        return raw;
    }

    function updateAuthUI() {
        if (!elements.authSessionContainer) return;
        let html = '';
        if (state.auth.citizen.isAuthenticated) {
            html += `
                <div class="auth-session-pill citizen-session" title="Active Citizen Session">
                    <span><i class="fa-solid fa-user-check"></i> ${state.auth.citizen.name} • +91 ${formatMobile(state.auth.citizen.mobile)}</span>
                    <button class="btn-session-logout" id="btn-citizen-logout" title="Sign Out of Citizen Session">
                        <i class="fa-solid fa-right-from-bracket"></i> Sign Out
                    </button>
                </div>
            `;
        }
        if (state.auth.officer.isAuthenticated) {
            html += `
                <div class="auth-session-pill officer-session" title="Official Municipal Session">
                    <span><i class="fa-solid fa-shield-halved"></i> ${state.auth.officer.role} • ${state.auth.officer.empId}</span>
                    <button class="btn-session-logout" id="btn-officer-logout" title="Exit Officer Workspace">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Officer Exit
                    </button>
                </div>
            `;
        }
        if (!state.auth.citizen.isAuthenticated && !state.auth.officer.isAuthenticated) {
            html += `
                <button class="btn btn-secondary btn-small" id="btn-header-quick-signin" style="font-size: 11px; padding: 4px 10px; background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 20px;">
                    <i class="fa-solid fa-key"></i> Citizen Sign In
                </button>
            `;
        }
        elements.authSessionContainer.innerHTML = html;

        // Dynamic header sign in button handler
        const btnHeaderQuickSignIn = document.getElementById('btn-header-quick-signin');
        if (btnHeaderQuickSignIn) {
            btnHeaderQuickSignIn.addEventListener('click', () => {
                switchPortalView('view-citizen');
            });
        }

        // Update nav tab label reactively
        const navBtnCitizenPortal = document.getElementById('nav-btn-citizen-portal');
        if (navBtnCitizenPortal) {
            if (state.auth.citizen.isAuthenticated) {
                navBtnCitizenPortal.innerHTML = '<i class="fa-solid fa-user-check"></i> Citizen Portal';
            } else {
                navBtnCitizenPortal.innerHTML = '<i class="fa-solid fa-user-lock"></i> Citizen Login / Portal';
            }
        }

        // Dynamic logout handlers
        const btnCitizenLogout = document.getElementById('btn-citizen-logout');
        if (btnCitizenLogout) {
            btnCitizenLogout.addEventListener('click', (e) => {
                e.stopPropagation();
                state.auth.citizen.isAuthenticated = false;
                if (elements.citizenAuthStep1) elements.citizenAuthStep1.style.display = "block";
                if (elements.citizenAuthStep2) elements.citizenAuthStep2.style.display = "none";
                if (elements.citizenOtpInput) elements.citizenOtpInput.value = "";
                updateAuthUI();
                showToast("Citizen session signed out.", "amber");
            });
        }

        const btnOfficerLogout = document.getElementById('btn-officer-logout');
        if (btnOfficerLogout) {
            btnOfficerLogout.addEventListener('click', (e) => {
                e.stopPropagation();
                state.auth.officer.isAuthenticated = false;
                if (elements.officerPinInput) elements.officerPinInput.value = "";
                if (elements.govOfficerPinInput) elements.govOfficerPinInput.value = "";
                updateAuthUI();
                showToast("Official municipal session exited.", "amber");
            });
        }

        // Toggle Gates & Authenticated Wrappers
        if (elements.citizenLoginGate && elements.citizenAuthWrapper) {
            if (state.auth.citizen.isAuthenticated) {
                elements.citizenLoginGate.style.display = "none";
                elements.citizenAuthWrapper.style.display = "block";
            } else {
                elements.citizenLoginGate.style.display = "flex";
                elements.citizenAuthWrapper.style.display = "none";
            }
        }

        if (elements.officerLoginGate && elements.officerAuthWrapper) {
            if (state.auth.officer.isAuthenticated) {
                elements.officerLoginGate.style.display = "none";
                elements.officerAuthWrapper.style.display = "block";
            } else {
                elements.officerLoginGate.style.display = "flex";
                elements.officerAuthWrapper.style.display = "none";
            }
        }

        if (elements.govLoginGate && elements.govAuthWrapper) {
            if (state.auth.officer.isAuthenticated) {
                elements.govLoginGate.style.display = "none";
                elements.govAuthWrapper.style.display = "block";
            } else {
                elements.govLoginGate.style.display = "flex";
                elements.govAuthWrapper.style.display = "none";
            }
        }
    }

    // --- Citizen Passwordless Mobile + OTP Auth Handlers ---
    if (elements.btnCitizenQuickMobile) {
        elements.btnCitizenQuickMobile.addEventListener('click', () => {
            if (elements.citizenMobileInput) {
                elements.citizenMobileInput.value = "9876543210";
            }
        });
    }

    if (elements.btnCitizenSendOtp) {
        elements.btnCitizenSendOtp.addEventListener('click', () => {
            const raw = elements.citizenMobileInput ? elements.citizenMobileInput.value.replace(/\D/g, '') : '';
            if (raw.length !== 10) {
                showToast("⚠️ Please enter a valid 10-digit Indian mobile number.", "rose");
                if (elements.citizenMobileInput) elements.citizenMobileInput.focus();
                return;
            }
            state.auth.citizen.mobile = raw;
            if (elements.dispCitizenMobileTarget) {
                elements.dispCitizenMobileTarget.textContent = `+91 ${formatMobile(raw)}`;
            }
            if (elements.citizenAuthStep1) elements.citizenAuthStep1.style.display = "none";
            if (elements.citizenAuthStep2) {
                elements.citizenAuthStep2.style.display = "block";
                if (elements.citizenOtpInput) {
                    elements.citizenOtpInput.value = "";
                    elements.citizenOtpInput.focus();
                }
            }
            showToast(`📲 Simulated SMS sent to +91 ${formatMobile(raw)}: Demo OTP is 246810`, "teal");
        });
    }

    if (elements.btnCitizenBackMobile) {
        elements.btnCitizenBackMobile.addEventListener('click', () => {
            if (elements.citizenAuthStep2) elements.citizenAuthStep2.style.display = "none";
            if (elements.citizenAuthStep1) elements.citizenAuthStep1.style.display = "block";
        });
    }

    if (elements.btnCitizenQuickOtp) {
        elements.btnCitizenQuickOtp.addEventListener('click', () => {
            if (elements.citizenOtpInput) {
                elements.citizenOtpInput.value = "246810";
            }
        });
    }

    if (elements.btnCitizenVerifyOtp) {
        elements.btnCitizenVerifyOtp.addEventListener('click', () => {
            const entered = elements.citizenOtpInput ? elements.citizenOtpInput.value.trim() : '';
            if (entered === "246810") {
                state.auth.citizen.isAuthenticated = true;
                updateAuthUI();
                showToast("✅ Mobile verified! Welcome to CURE Citizen Portal, Akshaya.", "green");
                const targetSubtab = state.auth.pendingCitizenSubtab || 'subtab-report';
                switchCitizenSubtab(targetSubtab);
                if (targetSubtab === 'subtab-report') {
                    goToWizardStep(1);
                }
            } else {
                showToast("❌ Invalid verification code. Please enter demo OTP: 246810", "rose");
                if (elements.citizenOtpInput) elements.citizenOtpInput.focus();
            }
        });
    }

    if (elements.citizenMobileInput) {
        elements.citizenMobileInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (elements.btnCitizenSendOtp) elements.btnCitizenSendOtp.click();
            }
        });
    }
    if (elements.citizenOtpInput) {
        elements.citizenOtpInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (elements.btnCitizenVerifyOtp) elements.btnCitizenVerifyOtp.click();
            }
        });
    }

    if (elements.btnHomeQuickSignin) {
        elements.btnHomeQuickSignin.addEventListener('click', () => {
            switchPortalView('view-citizen');
        });
    }

    if (elements.btnLoginSkipToHome) {
        elements.btnLoginSkipToHome.addEventListener('click', () => {
            switchPortalView('view-home');
        });
    }

    // --- Officer Authentication Handlers ---
    if (elements.btnOfficerDemoAutofill) {
        elements.btnOfficerDemoAutofill.addEventListener('click', () => {
            if (elements.officerIdInput) elements.officerIdInput.value = "GHMC-ENG-4501";
            if (elements.officerPinInput) elements.officerPinInput.value = "4501";
        });
    }

    if (elements.btnOfficerLoginSubmit) {
        elements.btnOfficerLoginSubmit.addEventListener('click', () => {
            const empId = elements.officerIdInput ? elements.officerIdInput.value.trim().toUpperCase() : '';
            const pin = elements.officerPinInput ? elements.officerPinInput.value.trim() : '';

            if (empId === "GHMC-ENG-4501" && pin === "4501") {
                state.auth.officer.isAuthenticated = true;
                updateAuthUI();
                showToast("🏛️ Officer Authenticated: Assistant Engineer — Ward 45", "green");
            } else {
                showToast("❌ Invalid official credentials. Demo ID: GHMC-ENG-4501, PIN: 4501", "rose");
            }
        });
    }

    if (elements.officerPinInput) {
        elements.officerPinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (elements.btnOfficerLoginSubmit) elements.btnOfficerLoginSubmit.click();
            }
        });
    }

    // --- Government Intelligence Gate Handlers ---
    if (elements.btnGovDemoAutofill) {
        elements.btnGovDemoAutofill.addEventListener('click', () => {
            if (elements.govOfficerIdInput) elements.govOfficerIdInput.value = "GHMC-ENG-4501";
            if (elements.govOfficerPinInput) elements.govOfficerPinInput.value = "4501";
        });
    }

    if (elements.btnGovLoginSubmit) {
        elements.btnGovLoginSubmit.addEventListener('click', () => {
            const empId = elements.govOfficerIdInput ? elements.govOfficerIdInput.value.trim().toUpperCase() : '';
            const pin = elements.govOfficerPinInput ? elements.govOfficerPinInput.value.trim() : '';

            if (empId === "GHMC-ENG-4501" && pin === "4501") {
                state.auth.officer.isAuthenticated = true;
                updateAuthUI();
                showToast("🏛️ Officer Authenticated: Gov Intelligence Unlocked", "green");
            } else {
                showToast("❌ Invalid official credentials. Demo ID: GHMC-ENG-4501, PIN: 4501", "rose");
            }
        });
    }

    if (elements.govOfficerPinInput) {
        elements.govOfficerPinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (elements.btnGovLoginSubmit) elements.btnGovLoginSubmit.click();
            }
        });
    }

    // ==========================================
    // 3. NAVIGATION ROUTER
    // ==========================================
    function switchPortalView(targetViewId) {
        elements.portalViews.forEach(v => v.classList.remove('active'));
        elements.navButtons.forEach(b => b.classList.remove('active'));

        const targetView = document.getElementById(targetViewId);
        if (targetView) targetView.classList.add('active');

        const activeNavBtn = document.querySelector(`.nav-tab-btn[data-portal="${targetViewId}"]`);
        if (activeNavBtn) activeNavBtn.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    elements.navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const portalId = btn.getAttribute('data-portal');
            switchPortalView(portalId);
        });
    });

    // Citizen subtabs navigation
    function switchCitizenSubtab(subtabId) {
        elements.citizenSubtabViews.forEach(v => v.classList.remove('active'));
        elements.citizenSubnavBtns.forEach(b => b.classList.remove('active'));

        const targetSubtab = document.getElementById(subtabId);
        if (targetSubtab) targetSubtab.classList.add('active');

        const activeSubBtn = document.querySelector(`.citizen-subnav .subnav-btn[id="subtab-btn-${subtabId.replace('subtab-', '')}"]`);
        if (activeSubBtn) activeSubBtn.classList.add('active');
    }

    elements.citizenSubnavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subtabId = btn.id.replace('subtab-btn-', 'subtab-');
            switchCitizenSubtab(subtabId);
        });
    });

    // Home Action Cards routing
    if (elements.btnHomeReport) {
        elements.btnHomeReport.addEventListener('click', () => {
            state.auth.pendingCitizenSubtab = 'subtab-report';
            switchPortalView('view-citizen');
            if (state.auth.citizen.isAuthenticated) {
                switchCitizenSubtab('subtab-report');
                goToWizardStep(1);
            }
        });
    }

    if (elements.btnHomeTrack) {
        elements.btnHomeTrack.addEventListener('click', () => {
            state.auth.pendingCitizenSubtab = 'subtab-tracking';
            switchPortalView('view-citizen');
            if (state.auth.citizen.isAuthenticated) {
                switchCitizenSubtab('subtab-tracking');
            }
        });
    }

    if (elements.btnHomeMycure) {
        elements.btnHomeMycure.addEventListener('click', () => {
            state.auth.pendingCitizenSubtab = 'subtab-dashboard';
            switchPortalView('view-citizen');
            if (state.auth.citizen.isAuthenticated) {
                switchCitizenSubtab('subtab-dashboard');
            }
        });
    }

    if (elements.btnHomeOpenGov) {
        elements.btnHomeOpenGov.addEventListener('click', () => {
            switchPortalView('view-government');
        });
    }

    // ==========================================
    // 4. STEP WIZARD & TAXONOMY SELECTION
    // ==========================================
    function renderSubproblemChips(categoryName) {
        const catData = TAXONOMY[categoryName] || TAXONOMY["Drainage & Waterlogging"];
        if (!catData) return;

        if (elements.subproblemCatTitle) {
            elements.subproblemCatTitle.innerHTML = `Common <strong>${categoryName}</strong> issues (tap to select):`;
        }
        if (elements.chipsCloudTarget) {
            elements.chipsCloudTarget.innerHTML = "";

            catData.subproblems.forEach((prob, idx) => {
                const chip = document.createElement('button');
                chip.className = `problem-chip ${idx === 0 ? 'selected' : ''}`;
                chip.textContent = prob;
                chip.addEventListener('click', () => {
                    document.querySelectorAll('.problem-chip').forEach(c => c.classList.remove('selected'));
                    chip.classList.add('selected');
                    state.selectedSubproblem = prob;
                    elements.inputText.value = `${prob} observed at location. Requires municipal attention.`;
                    checkEmergencyKeywords(prob);
                });
                elements.chipsCloudTarget.appendChild(chip);
            });
        }

        state.selectedSubproblem = catData.subproblems[0];
        if (elements.inputText && !elements.inputText.value) {
            elements.inputText.value = `${catData.subproblems[0]} observed at location.`;
        }
    }

    function selectCategory(catName) {
        state.selectedCategory = catName;
        elements.categoryCards.forEach(card => {
            if (card.getAttribute('data-cat') === catName) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
        if (elements.btnStep1Next) elements.btnStep1Next.disabled = false;
        renderSubproblemChips(catName);

        if (catName === "Emergency / Immediate Danger" || catName === "Emergency Situation") {
            triggerEmergencyBanner();
        } else if (elements.emergencyAlertBanner) {
            elements.emergencyAlertBanner.style.display = "none";
        }
    }

    elements.categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-cat');
            selectCategory(cat);
        });
    });

    // Emergency Detection
    function checkEmergencyKeywords(text) {
        const emergencyWords = ["fire", "cylinder blast", "electrocution", "high voltage", "collapse", "gas leak", "explosion", "severe accident"];
        const lower = text.toLowerCase();
        const hasEmergency = emergencyWords.some(w => lower.includes(w));
        if (hasEmergency) {
            triggerEmergencyBanner();
        }
    }

    function triggerEmergencyBanner() {
        if (elements.emergencyAlertBanner) elements.emergencyAlertBanner.style.display = "flex";
        showToast("🚨 Emergency Notice: For immediate life danger, call 112 directly.", "rose");
    }

    if (elements.inputText) {
        elements.inputText.addEventListener('input', (e) => {
            checkEmergencyKeywords(e.target.value);
        });
    }

    // Wizard Step Transitions
    function goToWizardStep(stepNum) {
        elements.wizardSteps.forEach((s, idx) => {
            if (idx + 1 === stepNum) {
                s.classList.add('active');
            } else if (idx + 1 < stepNum) {
                s.classList.add('completed');
                s.classList.remove('active');
            } else {
                s.classList.remove('active', 'completed');
            }
        });

        elements.wizardStepContents.forEach((c, idx) => {
            if (idx + 1 === stepNum) {
                c.classList.add('active');
            } else {
                c.classList.remove('active');
            }
        });

        if (stepNum === 4) {
            populateReviewCard();
        }
    }

    document.querySelectorAll('.wizard-container .btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActive = document.querySelector('.wizard-step-content.active');
            if (!currentActive) return;
            const currentStep = parseInt(currentActive.id.replace('w-step-', ''));
            if (currentStep < 4) goToWizardStep(currentStep + 1);
        });
    });

    document.querySelectorAll('.wizard-container .btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActive = document.querySelector('.wizard-step-content.active');
            if (!currentActive) return;
            const currentStep = parseInt(currentActive.id.replace('w-step-', ''));
            if (currentStep > 1) goToWizardStep(currentStep - 1);
        });
    });

    // Input methods tabs (Type, Speak, Photo)
    elements.methodTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const method = tab.getAttribute('data-method');
            state.inputMethod = method;

            elements.methodTabs.forEach(t => t.classList.remove('active'));
            elements.methodPanes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPane = document.getElementById(`pane-${method}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // Language buttons (English / Telugu / Hindi simulated speech)
    elements.langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');

            if (elements.voiceSimBox) elements.voiceSimBox.style.display = "block";
            if (elements.voiceStatusMsg) elements.voiceStatusMsg.textContent = "Listening... Speak now";

            setTimeout(() => {
                let transcription = "Water stagnation and blocked drain near Jubilee Hills Road 36.";
                if (lang === 'te') transcription = "రోడ్డు నెం. 36 దగ్గర డ్రైనేజీ లీకేజీ మరియు గుంత ఏర్పడింది (Telugu transcription translated to English).";
                if (lang === 'hi') transcription = "सड़क नंबर 36 के पास नाली का पानी सड़क पर भर गया है और गड्ढा बन गया है (Hindi transcription translated to English).";

                if (elements.voiceStatusMsg) elements.voiceStatusMsg.textContent = `Transcribed: "${transcription}"`;
                if (elements.inputText) elements.inputText.value = transcription;
                showToast(`Voice Input Captured (${lang.toUpperCase()})`, 'teal');
            }, 1600);
        });
    });

    // Photo scan simulation
    if (elements.photoUploadTrigger) {
        elements.photoUploadTrigger.addEventListener('click', () => {
            if (elements.photoPreview) elements.photoPreview.style.display = "block";
            if (elements.photoImg) elements.photoImg.src = "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=60";
            if (elements.scanProgressBar) elements.scanProgressBar.style.display = "block";
            if (elements.scanResultLbl) elements.scanResultLbl.textContent = "CURE Computer Vision Scanning Photo...";

            setTimeout(() => {
                if (elements.scanProgressBar) elements.scanProgressBar.style.display = "none";
                if (elements.scanResultLbl) elements.scanResultLbl.textContent = "✓ Verified: Road Pothole + Drainage Silt (Confidence 94%)";
                if (elements.inputText) elements.inputText.value = "Photo Evidence: Road degradation with saturated subgrade runoff water.";
                showToast("Photo Analyzed: Pothole & Drainage identified", "green");
            }, 1800);
        });
    }

    // Location selector
    if (elements.btnCitizenGps) {
        elements.btnCitizenGps.addEventListener('click', () => {
            state.reportedLocation = "Road No. 36, Ward 45 (Jubilee Hills), Hyderabad [17.4325° N, 78.4071° E]";
            if (elements.lblSelectedCoords) elements.lblSelectedCoords.textContent = state.reportedLocation;
            showToast("📍 Exact Location Captured: Ward 45 (Jubilee Hills)", "teal");
        });
    }

    if (elements.inputLocation) {
        elements.inputLocation.addEventListener('input', (e) => {
            if (e.target.value.trim()) {
                state.reportedLocation = e.target.value.trim() + " (Hyderabad)";
                if (elements.lblSelectedCoords) elements.lblSelectedCoords.textContent = state.reportedLocation;
            }
        });
    }

    // Populate Plain-Language Review Card
    function populateReviewCard() {
        const catData = TAXONOMY[state.selectedCategory] || TAXONOMY["Drainage & Waterlogging"];
        if (elements.lblReviewCategory) elements.lblReviewCategory.textContent = state.selectedCategory;
        if (elements.lblReviewSummary) elements.lblReviewSummary.textContent = (elements.inputText && elements.inputText.value) ? elements.inputText.value : `${state.selectedSubproblem} reported at location.`;
        if (elements.lblReviewLocation) elements.lblReviewLocation.textContent = state.reportedLocation;
        if (elements.lblReviewAgency) elements.lblReviewAgency.textContent = catData.agency;
    }

    // Step 4 Final Submit -> Step 5 Receipt
    if (elements.btnSubmitFinal) {
        elements.btnSubmitFinal.addEventListener('click', () => {
            if (elements.citizenWizardCard) elements.citizenWizardCard.style.display = "none";
            if (elements.ticketReceipt) elements.ticketReceipt.style.display = "block";

            const receiptCat = document.getElementById('receipt-cat');
            const receiptAgency = document.getElementById('receipt-agency');
            const receiptLoc = document.getElementById('receipt-loc');

            if (receiptCat) receiptCat.textContent = state.selectedCategory;
            if (receiptAgency) receiptAgency.textContent = (TAXONOMY[state.selectedCategory] || {}).agency || "GHMC Engineering & HMWS&SB";
            if (receiptLoc) receiptLoc.textContent = state.reportedLocation;

            showToast("Ticket CURE-2026-00142 Registered Successfully", "green");
            state.activeTicket.id = "CURE-2026-00142";
            setLifecycleStage(1, "RECEIVED");
            setTimeout(() => setLifecycleStage(2, "ASSIGNED"), 400);
            setTimeout(() => setLifecycleStage(3, "INSPECTION"), 900);
        });
    }

    if (elements.btnReceiptTrack) {
        elements.btnReceiptTrack.addEventListener('click', () => {
            switchCitizenSubtab('subtab-tracking');
        });
    }

    // ==========================================
    // 5. TRACKING TIMELINE & CITIZEN VERIFICATION LOOP
    // ==========================================
    function updateTimelineStage(stageIndex) {
        const labels = LIFECYCLE_STAGES;
        setLifecycleStage(stageIndex, labels[stageIndex - 1] || state.ticketStatus);
    }

    if (elements.btnVerifyYes) {
        elements.btnVerifyYes.addEventListener('click', () => {
            state.recurrenceDetected = false;
            state.recurrenceAlerts = [];
            LIFECYCLE_AUDIT[6].when = "Citizen confirmed";
            LIFECYCLE_AUDIT[6].what = "Citizen confirmed the problem was actually fixed.";
            LIFECYCLE_AUDIT[6].evidence = "Citizen verification: Yes, fixed.";
            LIFECYCLE_AUDIT[6].remarks = "Case closed from citizen confirmation, not officer self-certification.";
            setLifecycleStage(6, "CLOSED");
            if (elements.recurrenceActionBox) elements.recurrenceActionBox.style.display = "none";
            showToast("Feedback logged: ticket CLOSED", "green");
        });
    }

    if (elements.btnVerifyNo) {
        elements.btnVerifyNo.addEventListener('click', () => {
            state.recurrenceDetected = true;
            state.recurrenceAlerts = [{
                ticketId: state.activeTicket.id,
                message: "Citizen reported the problem still exists at Drain D-104 / Road R-36.",
                cluster: "Prototype cluster of related drainage and road-condition tickets"
            }];
            LIFECYCLE_AUDIT[5].when = "Citizen verification";
            LIFECYCLE_AUDIT[5].what = "Citizen reported: No, it's still there.";
            LIFECYCLE_AUDIT[5].evidence = "Citizen verification: Still exists.";
            LIFECYCLE_AUDIT[5].remarks = "POSSIBLE RECURRENCE DETECTED. Ticket reopened for root-cause investigation.";
            setLifecycleStage(3, "REOPENED");
            showToast("Ticket REOPENED — possible recurrence detected", "rose");
        });
    }

    if (elements.btnGotoRootcause) {
        elements.btnGotoRootcause.addEventListener('click', () => {
            goToRecurrenceIntelligence();
        });
    }

    // ==========================================
    // 6. SMART CHAT ASSISTANT
    // ==========================================
    function appendChatMessage(sender, text) {
        if (!elements.chatLogs) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        const icon = sender === 'bot' ? 'fa-shield' : 'fa-user';
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid ${icon}"></i></div>
            <div class="msg-content">${text}</div>
        `;
        elements.chatLogs.appendChild(msgDiv);
        elements.chatLogs.scrollTop = elements.chatLogs.scrollHeight;
    }

    function handleChatResponse(query) {
        let reply = "I am checking your grievance record on CURE.";
        const q = query.toLowerCase();

        if (q.includes("where") || q.includes("status")) {
            reply = `Your complaint <strong>${state.activeTicket.id}</strong> is currently <strong>${state.ticketStatus}</strong> at Jubilee Hills Rd 36. Citizen Portal, Officer Desk and Government Intelligence all read this same ticket.`;
        } else if (q.includes("why") || q.includes("longer") || q.includes("delay")) {
            reply = "This case is taking a bit longer because it is a **multi-agency issue**. Water pooling is caused by blocked storm drain D-104. Repairing asphalt without desilting the drain will fail, so joint clearance is required.";
        } else if (q.includes("who") || q.includes("officer") || q.includes("handling")) {
            reply = "Assistant Engineer — Ward 45 is assigned as lead coordinating role, working with Field Inspection Team — Ward 45 and HMWS&SB Sub-Division 3.";
        } else if (q.includes("visit") || q.includes("office")) {
            reply = "No, absolutely not! **You do not need to visit any municipal office.** CURE automatically sends updates directly to this dashboard, and you get final verification authority.";
        } else {
            reply = `Understood. CURE has recorded your query regarding "${query}". Our Ward 45 field coordinator has been notified.`;
        }

        setTimeout(() => appendChatMessage('bot', reply), 600);
    }

    if (elements.btnChatSend) {
        elements.btnChatSend.addEventListener('click', () => {
            const val = elements.chatInput.value.trim();
            if (!val) return;
            appendChatMessage('user', val);
            elements.chatInput.value = "";
            handleChatResponse(val);
        });
    }

    if (elements.chatInput) {
        elements.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') elements.btnChatSend.click();
        });
    }

    elements.chatPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            appendChatMessage('user', query);
            handleChatResponse(query);
        });
    });

    // ==========================================
    // 7. OFFICER WORK DESK (OPERATIONAL QUEUE)
    // ==========================================
    const OFFICER_QUEUE_DATA = {
        "q-1": {
            id: "#CURE-2026-00142",
            priorityText: "High Priority",
            priorityClass: "badge-danger",
            report: '"Road is breaking apart with water overflowing from the side drain every time it rains."',
            location: "Road No. 36, Jubilee Hills [17.4325° N, 78.4071° E]",
            infra: "Drain D-104 & Road R-36",
            history: "12 complaints logged at this coordinate cluster in 60 days",
            agencies: "HMWS&SB (Water Board) + GHMC Roads",
            badgeRoads: '<i class="fa-solid fa-road"></i> GHMC Roads (Inspection Ready)',
            badgeWater: '<i class="fa-solid fa-faucet-drip"></i> HMWS&SB Water (Desilting Crew Alerted)',
            badgePolice: '<i class="fa-solid fa-traffic-light"></i> Traffic Police (Coordination Pending)'
        },
        "q-2": {
            id: "#CURE-2026-00139",
            priorityText: "Medium Priority",
            priorityClass: "badge-warning",
            report: '"Multiple longitudinal cracks forming on bituminous surface near junction."',
            location: "Road R-36 Junction [17.4338° N, 78.4089° E]",
            infra: "Road R-36 Pavement Section B",
            history: "4 complaints logged at this coordinate cluster in 30 days",
            agencies: "GHMC Roads & Infrastructure Engineering",
            badgeRoads: '<i class="fa-solid fa-road"></i> GHMC Roads (Assigned)',
            badgeWater: '<i class="fa-solid fa-circle-check"></i> HMWS&SB (No Active Clearance Needed)',
            badgePolice: '<i class="fa-solid fa-traffic-light"></i> Traffic Police (Advisory Issued)'
        },
        "q-3": {
            id: "#CURE-2026-00135",
            priorityText: "Medium Priority",
            priorityClass: "badge-warning",
            report: '"Streetlight SL-12 blinking erratically at night, creating blind spot near curve."',
            location: "Ward 45 Sector 2 [17.4312° N, 78.4060° E]",
            infra: "Streetlight SL-12 & TSSPDCL Feeder",
            history: "1 complaint logged at this coordinate cluster",
            agencies: "TSSPDCL Electrical Wing + GHMC Electrical",
            badgeRoads: '<i class="fa-solid fa-circle-check"></i> GHMC Roads (Not Affected)',
            badgeWater: '<i class="fa-solid fa-circle-check"></i> HMWS&SB (Not Affected)',
            badgePolice: '<i class="fa-solid fa-bolt"></i> TSSPDCL Repair Team (Dispatched)'
        },
        "q-4": {
            id: "#CURE-2026-00128",
            priorityText: "Low Priority",
            priorityClass: "badge-success",
            report: '"Commercial waste bin overflowing near morning vegetable market."',
            location: "Block B Market [17.4350° N, 78.4042° E]",
            infra: "Sanitation Bin Unit 8",
            history: "2 complaints logged this week",
            agencies: "GHMC Solid Waste Management (Sanitation Wing)",
            badgeRoads: '<i class="fa-solid fa-circle-check"></i> GHMC Roads (Not Affected)',
            badgeWater: '<i class="fa-solid fa-circle-check"></i> HMWS&SB (Not Affected)',
            badgePolice: '<i class="fa-solid fa-truck"></i> Sanitation Truck #14 (Route Active)'
        }
    };

    function loadOfficerQueueItem(qId) {
        const item = OFFICER_QUEUE_DATA[qId];
        if (!item) return;

        if (elements.officerDetailTitle) {
            elements.officerDetailTitle.innerHTML = `<i class="fa-solid fa-file-invoice" style="color: var(--primary-navy);"></i> Complaint Details: ${item.id}`;
        }
        if (elements.officerDetailPriority) {
            elements.officerDetailPriority.textContent = item.priorityText;
            elements.officerDetailPriority.className = `badge ${item.priorityClass}`;
        }
        if (elements.officerDetailReport) elements.officerDetailReport.textContent = item.report;
        if (elements.officerDetailLocation) elements.officerDetailLocation.textContent = item.location;
        if (elements.officerDetailInfra) elements.officerDetailInfra.textContent = item.infra;
        if (elements.officerDetailHistory) elements.officerDetailHistory.innerHTML = `<strong>${item.history.split(' logged')[0]}</strong> logged${item.history.split(' logged')[1] || ''}`;
        if (elements.officerDetailAgencies) elements.officerDetailAgencies.textContent = item.agencies;

        if (elements.badgeDepRoads) elements.badgeDepRoads.innerHTML = item.badgeRoads;
        if (elements.badgeDepWater) elements.badgeDepWater.innerHTML = item.badgeWater;
        if (elements.badgeDepPolice) elements.badgeDepPolice.innerHTML = item.badgePolice;
    }

    elements.queueRows.forEach(row => {
        row.addEventListener('click', () => {
            elements.queueRows.forEach(r => r.classList.remove('active'));
            row.classList.add('active');
            const qId = row.getAttribute('data-queue-id');
            loadOfficerQueueItem(qId);
            if (qId === "q-1") syncCureScreens();
            showToast(`Loaded Complaint ${OFFICER_QUEUE_DATA[qId]?.id || qId}`, 'teal');
        });
    });

    // Multi-agency clearance actions
    if (elements.btnReqClearance) {
        elements.btnReqClearance.addEventListener('click', () => {
            elements.btnReqClearance.style.display = "none";
            if (elements.btnNotifyTraffic) elements.btnNotifyTraffic.style.display = "inline-flex";
            if (elements.officerCoordinationLog) elements.officerCoordinationLog.style.display = "block";
            if (elements.badgeDepWater) {
                elements.badgeDepWater.className = "badge badge-success";
                elements.badgeDepWater.innerHTML = '<i class="fa-solid fa-check"></i> HMWS&SB Desilting Complete';
            }
            showToast("HMWS&SB Drainage Clearance Received", "green");
            state.officerOps.clearanceRequested = true;
            setLifecycleStage(4, "ACTION");
        });
    }

    if (elements.btnNotifyTraffic) {
        elements.btnNotifyTraffic.addEventListener('click', () => {
            elements.btnNotifyTraffic.style.display = "none";
            if (elements.btnIssueWorkOrder) elements.btnIssueWorkOrder.style.display = "inline-flex";
            if (elements.logLine2) elements.logLine2.textContent = "> Traffic Police single-lane diversion active.";
            if (elements.badgeDepPolice) {
                elements.badgeDepPolice.className = "badge badge-success";
                elements.badgeDepPolice.innerHTML = '<i class="fa-solid fa-check"></i> Traffic Diverted';
            }
            showToast("Traffic Police Diversion Notified", "teal");
            state.officerOps.trafficNotified = true;
        });
    }

    if (elements.btnIssueWorkOrder) {
        elements.btnIssueWorkOrder.addEventListener('click', () => {
            elements.btnIssueWorkOrder.disabled = true;
            elements.btnIssueWorkOrder.innerHTML = '<i class="fa-solid fa-circle-check"></i> Work Completed & Verified';
            if (elements.logLine3) elements.logLine3.textContent = "> Road subgrade sealed. Ready for citizen verification.";
            if (elements.badgeDepRoads) {
                elements.badgeDepRoads.className = "badge badge-success";
                elements.badgeDepRoads.innerHTML = '<i class="fa-solid fa-check"></i> GHMC Roads Repaved';
            }
            updateTimelineStage(5); // Ready for Citizen Verification
            state.officerOps.worksCompleted = true;
            showToast("Works Completed: Sent to Citizen for Verification", "green");
        });
    }

    document.querySelectorAll('#officer-lifecycle-track .lc-step').forEach(step => {
        step.addEventListener('click', () => {
            const stageNum = parseInt(step.getAttribute('data-stage'), 10);
            state.lifecycle.selectedAuditStage = stageNum;
            renderLifecycleAudit(stageNum);
        });
    });

    // ==========================================
    // 8. GOV DASHBOARD & ROOT CAUSE ENGINE
    // ==========================================
    const diagnosticsContent = {
        "roads": `
            <p><strong>Status:</strong> WATCH — Pothole cluster identified</p>
            <p style="margin-top: 6px;">The prototype dataset groups pavement-damage tickets along Road R-36 with nearby drainage/waterlogging records. This is an investigation cue, not a certified network condition score.</p>
            <p style="margin-top: 8px; font-size: 11px; color: var(--muted-slate); font-style: italic;">Illustrative prototype indicator shown on request: 78% (not operational telemetry).</p>
        `,
        "drainage": `
            <p><strong>Status:</strong> NEEDS REVIEW — Drain D-104 requires inspection</p>
            <p style="margin-top: 6px;">Drain D-104 is associated with the selected complaint cluster. Related complaints involve drainage/waterlogging and nearby road damage. Field inspection is required before any capacity claim.</p>
            <p style="margin-top: 8px; font-size: 11px; color: var(--muted-slate); font-style: italic;">Illustrative prototype indicator shown on request: 62% (not operational telemetry).</p>
        `,
        "waste": `
            <p><strong>Status:</strong> HEALTHY — Prototype indicator within reference range</p>
            <p style="margin-top: 6px;">No active waste backlog is attached to the current recurrence case. This card is a prototype placeholder for departmental health review.</p>
            <p style="margin-top: 8px; font-size: 11px; color: var(--muted-slate); font-style: italic;">Illustrative prototype indicator shown on request: 91% (not operational telemetry).</p>
        `,
        "citizen": `
            <p><strong>Status:</strong> WATCH — Recurrence tracking active</p>
            <p style="margin-top: 6px;">Citizen verification is the closure gate. If the citizen reports the problem still exists, the same ticket reopens and this board flags possible recurrence.</p>
            <p style="margin-top: 8px; font-size: 11px; color: var(--muted-slate); font-style: italic;">Illustrative prototype indicator shown on request: 84% (not operational telemetry).</p>
        `
    };

    elements.healthScoreCards.forEach(card => {
        card.addEventListener('click', () => {
            const metric = card.getAttribute('data-metric');
            const data = diagnosticsContent[metric];
            if (!data) return;

            if (elements.govDiagnosticDrawer) {
                elements.govDiagnosticDrawer.style.display = "block";
                if (elements.diagTitle) elements.diagTitle.textContent = `${metric.charAt(0).toUpperCase() + metric.slice(1)} Health Diagnostics`;
                if (elements.diagBody) elements.diagBody.innerHTML = data;
            }
            showToast(`Diagnostic Disclosure: Opened ${metric} data`, 'teal');
        });
    });

    if (elements.btnCloseDiagnostic) {
        elements.btnCloseDiagnostic.addEventListener('click', () => {
            if (elements.govDiagnosticDrawer) elements.govDiagnosticDrawer.style.display = "none";
        });
    }

    // Evidence Modal Handlers
    if (elements.btnViewEvidence) {
        elements.btnViewEvidence.addEventListener('click', () => {
            if (elements.evidenceModal) elements.evidenceModal.style.display = "flex";
        });
    }

    if (elements.btnInvestigateCause) {
        elements.btnInvestigateCause.addEventListener('click', () => {
            if (elements.evidenceModal) elements.evidenceModal.style.display = "flex";
            showToast("🔬 Opening Root Cause Structural Evidence Log", "teal");
        });
    }

    if (elements.btnCloseEvidence) {
        elements.btnCloseEvidence.addEventListener('click', () => {
            if (elements.evidenceModal) elements.evidenceModal.style.display = "none";
        });
    }

    if (elements.btnModalInvestigate) {
        elements.btnModalInvestigate.addEventListener('click', () => {
            if (elements.evidenceModal) elements.evidenceModal.style.display = "none";
            openRootCauseNode("drainage");
            selectKnowledgeGraphNode("drainage");
            showToast("Root-cause drawer opened for Drain D-104 (hypothesis, pending validation)", "green");
        });
    }

    elements.rcNodes.forEach(node => {
        node.addEventListener('click', () => {
            openRootCauseNode(node.getAttribute('data-rc'));
        });
    });

    if (elements.btnCloseRcDrawer) {
        elements.btnCloseRcDrawer.addEventListener('click', () => {
            if (elements.rcNodeDrawer) elements.rcNodeDrawer.style.display = "none";
        });
    }

    if (elements.btnInspectRecurrence) {
        elements.btnInspectRecurrence.addEventListener('click', () => {
            goToRecurrenceIntelligence();
        });
    }

    elements.graphNodes.forEach(node => {
        node.addEventListener('click', () => {
            const key = node.id.replace('gnode-', '');
            selectKnowledgeGraphNode(key);
        });
    });

    elements.twinLayers.forEach(layer => {
        layer.addEventListener('click', () => {
            const key = layer.getAttribute('data-twin');
            selectTwinAsset(key);
        });
    });

    // Digital Twin Action Buttons
    if (elements.btnTwinInspect) {
        elements.btnTwinInspect.addEventListener('click', () => {
            elements.btnTwinInspect.disabled = true;
            elements.btnTwinInspect.innerHTML = '<i class="fa-solid fa-check"></i> Inspection Scheduled';
            showToast("📅 Joint Inspection Scheduled: HMWS&SB & GHMC (Tomorrow 10:00 AM)", "green");
        });
    }

    if (elements.btnTwinWorkorder) {
        elements.btnTwinWorkorder.addEventListener('click', () => {
            showToast("⚡ Multi-Agency Coordinated Work Order Dispatched", "green");
            if (elements.btnDispatchJwo) elements.btnDispatchJwo.click();
        });
    }

    if (elements.btnTwinComplaints) {
        elements.btnTwinComplaints.addEventListener('click', () => {
            switchPortalView('view-officer');
            showToast("📋 Loaded 12 Related Grievance Records in Officer Desk", "teal");
        });
    }

    // Multi-Agency Joint Work Order Dispatch
    if (elements.btnDispatchJwo) {
        elements.btnDispatchJwo.addEventListener('click', () => {
            state.jointWorkOrder.authorized = true;
            state.jointWorkOrder.status = "authorized";
            renderJointWorkOrder();
            showToast("Prototype JWO CURE-JWO-2026-009 authorized (simulation only)", "green");
            setTimeout(() => {
                state.jointWorkOrder.status = "dispatched";
                renderJointWorkOrder();
                showToast("Prototype JWO dispatched — no municipal department was contacted", "teal");
            }, 900);
        });
    }

    // Policy Simulator
    if (elements.sliderSimInterval) {
        elements.sliderSimInterval.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            if (elements.valSimInterval) elements.valSimInterval.textContent = val;

            if (val <= 30) {
                if (elements.outSimComplaints) elements.outSimComplaints.textContent = "-48%";
                if (elements.outSimCost) elements.outSimCost.textContent = "+32%";
                if (elements.outSimFlood) elements.outSimFlood.textContent = "-54%";
                if (elements.outSimTrust) elements.outSimTrust.textContent = "+28%";
            } else if (val <= 60) {
                if (elements.outSimComplaints) elements.outSimComplaints.textContent = "-24%";
                if (elements.outSimCost) elements.outSimCost.textContent = "+14%";
                if (elements.outSimFlood) elements.outSimFlood.textContent = "-28%";
                if (elements.outSimTrust) elements.outSimTrust.textContent = "+16%";
            } else if (val <= 90) {
                if (elements.outSimComplaints) elements.outSimComplaints.textContent = "-0%";
                if (elements.outSimCost) elements.outSimCost.textContent = "+0%";
                if (elements.outSimFlood) elements.outSimFlood.textContent = "-0%";
                if (elements.outSimTrust) elements.outSimTrust.textContent = "+0%";
            } else {
                if (elements.outSimComplaints) elements.outSimComplaints.textContent = "+38%";
                if (elements.outSimCost) elements.outSimCost.textContent = "-18%";
                if (elements.outSimFlood) elements.outSimFlood.textContent = "+44%";
                if (elements.outSimTrust) elements.outSimTrust.textContent = "-22%";
            }
        });
    }

    // ==========================================
    // 9. AUTOPLAY PRESENTATION SEQUENCE
    // ==========================================
    if (elements.btnAutoplayDemo) {
        elements.btnAutoplayDemo.addEventListener('click', () => {
            if (state.isDemoPlaying) return;
            startAutoplay();
        });
    }

    function startAutoplay() {
        state.isDemoPlaying = true;
        elements.btnAutoplayDemo.disabled = true;
        elements.btnAutoplayDemo.textContent = "Demo Running...";
        if (elements.demoProgressBox) elements.demoProgressBox.style.display = "block";

        // Auto-authorize citizen and officer so evaluation presentation runs smoothly
        state.auth.citizen.isAuthenticated = true;
        state.auth.officer.isAuthenticated = true;
        updateAuthUI();

        state.recurrenceDetected = false;
        state.recurrenceAlerts = [];
        state.jointWorkOrder = { id: "CURE-JWO-2026-009", status: "draft", authorized: false };
        state.officerOps = { clearanceRequested: false, trafficNotified: false, worksCompleted: false };
        if (elements.verifyVerdictMsg) {
            elements.verifyVerdictMsg.style.display = "none";
            elements.verifyVerdictMsg.innerHTML = "";
        }
        if (elements.rcNodeDrawer) elements.rcNodeDrawer.style.display = "none";
        if (elements.btnReqClearance) elements.btnReqClearance.style.display = "inline-flex";
        if (elements.btnNotifyTraffic) elements.btnNotifyTraffic.style.display = "none";
        if (elements.btnIssueWorkOrder) {
            elements.btnIssueWorkOrder.style.display = "none";
            elements.btnIssueWorkOrder.disabled = false;
            elements.btnIssueWorkOrder.innerHTML = '<i class="fa-solid fa-check-double"></i> Complete Works & Upload Proof';
        }
        if (elements.officerCoordinationLog) elements.officerCoordinationLog.style.display = "none";
        if (elements.logLine2) elements.logLine2.textContent = "";
        if (elements.logLine3) elements.logLine3.textContent = "";
        renderJointWorkOrder();
        setLifecycleStage(3, "INSPECTION");

        const sequence = [
            {
                pct: 8,
                msg: "Scene 1 — Citizen: the road is breaking apart and water is overflowing from the drain.",
                action: () => {
                    switchPortalView('view-citizen');
                    switchCitizenSubtab('subtab-report');
                    goToWizardStep(1);
                    selectCategory("Drainage & Waterlogging");
                    if (elements.inputText) {
                        elements.inputText.value = "The road is breaking apart and water is overflowing from the drain.";
                    }
                    showToast("Citizen report captured", "teal");
                },
                delay: 2800
            },
            {
                pct: 16,
                msg: "Scene 2 — CURE understands the complaint and identifies a drainage + road relationship.",
                action: () => {
                    goToWizardStep(4);
                    populateReviewCard();
                    setTimeout(() => {
                        if (elements.btnSubmitFinal) elements.btnSubmitFinal.click();
                    }, 900);
                },
                delay: 2800
            },
            {
                pct: 26,
                msg: "Scene 3 — Officer desk: inspection → drainage issue → road action.",
                action: () => {
                    switchPortalView('view-officer');
                    setLifecycleStage(3, "INSPECTION");
                    setTimeout(() => {
                        if (elements.btnReqClearance) elements.btnReqClearance.click();
                        setTimeout(() => {
                            if (elements.btnNotifyTraffic) elements.btnNotifyTraffic.click();
                            setTimeout(() => {
                                if (elements.btnIssueWorkOrder) elements.btnIssueWorkOrder.click();
                            }, 800);
                        }, 800);
                    }, 700);
                },
                delay: 4200
            },
            {
                pct: 38,
                msg: "Scene 4 — Citizen: “No, it's still there.”",
                action: () => {
                    switchPortalView('view-citizen');
                    switchCitizenSubtab('subtab-tracking');
                    showToast("Was it actually fixed?", "amber");
                    setTimeout(() => {
                        if (elements.btnVerifyNo) elements.btnVerifyNo.click();
                    }, 1100);
                },
                delay: 3200
            },
            {
                pct: 48,
                msg: "Scene 5 — REOPENED. Possible recurrence detected.",
                action: () => {
                    switchCitizenSubtab('subtab-tracking');
                    if (elements.recurrenceActionBox) {
                        elements.recurrenceActionBox.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                },
                delay: 2600
            },
            {
                pct: 58,
                msg: "Scene 6 — Government intelligence: Observed → Analysis → Hypothesis.",
                action: () => {
                    goToRecurrenceIntelligence();
                },
                delay: 3200
            },
            {
                pct: 68,
                msg: "Scene 7 — Root Cause Engine: Drainage → Waterlogging → Road damage.",
                action: () => {
                    openRootCauseNode("drainage");
                    setTimeout(() => openRootCauseNode("waterlogging"), 900);
                    setTimeout(() => openRootCauseNode("pothole"), 1800);
                    selectKnowledgeGraphNode("drainage");
                },
                delay: 3600
            },
            {
                pct: 78,
                msg: "Scene 8 — Digital Twin: Drain D-104 related complaints and maintenance history.",
                action: () => {
                    selectTwinAsset("drain-104");
                    const twin = document.getElementById('twin-details-box');
                    if (twin) twin.scrollIntoView({ behavior: "smooth", block: "center" });
                },
                delay: 2800
            },
            {
                pct: 88,
                msg: "Scene 9 — Government authorizes coordinated intervention.",
                action: () => {
                    if (elements.btnDispatchJwo) {
                        elements.btnDispatchJwo.disabled = false;
                        elements.btnDispatchJwo.click();
                    }
                },
                delay: 2800
            },
            {
                pct: 95,
                msg: "Scene 10 — Joint work order CURE-JWO-2026-009.",
                action: () => {
                    if (elements.jwoGeneratedCard) {
                        elements.jwoGeneratedCard.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                },
                delay: 2400
            },
            {
                pct: 100,
                msg: "From individual complaint → system understanding → coordinated intervention.",
                action: () => {
                    switchPortalView('view-academic');
                    state.isDemoPlaying = false;
                    elements.btnAutoplayDemo.disabled = false;
                    elements.btnAutoplayDemo.innerHTML = '<i class="fa-solid fa-play"></i> ▶ Run Presentation Autoplay';
                    if (elements.demoProgressBox) elements.demoProgressBox.style.display = "none";
                    if (elements.demoCompleteModal) elements.demoCompleteModal.style.display = "flex";
                },
                delay: 1600
            }
        ];

        let index = 0;
        function executeStep() {
            if (index >= sequence.length) return;
            const current = sequence[index];
            if (elements.demoStatusLbl) elements.demoStatusLbl.textContent = current.msg;
            if (elements.demoFill) elements.demoFill.style.width = `${current.pct}%`;
            current.action();
            index++;
            state.demoInterval = setTimeout(executeStep, current.delay);
        }
        executeStep();
    }

    if (elements.btnCloseDemoModal) {
        elements.btnCloseDemoModal.addEventListener('click', () => {
            if (elements.demoCompleteModal) elements.demoCompleteModal.style.display = "none";
            switchPortalView('view-home');
        });
    }

    // ==========================================
    // 10. LIVE CLOCK & WELCOME INITIALIZER
    // ==========================================
    setInterval(() => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        if (elements.liveClock) {
            elements.liveClock.innerHTML = `<i class="fa-solid fa-clock"></i> Hyderabad - ${hours}:${minutes}:${seconds} ${ampm}`;
        }
    }, 1000);

    // Initial loader screen simulation
    let loadPercent = 0;
    const loadTimer = setInterval(() => {
        loadPercent += 10;
        if (elements.welcomeFill) elements.welcomeFill.style.width = `${loadPercent}%`;

        if (loadPercent >= 100) {
            clearInterval(loadTimer);
            setTimeout(() => {
                if (elements.welcomeScreen) {
                    elements.welcomeScreen.style.opacity = "0";
                    setTimeout(() => {
                        elements.welcomeScreen.style.display = "none";
                        showToast("CURE Public-Service Platform Active", "teal");
                    }, 600);
                }
            }, 300);
        }
    }, 35);

    // Initial category setup
    selectCategory("Drainage & Waterlogging");
    selectKnowledgeGraphNode("pothole");
    selectTwinAsset("drain-104");
    syncCureScreens();
    updateAuthUI();

});
