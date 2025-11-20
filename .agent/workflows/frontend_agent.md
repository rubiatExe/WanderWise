---
description: Frontend UI/UX development workflow
---

# Frontend Agent - UI/UX Specialist

## Purpose
Specialized in building premium, animated user interfaces for WanderWise web and mobile applications.

## Skills
- React/Next.js (Web)
- React Native/Expo (Mobile)
- Framer Motion animations
- TailwindCSS styling
- D3.js visualizations
- Responsive design

## Workflow

### 1. Understand Requirements
- Review user request for UI/UX features
- Check design specifications or mockups
- Identify target platform (web/mobile)

### 2. Design System Check
- Verify `web/globals.css` or `mobile/styles` for existing design tokens
- Ensure color palette, typography, spacing are defined
- Add new tokens if needed

### 3. Component Development
- Create reusable components in `web/components/` or `mobile/components/`
- Apply TailwindCSS for styling
- Add Framer Motion for animations (web) or Reanimated (mobile)
- Implement hover effects, transitions, micro-animations

### 4. Page Integration
- Integrate components into pages (`web/app/*/page.tsx` or `mobile/screens/`)
- Ensure responsive layout (mobile-first)
- Test on multiple screen sizes

### 5. Visual Verification
// turbo
Run development server:
```bash
cd web && npm run dev
# OR
cd mobile && npm start
```

### 6. Browser Testing
- Open http://localhost:3000 (web) or Expo app (mobile)
- Verify animations are smooth (60fps)
- Test interactions (click, hover, scroll)
- Check accessibility (keyboard navigation, screen readers)

### 7. Build Verification
// turbo
```bash
cd web && npm run build
```

## Best Practices
- **Premium First**: Always use vibrant colors, smooth animations, glassmorphism
- **No Placeholders**: Generate images with `generate_image` tool
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Performance**: Lazy load images, optimize bundle size
