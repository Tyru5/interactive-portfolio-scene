# Interactive 3D Portfolio - Roadmap

## Project Overview

An interactive 3D portfolio website inspired by [Bruno Simon's portfolio](https://bruno-simon.com/), where users control a character navigating through a 3D environment to explore portfolio content.

**Live Portfolio Reference**: [tiru5.dev](https://tiru5.dev)

---

## Phase 1: Foundation (Completed)

### Tech Stack
- [x] Vite + React + TypeScript
- [x] React Three Fiber (`@react-three/fiber`)
- [x] React Three Drei (`@react-three/drei`)
- [x] React Three Rapier (`@react-three/rapier`)
- [x] Ecctrl character controller
- [x] Zustand (state management - set up but minimal use)
- [x] Tailwind CSS v4

### Core Features Implemented
- [x] **3D Scene Setup**
  - Canvas with physics world
  - Dark themed environment with fog
  - Grid-based ground plane
  - Zone markers with glowing rings
  - Ambient + directional + point lighting per zone

- [x] **Character Controller**
  - Physics-based capsule character
  - WASD movement (W/S forward/back, A/D turn)
  - Jump (Space) and Sprint (Shift)
  - FixedCamera mode - camera follows behind character
  - Simple placeholder model (capsule with eyes)

- [x] **Portfolio Zones**
  - **About Zone (Center)**: Floating name, title, bio text
  - **Projects Zone (East)**: 6 interactive pillars with floating gems
  - **Skills Zone (West)**: 4 hexagonal pillars by category
  - **Contact Zone (South)**: 4 billboard contact cards

- [x] **Interactivity**
  - Proximity-based info panels (appear when player is near)
  - Click-to-open links on project pillars
  - Click-to-open links on contact cards
  - Hover glow effects on interactive objects
  - Billboard text (always faces camera)

- [x] **UI Overlay**
  - Loading screen with progress bar
  - Controls hint panel (auto-hides after 10s)

---

## Phase 2: Visual Polish (Next)

### Character Model
- [ ] Design/source a low-poly 3D character model (GLTF/GLB)
- [ ] Implement character with proper rig
- [ ] Add idle animation
- [ ] Add walk animation
- [ ] Add run animation
- [ ] Add jump animation
- [ ] Integrate with EcctrlAnimation

### Environment Enhancement
- [ ] Add skybox/environment map (HDR)
- [ ] Create custom ground texture
- [ ] Add floating platforms/islands for each zone
- [ ] Add decorative 3D objects (trees, rocks, structures)
- [ ] Add particle effects (floating dust, sparkles)
- [ ] Improve zone visual distinction

### Lighting & Atmosphere
- [ ] Add bloom post-processing effect
- [ ] Add ambient occlusion
- [ ] Implement day/night cycle (optional)
- [ ] Add volumetric fog/god rays

---

## Phase 3: Enhanced Interactivity

### Project Showcases
- [ ] 3D preview thumbnails for each project
- [ ] Expanded info panels with screenshots
- [ ] Video previews on hover (optional)
- [ ] Project filtering/categories

### Skills Visualization
- [ ] Skill level indicators (bars/rings)
- [ ] Animated skill icons
- [ ] Category expansion on click
- [ ] Technology logo textures

### Contact Zone
- [ ] Animated contact icons
- [ ] Contact form integration (3D terminal?)
- [ ] Social media preview cards

---

## Phase 4: Audio & Feedback

### Sound Design
- [ ] Ambient background music (toggleable)
- [ ] Footstep sounds
- [ ] Jump/land sounds
- [ ] UI interaction sounds (hover, click)
- [ ] Zone-specific ambient sounds

### Visual Feedback
- [ ] Screen shake on landing
- [ ] Speed lines when sprinting
- [ ] Interaction particle bursts
- [ ] Achievement/discovery popups

---

## Phase 5: Advanced Features

### Exploration & Discovery
- [ ] Hidden easter eggs around the map
- [ ] Achievement system
- [ ] Minimap toggle
- [ ] Teleport points between zones

### Performance & Accessibility
- [ ] Level of Detail (LOD) for distant objects
- [ ] Occlusion culling
- [ ] Mobile touch controls (EcctrlJoystick)
- [ ] Quality settings (low/medium/high)
- [ ] Keyboard navigation for accessibility

### Deployment
- [ ] Build optimization
- [ ] Asset compression (Draco for GLTF)
- [ ] Deploy to Vercel/Netlify
- [ ] Custom domain setup
- [ ] SEO meta tags
- [ ] Open Graph preview image

---

## Phase 6: Bruno Simon-Level Features (Stretch Goals)

### Advanced Mechanics
- [ ] Vehicle/alternative movement mode
- [ ] Physics-based interactions (push objects)
- [ ] Destructible elements
- [ ] NPC characters with dialogue

### Social Features
- [ ] Visitor counter
- [ ] Guestbook/message wall
- [ ] Multiplayer presence (see other visitors)

### Technical Showcase
- [ ] Custom shaders (holographic, glitch effects)
- [ ] Procedural generation elements
- [ ] WebGPU support (Three.js TSL)
- [ ] VR/AR mode

---

## Current File Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Canvas + Physics + KeyboardControls
├── components/
│   ├── Scene.tsx               # Main scene with all zones
│   └── UI/
│       ├── Controls.tsx        # Control hints overlay
│       └── LoadingScreen.tsx   # Loading progress
├── data/
│   └── portfolio.ts            # Portfolio content data
├── stores/
│   └── gameStore.ts            # Zustand store (minimal)
└── styles/
    └── index.css               # Tailwind styles
```

---

## Commands

```bash
# Development
bun run dev

# Build
bun run build

# Preview production build
bun run preview

# Type check
npx tsc --noEmit
```

---

## Resources & Inspiration

- [Bruno Simon Portfolio](https://bruno-simon.com/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Ecctrl Character Controller](https://github.com/pmndrs/ecctrl)
- [Three.js Journey Course](https://threejs-journey.com/)
- [Sketchfab](https://sketchfab.com/) - Free 3D models
- [Mixamo](https://www.mixamo.com/) - Character animations
- [Kenney Assets](https://kenney.nl/) - Free game assets

---

## Notes

- The character controller uses `FixedCamera` mode to allow mouse clicks on objects
- Text uses `<Billboard>` component to always face the camera
- Proximity detection uses camera distance in `useFrame` hook
- Physics colliders are set to `fixed` for all interactive objects
