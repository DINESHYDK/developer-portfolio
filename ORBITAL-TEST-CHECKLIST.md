# Orbital Skills - Testing Checklist

## 🧪 Performance Tests

### Desktop
- [ ] Open portfolio in Chrome DevTools Performance tab
- [ ] Start recording, navigate to Skills section
- [ ] Verify FPS stays at 60 (green line, no drops)
- [ ] Stop recording, check React re-renders = 0 during animation
- [ ] Memory usage stays flat (no leaks)

### Mobile (Chrome DevTools Device Mode)
- [ ] Switch to iPhone/Android emulation
- [ ] Animation runs smoothly at 60fps
- [ ] Touch interaction works (tap + move)
- [ ] No jank or stuttering

---

## 🎯 Visual Tests

### Animation
- [ ] Chips orbit in smooth circular path
- [ ] All chips move at same angular velocity
- [ ] No wobbling or jumping
- [ ] Baseline speed is slow and elegant
- [ ] Orbit is perfectly centered in card

### Depth Effect (3D)
- [ ] Chips at bottom are larger and more opaque
- [ ] Chips at top are smaller and more transparent
- [ ] Smooth transition between states
- [ ] Z-index ordering looks correct (no overlap issues)

### Colors
- [ ] Frontend card: Cyan glow (#8ECAE6)
- [ ] Backend card: Green glow (#A7F3D0)
- [ ] Tools & DevOps card: Orange glow (#FFA116)
- [ ] Radial gradients visible behind orbit
- [ ] Chip pills match card color at 15% opacity

### Glassmorphism
- [ ] Card background has blur effect
- [ ] Subtle border visible (white/5)
- [ ] Border brightens on hover (white/10)
- [ ] Background shows through semi-transparent surface

---

## 🖱️ Interaction Tests

### Mouse Hover
- [ ] Move mouse quickly over card → orbit speeds up
- [ ] Move mouse slowly → orbit speeds up slightly
- [ ] Speed boost is immediate and noticeable
- [ ] No lag between mouse movement and speed change

### Mouse Leave
- [ ] Move mouse off card → orbit gradually slows down
- [ ] Returns to baseline speed smoothly (not abrupt)
- [ ] Deceleration takes ~1-2 seconds
- [ ] No sudden stops or jumps

### Multiple Cards
- [ ] Hover one card → only that card speeds up
- [ ] Other cards continue at baseline
- [ ] Switching between cards works smoothly
- [ ] No interference between card interactions

---

## 📱 Responsive Tests

### Desktop (≥ 768px)
- [ ] 3 cards in a row
- [ ] Cards have equal width
- [ ] 32px gap between cards
- [ ] Cards are tall enough (min 400px)

### Tablet (< 768px, ≥ 640px)
- [ ] Cards stack in single column
- [ ] Full width with padding
- [ ] Spacing looks balanced

### Mobile (< 640px)
- [ ] Cards stack vertically
- [ ] Touch interactions work
- [ ] Orbit radius appropriate for screen size
- [ ] Text remains readable

---

## 🔍 Edge Cases

### Many Skills (> 12)
- [ ] Orbit doesn't look cluttered
- [ ] Chips don't overlap too much
- [ ] Animation stays smooth

### Few Skills (< 4)
- [ ] Orbit looks balanced (not empty)
- [ ] Spacing between chips is even
- [ ] Animation looks intentional

### Long Skill Names
- [ ] Pills don't break layout
- [ ] Text truncates or wraps properly
- [ ] Hover state still works

### Browser Zoom
- [ ] Zoom in (150%) → Animation still smooth
- [ ] Zoom out (75%) → Layout intact
- [ ] Orbit remains centered

---

## 🎨 Design System Tests

### Typography
- [ ] Card titles: Poppins, semibold, xl
- [ ] Chip text: Mono, medium, sm
- [ ] Hint text: Jakarta, xs, opacity 40%

### Spacing (8pt Grid)
- [ ] Card padding: 24px (p-6)
- [ ] Gap between cards: 32px (gap-8)
- [ ] Title margin-bottom: 32px (mb-8)
- [ ] Hint margin-top: 24px (mt-6)

### Borders
- [ ] Card: rounded-3xl (24px)
- [ ] Chips: rounded-full
- [ ] All borders consistent

---

## 🚀 Production Checks

- [ ] Build size acceptable (check `dist/`)
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse Performance score > 90
- [ ] No accessibility violations
- [ ] Works in Safari, Firefox, Edge

---

## 📊 DevTools Checks

```javascript
// Run in console during animation:

// Check motion values (should update without re-renders)
console.log('Motion values updating:', angle.get());

// Check React re-renders (should be 0)
// Use React DevTools Profiler

// Check FPS
// Performance tab → Should be steady 60fps green line

// Check memory
// Memory profiler → Should stay flat over 30 seconds
```

---

**Test on real devices when possible!**
- MacBook Pro (Retina display)
- iPhone (Safari)
- Android phone (Chrome)
- Windows laptop (Edge)

**Pass Criteria:** 60fps, zero re-renders, smooth interactions, no visual bugs.

