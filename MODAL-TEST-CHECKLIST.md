# Project Modal - Testing Checklist

## 🧪 Test Scenarios

### Desktop Testing

- [ ] Click any project card → Modal opens
- [ ] Press `→` (ArrowRight) → Navigates to next project
- [ ] Press `←` (ArrowLeft) → Navigates to previous project
- [ ] Press `Escape` → Modal closes
- [ ] Click left arrow button → Goes to previous
- [ ] Click right arrow button → Goes to next
- [ ] At last project, press `→` → Wraps to first
- [ ] At first project, press `←` → Wraps to last
- [ ] Click backdrop → Modal closes
- [ ] Click X button → Modal closes
- [ ] Click "View Code on GitHub" → Opens in new tab
- [ ] Click "Live Demo" → Opens in new tab
- [ ] Modal content scrolls if tall
- [ ] Body scroll locked when modal open

### Mobile Testing (Chrome DevTools Device Toolbar)

- [ ] Tap project card → Modal opens
- [ ] Swipe left (fast) → Goes to next project
- [ ] Swipe right (fast) → Goes to previous project
- [ ] Swipe left (slow but > 50px) → Goes to next
- [ ] Swipe right (slow but > 50px) → Goes to previous
- [ ] Small swipe → Snaps back (doesn't navigate)
- [ ] Tap backdrop → Modal closes
- [ ] Tap X button → Modal closes
- [ ] Vertical scroll works in content
- [ ] Swipe doesn't interfere with scroll
- [ ] Navigation hint shows "Swipe to navigate"
- [ ] Project counter shows correct "X / Total"

### Visual Testing

- [ ] Backdrop has blur effect
- [ ] Modal has rounded corners (`rounded-3xl`)
- [ ] Close button has hover scale effect
- [ ] Arrow buttons (desktop) have hover effect
- [ ] Technologies shown as pills with cyan theme
- [ ] Buttons have proper focus rings
- [ ] Smooth slide transitions between projects
- [ ] Featured badge shows on first project
- [ ] Image placeholder visible with icon
- [ ] Modal centers on screen
- [ ] Max height doesn't exceed 90vh
- [ ] Responsive width on small screens

### Edge Cases

- [ ] Navigate through all 6 projects → No crashes
- [ ] Rapid key presses → No animation jank
- [ ] Rapid swipes → Transitions queue properly
- [ ] Open modal, switch category filter → Modal still works
- [ ] Multiple rapid open/close → No memory leaks
- [ ] External links (`stopPropagation`) work correctly

### Accessibility

- [ ] Modal content keyboard focusable
- [ ] Focus trap when modal open (optional improvement)
- [ ] Aria labels on buttons present
- [ ] Escape key closes modal
- [ ] Screen reader can announce content

---

## 🐛 Known Limitations (Future Enhancements)

1. **Image Placeholder**: Replace with real project screenshots
2. **Key Features**: Make dynamic from project data
3. **Focus Trap**: Add react-focus-lock for accessibility
4. **Lazy Load Images**: Optimize for performance
5. **Keyboard Shortcuts**: Add Shift+Arrow for 5-project jump
6. **Share Button**: Add URL sharing feature
7. **Analytics**: Track which projects get most views

---

**Test on real devices when possible!**
- iPhone/iPad Safari
- Android Chrome
- Windows laptop with trackpad

