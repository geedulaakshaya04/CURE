"""
CURE: City Unified Response & Evolution Platform
PSE External Evaluation Presentation Generator
Fills all 13 slides with 6-7 detailed, academic-grade systems engineering points.
"""

import sys
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

# Theme Color Palette (CURE Civic Colors)
COLOR_NAVY = RGBColor(18, 59, 93)      # #123B5D - Primary Headers & Titles
COLOR_TEAL = RGBColor(15, 118, 110)    # #0F766E - Secondary Accents & Subtitles
COLOR_CHARCOAL = RGBColor(30, 41, 59)  # #1E293B - Body Text
COLOR_MUTED = RGBColor(100, 116, 139)  # #64748B - Captions & Notes
COLOR_WHITE = RGBColor(255, 255, 255)
COLOR_AMBER = RGBColor(217, 119, 6)    # #D97706
COLOR_RED = RGBColor(220, 38, 38)      # #DC2626
COLOR_GREEN = RGBColor(22, 163, 74)    # #16A34A

FONT_NAME = "Calibri"

def style_title_box(shape, main_title, subtitle=""):
    """Styles the title box on each slide cleanly."""
    tf = shape.text_frame
    tf.word_wrap = True
    tf.clear()
    
    p0 = tf.paragraphs[0]
    p0.text = main_title
    p0.font.name = FONT_NAME
    p0.font.size = Pt(22)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_NAVY
    p0.space_after = Pt(3)
    
    if subtitle:
        p1 = tf.add_paragraph()
        p1.text = subtitle
        p1.font.name = FONT_NAME
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEAL
        p1.space_after = Pt(4)

def add_content_points(slide, points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12.5), space_after=Pt(5.5)):
    """Creates a new text box and populates 6-7 structured bullet points."""
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.1)
    tf.margin_right = Inches(0.1)
    tf.margin_top = Inches(0.1)
    tf.margin_bottom = Inches(0.1)
    
    for idx, (title, body) in enumerate(points):
        p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
        p.space_after = space_after
        p.line_spacing = 1.15
        
        # Number / Bullet + Bold Title
        r1 = p.add_run()
        r1.text = f"{idx + 1}.  {title}: "
        r1.font.name = FONT_NAME
        r1.font.bold = True
        r1.font.size = font_size
        r1.font.color.rgb = COLOR_NAVY
        
        # Body text
        r2 = p.add_run()
        r2.text = body
        r2.font.name = FONT_NAME
        r2.font.bold = False
        r2.font.size = font_size
        r2.font.color.rgb = COLOR_CHARCOAL
        
    return tb

def build_presentation(file_path):
    prs = pptx.Presentation(file_path)
    print(f"Loaded presentation: {len(prs.slides)} slides.")
    
    # =========================================================================
    # SLIDE 1: Title Slide
    # =========================================================================
    s1 = prs.slides[0]
    # Shape 1 is TextBox 5 (Title area)
    tb_title = s1.shapes[1]
    tf1 = tb_title.text_frame
    tf1.word_wrap = True
    tf1.clear()
    
    p = tf1.paragraphs[0]
    p.text = "CURE: City Unified Response & Evolution Platform"
    p.font.name = FONT_NAME
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = COLOR_NAVY
    p.space_after = Pt(4)
    
    p_sub = tf1.add_paragraph()
    p_sub.text = "An AI-Assisted Civic Decision-Support System for Inter-Agency Infrastructure Management"
    p_sub.font.name = FONT_NAME
    p_sub.font.size = Pt(14)
    p_sub.font.bold = True
    p_sub.font.color.rgb = COLOR_TEAL
    p_sub.space_after = Pt(4)
    
    p_sec = tf1.add_paragraph()
    r = p_sec.add_run()
    r.text = "Sector: "
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = COLOR_NAVY
    r = p_sec.add_run()
    r.text = "Smart Cities & Urban Civic Governance  |  "
    r.font.size = Pt(12)
    r.font.color.rgb = COLOR_CHARCOAL
    
    r = p_sec.add_run()
    r.text = "Sub-System: "
    r.font.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = COLOR_NAVY
    r = p_sec.add_run()
    r.text = "Municipal Grievance Redressal, Road Infrastructure & Stormwater Drainage"
    r.font.size = Pt(12)
    r.font.color.rgb = COLOR_CHARCOAL
    
    # Add 7 Core Focus Pillars in the middle of Slide 1
    s1_points = [
        ("Core Engineering Paradigm", "Transitioning municipal governance from isolated reactive ticket-patching to proactive, systems-oriented root-cause resolution."),
        ("Citizen-Centric Simplicity", "Natural 30-second problem intake via vernacular voice (Telugu/Hindi/English), text, or photo without bureaucratic guesswork."),
        ("Automated Inter-Agency Routing", "Algorithmic mapping of 12 citizen problem categories directly to municipal wings (GHMC Engineering, HMWS&SB, Traffic Police)."),
        ("Auditable Operational Lifecycle", "Full visibility for field engineers across 6 stages (Received -> Assigned -> Inspection -> Action -> Verification -> Closed)."),
        ("Closed-Loop Citizen Verification", "Citizen sign-off authority ('Was it actually fixed?') prevents premature closure and automatically triggers recurrence detection."),
        ("Spatial-Temporal Root Cause Engine", "Traces cascading failure loops (Precipitation -> Silt Blockage -> Road Base Saturation -> Pothole Recurrence)."),
        ("Multi-Agency Joint Work Orders (JWOs)", "Binds drainage desilting, polymer road repaving, and traffic management into a single synchronized operational dispatch.")
    ]
    add_content_points(s1, s1_points, left=Inches(1.4), top=Inches(2.55), width=Inches(10.5), height=Inches(2.4), font_size=Pt(10.8), space_after=Pt(3))
    
    # Team Details (TextBox 7)
    tb_team = s1.shapes[3]
    tf_team = tb_team.text_frame
    tf_team.word_wrap = True
    tf_team.clear()
    p = tf_team.paragraphs[0]
    p.text = "Team Details:"
    p.font.name = FONT_NAME
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_NAVY
    
    team_members = [
        "1. Lead Systems Architect & Developer",
        "2. AI/ML & Data Engineering Lead",
        "3. UI/UX & Field Workflow Lead",
        "4. Systems Dynamics & Policy Lead",
        "Dept. of Artificial Intelligence / CSE"
    ]
    for tm in team_members:
        p_m = tf_team.add_paragraph()
        p_m.text = tm
        p_m.font.name = FONT_NAME
        p_m.font.size = Pt(9.5)
        p_m.font.color.rgb = COLOR_CHARCOAL
        
    # Guidance Details (TextBox 8)
    tb_guide = s1.shapes[4]
    tf_guide = tb_guide.text_frame
    tf_guide.word_wrap = True
    tf_guide.clear()
    p = tf_guide.paragraphs[0]
    p.text = "Under Guidance of:"
    p.font.name = FONT_NAME
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_NAVY
    
    guide_lines = [
        "Faculty Mentor & Project Guide",
        "Department of Artificial Intelligence",
        "School of Engineering & Technology",
        "Problem Solving in Engineering (PSE-1)",
        "External Evaluation 2026"
    ]
    for gl in guide_lines:
        p_g = tf_guide.add_paragraph()
        p_g.text = gl
        p_g.font.name = FONT_NAME
        p_g.font.size = Pt(9.5)
        p_g.font.color.rgb = COLOR_CHARCOAL
    
    print("Slide 1 formatted.")

    # =========================================================================
    # SLIDE 2: Agenda
    # =========================================================================
    s2 = prs.slides[1]
    # Update Shape 2 (TextBox 4)
    style_title_box(s2.shapes[2], "AGENDA: Presentation Outline & Evaluation Tracks", "Structured Systems Thinking Lifecycle for Municipal Transformation")
    
    # Hide / clear old text box 7
    s2.shapes[4].text_frame.clear()
    
    s2_points = [
        ("System Boundary & Perfect System Vision", "Defining the ambitious 'How Might We' and establishing an ideal zero-friction, proactive civic governance baseline."),
        ("Current State & Observed Symptoms", "Deconstructing the reactive municipal redressal trap, persistent pothole cycles, and citizen dissatisfaction across urban wards."),
        ("Multi-Stakeholder Identification & Conflict Mapping", "Analyzing conflicting priorities between citizens, line engineering wings (GHMC/HMWS&SB), traffic police, and administrative leadership."),
        ("Root Cause Analysis (RCA) & Causal Loops", "Diagnosing underlying structural drivers: uncoordinated trenching, lack of drainage telemetry, and linear redressal metrics."),
        ("Severity Assessment & Empirical Evidence", "Evaluating quantitative field data, recurring complaint cluster metrics, CAG audit disclosures, and economic cost of delays."),
        ("Ideation, Leverage Points & The CURE Proposal", "Applying Donella Meadows' leverage points and presenting CURE's closed-loop architecture as an engineered systemic intervention."),
        ("Implementation Architecture, Challenges & Future Scope", "Examining multi-tier technical implementation, current operational roadblocks, knowledge gaps, and authoritative literature.")
    ]
    add_content_points(s2, s2_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12.2), space_after=Pt(6))
    print("Slide 2 formatted.")

    # =========================================================================
    # SLIDE 3: Vision of a Perfect System
    # =========================================================================
    s3 = prs.slides[2]
    style_title_box(s3.shapes[2], "Vision of a Perfect System: Proactive & Self-Healing City Governance", "Ambitious 'How Might We' — Designing a Zero-Friction Municipal Ecosystem")
    
    s3_points = [
        ("Zero-Friction Citizen Intake in Under 30 Seconds", "Citizens effortlessly report grievances through vernacular voice (Telugu/Hindi/English), text, or photo without guessing departmental jurisdictions."),
        ("Autonomous Inter-Agency Case Routing", "CURE's routing engine instantly interprets multi-departmental failures and automatically binds Roads, Water, and Traffic agencies into a shared ticket."),
        ("Predictive Failure Prevention Before Grievances Emerge", "Weather telemetry surges and asset age automatically trigger preventive desilting and road base sealing before seasonal potholes manifest."),
        ("Complete Elimination of Mandatory Office Visits", "Real-time transparent tracking with live field inspection logs, photographic proof of work, and delay explanations posted directly to citizen dashboards."),
        ("Closed-Loop Citizen Verification Authority", "Tickets cannot be unilaterally closed by municipal staff; case closure is legally locked until the citizen confirms: 'Yes, it was actually fixed.'"),
        ("Dynamic Causal Urban Memory & Spatial Digital Twin", "The city maintains continuous memory of infrastructure failures, ensuring that recurring damage triggers deep structural interventions rather than repetitive patching."),
        ("Equitable, Evidence-Driven Resource Allocation", "Municipal budgets, equipment dispatches, and maintenance schedules are dynamically prioritized based on vulnerability indices and structural risks rather than political discretion.")
    ]
    add_content_points(s3, s3_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 3 formatted.")

    # =========================================================================
    # SLIDE 4: Current State & Symptoms
    # =========================================================================
    s4 = prs.slides[3]
    style_title_box(s4.shapes[2], "Current State & Observed Symptoms: The Reactive Municipal Redressal Trap", "Examining Current Municipal Operations (MyGHMC / CPGRAMS / Prajavani)")
    
    s4_points = [
        ("Siloed & Fragmented Department Operations", "Municipal wings (GHMC Roads, HMWS&SB Water/Sewerage, TSSPDCL Electrical, Traffic Police) maintain isolated ticketing databases with zero horizontal communication."),
        ("The Chronic 'Patch-and-Dig' Cycle", "Freshly paved asphalt is excavated within weeks for water pipeline repairs, or road patches cave in during the first rainfall because adjacent storm drains remain clogged."),
        ("Excessive Citizen Burden & Jurisdictional Guesswork", "Existing grievance portals force citizens to select technical engineering departments and administrative circles, leading to widespread misrouting and delayed action."),
        ("Premature & Unverified Ticket Closures", "Field teams routinely mark grievances 'Closed' upon applying cosmetic cold-mix patches or taking misleading photos, while the underlying defect remains unaddressed."),
        ("Opacity in Tracking & Mandatory Office Footfall", "Lack of information regarding assigned field officers, inspection dates, and inter-agency delays forces citizens to make repeated in-person visits to ward and zonal offices."),
        ("Escalating Public Safety Hazards & Economic Losses", "Unattended open manholes, persistent road cave-ins, and severe waterlogged junctions trigger massive traffic bottlenecks, vehicle damage, and fatal accidents."),
        ("Inefficient Municipal Expenditure on Repetitive Repairs", "Municipal corporations expend crores of public funds annually on recurring emergency road patching that washes away every monsoon, yielding zero lasting infrastructure equity.")
    ]
    add_content_points(s4, s4_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 4 formatted.")

    # =========================================================================
    # SLIDE 5: Stakeholder Identification & Impact
    # =========================================================================
    s5 = prs.slides[4]
    style_title_box(s5.shapes[4], "Stakeholder Identification & Multi-Dimensional Impact Mapping", "Analyzing Roles, Incentives & Conflicting Priorities in Civic Redressal")
    
    s5_points = [
        ("Urban Citizens, Commuters & Resident Welfare Associations (RWAs)", "Primary system victims enduring severe commute delays, vehicular repair expenses, health risks from sewage overflows, and grievance fatigue from unverified closures."),
        ("Zonal Commissioners & Municipal Leadership", "Accountable for ward-level public satisfaction and budget performance, but hindered by lack of cross-departmental telemetry and systemic recurrence analytics."),
        ("GHMC Roads & Infrastructure Engineering Wing", "Responsible for road quality and structural pavement integrity, yet routinely undermined by uncoordinated utility trenching and water stagnation from blocked drains."),
        ("HMWS&SB (Hyderabad Water Supply & Sewerage Board)", "Focuses on potable water pipelines and stormwater sewer capacity; executes emergency pipeline excavations that inadvertently destroy road subgrades."),
        ("Hyderabad Traffic Police & Transit Authorities", "Manage road gridlocks and safety diversions caused by sudden pavement failures and waterlogged junctions without advance notice from repair crews."),
        ("Field Inspection Engineers & Maintenance Contractors", "Operate under low-bid volume contracts and rigid response-time quotas, incentivizing superficial quick patches over durable structural interventions."),
        ("Emergency Services & Vulnerable Demographics", "Ambulances and fire tenders face critical response delays due to avoidable civic bottlenecks; elderly citizens, children, and pedestrians face fatal open-drain hazards.")
    ]
    add_content_points(s5, s5_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 5 formatted.")

    # =========================================================================
    # SLIDE 6: Root Cause Analysis (RCA) & Stakeholder Conflict
    # =========================================================================
    s6 = prs.slides[5]
    style_title_box(s6.shapes[2], "Root Cause Analysis (RCA) & Conflicting Stakeholder Priorities", "Why the Current System Fails: Structural Disconnects Behind Symptoms")
    
    # Format Table 2 (Shape 4)
    tbl_shape = s6.shapes[4]
    tbl = tbl_shape.table
    
    # Adjust position of Table 2 to bottom half: top=4.4in, height=2.3in
    tbl_shape.left = Inches(1.2)
    tbl_shape.top = Inches(4.5)
    tbl_shape.width = Inches(10.8)
    tbl_shape.height = Inches(2.2)
    
    # Row 0: Header
    cell00 = tbl.cell(0, 0)
    cell00.text = "Stakeholders Causing the Problem (Systemic Role)"
    for p in cell00.text_frame.paragraphs:
        p.font.name = FONT_NAME
        p.font.bold = True
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_NAVY
        
    cell01 = tbl.cell(0, 1)
    cell01.text = "Stakeholders Affected by the Problem (Impact)"
    for p in cell01.text_frame.paragraphs:
        p.font.name = FONT_NAME
        p.font.bold = True
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_NAVY
        
    # Row 1
    cell10 = tbl.cell(1, 0)
    cell10.text = "1. Independent Utility Agencies (HMWS&SB/TSSPDCL): Dig roads for pipe/cable maintenance without coordinated restoration schedules."
    for p in cell10.text_frame.paragraphs:
        p.font.name = FONT_NAME
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_CHARCOAL
        
    cell11 = tbl.cell(1, 1)
    cell11.text = "1. Citizens & Daily Motorists: Face vehicular damage, chronic traffic bottlenecks, and life-threatening road accidents."
    for p in cell11.text_frame.paragraphs:
        p.font.name = FONT_NAME
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_CHARCOAL
        
    # Row 2
    cell20 = tbl.cell(2, 0)
    cell20.text = "2. Maintenance Contractors & Line Engineers: Prioritize speed of closure over quality, applying cold-mix patches on wet saturated sub-bases."
    for p in cell20.text_frame.paragraphs:
        p.font.name = FONT_NAME
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_CHARCOAL
        
    cell21 = tbl.cell(2, 1)
    cell21.text = "2. Municipal Taxpayers & City Leadership: Waste municipal capital on repetitive rework; field engineers unfairly blamed for systemic flaws."
    for p in cell21.text_frame.paragraphs:
        p.font.name = FONT_NAME
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_CHARCOAL
    
    # Add 6 Analytical Root Cause Points in top half (top=1.9in, height=2.45in)
    s6_points = [
        ("Departmental & Jurisdictional Silos", "Utilities maintain walled-off databases with zero shared data layers, preventing cross-agency root-cause identification."),
        ("The 'Speed vs. Durability' Metric Trap", "Performance evaluations reward rapid ticket closure times rather than lasting repair durability, incentivizing quick superficial fixes."),
        ("Desynchronized Procurement & Budget Cycles", "Road paving and drainage desilting operate on separate fiscal schedules, making collaborative joint execution legally and financially difficult."),
        ("Hydrological Neglect in Road Engineering", "Municipal engineers treat potholes as isolated asphalt defects, completely ignoring that water pooling from silted drains destroys the subgrade."),
        ("Lack of Mandatory Closed-Loop Verification", "Grievance portals allow administrative self-certification of completion without requiring confirmation from the citizen who filed the report."),
        ("Static Relational Databases Lacking Causal Memory", "Conventional ticketing systems record disconnected rows, preventing spatial-temporal clustering and recurrence pattern detection.")
    ]
    add_content_points(s6, s6_points, left=Inches(1.2), top=Inches(1.85), width=Inches(10.8), height=Inches(2.5), font_size=Pt(10.8), space_after=Pt(2.5))
    print("Slide 6 formatted.")

    # =========================================================================
    # SLIDE 7: Severity of the Problem & Data-Based Evidence
    # =========================================================================
    s7 = prs.slides[6]
    style_title_box(s7.shapes[2], "Severity of the Problem: Data-Based Evidence & Empirical Ground Truth", "Quantitative Reality of Municipal Infrastructure Failures in Indian Metros")
    
    s7_points = [
        ("High Grievance Volumes with Substantial Recurrence Rates", "Over 150,000+ civic grievances logged annually in Hyderabad (GHMC Grievance Portal Data), with over 35% concentrated in chronic geographic recurrence clusters."),
        ("Severe Road Safety Toll & Pothole Fatalities", "Ministry of Road Transport and Highways (MoRTH Report 2022-2023) documents over 4,400+ road fatalities and 10,000+ severe injuries in India directly caused by potholes and uneven pavements."),
        ("Massive Economic Drain from Urban Traffic Latency", "Studies by the Indian Institute of Science (IISc) estimate that major Indian metropolitan areas lose over ₹25,000+ Crores annually in fuel wastage and lost productive hours due to waterlogged roads."),
        ("CAG Audit Disclosures on Wasteful Re-Digging", "Comptroller and Auditor General (CAG) state audit reports disclose that newly carpeted municipal roads are excavated within 30-90 days by utility providers in over 40% of inspected wards."),
        ("Premature Asphalt Pavement Failure Lifecycle", "Municipal road quality assessments reveal that cold-mix asphalt patches applied during monsoon moisture have an average field survival lifespan of under 14 days without sub-base drainage."),
        ("Escalating Citizen Dissatisfaction & Office Footfall", "Over 68% of citizens surveyed in municipal ward studies report visiting zonal offices in person due to uninformative portal tracking and arbitrary ticket closure."),
        ("Extreme Climate Vulnerability & Rainfall Surges", "Precipitation surges exceeding 40-60 mm/hour routinely overwhelm silted storm drains, converting minor blockages into catastrophic road cave-ins and severe urban flooding.")
    ]
    add_content_points(s7, s7_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 7 formatted.")

    # =========================================================================
    # SLIDE 8: Ideation & Systemic Leverage Points
    # =========================================================================
    s8 = prs.slides[7]
    style_title_box(s8.shapes[2], "Ideation & Exploration: Systemic Leverage Points for Civic Transformation", "Applying Donella Meadows' Systems Thinking Framework to Municipal Governance")
    
    s8_points = [
        ("Leverage Point #12 (Constants & Parameters - Traditional / Weak)", "Increasing the budget for manual cold-mix asphalt trucks and adding more complaint desk operators (low systemic impact; treats symptoms without changing structure)."),
        ("Leverage Point #8 (Negative Feedback Loops - High Impact)", "Instituting a mandatory citizen verification loop where unconfirmed ticket closures automatically trigger escalation to Zonal Commissioners and reopen case files."),
        ("Leverage Point #6 (Structure of Information Flows - Transformative)", "Creating an open temporal knowledge graph that surfaces hidden causal links between storm drain siltation and recurring road degradation to all departments in real time."),
        ("Leverage Point #5 (Rules of the System - Regulatory Intervention)", "Mandating legally binding Multi-Agency Joint Work Orders (JWOs) that prohibit road repaving until underlying drainage desilting is formally verified and signed off."),
        ("Leverage Point #4 (Self-Organization & Predictive Evolution)", "Equipping municipal engineers with a Digital Twin and Policy Simulator to test desilting intervals and dynamically adjust preventive maintenance schedules before monsoons."),
        ("Universal Multimodal Citizen Interface", "Implementing vernacular voice input (Telugu, Hindi, English) and AI computer-vision photo audits to eliminate citizen cognitive load and ensure accurate spatial tagging."),
        ("Decentralized Operational Command Desks", "Providing field officers with interactive queues displaying historical recurrence logs, multi-agency clearance buttons, and auditable stage tracking.")
    ]
    add_content_points(s8, s8_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 8 formatted.")

    # =========================================================================
    # SLIDE 9: Chosen Proposal (CURE Platform)
    # =========================================================================
    s9 = prs.slides[8]
    style_title_box(s9.shapes[2], "Proposed Solution: CURE – City Unified Response & Evolution Platform", "An AI-Assisted Civic Decision-Support Prototype Connecting Citizens and Municipalities")
    
    s9_points = [
        ("Core Product Vision: Simplicity for Citizens, Intelligence for Government", "Citizens get a friction-free 30-second reporting experience; government gets a deep systems-thinking decision-support suite underneath."),
        ("Human-Centric Multimodal Intake (4-Step Wizard)", "Citizens describe issues naturally via voice (Telugu/Hindi/English), text, or photo; CURE automatically extracts metadata and maps to 12 natural civic categories."),
        ("The 'Office Visit Eliminator' Promise", "Guarantees that citizens never need to visit a municipal office by delivering real-time field progress logs, inspection photos, and transparent delay reasons."),
        ("Field Officer Work Desk with Auditable Lifecycles", "Equips engineers with structured work queues and a 6-stage lifecycle (Received -> Assigned -> Inspection -> Action -> Verification -> Closed) with clear accountability."),
        ("Closed-Loop Citizen Verification & Recurrence Detection", "Empowers the citizen to verify repair efficacy ('Yes, fixed' vs 'No, still exists'); negative feedback reopens the ticket and flags spatial recurrence clusters."),
        ("Root Cause Engine & Tri-Partite Evidence Architecture", "Explicitly separates OBSERVED field telemetry, ANALYSIS correlation, and HYPOTHESIS requiring field inspection—ensuring defensible governance intelligence."),
        ("Multi-Agency Joint Work Orders (CURE-JWO)", "Coordinates HMWS&SB (drainage desilting), GHMC Roads (polymer repaving), and Traffic Police (diversion) under a unified legal dispatch to halt repeat excavations.")
    ]
    add_content_points(s9, s9_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 9 formatted.")

    # =========================================================================
    # SLIDE 10: New System Architecture & Implementation Details
    # =========================================================================
    s10 = prs.slides[9]
    style_title_box(s10.shapes[3], "New System Architecture: Technical Design & Closed-Loop Implementation", "End-to-End Implementation Across 4 Connected Workspaces (v6.1 Production Prototype)")
    
    s10_points = [
        ("Tier 1: Citizen Intelligence Gateway", "Responsive web client featuring 12 natural problem categories, speech transcription (Web Speech API), simulated CV defect detection, and receipt generation."),
        ("Tier 2: Unified State & Routing Controller (Shared CURE State)", "Centralized state engine managing active tickets, stage lifecycles, recurrence flags, and cross-portal event propagation between citizen and government views."),
        ("Tier 3: Ward 45 Field Officer Operational Work Desk", "Priority-ranked work queue (High/Medium/Low), historical coordinate clusters (12 complaints in 60 days), and multi-agency clearance toggles with audit logs."),
        ("Tier 4: Root Cause Engine & Diagnostic Drawer", "Interactive causal visual chain with clickable nodes providing structured evidence logs (Observed field data -> Analysis -> Hypothesis -> Validation required)."),
        ("Tier 5: Interactive Temporal Knowledge Graph", "8 interconnected topological nodes (Weather -> Drainage -> Waterlogging -> Maintenance -> Road -> Complaint -> Pothole -> Citizen) rendering dynamic dependency trees."),
        ("Tier 6: Ward 45 Digital Twin & Asset Telemetry", "Living asset model for Drain D-104, Road R-36, and Streetlight SL-12 displaying operational statuses, complaint histories, and past maintenance inspection records."),
        ("Tier 7: Policy Simulator Sandbox & Closed-Loop JWO Generator", "Interactive mathematical parameter simulator projecting maintenance cost vs flood risk tradeoffs, paired with automated multi-agency Joint Work Order dispatch.")
    ]
    add_content_points(s10, s10_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 10 formatted.")

    # =========================================================================
    # SLIDE 11: Implementation Challenges & Bottlenecks
    # =========================================================================
    s11 = prs.slides[10]
    style_title_box(s11.shapes[2], "Implementation Challenges: Technical, Operational & Institutional Roadblocks", "Analyzing Real-World Friction in Municipal System Deployment")
    
    s11_points = [
        ("Inter-Agency Data Silos & Proprietary Formats", "Municipal departments utilize legacy databases and disconnected ERPs lacking standardized APIs, creating severe hurdles for real-time bidirectional data exchange."),
        ("Noisy Multimodal Submissions & Dialect Variability", "Handling low-quality citizen photos (poor lighting, occlusions) and regional dialect variations in spoken Telugu/Hindi during automated feature extraction."),
        ("Urban Canyon GPS Drift & Geotag Inaccuracies", "High-rise structures and dense overhead foliage cause GPS multipath errors, complicating sub-meter spatial clustering of infrastructure assets."),
        ("Institutional Inertia & Siloed Bureaucratic Resistance", "Departmental engineers and supervisors often resist shared accountability protocols under Joint Work Orders, preferring isolated line-item responsibility."),
        ("Field Hardware & Mobile Connectivity Limitations", "Field crews operate under harsh outdoor environments with entry-level smartphones and intermittent 4G/5G mobile network coverage in utility trenches."),
        ("False Submissions, Spam & Geotag Spoofing Risks", "Preventing automated spam, malicious duplicate filings, and artificial complaint clustering while maintaining low barrier-to-entry for genuine citizens."),
        ("Telemetry Validation & Ground-Truthing Gaps", "Calibrating prototype simulation parameters against real-world hydraulic pipe flows, subgrade soil moisture saturation, and asphalt tensile limits.")
    ]
    add_content_points(s11, s11_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 11 formatted.")

    # =========================================================================
    # SLIDE 12: Scope of Improvement & Strategic Roadmap
    # =========================================================================
    s12 = prs.slides[11]
    style_title_box(s12.shapes[3], "Scope of Improvement: Knowledge Gaps, Risk Mitigation & Strategic Roadmap", "Future Horizons for Institutionalizing CURE in Urban Administrations")
    
    s12_points = [
        ("Integration with India Urban Data Exchange (IUDX)", "Adopting standardized national civic data protocols to establish secure, interoperable data sharing pipelines across electricity, water, and road utilities."),
        ("Fine-Tuning Localized Multilingual Acoustic Models", "Training specialized edge-AI speech models on localized civic terminology, regional Hyderabadi Telugu idioms, and street-level landmarks."),
        ("IoT Ultrasonic Silt & Water-Level Sensor Mesh", "Deploying low-cost ultrasonic IoT depth sensors inside critical stormwater drains to provide real-time hydraulic telemetry directly to the Digital Twin."),
        ("Automated Photogrammetry via Municipal Transit Fleets", "Mounting high-resolution camera rigs on municipal buses and sanitation trucks to continuously scan road surfaces and detect early micro-cracking."),
        ("Administrative Bylaws for Joint Work Order Enforcement", "Establishing municipal statutory regulations that legally mandate joint inter-agency sign-offs before work orders can be closed or contractor payments released."),
        ("Climate Adaptation Modeling & Radar Integration", "Integrating Doppler weather radar feeds and satellite soil moisture maps into the Policy Simulator to model extreme precipitation shock events."),
        ("Citizen Incentive Engineering & Community Badging", "Developing verified community impact dashboards and civic recognition badges to sustain active citizen participation in the verification loop.")
    ]
    add_content_points(s12, s12_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(12), space_after=Pt(5.5))
    print("Slide 12 formatted.")

    # =========================================================================
    # SLIDE 13: References, Literature & Official Guidelines
    # =========================================================================
    s13 = prs.slides[12]
    style_title_box(s13.shapes[2], "Authoritative References, Academic Literature & Official Guidelines", "Foundational Sources, Research Papers & Municipal Charters")
    
    s13_points = [
        ("Meadows, Donella H. (2008)", "'Thinking in Systems: A Primer', Chelsea Green Publishing — Theoretical foundation for system boundaries, reinforcing/balancing feedback loops, and leverage points."),
        ("Ministry of Housing and Urban Affairs (MoHUA, 2021)", "'Smart Cities Mission: Open Data Guidelines & Service Level Benchmarks for Urban Infrastructure', Government of India — Standards for civic grievance redressal."),
        ("Greater Hyderabad Municipal Corporation (GHMC, 2023)", "'Citizen Charter & Engineering Wing Standard Operating Procedures (SOPs) for Road Maintenance & Desilting', Hyderabad — Administrative timeline benchmarks."),
        ("Ministry of Road Transport and Highways (MoRTH, 2022-2023)", "'Road Accidents in India Annual Analytical Report', Transport Research Wing, New Delhi — Empirical evidence on road defect fatalities."),
        ("Hyderabad Metropolitan Water Supply and Sewerage Board (HMWS&SB, 2023)", "'Comprehensive Storm Water Drainage Master Plan & Pipeline Trenching Guidelines for Hyderabad Urban Area' — Drainage network specifications."),
        ("India Urban Data Exchange (IUDX, 2022)", "'Architecture Specification for Interoperable Smart City Platforms', Indian Institute of Science (IISc) & MoHUA — Technical protocols for multi-agency data pipelines."),
        ("Comptroller and Auditor General of India (CAG, 2021)", "'State Audit Report on Implementation of Urban Infrastructure Projects in Municipal Corporations' — Empirical data on wasteful utility trenching cycles.")
    ]
    add_content_points(s13, s13_points, left=Inches(1.2), top=Inches(2.1), width=Inches(10.8), height=Inches(4.6), font_size=Pt(11.8), space_after=Pt(5.5))
    print("Slide 13 formatted.")

    # Save presentation
    prs.save(file_path)
    print(f"\nSUCCESS: Presentation successfully populated and saved to:\n{file_path}")

if __name__ == "__main__":
    target_pptx = r"C:\Users\Lenovo\OneDrive\Desktop\PSE-1\PSE External Evaluation Presentation Template.pptx"
    build_presentation(target_pptx)
