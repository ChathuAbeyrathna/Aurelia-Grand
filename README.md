# Aurelia Grand

A five-page luxury hotel & resort booking experience for a fictional brand, **Aurelia Grand**, built with Vue 3, Vite, Tailwind CSS and GSAP.

## Pages

- **Home** — cinematic hero, introduction, live booking bar, featured rooms, signature experiences, dining, wellness, guest testimonials.
- **Rooms & Suites** (`/rooms`) — filterable, sortable room catalogue (type, view, guests, price, amenities) with a wishlist.
- **Room Details** (`/rooms/:slug`) — gallery with fullscreen lightbox, full room info, guest reviews and a sticky booking summary with a live price breakdown.
- **Booking** (`/booking`) — a five-step reservation flow: Stay → Guest Details → Extras → Payment → Confirmation, with validation and a running order summary.
- **Experiences & Destination** (`/experiences`) — filterable experience catalogue with a detail modal, plus a destination guide to the surrounding area.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Stack

- Vue 3 (`<script setup>`, Composition API)
- Vue Router 4
- Vite 5
- Tailwind CSS 3
- GSAP (entrance animations, scroll reveals, step and modal transitions)

## Project structure

```
src/
├── components/       Reusable UI: Navbar, Footer, BookingSearch, RoomCard,
│                     RoomFilters, RoomGallery, BookingPanel, ExperienceCard,
│                     Modal, Testimonials, SectionHeading
├── views/            Home, Rooms, RoomDetails, Booking, Experiences
├── data/             Mock rooms, experiences, testimonials and destinations
├── composables/      useBookingState (shared reservation state + pricing),
│                     useWishlist (shared favourites)
├── router/           Vue Router config
└── style.css         Tailwind layers + base refinements
```

All data is local mock data — there is no backend. Wishlist and booking state are held in memory for the session via small reactive composables shared across views.
