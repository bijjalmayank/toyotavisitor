# 🎨 Color & Design System Guide

## Role-Based Color Identity

### 👨‍💼 Employee
- **Primary**: Blue (#3b82f6)
- **Accent**: Cyan (#06b6d4)
- **Gradient Box**: from-blue-500 to-cyan-500
- **Focus Ring**: ring-blue-500
- **Page**: `/employee/login`

```css
from-blue-600 to-cyan-600
from-blue-400 to-cyan-400  /* text gradient */
```

---

### 👨‍💼 HOD (Department Head)
- **Primary**: Amber (#f59e0b)
- **Accent**: Orange (#f97316)
- **Gradient Box**: from-amber-500 to-orange-500
- **Focus Ring**: ring-amber-500
- **Page**: `/hod/login`

```css
from-amber-600 to-orange-600
from-amber-400 to-orange-400  /* text gradient */
```

---

### 🔑 Admin
- **Primary**: Red (#ef4444)
- **Accent**: Pink (#ec4899)
- **Gradient Box**: from-red-500 to-pink-500
- **Focus Ring**: ring-red-500
- **Page**: `/admin/login`

```css
from-red-600 to-pink-600
from-red-400 to-pink-400  /* text gradient */
```

---

### 🛡️ Security
- **Primary**: Green (#22c55e)
- **Accent**: Emerald (#10b981)
- **Gradient Box**: from-green-500 to-emerald-500
- **Focus Ring**: ring-green-500
- **Page**: `/security/login`

```css
from-green-600 to-emerald-600
from-green-400 to-emerald-400  /* text gradient */
```

---

## Action Button Colors

### ✅ Approve/Accept
```css
bg-gradient-to-r from-green-600 to-emerald-600
hover:from-green-700 hover:to-emerald-700
shadow-lg hover:shadow-green-500/25
```

### ❌ Reject/Delete
```css
bg-gradient-to-r from-red-600 to-rose-600
hover:from-red-700 hover:to-rose-700
shadow-lg hover:shadow-red-500/25
```

### 🚪 Logout
```css
bg-gradient-to-r from-red-600 to-rose-600
hover:from-red-700 hover:to-rose-700
shadow-lg hover:shadow-red-500/25
```

### 📝 Secondary Actions (Close, Cancel)
```css
bg-slate-700/50 hover:bg-slate-600/50
border border-slate-600/50 hover:border-slate-500
```

---

## Status Badges (Employee Dashboard)

### ⏳ Pending
```css
bg-yellow-500/20 text-yellow-300 border border-yellow-500/30
Card: from-yellow-900/40 to-amber-900/40
```

### ✅ Approved
```css
bg-green-500/20 text-green-300 border border-green-500/30
Card: from-green-900/40 to-emerald-900/40
```

### ❌ Rejected
```css
bg-red-500/20 text-red-300 border border-red-500/30
Card: from-red-900/40 to-rose-900/40
```

---

## Form Input Styling

### Default State
```css
bg-slate-700/50
border border-slate-600
placeholder-slate-500
```

### Focus State (Employee - Blue)
```css
focus:border-blue-500
focus:ring-2 focus:ring-blue-500/20
```

### Focus State (HOD - Amber)
```css
focus:border-amber-500
focus:ring-2 focus:ring-amber-500/20
```

### Disabled State
```css
disabled:opacity-50
cursor-not-allowed
```

---

## Loading Spinner

```css
border: 4px solid rgba(100, 150, 255, 0.2);  /* light blue bg */
border-top: 4px solid #6496ff;  /* bright blue top */
animation: spin 1s linear infinite;
```

---

## Background Patterns

### Login Pages
```css
fixed inset-0 overflow-hidden pointer-events-none

/* Animated accent circles */
absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse
absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse
  (with animationDelay: "1s" on second circle)
```

### Dashboard Pages
```css
bg-gradient-to-br from-slate-900 via-slate-800 to-black

Accent circles:
absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl
absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl
```

---

## Animation Classes

### Fade In (0.3s)
```css
from { opacity: 0; transform: translateY(10px); }
to { opacity: 1; transform: translateY(0); }
```

### Slide In (0.4s)
```css
from { opacity: 0; transform: translateX(-20px); }
to { opacity: 1; transform: translateX(0); }
```

### Scale In (0.3s)
```css
from { opacity: 0; transform: scale(0.95); }
to { opacity: 1; transform: scale(1); }
```

### Hover Lift
```css
transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
:hover { 
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(100, 150, 255, 0.3);
}
```

---

## Typography

### Headings
- `text-4xl font-bold` with gradient text
- `bg-gradient-to-r from-[color]-400 to-[accent]-400 bg-clip-text text-transparent`

### Subheadings
- `text-slate-400 text-sm`

### Body Text
- `text-slate-300` for labels
- `text-slate-400` for secondary

### Emphasis
- `font-semibold` for important text
- `font-bold` for critical information

---

## Responsive Design Notes

- All pages use `px-4 py-8` for mobile padding
- Max widths: `max-w-md` for login, `max-w-2xl` for dashboards
- Full width on mobile, centered on desktop
- Touch-friendly button sizes: `py-3` (48px minimum)

---

## Best Practices Applied

✅ Sufficient color contrast for accessibility
✅ Consistent button styles across pages
✅ Clear visual hierarchy
✅ Smooth animations that don't distract
✅ Loading states are obvious
✅ Error states are distinct
✅ Empty states are friendly
✅ Hover states are subtle but clear
✅ Disabled states are visually different
✅ Icons + text for clarity
