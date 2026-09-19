<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import gsap from 'gsap'
import RoomCard from '../components/RoomCard.vue'
import RoomFilters from '../components/RoomFilters.vue'
import { rooms } from '../data/rooms'
import { useBookingState } from '../composables/useBookingState'

const { state } = useBookingState()

const filters = reactive({
  categories: [],
  views: [],
  guests: 1,
  maxPrice: 2000,
  amenities: []
})

const sortBy = ref('recommended')
const filtersOpen = ref(false)

const filteredRooms = computed(() => {
  let list = rooms.filter((room) => {
    if (filters.categories.length && !filters.categories.includes(room.category)) return false
    if (filters.views.length && !filters.views.includes(room.view)) return false
    if (room.guests < filters.guests) return false
    if (room.price > filters.maxPrice) return false
    if (filters.amenities.length && !filters.amenities.every((a) => room.amenities.includes(a))) return false
    return true
  })

  switch (sortBy.value) {
    case 'price-asc':
      list = [...list].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list = [...list].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      list = [...list].sort((a, b) => b.rating - a.rating)
      break
    default:
      list = [...list].sort((a, b) => b.reviewCount - a.reviewCount)
  }
  return list
})

onMounted(() => {
  gsap.fromTo('.rooms-hero-text', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
})
</script>

<template>
  <div>
    <section class="pt-40 pb-16 md:pt-48 md:pb-20 bg-parchment">
      <div class="container-page rooms-hero-text">
        <p class="text-sm text-brass mb-4">Rooms &amp; Suites</p>
        <h1 class="font-display text-4xl md:text-6xl text-charcoal max-w-2xl">Forty addresses, each built for a different kind of quiet.</h1>
        <p class="mt-6 text-charcoal/65 max-w-xl leading-relaxed">
          Filter by view, type or amenity to find the room that suits your stay from {{ state.checkIn }} to {{ state.checkOut }}.
        </p>
      </div>
    </section>

    <section class="container-page py-16 md:py-20">
      <div class="grid lg:grid-cols-[280px_1fr] gap-14">
        <!-- Desktop filters -->
        <aside class="hidden lg:block">
          <RoomFilters v-model:filters="filters" />
        </aside>

        <div>
          <div class="flex items-center justify-between gap-4 mb-10 flex-wrap">
            <div class="flex items-center gap-4">
              <button
                type="button"
                class="lg:hidden btn-secondary text-sm py-2.5 px-5"
                @click="filtersOpen = true"
              >
                Filters
              </button>
              <p class="text-sm text-charcoal/55">{{ filteredRooms.length }} {{ filteredRooms.length === 1 ? 'room' : 'rooms' }} available</p>
            </div>

            <div class="flex items-center gap-3">
              <label for="sort" class="text-sm text-charcoal/55">Sort</label>
              <select id="sort" v-model="sortBy" class="field-input py-2.5 pr-8 text-sm w-auto">
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div v-if="filteredRooms.length" class="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
            <RoomCard v-for="room in filteredRooms" :key="room.id" :room="room" />
          </div>

          <div v-else class="border border-dashed border-stone-dark/40 py-24 text-center">
            <p class="font-display text-2xl text-charcoal mb-3">No rooms match those filters.</p>
            <p class="text-charcoal/55 mb-8">Try widening your price range or clearing an amenity.</p>
            <button
              type="button"
              class="btn-secondary"
              @click="Object.assign(filters, { categories: [], views: [], guests: 1, maxPrice: 2000, amenities: [] })"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile filters drawer -->
    <Teleport to="body">
      <div v-if="filtersOpen" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-charcoal/60" @click="filtersOpen = false"></div>
        <div class="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-ivory overflow-y-auto p-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="font-display text-xl">Filters</h2>
            <button type="button" class="w-9 h-9 flex items-center justify-center border border-charcoal/20" @click="filtersOpen = false" aria-label="Close filters">✕</button>
          </div>
          <RoomFilters v-model:filters="filters" />
          <button type="button" class="btn-primary w-full mt-10" @click="filtersOpen = false">
            Show {{ filteredRooms.length }} rooms
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
