# Palm2Pay Merchant Dashboard - Complete UI Specification

## Dashboard Structure

```
Palm2Pay Merchant (Next.js + React + TypeScript)
├── Authentication
│   ├── Login
│   ├── Register
│   └── Forgot Password
├── Main Layout
│   ├── Sidebar Navigation
│   ├── Top Header
│   └── Main Content Area
├── Pages
│   ├── Dashboard (Overview)
│   ├── Transactions
│   ├── Analytics
│   ├── Customers
│   ├── Hardware
│   ├── Settings
│   └── Reports
```

---

## 1. AUTHENTICATION

### Screen 1.1: Merchant Login
**File:** `apps/merchant/src/app/login/page.tsx`

```
┌─────────────────────────────────────────────────┐
│                                                 │
│    [Palm2Pay Logo]                              │
│                                                 │
│    ┌─────────────────────────────────┐          │
│    │  Welcome Back                   │          │
│    │                                 │          │
│    │  Store Email                    │          │
│    │  [________________]             │          │
│    │                                 │          │
│    │  Password                       │          │
│    │  [________________] [👁]        │          │
│    │                                 │          │
│    │  ☐ Remember me  Forgot password?│          │
│    │                                 │          │
│    │  [Sign In]                      │          │
│    │                                 │          │
│    │  ─────────── Or ───────────     │          │
│    │                                 │          │
│    │  [📱 Login with Biometric]      │          │
│    └─────────────────────────────────┘          │
│                                                 │
│    Don't have an account? [Register]            │
│                                                 │
│    © 2026 Palm2Pay for Business                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Features:**
- Email/password authentication
- Remember me checkbox
- Biometric login option (for stored credentials)
- Link to registration
- Link to password recovery

---

### Screen 1.2: Merchant Registration
**File:** `apps/merchant/src/app/register/page.tsx`

```
┌─────────────────────────────────────────────────┐
│                                                 │
│    [Palm2Pay Logo]                              │
│                                                 │
│    ┌─────────────────────────────────┐          │
│    │  Create Your Merchant Account   │          │
│    │                                 │          │
│    │  Business Information           │          │
│    │  ─────────────────────          │          │
│    │                                 │          │
│    │  Business Name *                │          │
│    │  [________________]             │          │
│    │                                 │          │
│    │  Business Type *                │          │
│    │  [Select ▼]                     │          │
│    │    Restaurant                   │          │
│    │    Retail Store                 │          │
│    │    Grocery                      │          │
│    │    Convenience Store            │          │
│    │    Entertainment Venue          │          │
│    │    Other                        │          │
│    │                                 │          │
│    │  Tax ID / EIN *                 │          │
│    │  [________________]             │          │
│    │                                 │          │
│    │  Business Address               │          │
│    │  [________________]             │          │
│    │                                 │          │
│    │  Contact Information            │          │
│    │  ─────────────────────          │          │
│    │                                 │          │
│    │  Full Name *                    │          │
│    │  Email *                        │          │
│    │  Phone *                        │          │
│    │                                 │          │
│    │  Password *                     │          │
│    │  [________________]             │          │
│    │  Min 8 chars, 1 number, 1 symbol│          │
│    │                                 │          │
│    │  ☐ I agree to Terms & Privacy   │          │
│    │                                 │          │
│    │  [Create Account]               │          │
│    └─────────────────────────────────┘          │
│                                                 │
│    Already have an account? [Sign In]           │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 2. MAIN LAYOUT

### Screen 2.1: Dashboard Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────┐ ┌───────────────────────────────────────────────────┐   │
│ │Logo │ │  Search...              [🔔] [⚙️] [👤] [▼]       │   │
│ └─────┘ └───────────────────────────────────────────────────┘   │
│ ┌─────┐                                                         │
│ │📊   │  Main Content Area                                      │
│ │Dash │  ┌─────────────────────────────────────────────────┐   │
│ └─────┘  │                                                 │   │
│ ┌─────┐  │                                                 │   │
│ │💳   │  │                                                 │   │
│ │Trans│  │                                                 │   │
│ └─────┘  │                                                 │   │
│ ┌─────┐  │                                                 │   │
│ │📈   │  │                                                 │   │
│ │Analy│  │                                                 │   │
│ └─────┘  │                                                 │   │
│ ┌─────┐  │                                                 │   │
│ │👥   │  │                                                 │   │
│ │Cust │  │                                                 │   │
│ └─────┘  │                                                 │   │
│ ┌─────┐  │                                                 │   │
│ │🖥️   │  │                                                 │   │
│ │Hard │  │                                                 │   │
│ └─────┘  │                                                 │   │
│ ┌─────┐  │                                                 │   │
│ │📄   │  │                                                 │   │
│ │Rep  │  │                                                 │   │
│ └─────┘  │                                                 │   │
│ ┌─────┐  │                                                 │   │
│ │⚙️   │  │                                                 │   │
│ │Set  │  │                                                 │   │
│ └─────┘  │                                                 │   │
│          └─────────────────────────────────────────────────┘   │
│ ┌─────┐                                                         │
│ │Help │  Footer: © 2026 Palm2Pay | Privacy | Terms | Support   │
│ └─────┘                                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Sidebar Navigation Items:**

| Icon | Label | Path |
|------|-------|------|
| 📊 | Dashboard | `/` |
| 💳 | Transactions | `/transactions` |
| 📈 | Analytics | `/analytics` |
| 👥 | Customers | `/customers` |
| 🖥️ | Hardware | `/hardware` |
| 📄 | Reports | `/reports` |
| ⚙️ | Settings | `/settings` |
| 🆘 | Help & Support | `/help` |

---

## 3. DASHBOARD (OVERVIEW)

### Screen 3.1: Main Dashboard ✅ (EXISTING - Enhance)
**File:** `apps/merchant/src/app/page.tsx`

**Current Implementation:** ✅ Good foundation

**Enhanced Version per PRD:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Dashboard                           [+ New Transaction]        │
│  Welcome back! Here's today's overview                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Today's  │ │          │ │          │ │          │          │
│  │ Revenue  │ │ Transactions│ Success  │ │ Failed   │          │
│  │          │ │          │ │ Rate     │ │          │          │
│  │ $1,247.50│ │   23     │ │  95.7%   │ │    1     │          │
│  │ ↑12.5%   │ │ ↑8.2%    │ │ ↑2.1%    │ │ ↓0.3%    │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────┐ ┌─────────────────────────┐   │
│  │  Quick Payment Terminal     │ │   Store Status          │   │
│  │                             │ │                         │   │
│  │  Amount (USD)               │ │   🟢 Online             │   │
│  │  $ [_______]                │ │   Accepting Payments    │   │
│  │                             │ │                         │   │
│  │  [$5][$10][$20][$50][$100]  │ │   Terminal: TERM-001    │   │
│  │                             │ │   Location: Main Store  │   │
│  │  [Process Palm Payment]     │ │                         │   │
│  │                             │ │   [Go Offline]          │   │
│  │  ┌─────────────┐            │ │                         │   │
│  │  │   [QR]      │            │ └─────────────────────────┘   │
│  │  │ Scan to Pay │            │                               │
│  │  └─────────────┘            │ ┌─────────────────────────┐   │
│  │                             │ │   Quick Actions         │   │
│  │  ✓ $24.99 - John D.         │ │                         │   │
│  │    2 min ago                │ │ [💰 Process Refund]     │   │
│  │                             │ │ [👤 Add Customer]       │   │
│  │                             │ │ [📥 Export Report]      │   │
│  │                             │ │ [🔔 Notifications]      │   │
│  └─────────────────────────────┘ └─────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Recent Transactions                              [View All →]  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ✓  John D.           $24.99    Today 2:30 PM           │   │
│  │ ✓  Sarah M.          $156.00   Today 2:25 PM           │   │
│  │ ✓  Mike R.           $8.50     Today 2:18 PM           │   │
│  │ ✗  Emily K.          $45.00    Today 2:10 PM   Failed  │   │
│  │ ✓  David L.          $89.99    Today 2:05 PM           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Hourly Revenue                                    [This Week ▼]│
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ▃  ▅  ▃  ▆  ▄  ▂  ▅  ▆  ▃  ▅  ▄  ▃                    │   │
│  │  6AM    9AM    12PM   3PM    6PM    9PM                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. TRANSACTIONS PAGE

### Screen 4.1: Transactions List
**File:** `apps/merchant/src/app/transactions/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Transactions                                                   │
│                                                                 │
│  Filters                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [All Status ▼] [Date Range ▼] [Amount ▼] [Search...]    │   │
│  │  All              Today      Min    $_______             │   │
│  │  Completed        Yesterday  Max    $_______             │   │
│  │  Failed           Last 7d                                 │   │
│  │  Refunded         Last 30d    [Apply Filters]             │   │
│  │                   Custom                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ☐ │ Transaction ID │ Customer │ Amount │ Status │ Time  │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ ☐ │ TXN-001234    │ John D.  │ $24.99 │ ✓ Done │ 2:30  │   │
│  │ ☐ │ TXN-001233    │ Sarah M. │ $156.00│ ✓ Done │ 2:25  │   │
│  │ ☐ │ TXN-001232    │ Mike R.  │ $8.50  │ ✓ Done │ 2:18  │   │
│  │ ☐ │ TXN-001231    │ Emily K. │ $45.00 │ ✗ Fail │ 2:10  │   │
│  │ ☐ │ TXN-001230    │ David L. │ $89.99 │ ✓ Done │ 2:05  │   │
│  │ ☐ │ TXN-001229    │ Lisa W.  │ $34.50 │ ✓ Done │ 1:58  │   │
│  │ ☐ │ TXN-001228    │ Tom H.   │ $67.80 │ ⏳ Pend  │ 1:45  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Showing 1-50 of 1,234 transactions             [1] [2] [3]... │
│                                                                 │
│  [Export CSV] [Export PDF] [Print]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Features:**
- Multi-select for bulk actions
- Sortable columns
- Advanced filtering
- Search by transaction ID, customer name, amount
- Pagination
- Export options

---

### Screen 4.2: Transaction Detail
**File:** `apps/merchant/src/app/transactions/[id]/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  [← Back to Transactions]                                       │
│                                                                 │
│  Transaction Details                                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │                    ✓ COMPLETED                          │   │
│  │                                                          │   │
│  │                      $156.00                            │   │
│  │                                                          │   │
│  │              Transaction ID: TXN-001233                  │   │
│  │              Date: April 30, 2026 at 2:25 PM            │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────┐ ┌─────────────────────────┐       │
│  │  Customer Information   │ │  Payment Details        │       │
│  │                         │ │                         │       │
│  │  👤 Sarah Mitchell      │ │  Method: Palm Biometric │       │
│  │  📧 sarah@email.com     │ │  Card: Visa •••• 4242   │       │
│  │  📱 (555) 123-4567      │ │  Biometric: Palm Verified│      │
│  │  Customer since: Jan 2025│ │  Verification Time: 1.2s│      │
│  │                         │ │                         │       │
│  │  [View Customer Profile]│ │  Processing Fee: $4.68  │       │
│  │                         │ │  Net Amount: $151.32    │       │
│  │                         │ │                         │       │
│  └─────────────────────────┘ └─────────────────────────┘       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Items Purchased                                        │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  1x Premium Widget              $120.00                 │   │
│  │  2x Accessory Pack              $18.00                  │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Subtotal                       $138.00                 │   │
│  │  Tax (13%)                      $18.00                  │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Total                          $156.00                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────┐ ┌─────────────────────────┐       │
│  │  [Download Receipt]     │ │  [Process Refund]       │   │
│  └─────────────────────────┘ └─────────────────────────┘       │
│                                                                 │
│  Timeline                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ● 2:25:00 PM  Transaction initiated                     │   │
│  │  ● 2:25:01 PM  Palm scanned and verified                 │   │
│  │  ● 2:25:02 PM  Payment authorized                        │   │
│  │  ● 2:25:03 PM  Transaction completed                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. ANALYTICS PAGE

### Screen 5.1: Analytics Dashboard
**File:** `apps/merchant/src/app/analytics/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Analytics                                       [Export Report]│
│                                                                 │
│  Period: [Today ▼]  [Custom Range: Jan 1 - Jan 31]              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Total    │ │ Average  │ │ Peak     │ │ Refund   │          │
│  │ Revenue  │ │ Ticket   │ │ Hour     │ │ Rate     │          │
│  │          │ │          │ │          │ │          │          │
│  │ $38,450  │ │ $45.20   │ │ 12-1 PM  │ │ 2.3%     │          │
│  │ ↑18.2%   │ │ ↑5.4%    │ │ 2-3 PM   │ │ ↓0.5%    │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────┐ ┌─────────────────────┐   │
│  │  Revenue Trend                  │ │  Payment Methods    │   │
│  │                                 │ │                     │   │
│  │  [Line Chart]                   │ │  ┌───────────────┐  │   │
│  │                                 │ │  │ Palm Biometric│  │   │
│  │                                 │ │  │ ████████░░ 85%│  │   │
│  │                                 │ │  ├───────────────┤  │   │
│  │                                 │ │  │ Credit Card   │  │   │
│  │                                 │ │  │ ██░░░░░░░░ 12%│  │   │
│  │                                 │ │  ├───────────────┤  │   │
│  │  ───────────────────            │ │  │ Other         │  │   │
│  │  Mon  Tue  Wed  Thu  Fri  Sat   │ │  │ █░░░░░░░░░░ 3%│  │   │
│  │                                 │ │  └───────────────┘  │   │
│  └─────────────────────────────────┘ └─────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────┐ ┌─────────────────────┐   │
│  │  Sales by Category              │ │  Top Performing     │   │
│  │                                 │ │  Products           │   │
│  │  [Pie Chart]                    │ │                     │   │
│  │                                 │ │  1. Premium Widget  │   │
│  │    Electronics  35%             │ │     $12,450         │   │
│  │    Clothing     28%             │ │                     │   │
│  │    Food         22%             │ │  2. Accessory Pack  │   │
│  │    Other        15%             │ │     $8,230          │   │
│  │                                 │ │                     │   │
│  │                                 │ │  3. Service Plan    │   │
│  │                                 │ │     $5,670          │   │
│  └─────────────────────────────────┘ └─────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Customer Insights                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  New Customers     Returning     Avg Visits/Month       │   │
│  │  234               1,567         4.2                    │   │
│  │  ↑12%              ↑8%           ↑0.3                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Customer Retention Rate                                │   │
│  │  [Retention Curve Chart]                                │   │
│  │                                                         │   │
│  │  Day 1: 95%  |  Day 7: 78%  |  Day 30: 62%             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. CUSTOMERS PAGE

### Screen 6.1: Customer List
**File:** `apps/merchant/src/app/customers/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Customers                              [+ Add Customer]        │
│                                                                 │
│  [Search customers...]  [Filter: All ▼]  [Sort: Name ▼]        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Customer           │ Email          │ Visits │ Spent    │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ 👤 Sarah Mitchell  │ sarah@e.com    │   45   │ $2,450   │   │
│  │    Since Jan 2025  │                │        │          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ 👤 John Davis      │ john@e.com     │   32   │ $1,890   │   │
│  │    Since Mar 2025  │                │        │          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ 👤 Mike Roberts    │ mike@e.com     │   28   │ $1,560   │   │
│  │    Since Feb 2025  │                │        │          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Showing 1-20 of 456 customers              [1] [2] [3]...     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Screen 6.2: Customer Profile
**File:** `apps/merchant/src/app/customers/[id]/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  [← Back]                          [Edit] [Message]            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  👤 Sarah Mitchell           VIP Customer               │   │
│  │  📧 sarah.mitchell@email.com                            │   │
│  │  📱 (555) 123-4567                                      │   │
│  │  Customer since: January 15, 2025                       │   │
│  │  Palm ID: P2P-***-****-1234                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Total    │ │ Total    │ │ Avg      │ │ Last     │          │
│  │ Visits   │ │ Spent    │ │ Ticket   │ │ Visit    │          │
│  │          │ │          │ │          │ │          │          │
│  │   45     │ │ $2,450   │ │ $54.44   │ │ 2 days   │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  Transaction History                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Apr 28  │ Premium Widget    │ $120.00 │ ✓ Completed    │   │
│  │ Apr 25  │ Accessory Pack    │ $36.00  │ ✓ Completed    │   │
│  │ Apr 20  │ Service Plan      │ $89.00  │ ✓ Completed    │   │
│  │ ...                                                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [View All Transactions]                                        │
│                                                                 │
│  Notes                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Add a note...]                                         │   │
│  │                                                         │   │
│  │ • Prefers email communication                           │   │
│  │ • Interested in new product launches                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Loyalty Status                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Points: 2,450 / 5,000 (Gold Tier)                       │   │
│  │ ████████████████░░░░░ 49%                               │   │
│  │                                                         │   │
│  │ Rewards Available:                                      │   │
│  │ • $10 off next purchase (2,000 pts)                     │   │
│  │ • Free shipping (1,500 pts)                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. HARDWARE PAGE

### Screen 7.1: Hardware Management
**File:** `apps/merchant/src/app/hardware/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Hardware & Devices                     [+ Register Device]     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Palm Scanners                                          │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  ┌─────────────────┐ ┌─────────────────┐               │   │
│  │  │ 🖥️ Terminal 001 │ │ 🖥️ Terminal 002 │               │   │
│  │  │                 │ │                 │               │   │
│  │  │ 🟢 Online       │ │ 🟡 Offline      │               │   │
│  │  │ Main Counter    │ │ Storage Room    │               │   │
│  │  │                 │ │                 │               │   │
│  │  │ Last active:    │ │ Last active:    │               │   │
│  │  │ Now             │ │ 2 hours ago     │               │   │
│  │  │                 │ │                 │               │   │
│  │  │ [View Details]  │ │ [View Details]  │               │   │
│  │  │ [Configure]     │ │ [Configure]     │               │   │
│  │  │ [Test Device]   │ │ [Test Device]   │               │   │
│  │  └─────────────────┘ └─────────────────┘               │   │
│  │                                                         │   │
│  │  ┌─────────────────┐ ┌─────────────────┐               │   │
│  │  │ 🖥️ Terminal 003 │ │ 🔴 Terminal 004 │               │   │
│  │  │                 │ │                 │               │   │
│  │  │ 🟢 Online       │ │ Error           │               │   │
│  │  │ Express Lane    │ │ Needs Attention │               │   │
│  │  │                 │ │                 │               │   │
│  │  │ Last active:    │ │ Error: Camera   │               │   │
│  │  │ Now             │ │ malfunction     │               │   │
│  │  │                 │ │                 │               │   │
│  │  │ [View Details]  │ │ [Troubleshoot]  │               │   │
│  │  │ [Configure]     │ │ [Contact Support]│              │   │
│  │  └─────────────────┘ └─────────────────┘               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Device Health Overview                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Total Devices: 4                                       │   │
│  │  Online: 2 (50%)                                        │   │
│  │  Offline: 1 (25%)                                       │   │
│  │  Errors: 1 (25%)                                        │   │
│  │                                                         │   │
│  │  Firmware Updates Available: 2 devices                  │   │
│  │  [Update All]                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Scanner Settings                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  LED Behavior                                           │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Ready State:     [Solid Blue ▼]                        │   │
│  │  Processing:      [Pulsing Blue ▼]                      │   │
│  │  Success:         [Solid Green ▼]                       │   │
│  │  Error:           [Pulsing Red ▼]                       │   │
│  │                                                         │   │
│  │  Audio Feedback                                         │   │
│  │  ☑ Enable beep on scan                                  │   │
│  │  ☑ Enable voice prompts                                 │   │
│  │  Volume: [████████░░] 80%                               │   │
│  │                                                         │   │
│  │  [Save Settings]                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Screen 7.2: Device Detail
**File:** `apps/merchant/src/app/hardware/[id]/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  [← Back to Hardware]                                           │
│                                                                 │
│  Terminal 001 - Main Counter                                    │
│                                                                 │
│  Status: 🟢 Online                                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Device Information                                     │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Device ID:     TERM-001-P2P                            │   │
│  │  Model:         Palm2Pay Scanner Pro                    │   │
│  │  Serial Number: P2P-SC-2026-001234                      │   │
│  │  Firmware:      v2.4.1                                  │   │
│  │  IP Address:    192.168.1.105                           │   │
│  │  Location:      Main Counter, Store #001                │   │
│  │  Registered:    January 15, 2026                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Performance Metrics (Last 24 Hours)                    │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  Total Scans:        234                                │   │
│  │  Successful:         228 (97.4%)                        │   │
│  │  Failed:             6 (2.6%)                           │   │
│  │  Avg Response Time:  1.3s                               │   │
│  │                                                         │   │
│  │  [Performance Graph]                                    │   │
│  │  Hourly scan volume and success rate                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Recent Activity                                        │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  2:30 PM  │ Scan successful │ TXN-001234 │ 1.2s        │   │
│  │  2:28 PM  │ Scan successful │ TXN-001233 │ 1.4s        │   │
│  │  2:25 PM  │ Scan failed     │ Timeout    │ -           │   │
│  │  2:22 PM  │ Scan successful │ TXN-001232 │ 1.1s        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Actions                                                        │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ [🔄 Restart]    │ │ [⚙️ Configure]  │ │ [🔧 Test]       │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│  ┌─────────────────┐ ┌─────────────────┐                       │
│  │ [📦 Maintenance]│ │ [🗑️ Unregister] │                       │
│  └─────────────────┘ └─────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. SETTINGS PAGE

### Screen 8.1: Store Settings
**File:** `apps/merchant/src/app/settings/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Settings                                                       │
│                                                                 │
│  [General] [Payment] [Notifications] [Security] [Integration]   │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  General Settings                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Store Information                                      │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Store Name:        [Main Store____________]            │   │
│  │  Store ID:          [STORE-001____________]             │   │
│  │  Business Type:     [Retail Store__________▼]           │   │
│  │  Address:           [123 Main St___________]            │   │
│  │  City:              [New York______________]            │   │
│  │  State:             [NY____________________▼]           │   │
│  │  ZIP Code:          [10001_________________]            │   │
│  │  Phone:             [(555) 123-4567________]            │   │
│  │  Email:             [store@example.com_____]            │   │
│  │                                                         │   │
│  │  [Save Changes]                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Business Hours                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Monday    │ [9:00 AM ▼] to [10:00 PM ▼] │ ☐ Closed    │   │
│  │  Tuesday   │ [9:00 AM ▼] to [10:00 PM ▼] │ ☐ Closed    │   │
│  │  Wednesday │ [9:00 AM ▼] to [10:00 PM ▼] │ ☐ Closed    │   │
│  │  Thursday  │ [9:00 AM ▼] to [10:00 PM ▼] │ ☐ Closed    │   │
│  │  Friday    │ [9:00 AM ▼] to [11:00 PM ▼] │ ☐ Closed    │   │
│  │  Saturday  │ [9:00 AM ▼] to [11:00 PM ▼] │ ☐ Closed    │   │
│  │  Sunday    │ [10:00 AM ▼] to [8:00 PM ▼] │ ☑ Closed    │   │
│  │                                                         │   │
│  │  [Save Hours]                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Screen 8.2: Payment Settings
**File:** `apps/merchant/src/app/settings/payment/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Settings > Payment                                             │
│                                                                 │
│  Payment Processing                                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Connected Payment Gateway                              │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  🟢 Stripe Connect Active                               │   │
│  │  Account: st_merchant_abc123                            │   │
│  │                                                         │   │
│  │  [Manage Stripe Account] [Disconnect]                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Settlement Account                                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Bank Account for Deposits                              │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  🏦 Chase Business Checking                             │   │
│  │     Account: •••• 7890                                  │   │
│  │     Routing: •••• 1234                                  │   │
│  │                                                         │   │
│  │  [Change Account] [Verify]                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Payment Options                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Accepted Payment Methods                               │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  ☑ Palm Biometric (Default)                             │   │
│  │  ☑ Credit/Debit Cards                                   │   │
│  │  ☐ Digital Wallets (Apple Pay, Google Pay)              │   │
│  │  ☐ Cash                                                 │   │
│  │                                                         │   │
│  │  Transaction Limits                                     │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Minimum Amount:  $ [0.50]                              │   │
│  │  Maximum Amount:  $ [5000.00]                           │   │
│  │  Require PIN for: $ [100.00] and above                  │   │
│  │                                                         │   │
│  │  [Save Payment Settings]                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Fees & Pricing                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Current Plan: Professional                             │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Transaction Fee: 2.9% + $0.30 per transaction          │   │
│  │  Monthly Fee:     $49.00                                │   │
│  │  Hardware Lease:  $29.00/month per terminal             │   │
│  │                                                         │   │
│  │  [Upgrade Plan] [View Invoice History]                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Screen 8.3: Notification Settings
**File:** `apps/merchant/src/app/settings/notifications/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Settings > Notifications                                       │
│                                                                 │
│  Alert Preferences                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Transaction Alerts                                     │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  ☑ Successful transactions over $100                    │   │
│  │  ☑ Failed transactions                                  │   │
│  │  ☑ Refund processed                                     │   │
│  │  ☑ Daily summary report                                 │   │
│  │                                                         │   │
│  │  Device Alerts                                          │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  ☑ Device goes offline                                  │   │
│  │  ☑ Device error/failure                                 │   │
│  │  ☑ Firmware update available                            │   │
│  │  ☑ Low connectivity warning                             │   │
│  │                                                         │   │
│  │  Business Alerts                                        │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  ☑ Daily revenue target achieved                        │   │
│  │  ☑ Unusual activity detected                            │   │
│  │  ☑ Chargeback received                                  │   │
│  │  ☑ New customer milestone                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Notification Channels                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Email Notifications                                    │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Send to: [store@example.com____________]               │   │
│  │  ☑ Enable email notifications                           │   │
│  │                                                         │   │
│  │  SMS Notifications                                      │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  Send to: [(555) 123-4567_______________]               │   │
│  │  ☑ Enable SMS notifications (for urgent alerts only)    │   │
│  │                                                         │   │
│  │  Push Notifications                                     │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  ☑ Enable push notifications to registered devices      │   │
│  │  [Manage Devices]                                       │   │
│  │                                                         │   │
│  │  [Save Notification Settings]                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. REPORTS PAGE

### Screen 9.1: Reports Dashboard
**File:** `apps/merchant/src/app/reports/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Reports                                                        │
│                                                                 │
│  Quick Reports                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ 📊 Daily    │ │ 📈 Weekly   │ │ 📉 Monthly  │               │
│  │ Sales       │ │ Sales       │ │ Sales       │               │
│  │ [Generate]  │ │ [Generate]  │ │ [Generate]  │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                 │
│  Custom Report Builder                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Report Type: [Sales Summary ▼]                         │   │
│  │  Date Range: [Jan 1, 2026] to [Jan 31, 2026]            │   │
│  │  Group By: [Day ▼]                                      │   │
│  │  Filters:                                               │   │
│  │    Payment Method: [All ▼]                              │   │
│  │    Status: [All ▼]                                      │   │
│  │    Category: [All ▼]                                    │   │
│  │                                                         │   │
│  │  [Generate Report] [Save Template]                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Saved Reports                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📄 Monthly Sales Summary       │ Last: Jan 30 │ [View]  │   │
│  │ 📄 Weekly Performance          │ Last: Jan 28 │ [View]  │   │
│  │ 📄 Tax Report Q4 2025          │ Last: Dec 31 │ [View]  │   │
│  │ 📄 Customer Analytics          │ Last: Jan 15 │ [View]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Scheduled Reports                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Daily Sales Summary                                    │   │
│  │   Sent to: store@example.com                           │   │
│  │   Schedule: Every day at 11:00 PM                      │   │
│  │   [Edit] [Pause] [Delete]                              │   │
│  │                                                         │   │
│  │ Weekly Performance                                     │   │
│  │   Sent to: manager@example.com                         │   │
│  │   Schedule: Every Monday at 9:00 AM                    │   │
│  │   [Edit] [Pause] [Delete]                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Export All Reports]                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. HELP & SUPPORT PAGE

### Screen 10.1: Help Center
**File:** `apps/merchant/src/app/help/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│  Help & Support                                                 │
│                                                                 │
│  How can we help you?                                           │
│  [🔍 Search for articles, guides, troubleshooting...]           │
│                                                                 │
│  Quick Help                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ 📚 Getting  │ │ 🔧 Trouble- │ │ ❓ FAQ      │               │
│  │ Started     │ │ shooting    │ │             │               │
│  │ [Browse]    │ │ [Browse]    │ │ [Browse]    │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                 │
│  Popular Articles                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📖 Setting up your first Palm2Pay terminal              │   │
│  │ 📖 Understanding transaction fees                       │   │
│  │ 📖 How to process a refund                              │   │
│  │ 📖 Troubleshooting scanner connectivity                 │   │
│  │ 📖 Security best practices                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Contact Support                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Need more help? Our support team is here for you.      │   │
│  │                                                         │   │
│  │  💬 Live Chat                                           │   │
│  │     Average wait time: 2 minutes                        │   │
│  │     [Start Chat]                                        │   │
│  │                                                         │   │
│  │  📧 Email Support                                       │   │
│  │     Response within 24 hours                            │   │
│  │     [Send Email]                                        │   │
│  │                                                         │   │
│  │  📞 Phone Support                                       │   │
│  │     Mon-Fri, 9 AM - 6 PM EST                            │   │
│  │     1-800-PALM-PAY                                      │   │
│  │                                                         │   │
│  │  🎫 Submit a Ticket                                     │   │
│  │     For non-urgent issues                               │   │
│  │     [Create Ticket]                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  System Status                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  All Systems Operational ✓                              │   │
│  │                                                         │   │
│  │  API              ✓ Operational                         │   │
│  │  Payment Gateway  ✓ Operational                         │   │
│  │  Biometric Service ✓ Operational                        │   │
│  │  Dashboard        ✓ Operational                         │   │
│  │                                                         │   │
│  │  [View Status Page]                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Summary: Merchant Dashboard Pages

| Page | Status | Priority | File |
|------|--------|----------|------|
| Login | 🔴 To Build | High | `/login` |
| Register | 🔴 To Build | High | `/register` |
| Dashboard | ✅ Exists (enhance) | - | `/` |
| Transactions | 🔴 To Build | High | `/transactions` |
| Transaction Detail | 🔴 To Build | High | `/transactions/[id]` |
| Analytics | 🔴 To Build | High | `/analytics` |
| Customers | 🔴 To Build | Medium | `/customers` |
| Customer Profile | 🔴 To Build | Medium | `/customers/[id]` |
| Hardware | 🔴 To Build | High | `/hardware` |
| Device Detail | 🔴 To Build | High | `/hardware/[id]` |
| Settings | 🔴 To Build | High | `/settings` |
| Reports | 🔴 To Build | Medium | `/reports` |
| Help & Support | 🔴 To Build | Medium | `/help` |

---

## Component Library Needed

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Table.tsx
│   ├── Modal.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Dropdown.tsx
│   ├── Tabs.tsx
│   └── Toast.tsx
├── charts/
│   ├── LineChart.tsx
│   ├── BarChart.tsx
│   ├── PieChart.tsx
│   └── AreaChart.tsx
├── layout/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── Footer.tsx
└── specific/
    ├── TransactionTable.tsx
    ├── StatCard.tsx
    ├── DeviceCard.tsx
    ├── CustomerCard.tsx
    └── PaymentTerminal.tsx
```
