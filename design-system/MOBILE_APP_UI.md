# Palm2Pay Mobile App - Complete UI Specification

## App Structure

```
Palm2Pay Mobile (React Native + TypeScript)
├── Navigation: Bottom Tabs (5 tabs)
│   ├── Home
│   ├── Pay
│   ├── Palm (Biometric)
│   ├── Transactions
│   └── Profile
├── Auth Flow (Unauthenticated)
└── Onboarding Flow (First launch)
```

---

## 1. ONBOARDING FLOW

### Screen 1.1: Welcome Screen
**File:** `apps/mobile/src/screens/Onboarding/WelcomeScreen.tsx`

```
┌─────────────────────────────────┐
│                                 │
│         [Palm Icon Animation]   │
│        120px animated palm      │
│                                 │
│                                 │
│     Welcome to Palm2Pay         │
│     The future of payment       │
│     is in your palm             │
│                                 │
│     [Get Started]  (Primary)    │
│                                 │
│     [I Already Have Account]    │
│                                 │
└─────────────────────────────────┘
```

**UI Components:**
- Animated palm icon (Lottie animation - hand opening)
- Title: Display 36px, Bold, White
- Subtitle: Body 16px, Regular, Text-Secondary
- Primary CTA: Full width, 56px height
- Secondary Link: Ghost button style

**Interactions:**
- Palm animation: Continuous gentle rotation + pulse glow
- Get Started → Navigate to Onboarding Step 1
- Already Have Account → Navigate to Login

---

### Screen 1.2: Onboarding Step 1 - How It Works
**File:** `apps/mobile/src/screens/Onboarding/OnboardingStep1.tsx`

```
┌─────────────────────────────────┐
│  Skip                    1/3    │
│                                 │
│     [Illustration: Hand]        │
│    Hand scanning graphic        │
│                                 │
│     Enroll Your Palm            │
│                                 │
│  Capture your unique palm       │
│  vein pattern with our          │
│  secure biometric technology    │
│                                 │
│     ●────○────○                 │
│                                 │
│     [Next]                      │
│                                 │
└─────────────────────────────────┘
```

**UI Components:**
- Progress indicator: 3 dots (filled/empty)
- Illustration: Custom SVG hand scan graphic
- Title: H1 28px
- Description: Body 16px, Text-Secondary
- Page indicator dots with animation

---

### Screen 1.3: Onboarding Step 2 - Security
**File:** `apps/mobile/src/screens/Onboarding/OnboardingStep2.tsx`

```
┌─────────────────────────────────┐
│  Skip                    2/3    │
│                                 │
│     [Shield + Lock Icon]        │
│    Bank-level security          │
│                                 │
│     Bank-Level Security         │
│                                 │
│  Your biometric data is         │
│  encrypted with AES-256         │
│  and never stored as images     │
│                                 │
│     ○────●────○                 │
│                                 │
│     [Next]                      │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 1.4: Onboarding Step 3 - Speed
**File:** `apps/mobile/src/screens/Onboarding/OnboardingStep3.tsx`

```
┌─────────────────────────────────┐
│  Skip                    3/3    │
│                                 │
│     [Lightning Fast Icon]       │
│    < 1.5 second payment         │
│                                 │
│     Lightning Fast              │
│                                 │
│  Complete payments in under     │
│  1.5 seconds. No cards, no      │
│  phone, no wallet needed        │
│                                 │
│     ○────○────●                 │
│                                 │
│     [Get Started]               │
│                                 │
└─────────────────────────────────┘
```

---

## 2. AUTHENTICATION FLOW

### Screen 2.1: Login Screen ✅ (EXISTING)
**File:** `apps/mobile/src/screens/AuthScreen.tsx`

**Current Implementation:** ✅ Complete
- Email/Password login
- Toggle to Register
- Biometric quick login option (add FaceID/TouchID icon)

**Enhancement Needed:**
```typescript
// Add biometric login button after password input
<TouchableOpacity style={styles.biometricButton}>
  <Ionicons name="scan" size={24} color="#6366f1" />
  <Text style={styles.biometricText}>Login with Palm</Text>
</TouchableOpacity>
```

---

### Screen 2.2: Register Screen ✅ (EXISTING)
**File:** `apps/mobile/src/screens/AuthScreen.tsx` (mode === 'register')

**Current Implementation:** ✅ Complete
- Full Name, Email, Password, Phone (optional)
- Form validation
- Navigate to Palm Enrollment after registration

---

### Screen 2.3: Forgot Password
**File:** `apps/mobile/src/screens/Auth/ForgotPasswordScreen.tsx`

```
┌─────────────────────────────────┐
│  [← Back]                       │
│                                 │
│     Forgot Password?            │
│                                 │
│  Enter your email address       │
│  and we'll send you a link      │
│  to reset your password         │
│                                 │
│  Email Address                  │
│  [________________]             │
│                                 │
│  [Send Reset Link]              │
│                                 │
│  Check your inbox for           │
│  password reset instructions    │
│                                 │
└─────────────────────────────────┘
```

---

## 3. HOME SCREEN ✅ (EXISTING)

**File:** `apps/mobile/src/screens/HomeScreen.tsx`

**Current Implementation:** ✅ Good foundation

**Enhanced Version Needed:**

```
┌─────────────────────────────────┐
│  [Notification]  [QR Scan]      │
│                                 │
│  Welcome back,                  │
│  Suhayl Sekander                │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Available Balance      │    │
│  │  $2,450.00              │    │
│  │                         │    │
│  │  [+ Add]  [→ Send]      │    │
│  │  [← Request]            │    │
│  └─────────────────────────┘    │
│                                 │
│  Quick Actions                  │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │📱 │ │💳 │ │📍 │ │📊 │       │
│  │Top│ │Pay│ │Merch│ │Spend│    │
│  │Up │ │Bills│ │Find │ │Track│  │
│  └───┘ └───┘ └───┘ └───┘       │
│                                 │
│  Palm Status ✓ Enrolled         │
│  ┌─────────────────────────┐    │
│  │ [Hand Icon] Ready to pay│    │
│  │ Tap to test scanner     │    │
│  └─────────────────────────┘    │
│                                 │
│  Recent Activity                │
│  ┌─────────────────────────┐    │
│  │ 🛒 Whole Foods    $45.20│    │
│  │    Today 2:30 PM        │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**New Features to Add:**
1. QR Code scanner button in header
2. Request money button
3. Spending insights widget
4. Enhanced transaction preview with merchant logos

---

## 4. PAY SCREEN ✅ (EXISTING)

**File:** `apps/mobile/src/screens/PayScreen.tsx`

**Current Implementation:** ✅ Good foundation

**Enhanced Version:**

```
┌─────────────────────────────────┐
│  Make a Payment                 │
│  Pay with your palm             │
│                                 │
│  ┌─────────────────────────┐    │
│  │        $ 45.20          │    │
│  │                         │    │
│  │  [$5] [$10] [$20] [$50] │    │
│  └─────────────────────────┘    │
│                                 │
│  Pay To                         │
│  ┌─────────────────────────┐    │
│  │ [QR Scan] Merchant ID   │    │
│  │     or search...        │    │
│  └─────────────────────────┘    │
│                                 │
│  Recent Merchants               │
│  ┌────┐ ┌────┐ ┌────┐          │
│  │ WF │ │ TM │ │ ST │          │
│  │Whole│ │Tar│ │Star│          │
│  │Foods│ │get│ │ucks│          │
│  └────┘ └────┘ └────┘          │
│                                 │
│  Payment Method                 │
│  ┌─────────────────────────┐    │
│  │ 💳 Visa •••• 4242       │    │
│  │    Default              │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │   [Hand Icon]           │    │
│  │   Pay with Palm         │    │
│  │   $45.20 to Whole Foods │    │
│  └─────────────────────────┘    │
│                                 │
│  [Shield] Secured by biometrics │
│                                 │
└─────────────────────────────────┘
```

---

## 5. PALM ENROLLMENT SCREEN ✅ (EXISTING)

**File:** `apps/mobile/src/screens/PalmEnrollScreen.tsx`

**Current Implementation:** ✅ Excellent foundation

**Enhanced Version with PRD Requirements:**

```
┌─────────────────────────────────┐
│  Palm Payment                   │
│  Your biometric identifier      │
│                                 │
│  ┌─────────────────────────┐    │
│  │   [✓] Palm Enrolled     │    │
│  │                         │    │
│  │   Status: Active        │    │
│  │   Enrolled: Apr 2026    │    │
│  │   Template ID: P2P***   │    │
│  │                         │    │
│  │   [Test Scanner]        │    │
│  │   [Update Scan]         │    │
│  │   [Delete Data]         │    │
│  └─────────────────────────┘    │
│                                 │
│  Security Settings              │
│  ┌─────────────────────────┐    │
│  │ 🔐 PIN for >$100   ON  │    │
│  │ 🔔 Transaction alerts ON│    │
│  │ 📍 Location verify OFF  │    │
│  └─────────────────────────┘    │
│                                 │
│  How Verification Works         │
│  1. Hover palm over scanner     │
│  2. NIR camera captures vein    │
│  3. Liveness detection checks   │
│  4. Match against template      │
│  5. Payment approved (<1.5s)    │
│                                 │
└─────────────────────────────────┘
```

**New Features:**
1. Template ID display (masked for security)
2. Enrollment date
3. Test scanner button (simulates payment flow)
4. Update scan option (re-enroll if hand changed)
5. Security toggles for transaction limits

---

## 6. TRANSACTIONS SCREEN ✅ (EXISTING)

**File:** `apps/mobile/src/screens/TransactionsScreen.tsx`

**Current Implementation:** ✅ Good foundation

**Enhanced Version:**

```
┌─────────────────────────────────┐
│  Transactions          [Filter] │
│                                 │
│  [All] [Food] [Shopping] [Bills]│
│                                 │
│  Search transactions...         │
│  [🔍___________________]        │
│                                 │
│  Today                          │
│  ┌─────────────────────────┐    │
│  │ 🛒 Whole Foods          │    │
│  │    Today 2:30 PM        │    │
│  │    $45.20      ✓ Done   │    │
│  └─────────────────────────┘    │
│                                 │
│  Yesterday                      │
│  ┌─────────────────────────┐    │
│  │ ⚡ Electric Bill        │    │
│  │    Yesterday 9:00 AM    │    │
│  │    $124.50     ✓ Done   │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🍕 Domino's Pizza       │    │
│  │    Yesterday 8:30 PM    │    │
│  │    $28.99      ✓ Done   │    │
│  └─────────────────────────┘    │
│                                 │
│  April 2026                     │
│  [5 more transactions...]       │
│                                 │
│  [Export Statement]             │
│                                 │
└─────────────────────────────────┘
```

**New Features:**
1. Category filter tabs
2. Search functionality
3. Transaction detail view on tap
4. Export statement option
5. Spending analytics per category

---

## 7. PROFILE SCREEN ✅ (EXISTING)

**File:** `apps/mobile/src/screens/ProfileScreen.tsx`

**Current Implementation:** ✅ Good foundation

**Enhanced Version:**

```
┌─────────────────────────────────┐
│  Profile                        │
│                                 │
│  ┌─────────────────────────┐    │
│  │    [Avatar Icon]        │    │
│  │    Suhayl Sekander      │    │
│  │    suhayl@email.com     │    │
│  │    Palm: ✓ Verified     │    │
│  └─────────────────────────┘    │
│                                 │
│  Account                        │
│  ┌─────────────────────────┐    │
│  │ 👤 Personal Info        │    │
│  │ 💳 Payment Methods      │    │
│  │ 🏦 Linked Banks          │    │
│  │ 🔐 Security & Privacy   │    │
│  └─────────────────────────┘    │
│                                 │
│  Preferences                    │
│  ┌─────────────────────────┐    │
│  │ 🔔 Notifications        │    │
│  │ 🌙 Dark Mode        ON  │    │
│  │ 🌐 Language         EN  │    │
│  │ 💱 Currency        USD  │    │
│  └─────────────────────────┘    │
│                                 │
│  Support                        │
│  ┌─────────────────────────┐    │
│  │ ❓ Help Center          │    │
│  │ 💬 Live Chat            │    │
│  │ 📧 Contact Us           │    │
│  │ 📄 Terms & Privacy      │    │
│  └─────────────────────────┘    │
│                                 │
│  [Logout]                       │
│                                 │
│  Version 1.0.0                  │
│  © 2026 Palm2Pay                │
│                                 │
└─────────────────────────────────┘
```

---

## 8. NEW SCREENS (Per PRD)

### Screen 8.1: Merchant Locator
**File:** `apps/mobile/src/screens/MerchantLocatorScreen.tsx`

```
┌─────────────────────────────────┐
│  Find Palm2Pay Merchants        │
│                                 │
│  [Search by name or category]   │
│                                 │
│  [Map View] [List View]         │
│                                 │
│  ┌─────────────────────────┐    │
│  │  📍 Nearby              │    │
│  │  ┌───┐ ┌───┐ ┌───┐     │    │
│  │  │Gro│ │Caf│ │Gas│     │    │
│  │  │cery│ │fé│ │Station│  │    │
│  │  └───┘ └───┘ └───┘     │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🏪 Whole Foods Market   │    │
│  │    0.3 mi • 2 min walk  │    │
│  │    🕐 Open until 10 PM  │    │
│  │    [Get Directions]     │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ☕ Starbucks Coffee     │    │
│  │    0.5 mi • 5 min walk  │    │
│  │    🕐 Open 24 hours     │    │
│  │    [Get Directions]     │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Interactive map (react-native-maps)
- Category filters (Grocery, Cafe, Gas, Restaurant, etc.)
- Distance sorting
- Store hours
- Directions integration
- "Add Merchant" suggestion

---

### Screen 8.2: Security Settings
**File:** `apps/mobile/src/screens/SecuritySettingsScreen.tsx`

```
┌─────────────────────────────────┐
│  Security Settings              │
│                                 │
│  Authentication                 │
│  ┌─────────────────────────┐    │
│  │ 🔐 Change Password      │    │
│  │ 👆 Biometric Login  ON  │    │
│  │ 📱 Two-Factor Auth  ON  │    │
│  └─────────────────────────┘    │
│                                 │
│  Transaction Security           │
│  ┌─────────────────────────┐    │
│  │ 💰 Spending Limit       │    │
│  │     $500/day            │    │
│  │     [Edit]              │    │
│  │                         │    │
│  │ 🔒 PIN for High Value   │    │
│  │     Transactions >$100  │    │
│  │     [Edit]              │    │
│  │                         │    │
│  │ 🏪 Merchant Restrictions│    │
│  │     Block certain types │    │
│  │     [Manage]            │    │
│  └─────────────────────────┘    │
│                                 │
│  Device Management              │
│  ┌─────────────────────────┐    │
│  │ 📱 iPhone 15 Pro        │    │
│  │     Last active: Now    │    │
│  │     [This Device]       │    │
│  │                         │    │
│  │ 💻 MacBook Pro          │    │
│  │     Last active: 2d ago │    │
│  │     [Remove]            │    │
│  └─────────────────────────┘    │
│                                 │
│  Privacy                        │
│  ┌─────────────────────────┐    │
│  │ 📍 Location Services    │    │
│  │     For merchant finder │    │
│  │                         │    │
│  │ 📊 Analytics Sharing    │    │
│  │     Improve our service │    │
│  │                         │    │
│  │ 🗑️ Delete All Data      │    │
│  │     Permanent action    │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 8.3: Payment Methods
**File:** `apps/mobile/src/screens/PaymentMethodsScreen.tsx`

```
┌─────────────────────────────────┐
│  Payment Methods                │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Default Payment Method │    │
│  │  ┌─────────────────┐    │    │
│  │  │ 💳 Visa         │    │    │
│  │  │    •••• 4242    │    │    │
│  │  │    Exp 12/28    │    │    │
│  │  │    [Make Default]│    │    │
│  │  └─────────────────┘    │    │
│  └─────────────────────────┘    │
│                                 │
│  Credit/Debit Cards             │
│  ┌─────────────────────────┐    │
│  │ 💳 Mastercard           │    │
│  │    •••• 8899            │    │
│  │    [Remove]             │    │
│  └─────────────────────────┘    │
│                                 │
│  Bank Accounts                  │
│  ┌─────────────────────────┐    │
│  │ 🏦 Chase Checking       │    │
│  │    •••• 3456            │    │
│  │    Verified ✓           │    │
│  │    [Remove]             │    │
│  └─────────────────────────┘    │
│                                 │
│  Digital Wallets                │
│  ┌─────────────────────────┐    │
│  │ 🍎 Apple Pay            │    │
│  │    Not connected        │    │
│  │    [Connect]            │    │
│  │                         │    │
│  │ 🤖 Google Pay           │    │
│  │    Not connected        │    │
│  │    [Connect]            │    │
│  └─────────────────────────┘    │
│                                 │
│  [+ Add Payment Method]         │
│                                 │
└─────────────────────────────────┘
```

---

### Screen 8.4: Analytics/Spending Insights
**File:** `apps/mobile/src/screens/AnalyticsScreen.tsx`

```
┌─────────────────────────────────┐
│  Spending Insights              │
│                                 │
│  [This Week] [Month] [Year]     │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Total Spent: $1,247.50 │    │
│  │  ─────────────────      │    │
│  │  Budget: $2,000         │    │
│  │  Remaining: $752.50     │    │
│  │                         │    │
│  │  ████████░░░░░ 62% used │    │
│  └─────────────────────────┘    │
│                                 │
│  Spending by Category           │
│  ┌─────────────────────────┐    │
│  │  🛒 Food & Dining   45% │    │
│  │  ████████░░░░░ $561    │    │
│  │                         │    │
│  │  🛍️ Shopping       25%  │    │
│  │  ████░░░░░░░░░ $312    │    │
│  │                         │    │
│  │  ⚡ Bills & Utils  20%  │    │
│  │  ███░░░░░░░░░░ $249    │    │
│  │                         │    │
│  │  🎉 Entertainment  10%  │    │
│  │  ██░░░░░░░░░░░ $125    │    │
│  └─────────────────────────┘    │
│                                 │
│  Weekly Trend                   │
│  ┌─────────────────────────┐    │
│  │  [Bar Chart: Mon-Sun]   │    │
│  │   M   T   W   T   F   S │    │
│  │   ▃   ▅   ▃   ▆   ▄   ▂ │    │
│  └─────────────────────────┘    │
│                                 │
│  Top Merchants                  │
│  ┌─────────────────────────┐    │
│  │  1. Whole Foods  $245   │    │
│  │  2. Target       $156   │    │
│  │  3. Starbucks    $89    │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

## 9. TRANSACTION DETAIL MODAL

**File:** `apps/mobile/src/components/TransactionDetailModal.tsx`

```
┌─────────────────────────────────┐
│  [← Back]            [Share]    │
│                                 │
│  ┌─────────────────────────┐    │
│  │      ✓ Completed        │    │
│  │                         │    │
│  │        $45.20           │    │
│  │                         │    │
│  │    Paid to Whole Foods  │    │
│  │    April 30, 2026       │    │
│  │    2:30 PM              │    │
│  └─────────────────────────┘    │
│                                 │
│  Transaction Details            │
│  ┌─────────────────────────┐    │
│  │ Transaction ID          │    │
│  │ TXN-2026-04-30-001234   │    │
│  │                         │    │
│  │ Payment Method          │    │
│  │ 💳 Visa •••• 4242       │    │
│  │                         │    │
│  │ Location                │    │
│  │ 📍 123 Main St, City    │    │
│  │                         │    │
│  │ Biometric Verification  │    │
│  │ ✓ Palm verified in 1.2s │    │
│  └─────────────────────────┘    │
│                                 │
│  Actions                        │
│  ┌─────────┐ ┌─────────┐       │
│  │ 📄 Save │ │ 🚩Report│       │
│  │ Receipt │ │  Issue  │       │
│  └─────────┘ └─────────┘       │
│                                 │
│  [Request Refund]               │
│                                 │
└─────────────────────────────────┘
```

---

## Summary of Mobile App Screens

| Screen | Status | Priority |
|--------|--------|----------|
| Onboarding (3 screens) | 🔴 To Build | High |
| Login/Register | ✅ Exists | - |
| Forgot Password | 🔴 To Build | Medium |
| Home | ✅ Exists (enhance) | - |
| Pay | ✅ Exists (enhance) | - |
| Palm Enrollment | ✅ Exists (enhance) | - |
| Transactions | ✅ Exists (enhance) | - |
| Profile | ✅ Exists (enhance) | - |
| Merchant Locator | 🔴 To Build | High |
| Security Settings | 🔴 To Build | High |
| Payment Methods | 🔴 To Build | High |
| Analytics | 🔴 To Build | Medium |
| Transaction Detail | 🔴 To Build | Medium |
