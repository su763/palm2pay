# Palm2Pay Design System

## Brand Identity

**Palm2Pay** - Where Biology Meets Technology

The design system reflects trust, security, and cutting-edge biometric technology with a clean, modern aesthetic.

---

## Color Palette

### Primary Colors

```
Indigo (Primary Brand)
├── Indigo-50    #EEF2FF  (Light backgrounds)
├── Indigo-100   #E0E7FF  (Hover states)
├── Indigo-200   #C7D2FE
├── Indigo-300   #A5B4FC
├── Indigo-400   #818CF8
├── Indigo-500   #6366F1  (Primary buttons, CTAs)
├── Indigo-600   #4F46E5  (Active states)
├── Indigo-700   #4338CA  (Pressed states)
├── Indigo-800   #3730A3
└── Indigo-900   #312E81  (Dark backgrounds)
```

### Semantic Colors

```
Success (Green)
├── Green-500   #10B981  (Success states, completed transactions)
└── Green-600   #059669  (Success hover)

Error (Red)
├── Red-500     #EF4444  (Error states, failed transactions)
└── Red-600     #DC2626  (Error hover)

Warning (Amber)
├── Amber-500   #F59E0B  (Pending transactions, warnings)
└── Amber-600   #D97706  (Warning hover)

Info (Blue)
├── Blue-500    #3B82F6  (Information, links)
└── Blue-600    #2563EB  (Link hover)
```

### Neutral Colors

```
Dark Theme (Mobile App)
├── Background    #1A1A2E  (Main background)
├── Surface       #252542  (Cards, elevated surfaces)
├── Border        #33334A  (Dividers, borders)
├── Text-Primary  #FFFFFF  (Primary text)
├── Text-Secondary #888888 (Secondary text)
└── Text-Muted    #444444  (Disabled text)

Light Theme (Merchant Dashboard)
├── Background    #F8FAFC  (Main background)
├── Surface       #FFFFFF  (Cards, elevated surfaces)
├── Border        #E2E8F0  (Dividers, borders)
├── Text-Primary  #1E293B  (Primary text)
├── Text-Secondary #64748B (Secondary text)
└── Text-Muted    #94A3B8  (Disabled text)
```

### Gradient Palette

```
Primary Gradient
├── Linear: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)
├── Used for: Hero sections, primary CTAs, branding

Palm Scan Gradient
├── Linear: linear-gradient(180deg, #10B981 0%, #6366F1 100%)
├── Used for: Enrollment flows, success states

Dark Gradient
├── Linear: linear-gradient(180deg, #1A1A2E 0%, #0F0F1A 100%)
├── Used for: Background depth
```

---

## Typography

### Font Family

```
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Mono: 'JetBrains Mono', 'Fira Code', monospace (for amounts, IDs)
```

### Type Scale (Mobile)

```
Display      36px / 44px  Bold      (Hero, Balance amounts)
H1           28px / 36px  Bold      (Screen titles)
H2           24px / 32px  SemiBold  (Section headers)
H3           20px / 28px  SemiBold  (Card titles)
Body-Large   16px / 24px  Regular   (Body text)
Body         14px / 20px  Regular   (Secondary text)
Caption      12px / 16px  Regular   (Labels, hints)
Small        10px / 14px  Medium    (Legal, disclaimers)
```

### Type Scale (Web Dashboard)

```
Display      48px / 56px  Bold
H1           36px / 44px  Bold
H2           28px / 36px  SemiBold
H3           22px / 28px  SemiBold
H4           18px / 24px  Medium
Body         16px / 24px  Regular
Caption      14px / 20px  Regular
```

---

## Spacing System

```
4px    xs   (Micro spacing)
8px    sm   (Tight spacing)
12px   md   (Default spacing)
16px   lg   (Comfortable spacing)
20px   xl   (Section spacing)
24px   2xl  (Large gaps)
32px   3xl  (Section padding)
40px   4xl  (Hero padding)
48px   5xl
64px   6xl
```

---

## Border Radius

```
None      0px    (Dividers, full-width elements)
Small     4px    (Inputs, small buttons)
Medium    8px    (Cards, modals)
Large     12px   (Large cards, banners)
XL        16px   (Feature cards)
2XL       20px   (Hero cards)
3XL       24px   (Modal containers)
Full      999px  (Pills, avatars, toggles)
```

---

## Shadows

### Light Theme (Dashboard)

```
Shadow-SM:   0 1px 2px rgba(0,0,0,0.05)
Shadow-MD:   0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)
Shadow-LG:   0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)
Shadow-XL:   0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)
Shadow-Glow: 0 0 20px rgba(99,102,241,0.3)
```

### Dark Theme (Mobile)

```
Shadow-SM:   0 1px 2px rgba(0,0,0,0.3)
Shadow-MD:   0 4px 8px rgba(0,0,0,0.4)
Shadow-LG:   0 8px 16px rgba(0,0,0,0.5)
Shadow-Glow: 0 0 24px rgba(99,102,241,0.4)
```

---

## Iconography

### Icon Family
- **Primary**: Ionicons (React Native), Lucide React (Web)
- **Size Scale**: 16px, 20px, 24px, 32px, 48px, 64px

### Core Icons

```
Navigation
├── Home / Home-outline
├── Card / Card-outline
├── Hand-left / Hand-left-outline (Palm/Biometric)
├── List / List-outline (Transactions)
├── Person / Person-outline (Profile)

Actions
├── Scan (QR/Barcode scanning)
├── Add-circle (Add money)
├── Arrow-up-circle (Send)
├── Arrow-down-circle (Receive)
├── Settings
├── Notifications
├── Search
├── Filter

Status
├── Checkmark-circle (Success)
├── Close-circle (Error)
├── Time (Pending)
├── Warning (Alert)
├── Shield-checkmark (Security verified)

Merchant
├── Storefront
├── Chart-bar (Analytics)
├── Users (Customers)
├── Receipt (Transactions)
├── Cash (Revenue)
```

---

## Motion & Animation

### Duration

```
Fast     150ms  (Micro-interactions, toggles)
Normal   300ms  (Standard transitions)
Slow     500ms  (Complex animations, onboarding)
```

### Easing

```
Default    cubic-bezier(0.4, 0, 0.2, 1)
Enter      cubic-bezier(0, 0, 0.2, 1)
Exit       cubic-bezier(0.4, 0, 1, 1)
Spring     cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Animation Patterns

```
Palm Scan Line
├── Scanning animation: vertical sweep
├── Duration: 5 seconds
├── Easing: linear
├── Color: Indigo-500 pulse

Success Checkmark
├── Scale: 0 → 1.2 → 1
├── Duration: 400ms
├── Easing: Spring

LED Ring States (Scanner)
├── Ready: Solid Blue (#6366F1)
├── Processing: Pulsing Blue (opacity 0.5 → 1)
├── Success: Solid Green (#10B981) sweep
├── Error: Pulsing Red (#EF4444)
```

---

## Component Patterns

### Button Hierarchy

```
Primary Button
├── Background: Indigo-500
├── Text: White
├── Height: 48px (mobile), 40px (web)
├── Radius: 12px
├── Shadow: Shadow-MD
└── Hover: Indigo-600

Secondary Button
├── Background: Surface
├── Border: 1px Indigo-500
├── Text: Indigo-500
└── Hover: Indigo-50 background

Ghost Button
├── Background: Transparent
├── Text: Indigo-500
└── Hover: Indigo-500 background/10
```

### Card Patterns

```
Balance Card (Mobile)
├── Background: Primary Gradient
├── Radius: 20px
├── Padding: 24px
├── Shadow: Shadow-Glow
└── Content: Balance, Quick actions

Stat Card (Dashboard)
├── Background: Surface
├── Radius: 16px
├── Padding: 20px
├── Border: 1px Border
└── Content: Metric, Change %, Trend

Transaction Card
├── Background: Surface
├── Radius: 12px
├── Padding: 16px
├── Layout: Icon | Details | Amount/Status
└── Hover: Elevated shadow
```

### Input Patterns

```
Text Input
├── Height: 48px
├── Background: Surface
├── Border: 1px Border
├── Radius: 12px
├── Padding: 16px
├── Focus: Indigo-500 border, Shadow-Glow
└── Error: Red-500 border

Search Input
├── Same as Text Input
├── Leading Icon: Search (20px)
└── Placeholder: "Search..."
```

---

## Layout Grids

### Mobile (React Native)

```
Container Padding: 20px
Gutter: 16px
Columns: 4 (flexible)
Breakpoints:
├── Small: 320px
├── Medium: 375px
├── Large: 414px
└── XL: 768px (tablet)
```

### Web Dashboard

```
Container Max: 1440px
Sidebar Width: 280px
Gutter: 24px
Columns: 12
Breakpoints:
├── Mobile: < 640px
├── Tablet: 640px - 1024px
├── Desktop: 1024px - 1440px
└── XL: > 1440px
```

---

## Accessibility

### Color Contrast

- All text meets WCAG AA (4.5:1 minimum)
- Primary buttons: 7.5:1 contrast ratio
- Focus indicators: 3px Indigo-500 outline

### Touch Targets

- Minimum: 44x44px (iOS HIG)
- Recommended: 48x48px
- Spacing between targets: 8px minimum

### Screen Reader Support

- All icons have `accessibilityLabel` (RN) / `aria-label` (Web)
- Form inputs have associated labels
- Status updates announced via live regions

---

## Dark Mode Guidelines

### Mobile App (Default Dark)

```
Backgrounds
├── Primary: #1A1A2E
├── Elevated: #252542
└── Overlay: rgba(0,0,0,0.8)

Text
├── Primary: #FFFFFF
├── Secondary: #888888
└── Disabled: #444444

Accents
├── Primary: #6366F1
├── Success: #10B981
├── Error: #EF4444
└── Warning: #F59E