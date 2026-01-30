# The Refactor Sprint — Brand Guidelines

**Version 1.0** | January 2026

---

## Brand Overview

**The Refactor Sprint** is a high-velocity strategic consulting service that combines 25 years of executive marketing expertise with AI acceleration. The brand aesthetic balances **"Human Expertise"** (organic, warm) with **"AI Velocity"** (precise, computational) — expressed through a dark, sophisticated, data-driven design system.

**Brand Personality:**
- Computational yet Human
- Sophisticated yet Accessible  
- Technical yet Strategic
- Fast yet Rigorous

---

## Color System

### Primary Colors

#### **Background (Base)**
- **Slate 950**: `#020617`
  - Primary background color for all pages
  - Deepest, most authoritative base
  
- **Slate 900**: `#0f172a`
  - Secondary background
  - Section backgrounds
  - Cards and containers

#### **Foreground (Text)**
- **Slate 50**: `#f8fafc`
  - Primary text color
  - Headlines
  - High-contrast content

### Accent Colors (Primary)

#### **Accent Cyan** (Primary Brand Color)
- **Hex**: `#06b6d4`
- **RGB**: rgb(6, 182, 212)
- **Usage**: 
  - Primary CTAs
  - Interactive elements
  - "AI Velocity" metaphor
  - Hover states
  - Links
  - Primary buttons
  - Icon highlights

#### **Accent Violet** (Secondary Brand Color)
- **Hex**: `#8b5cf6`
- **RGB**: rgb(139, 92, 246)
- **Usage**:
  - Gradients (paired with Cyan)
  - Secondary emphasis
  - "Human Expertise" accent
  - Decorative elements
  - Alternative CTAs

### Neutral Palette (Slate Scale)

Complete grayscale for UI elements:

| Color | Hex | Usage |
|-------|-----|-------|
| **Slate 50** | `#f8fafc` | Primary text, high contrast |
| **Slate 100** | `#f1f5f9` | — |
| **Slate 200** | `#e2e8f0` | — |
| **Slate 300** | `#cbd5e1` | Secondary text |
| **Slate 400** | `#94a3b8` | Tertiary text, subtle content |
| **Slate 500** | `#64748b` | — |
| **Slate 600** | `#475569` | — |
| **Slate 700** | `#334155` | — |
| **Slate 800** | `#1e293b` | Card backgrounds, borders |
| **Slate 900** | `#0f172a` | Secondary background |
| **Slate 950** | `#020617` | Primary background |

### Gradients

#### **Primary Gradient (Cyan to Violet)**
```css
background: linear-gradient(to right, #06b6d4, #8b5cf6);
```
- **Usage**: Headlines, CTAs, hero text emphasis

#### **Radial Gradient (Atmospheric)**
```css
background: radial-gradient(circle at 30% 20%, rgba(6,182,212,0.1), transparent 50%);
```
- **Usage**: Hero backgrounds, subtle atmosphere

### Glassmorphism

#### **Glass Background**
```css
background: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(148, 163, 184, 0.1);
```
- **Usage**: Cards, modals, overlays

---

## Typography

### Font Family

#### **Primary Font: Inter**
- **Type**: Sans-serif
- **Source**: Google Fonts
- **Usage**: Body copy, UI text, paragraphs, navigation
- **Weights**: 
  - 300 (Light) — Subtle secondary text
  - 400 (Regular) — Body copy
  - 500 (Medium) — UI elements, emphasized body
  - 600 (Semi-Bold) — Headings, subheadings
  - 700 (Bold) — Primary headings, CTAs

**CSS Variable:**
```css
--font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

#### **Accent Font: JetBrains Mono**
- **Type**: Monospace
- **Source**: Google Fonts
- **Usage**: Data points, numbers, code-like elements, technical labels
- **Weights**:
  - 400 (Regular)
  - 500 (Medium)
  - 600 (Semi-Bold)
  - 700 (Bold)

**CSS Variable:**
```css
--font-jetbrains-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Typography Scale

#### **Headings**

| Element | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing | Usage |
|---------|--------------|-------------|--------|-------------|----------------|--------|
| **H1** | `4rem` (64px) | `2.5rem` (40px) | 700 (Bold) | 1.1 | -0.02em | Hero headlines |
| **H1 Large** | `6rem` (96px) | `3rem` (48px) | 700 (Bold) | 1.05 | -0.02em | Major hero statements |
| **H2** | `3rem` (48px) | `2rem` (32px) | 600 (Semi-Bold) | 1.2 | -0.02em | Section headings |
| **H3** | `2rem` (32px) | `1.5rem` (24px) | 600 (Semi-Bold) | 1.3 | -0.02em | Subsection headings |
| **H4** | `1.5rem` (24px) | `1.25rem` (20px) | 600 (Semi-Bold) | 1.4 | -0.02em | Card titles |
| **H5** | `1.25rem` (20px) | `1.125rem` (18px) | 600 (Semi-Bold) | 1.4 | -0.02em | Small headings |

#### **Body Text**

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|--------|
| **Body Large** | `1.25rem` (20px) | 400 | 1.6 | Hero subheadings, emphasis |
| **Body Regular** | `1rem` (16px) | 400 | 1.6 | Default body copy |
| **Body Small** | `0.875rem` (14px) | 400 | 1.5 | Captions, footnotes |

#### **UI Text**

| Element | Size | Weight | Usage |
|---------|------|--------|--------|
| **Button Text** | `1rem` (16px) | 700 (Bold) | CTAs |
| **Nav Text** | `1rem` (16px) | 500 (Medium) | Navigation links |
| **Caption** | `0.75rem` (12px) | 500 (Medium), Uppercase | Labels, tags |

### Typography Guidelines

1. **Letter Spacing**: All headings use `-0.02em` for tight, modern feel
2. **Font Smoothing**: Always use `-webkit-font-smoothing: antialiased`
3. **Line Length**: Maximum 65-75 characters for body text
4. **Hierarchy**: Use size, weight, and color to establish clear hierarchy

---

## Spacing System

Based on 4px base unit (Tailwind spacing scale):

| Token | Value | Usage |
|-------|-------|--------|
| `spacing-4` | 16px | Tight gaps, icon spacing |
| `spacing-6` | 24px | Standard gaps between elements |
| `spacing-8` | 32px | Section internal padding |
| `spacing-12` | 48px | Large gaps |
| `spacing-16` | 64px | Section vertical spacing |
| `spacing-20` | 80px | — |
| `spacing-24` | 96px | Major section spacing |
| `spacing-32` | 128px | Hero/footer vertical padding |

### Responsive Spacing

**Mobile (< 768px):**
- Section padding: `py-16` (64px)
- Horizontal padding: `px-4` (16px)

**Desktop (≥ 768px):**
- Section padding: `py-24` to `py-32` (96px-128px)
- Horizontal padding: `px-6` to `px-8` (24px-32px)

---

## UI Components

### Buttons

#### **Primary Button**
```css
background: #06b6d4; /* Accent Cyan */
color: #0f172a; /* Dark text on cyan */
padding: 16px 32px;
border-radius: 8px;
font-weight: 700;
transition: all 0.15s linear;
box-shadow: 0 10px 30px rgba(6, 182, 212, 0.2);
```

**Hover State:**
```css
background: #22d3ee; /* Lighter cyan */
```

#### **Secondary Button**
```css
background: transparent;
border: 2px solid #06b6d4;
color: #06b6d4;
padding: 14px 30px;
border-radius: 8px;
font-weight: 600;
```

### Cards (Glassmorphism)

```css
background: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(148, 163, 184, 0.1);
border-radius: 16px;
padding: 32px;
```

**Hover State:**
```css
background: rgba(30, 41, 59, 0.8);
```

### Icons

- **Size**: 24px standard (w-6 h-6 in Tailwind)
- **Library**: Lucide React
- **Color**: Accent Cyan (`#06b6d4`) or Slate 400 (`#94a3b8`)
- **Stroke Width**: 2px

---

## Animation & Motion

### Animation Principles
1. **Fast & Purposeful**: All animations ≤ 0.6s
2. **Easing**: Use `ease-out` or custom cubic-bezier curves
3. **Entrance**: Fade + translate (y: 20px → 0)
4. **Hover**: Subtle scale (1.0 → 1.02) or color shifts

### Standard Transitions

#### **Fade In + Translate**
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

#### **Stagger Children**
```javascript
transition={{ duration: 0.6, delay: index * 0.1 }}
```

#### **Button Hover**
```css
transition: all 0.15s linear;
```

### Signature Animations

1. **Red Pen Strikethrough**: SVG line animation (stroke-dashoffset)
2. **Rolling Numbers**: Slot machine effect for metrics
3. **Neural Braid Background**: Canvas-based double helix convergence
4. **Signal Flow Timeline**: Vertical gradient line with scroll trigger
5. **Forensic Scan**: Diagonal shine effect on card hover

---

## Layout & Grid

### Container Max-Widths

| Breakpoint | Max Width | Usage |
|------------|-----------|--------|
| Mobile | 100% | Full width |
| Tablet | 768px | — |
| Desktop | 1120px | Standard sections |
| Wide | 1280px | Hero, full-width content |

### Grid System

- **Default**: 12-column grid
- **Gap**: 24px (md) to 32px (lg)
- **Common Layouts**:
  - 2 columns: `md:grid-cols-2`
  - 3 columns: `md:grid-cols-3`
  - 4 columns: `lg:grid-cols-4`

---

## Voice & Tone

### Brand Voice

**Core Attributes:**
1. **Authoritative**: 25 years of experience, not guessing
2. **Precise**: Data-driven, specific, measurable
3. **Direct**: No fluff, no jargon, no consulting-speak
4. **Urgent**: Time-sensitive, high-velocity

### Messaging Principles

1. **Lead with Results**: "72 hours" not "comprehensive process"
2. **Use Metaphors**: "Debug your revenue engine" (technical + business)
3. **Quantify Everything**: "3x pipeline coverage" not "better results"
4. **Challenge Status Quo**: "End of the 8-Week Discovery Phase"

### Content Guidelines

**Do:**
- Use short, punchy sentences
- Lead with the problem, then the solution
- Include specific metrics and timeframes
- Use active voice

**Don't:**
- Use buzzwords ("synergy," "leverage," "circle back")
- Make vague promises
- Hide pricing or timelines
- Sound like AI-generated content

---

## Logo & Brand Mark

### Primary Logo
- **Style**: Text-based "The Refactor Sprint"
- **Font**: Inter Bold (700)
- **Color**: White (#f8fafc) on dark / Cyan (#06b6d4) for accent
- **Size**: Minimum 120px width for legibility

### Usage Guidelines
1. **Clear Space**: Minimum padding of 24px around logo
2. **Backgrounds**: Only use on Slate 900/950 backgrounds
3. **Scaling**: Maintain aspect ratio, never stretch

---

## Photography & Imagery

### Style Guidelines

**Do Use:**
- Abstract data visualizations
- Geometric patterns
- Gradient meshes (cyan/violet)
- Technical/architectural imagery
- High-contrast, moody photography

**Don't Use:**
- Stock photos of people in meetings
- Generic "business" imagery
- Overly bright or colorful images
- Low-quality or pixelated images

### Image Treatment
- **Overlay**: Add 40% Slate 900 overlay for text readability
- **Blur**: Use backdrop-blur for text containers
- **Aspect Ratios**: 16:9 for hero images, 1:1 for cards

---

## Accessibility

### Contrast Ratios

All text must meet WCAG AA standards:
- **Large Text** (≥18pt): 3:1 minimum
- **Normal Text**: 4.5:1 minimum
- **Interactive Elements**: 3:1 minimum

### Color Combinations (Approved)

| Text | Background | Ratio | Status |
|------|------------|-------|--------|
| Slate 50 | Slate 950 | 19.5:1 | ✅ AAA |
| Slate 300 | Slate 900 | 7.8:1 | ✅ AAA |
| Slate 400 | Slate 900 | 5.2:1 | ✅ AA |
| Accent Cyan | Slate 900 | 4.8:1 | ✅ AA |

### Interactive Elements
- Minimum touch target: 44x44px
- Keyboard navigation: Always visible focus states
- Screen readers: Use semantic HTML and ARIA labels

---

## File Naming Conventions

### Images
```
refactor-sprint-hero-background.jpg
refactor-sprint-service-icon-narrative.svg
refactor-sprint-logo-white.svg
```

### Components
```
PascalCase.tsx (e.g., NeuralBraidBackground.tsx)
```

### CSS Classes
```
kebab-case (e.g., .glass, .gradient-animate)
```

---

## Implementation Quick Reference

### CSS Variables (Copy/Paste)

```css
:root {
  --background: #0f172a;
  --foreground: #f8fafc;
  --accent-cyan: #06b6d4;
  --accent-violet: #8b5cf6;
  --glass-bg: rgba(30, 41, 59, 0.6);
  --font-inter: 'Inter', sans-serif;
  --font-jetbrains-mono: 'JetBrains Mono', monospace;
}
```

### Tailwind Classes (Common Patterns)

```html
<!-- Glass Card -->
<div class="glass rounded-xl p-8">

<!-- Gradient Text -->
<h1 class="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">

<!-- Primary Button -->
<button class="px-8 py-4 bg-accent-cyan hover:bg-cyan-500 text-slate-900 font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20">
```

---

## Brand Applications

### Primary Site: refactorsprint.com
- Focus: Service offering (The Refactor Sprint)
- Tone: Technical, precise, high-velocity
- Primary CTA: "Start Your Sprint"

### Secondary Site: refactorsprint.com/ka
- Focus: Broader consulting (Kuperman Advisors)
- Tone: Executive, strategic, experience-driven
- Primary CTA: "Get in Touch" / "Get Started for Free"

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial brand guidelines |

---

**Maintained by:** Jason Kuperman  
**Last Updated:** January 30, 2026  
**Contact:** jason@kupermanadvisors.com
