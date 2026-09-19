<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import RoomGallery from '../components/RoomGallery.vue'
import BookingPanel from '../components/BookingPanel.vue'
import { getRoomBySlug, rooms } from '../data/rooms'
import { useWishlist } from '../composables/useWishlist'

const props = defineProps({
  slug: { type: String, required: true }
})

const router = useRouter()
const room = computed(() => getRoomBySlug(props.slug))
const otherRooms = computed(() => rooms.filter((r) => r.slug !== props.slug).slice(0, 3))
const { toggle, isSaved } = useWishlist()

onMounted(() => {
  if (!room.value) return
  gsap.fromTo('.room-fade-in', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power2.out' })
})
</script>

<template>
  <div v-if="room" class="pt-24 md:pt-28">
    <div class="container-page pt-6 pb-8 room-fade-in">
      <button type="button" class="text-sm text-charcoal/50 hover:text-charcoal transition-colors mb-4" @click="router.push('/rooms')">
        ← Back to Rooms &amp; Suites
      </button>
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-sm text-brass mb-2">{{ room.category }} · {{ room.view }}</p>
          <h1 class="font-display text-3xl md:text-4xl text-charcoal">{{ room.name }}</h1>
          <div class="flex items-center gap-2 mt-3">
            <svg viewBox="0 0 20 20" class="w-4 h-4" fill="#A9814F"><path d="M10 1l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 14.9l-5.5 2.7 1.4-6.1L1.2 7.3l6.2-.6z"/></svg>
            <span class="text-sm text-charcoal/70">{{ room.rating }} · {{ room.reviewCount }} reviews</span>
          </div>
        </div>
        <button
          type="button"
          class="btn-secondary text-sm"
          @click="toggle(room.id)"
        >
          {{ isSaved(room.id) ? 'Saved to Wishlist' : 'Add to Wishlist' }}
        </button>
      </div>
    </div>

    <div class="container-page room-fade-in">
      <RoomGallery :images="room.images" :room-name="room.name" />
    </div>

    <div class="container-page py-16 grid lg:grid-cols-[1fr_380px] gap-16">
      <div class="room-fade-in">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-10 border-b border-stone-light">
          <div>
            <p class="text-xs uppercase tracking-wideish text-charcoal/40 mb-1">Guests</p>
            <p class="text-charcoal">{{ room.guests }} max</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wideish text-charcoal/40 mb-1">Bed</p>
            <p class="text-charcoal">{{ room.beds }}</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wideish text-charcoal/40 mb-1">Size</p>
            <p class="text-charcoal">{{ room.size }} m²</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wideish text-charcoal/40 mb-1">View</p>
            <p class="text-charcoal">{{ room.view }}</p>
          </div>
        </div>

        <div class="py-10 border-b border-stone-light">
          <h2 class="font-display text-2xl mb-4">About this room</h2>
          <p class="text-charcoal/70 leading-relaxed max-w-2xl">{{ room.description }}</p>
        </div>

        <div class="py-10 border-b border-stone-light">
          <h2 class="font-display text-2xl mb-6">Amenities</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
            <div v-for="amenity in room.amenities" :key="amenity" class="flex items-center gap-3 text-sm text-charcoal/75">
              <span class="w-1.5 h-1.5 bg-brass"></span>
              {{ amenity }}
            </div>
          </div>
        </div>

        <div class="py-10 border-b border-stone-light">
          <h2 class="font-display text-2xl mb-2">Check-in / Check-out</h2>
          <div class="grid grid-cols-2 gap-6 mt-4 max-w-sm">
            <div>
              <p class="text-xs uppercase tracking-wideish text-charcoal/40 mb-1">Check-in</p>
              <p class="text-charcoal">3:00 PM</p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wideish text-charcoal/40 mb-1">Check-out</p>
              <p class="text-charcoal">11:00 AM</p>
            </div>
          </div>
        </div>

        <div class="py-10">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-2xl">Guest Reviews</h2>
            <div class="flex items-center gap-2">
              <svg viewBox="0 0 20 20" class="w-4 h-4" fill="#A9814F"><path d="M10 1l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 14.9l-5.5 2.7 1.4-6.1L1.2 7.3l6.2-.6z"/></svg>
              <span class="text-sm">{{ room.rating }} out of 5 · {{ room.reviewCount }} reviews</span>
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-8">
            <div class="border-t border-stone-light pt-4">
              <p class="text-sm text-charcoal/80 leading-relaxed">"The terrace made the room. We had breakfast out there every morning and never once wanted to leave."</p>
              <p class="text-xs text-charcoal/45 mt-3">Priya M. — 3 weeks ago</p>
            </div>
            <div class="border-t border-stone-light pt-4">
              <p class="text-sm text-charcoal/80 leading-relaxed">"Exactly as described, and the staff upgraded the linens without us asking. Small touches everywhere."</p>
              <p class="text-xs text-charcoal/45 mt-3">Daniel R. — 2 months ago</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky booking summary -->
      <div class="room-fade-in">
        <div class="lg:sticky lg:top-28">
          <BookingPanel :room="room" />
        </div>
      </div>
    </div>

    <section class="bg-parchment py-20">
      <div class="container-page">
        <h2 class="font-display text-3xl mb-10">You may also like</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          <div v-for="r in otherRooms" :key="r.id" class="cursor-pointer" @click="router.push(`/rooms/${r.slug}`)">
            <div class="relative overflow-hidden aspect-[4/5]">
              <img :src="r.images[0]" :alt="r.name" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <h3 class="font-display text-xl mt-4">{{ r.name }}</h3>
            <p class="text-sm text-charcoal/55">${{ r.price }} / night</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="pt-40 pb-32 container-page text-center">
    <h1 class="font-display text-3xl mb-4">Room not found</h1>
    <p class="text-charcoal/60 mb-8">The room you're looking for may have been renamed or removed.</p>
    <router-link to="/rooms" class="btn-primary">Back to Rooms &amp; Suites</router-link>
  </div>
</template>
