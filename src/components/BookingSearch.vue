<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingState } from '../composables/useBookingState'

const props = defineProps({
  floating: { type: Boolean, default: false }
})

const router = useRouter()
const { state } = useBookingState()
const guestPopoverOpen = ref(false)

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function checkAvailability() {
  router.push({ path: '/rooms' })
}

function incrementGuests(delta) {
  state.guests = Math.min(8, Math.max(1, state.guests + delta))
}
function incrementRooms(delta) {
  state.roomsCount = Math.min(4, Math.max(1, state.roomsCount + delta))
}
</script>

<template>
  <form
    class="bg-ivory shadow-[0_30px_60px_-20px_rgba(33,31,27,0.25)] w-full"
    :class="floating ? 'p-5 md:p-3' : 'p-6 md:p-4'"
    @submit.prevent="checkAvailability"
  >
    <div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 md:gap-0 md:divide-x md:divide-stone-light items-stretch">
      <div class="md:px-6 py-2">
        <label class="field-label" for="check-in">Check-in</label>
        <input id="check-in" v-model="state.checkIn" type="date" :min="todayISO()" class="w-full bg-transparent text-charcoal focus:outline-none" />
      </div>
      <div class="md:px-6 py-2">
        <label class="field-label" for="check-out">Check-out</label>
        <input id="check-out" v-model="state.checkOut" type="date" :min="state.checkIn" class="w-full bg-transparent text-charcoal focus:outline-none" />
      </div>

      <div class="md:px-6 py-2 relative">
        <label class="field-label" id="guests-label">Guests</label>
        <button
          type="button"
          class="w-full text-left text-charcoal"
          aria-haspopup="true"
          :aria-expanded="guestPopoverOpen"
          aria-labelledby="guests-label"
          @click="guestPopoverOpen = !guestPopoverOpen"
        >
          {{ state.guests }} {{ state.guests === 1 ? 'Guest' : 'Guests' }}
        </button>

        <div
          v-if="guestPopoverOpen"
          class="absolute left-0 top-full mt-3 w-64 bg-ivory border border-stone-light shadow-xl p-5 z-20"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm">Guests</span>
            <div class="flex items-center gap-4">
              <button type="button" class="w-8 h-8 border border-charcoal/30 hover:border-charcoal transition-colors" @click="incrementGuests(-1)" aria-label="Decrease guests">−</button>
              <span class="w-4 text-center tabular-nums">{{ state.guests }}</span>
              <button type="button" class="w-8 h-8 border border-charcoal/30 hover:border-charcoal transition-colors" @click="incrementGuests(1)" aria-label="Increase guests">+</button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Rooms</span>
            <div class="flex items-center gap-4">
              <button type="button" class="w-8 h-8 border border-charcoal/30 hover:border-charcoal transition-colors" @click="incrementRooms(-1)" aria-label="Decrease rooms">−</button>
              <span class="w-4 text-center tabular-nums">{{ state.roomsCount }}</span>
              <button type="button" class="w-8 h-8 border border-charcoal/30 hover:border-charcoal transition-colors" @click="incrementRooms(1)" aria-label="Increase rooms">+</button>
            </div>
          </div>
          <button type="button" class="btn-ghost mt-4 text-xs" @click="guestPopoverOpen = false">Done</button>
        </div>
      </div>

      <div class="md:px-6 py-2">
        <span class="field-label">Rooms</span>
        <p class="text-charcoal">{{ state.roomsCount }} {{ state.roomsCount === 1 ? 'Room' : 'Rooms' }}</p>
      </div>

      <div class="pt-2 md:pt-0 md:pl-4 flex items-stretch">
        <button type="submit" class="btn-primary w-full md:w-auto whitespace-nowrap">
          Check Availability
        </button>
      </div>
    </div>
  </form>
</template>
