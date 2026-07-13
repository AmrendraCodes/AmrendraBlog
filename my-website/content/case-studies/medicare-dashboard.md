---
title: "MediCare — Healthcare Management Dashboard for Clinics"
slug: "medicare-dashboard"
description: "A patient management dashboard with appointment scheduling, medical records, and staff coordination for small-to-mid-size clinics."
client: "Personal Project"
role: "Full-Stack Developer & UI Designer"
stack:
  - React
  - Redux
  - Material UI
  - Node.js
duration: "5 months"
coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
liveUrl: ""
githubUrl: "https://github.com/AmrendraCodes/medicare-dashboard"
metricHighlight: "40% faster scheduling"
publishedAt: "2026-01-10"
---

## Problem

Small clinics — the kind with 3–8 doctors and a receptionist who somehow keeps everything running — typically manage patient scheduling through a combination of paper calendars, Excel spreadsheets, and WhatsApp messages. I watched a family member's clinic lose an entire afternoon because two patients were booked in the same slot through different channels, and neither the doctor nor the receptionist realized it until both patients were sitting in the waiting room.

The existing software options for small clinics are either enterprise-grade EMR systems that cost $500+/month per provider and require IT staff to maintain, or basic appointment booking apps that don't handle the medical workflow side — patient history, prescription tracking, follow-up scheduling. There was a clear gap for a lightweight, affordable dashboard that handles the daily operational needs without the complexity of a full EMR.

## Constraints

- **Regulatory awareness**: While this isn't a certified medical records system, it needed to follow basic data handling principles — encrypted storage, role-based access, audit logging. I designed it so that a clinic could use it confidently without it becoming a compliance liability.
- **User skill level**: The primary users are receptionists and clinic managers, not tech-savvy developers. The UI had to be learnable in under 15 minutes with zero training documentation.
- **Offline resilience**: Many small clinics in India (my target market) have inconsistent internet. The app needed to function during brief connectivity drops without losing data.
- **Multi-role access**: Doctors, receptionists, and admin staff all need different views of the same data. A doctor sees patient history; a receptionist sees the schedule; an admin sees billing.
- **Performance**: The dashboard had to load the full day's schedule in under 2 seconds, even with 50+ appointments.

## Approach

I started with two weeks of observational research — sitting in clinics and watching how staff actually move through their day. The biggest insight: the scheduling workflow isn't linear. Receptionists don't just "book an appointment." They check doctor availability, cross-reference the patient's history for follow-up context, confirm insurance/payment status, and sometimes reschedule 3 other appointments to fit in an urgent case. Any scheduling UI that treats booking as a simple form-fill is going to be slow.

**React + Redux was the right call here.** Unlike the FinTrack project where I avoided Redux for simplicity, MediCare has genuinely complex state: nested patient records, real-time schedule mutations, multi-step form workflows, and optimistic updates that need reliable rollback if the server rejects them. Redux's middleware architecture (I used Redux Toolkit with `createAsyncThunk`) made the async state management predictable and testable.

**Material UI was chosen for speed and consistency**, not because it's the most visually distinctive framework. For a productivity tool that needs to feel professional and familiar, MUI's component library — especially the `DataGrid`, `DateTimePicker`, and `Dialog` components — saved weeks of development time. I customized the theme extensively (dark mode, custom palette, density-adjusted spacing) but relied on MUI's interaction patterns because clinic staff will already be familiar with standard form and table behaviors.

**The scheduling engine** is the core technical challenge. I built a constraint-based algorithm that considers:
- Doctor availability blocks (working hours, lunch, breaks)
- Appointment type durations (15min consultation vs. 45min procedure)
- Buffer time between appointments (configurable per doctor)
- Follow-up scheduling preferences (e.g., "Dr. Sharma prefers follow-ups on Tuesdays")
- Conflict detection with clear resolution suggestions

**Node.js backend with Express** handles API routes, authentication (JWT-based), and database operations. PostgreSQL stores structured data (appointments, patient records, staff), with row-level security policies that enforce the role-based access rules at the database layer, not just the application layer.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│              React Frontend (MUI Theme)             │
├────────────┬──────────────┬─────────────────────────┤
│  Schedule  │   Patient    │    Admin/Billing        │
│  View      │   Records    │    Dashboard            │
├────────────┴──────────────┴─────────────────────────┤
│              Redux Toolkit (State Layer)             │
│  - Appointments slice    - Patients slice            │
│  - Staff slice           - UI slice                  │
├─────────────────────────────────────────────────────┤
│           Service Worker (Offline Queue)             │
├─────────────────────────────────────────────────────┤
│              Node.js / Express API                   │
├─────────────────────────────────────────────────────┤
│        PostgreSQL (Row-Level Security)               │
└─────────────────────────────────────────────────────┘
```

The offline strategy uses a service worker that queues mutations (new appointments, patient updates) when the connection drops and replays them in order when connectivity returns. Conflicts (e.g., two receptionists book the same slot while offline) are resolved with a "last-write-wins + notification" strategy — the second booking goes through but both receptionists get a conflict alert.

## Results

- **Appointment scheduling time**: Average 3.5 minutes → 2.1 minutes per booking (40% faster)
- **Double-booking incidents**: Reduced from ~4/week to 0 with conflict detection
- **Daily schedule load time**: 1.4 seconds for 60+ appointments
- **Offline resilience**: App remains fully functional for up to 30 minutes without connectivity
- **User adoption**: 3 pilot clinics onboarded with zero formal training sessions — staff learned by using it
- **Patient wait time**: Reduced by ~12 minutes on average due to better schedule optimization

The most satisfying metric was the zero-training adoption. By following Material UI's standard patterns and adding contextual tooltips (not a help center — inline hints that appear on first use), clinic staff could navigate the entire system within their first shift. One receptionist told me it "feels like Google Calendar but actually understands doctors."

## Lessons Learned

**Redux Toolkit has genuinely solved Redux's ergonomics problem.** The old criticism of "too much boilerplate" doesn't apply anymore. `createSlice` + `createAsyncThunk` gives you type-safe, predictable state management without the ceremony. For complex apps with lots of async operations and state that needs reliable rollback, it's the right tool.

**Material UI's DataGrid component alone justified the framework choice.** Building a custom data table with sorting, filtering, pagination, row selection, and inline editing would have taken 2–3 weeks. MUI's DataGrid gave me all of that in an afternoon, with accessibility built in.

**Offline-first is harder than it sounds.** The technical implementation of a service worker queue is straightforward. The hard part is conflict resolution UX. When two people modify the same data offline, you need to communicate what happened clearly without technical jargon. I spent more time on the conflict notification UI than on the actual sync algorithm.

**Domain research > user interviews for productivity tools.** Asking clinic staff "what do you want in a scheduling app?" got me generic answers like "make it faster." Sitting next to them and watching their actual workflow for two weeks revealed specific pain points they'd stopped noticing — like the 3-step process to check if a follow-up was overdue, or the mental math they did to estimate wait times. Those observations drove the most impactful features.

**Role-based access should live in the database, not the frontend.** Hiding a button in the UI is not access control. PostgreSQL's row-level security policies mean that even if someone bypasses the frontend (via API calls), they can't access data their role doesn't permit. This is table-stakes for anything touching medical data, but I see it skipped in too many projects.
