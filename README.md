# TripSplit 🧳💸

**Group Travel Expense Tracker**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://tripsplit-gold.vercel.app)

> A full-stack web app that helps travel groups log, split, and settle shared expenses — so you can focus on the trip, not the math.

---

## 📌 Table of Contents

- [Project Description](#-project-description)
- [Authors](#-authors)
- [Tech Stack](#-tech-stack)
- [User Personas](#-user-personas)
- [User Stories](#-user-stories)
- [Design Mockups](#-design-mockups)
- [Project Structure](#-project-structure)
- [Instructions to Build](#-instructions-to-build)
- [How to Use](#-how-to-use)
- [Deployment](#-deployment)
- [License](#-license)

---

## 📖 Project Description

Traveling in a group is fun — splitting the bill is not. TripSplit is a **group travel expense tracker** that solves the classic problem: after a trip, nobody can remember who paid for what, and figuring out who owes whom becomes a frustrating spreadsheet exercise.

TripSplit lets a group of travelers:

- **Add members** to a shared trip
- **Log expenses** (meals, hotels, transport, activities, etc.) with the payer and amount
- **Browse and filter** expenses by category or keyword
- **See live balance summaries** — who has paid too much and who needs to pay back

The goal is a **lightweight, real-time ledger** that anyone in the group can update, with no signup friction and no complex settlement algorithms — just a clear view of the numbers.

### Key Features

| Feature | Description |
|---|---|
| Expense CRUD | Add, view, edit, and delete any expense entry |
| Member CRUD | Add and remove trip participants |
| Category filtering | Filter expenses by type (Food, Hotel, Transport, etc.) |
| Keyword search | Search through expense descriptions |
| Balance view | See per-member net balances at a glance |
| Seed data | 1,200+ synthetic records for testing and demo |
| Cloud deployment | Hosted on Vercel with MongoDB Atlas backend |

### Class Context

Built for **CS5610 Web Development** at Northeastern University (Spring 2025), taught by [Professor John Alexis Guerra Gomez](https://johnguerra.co/classes/webDevelopment_spring_2025/).

---

## 👩‍💻 Authors

| Name | Contribution |
|---|---|
| **Yazi Zhang** | Expense Manager — full CRUD for expenses (frontend components + backend routes) |
| **Jianyu Qiu** | Member & Balance Manager — member CRUD + balance calculation logic |

---

## 🛠 Tech Stack

- **Frontend**: React 18 with Hooks, component-scoped CSS, Vite
- **Backend**: Node.js + Express (ES Modules)
- **Database**: MongoDB Atlas (native driver, no Mongoose)
- **Deployment**: Vercel (frontend) + Vercel Serverless (API)

---

## 🧑‍🤝‍🧑 User Personas

### Persona 1 — Maya, the Trip Organizer

> *"I'm tired of being the one who pays for everything and then awkwardly chases people for money weeks later."*

- **Age**: 28
- **Occupation**: Product Manager, San Francisco
- **Travel style**: Organizes 2–3 group trips per year with 4–8 friends
- **Tech comfort**: High — uses Venmo, Splitwise, Google Docs regularly
- **Pain point**: She always ends up fronting large group expenses (Airbnb, rental cars) and loses track of reimbursements over time
- **Goal**: A shared, always-up-to-date ledger her whole group can see without creating accounts

---

### Persona 2 — David, the Reluctant Payer

> *"I just want to know what I owe at the end and pay it all at once. I don't care about the details."*

- **Age**: 34
- **Occupation**: Software Engineer, remote
- **Travel style**: Joins 1–2 group trips per year, usually as a guest rather than organizer
- **Tech comfort**: High technically, but low patience for UI friction
- **Pain point**: He doesn't pay attention to expenses during the trip and ends up with surprise debts at the end
- **Goal**: A simple, readable summary of his net balance so he can settle up in one Venmo transfer

---

### Persona 3 — Sophie, the Budget-Conscious Traveler

> *"I want to make sure we're not going over budget and that everyone is paying their fair share."*

- **Age**: 24
- **Occupation**: Graduate student, living on a tight budget
- **Travel style**: Occasional group trips with college friends; very cost-conscious
- **Tech comfort**: Moderate — comfortable with mobile apps but prefers simple interfaces
- **Pain point**: Unclear who paid for what leads to disputes; she worries about being taken advantage of
- **Goal**: Transparency — she wants to see every expense logged in real time with category breakdowns

---

## 📖 User Stories

### Story 1 — Logging a Group Dinner (Maya)

Maya and five friends just finished a big dinner in Tokyo. She paid ¥18,000 on her card. She opens TripSplit on her phone, taps **"Add Expense"**, fills in:

- Description: *"Ramen dinner – Ichiran Shibuya"*
- Amount: *$120*
- Category: *Food*
- Paid by: *Maya*

She hits save. The expense appears instantly in the list. Her friends can now see it too, and her balance updates to show she's currently owed $100 (her $20 share subtracted from $120 paid).

**Acceptance criteria:**
- User can fill and submit the expense form
- New expense appears in the list without page reload
- Balance panel updates to reflect the new payment

---

### Story 2 — Checking the Balance Before Checkout (David)

It's the last morning of the trip. David hasn't been paying attention to the ledger. He opens TripSplit, goes to the **Members & Balances** panel, and immediately sees:

> *David: -$87.50 (owes)*

He doesn't need to read every expense. He just Venmoes Maya $87.50 and they're done. No awkward conversation needed.

**Acceptance criteria:**
- Balance panel shows each member's net amount (positive = owed money, negative = owes money)
- Balances update in real time as expenses are added or removed

---

### Story 3 — Editing a Wrong Entry (Sophie)

Sophie notices the hotel expense was logged as $400 but the actual split should be $350 — someone entered the wrong amount. She finds the expense in the list, clicks **Edit**, corrects the amount, and saves. The list and balances update instantly.

**Acceptance criteria:**
- Each expense row has an Edit button
- Clicking Edit pre-fills the form with existing data
- Saving updates the record in MongoDB and re-renders the list

---

### Story 4 — Filtering to Review Food Spending (Sophie)

Halfway through the trip, Sophie wants to see how much the group has spent on food so far. She uses the **Category filter** to select *Food* and sees only food-related expenses, with a running total. She's reassured the group is within budget.

**Acceptance criteria:**
- Category dropdown filters the expense list client-side
- Filter applies immediately without reload
- All expense categories are represented in the dropdown

---

### Story 5 — Removing a Member Who Cancelled (Maya)

One friend had to cancel the trip last minute. Maya removes them from the Members list so they're no longer included in balance calculations.

**Acceptance criteria:**
- Members panel has a Delete button per member
- Deleting a member removes them from the dropdown in the expense form
- Balances recalculate to reflect the change

---

## 🎨 Design Mockups

### Overall Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  🧳 TripSplit                              Tokyo Trip, June 2025    │
├────────────────────────────────┬────────────────────────────────────┤
│                                │                                    │
│   MEMBERS & BALANCES           │   EXPENSES                         │
│   ─────────────────────        │   ──────────────────────────────   │
│                                │                                    │
│   Maya         +$100.00  ✅    │   [Search...] [Category ▼] [+Add] │
│   David         -$87.50  💸    │                                    │
│   Sophie        -$12.50  💸    │   ┌──────────────────────────────┐ │
│                                │   │ 🍜 Ramen dinner – Ichiran    │ │
│   [+ Add Member]               │   │  $120  •  Food  •  Maya      │ │
│                                │   │                  [Edit][Del]  │ │
│                                │   └──────────────────────────────┘ │
│                                │   ┌──────────────────────────────┐ │
│                                │   │ 🏨 Shinjuku Airbnb – Night 1 │ │
│                                │   │  $350  •  Hotel  •  David    │ │
│                                │   │                  [Edit][Del]  │ │
│                                │   └──────────────────────────────┘ │
│                                │   ┌──────────────────────────────┐ │
│                                │   │ 🚅 Shinkansen to Kyoto       │ │
│                                │   │   $80  • Transit • Sophie    │ │
│                                │   │                  [Edit][Del]  │ │
│                                │   └──────────────────────────────┘ │
└────────────────────────────────┴────────────────────────────────────┘
```

---

### Add / Edit Expense Form (Modal)

```
┌─────────────────────────────────┐
│  Add New Expense            [✕] │
├─────────────────────────────────┤
│                                 │
│  Description                    │
│  ┌─────────────────────────┐    │
│  │ Ramen dinner – Ichiran  │    │
│  └─────────────────────────┘    │
│                                 │
│  Amount ($)                     │
│  ┌──────────┐                   │
│  │  120.00  │                   │
│  └──────────┘                   │
│                                 │
│  Category                       │
│  ┌─────────────────────────┐    │
│  │ Food               ▼    │    │
│  └─────────────────────────┘    │
│   Food / Hotel / Transit /      │
│   Activity / Other              │
│                                 │
│  Paid by                        │
│  ┌─────────────────────────┐    │
│  │ Maya               ▼    │    │
│  └─────────────────────────┘    │
│                                 │
│      [Cancel]  [Save Expense]   │
└─────────────────────────────────┘
```

---

### Balance Summary Panel

```
┌──────────────────────────────┐
│  👥 Members & Balances       │
├──────────────────────────────┤
│                              │
│  Maya                        │
│  ████████████░░░  +$100.00   │
│                              │
│  David                       │
│  ░░░░████████░░░   -$87.50   │
│                              │
│  Sophie                      │
│  ░░░░░░░░████░░░   -$12.50   │
│                              │
│  Total logged: $550.00       │
│                              │
│  [+ Add Member]              │
└──────────────────────────────┘
```

---

### Mobile View (Stacked)

```
┌─────────────────────┐
│  🧳 TripSplit       │
├─────────────────────┤
│  Balances           │
│  Maya     +$100  ✅ │
│  David    -$87   💸 │
│  Sophie   -$12   💸 │
├─────────────────────┤
│  [Search...] [▼Cat] │
│                     │
│  🍜 Ramen dinner    │
│  $120 • Food • Maya │
│  [Edit]    [Delete] │
│  ─────────────────  │
│  🏨 Shinjuku Airbnb │
│  $350 • Hotel•David │
│  [Edit]    [Delete] │
│                     │
│         [+ Add New] │
└─────────────────────┘
```

---

## 📁 Project Structure

```
tripsplit/
├── backend/
│   ├── db/
│   │   └── connection.js       # MongoDB connection helper
│   ├── routes/
│   │   ├── expenses.js         # Expense CRUD routes (Yazi)
│   │   └── members.js          # Member CRUD routes (Jianyu)
│   ├── scripts/
│   │   └── seed.js             # Seed 1200+ synthetic records
│   ├── server.js               # Express entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm/    # Add / edit expense form
│   │   │   ├── ExpenseItem/    # Single expense row
│   │   │   ├── ExpenseList/    # Filterable expense list
│   │   │   └── ...             # Member components (Jianyu)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── .eslintrc.json
├── .prettierrc
├── LICENSE
└── README.md
```

---

## 🚀 Instructions to Build

### Prerequisites

- Node.js v18+
- A MongoDB Atlas cluster (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/klenq/tripsplit.git
cd tripsplit
```

### 2. Configure environment

Create `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
DB_NAME=tripsplit
PORT=5000
```

> ⚠️ Never commit `.env` — it's in `.gitignore`

### 3. Install & run the backend

```bash
cd backend
npm install
npm run dev          # starts Express server on port 5000
```

### 4. Seed the database (optional)

```bash
cd backend
node scripts/seed.js  # inserts 1200+ synthetic expense records
```

### 5. Install & run the frontend

```bash
cd frontend
npm install
npm run dev          # starts Vite dev server, proxies /api → backend
```

### 6. Open in browser

```
http://localhost:5173
```

---

## 📋 How to Use

1. **Add trip members** using the Members panel (left side)
2. **Log an expense** — fill in description, amount, category, and who paid
3. **View all expenses** — browse the list, filter by category, or search by keyword
4. **Edit or delete** any expense using the action buttons on each row
5. **Check balances** — the Members panel shows who owes what in real time

---

## 🌐 Deployment

Live app: **[https://tripsplit-gold.vercel.app](https://tripsplit-gold.vercel.app)**

Deployed via Vercel with MongoDB Atlas as the cloud database.

---

## 📄 License

[MIT](./LICENSE)
