<script setup>
import { useRouter } from 'vue-router'
import { useBookingState } from '../composables/useBookingState'

const props = defineProps({
  room: { type: Object, required: true }
})

const router = useRouter()
const { state, nights, estimateTotals } = useBookingState()

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function incrementGuests(delta) {
  state.guests = Math.min(props.room.guests, Math.max(1, state.guests + delta))
}

function reserve() {
  state.selectedRoomSlug = props.room.slug
  router.push('/booking')
}
</script>

<template>
  <div class="border border-stone-light bg-ivory p-7">
    <div class="flex items-baseline justify-between pb-6 border-b border-stone-light">
      <p class="font-display text-2xl">${{ room.price.toLocaleString() }}</p>
      <span class="text-sm text-charcoal/50">per night</span>
    </div>

    <div class="grid grid-cols-2 gap-3 py-5 border-b border-stone-light">
      <div>
        <label class="field-label" for="panel-checkin">Check-in</label>
        <input id="panel-checkin" v-model="state.checkIn" type="date" :min="todayISO()" class="w-full bg-transparent text-sm text-charcoal focus:outline-none" />
      </div>
      <div>
        <label class="field-label" for="panel-checkout">Check-out</label>
        <input id="panel-checkout" v-model="state.checkOut" type="date" :min="state.checkIn" class="w-full bg-transparent text-sm text-charcoal focus:outline-none" />
      </div>
    </div>

    <div class="flex items-center justify-between py-5 border-b border-stone-light">
      <div>
        <p class="field-label mb-1">Guests</p>
        <p class="text-sm">Max {{ room.guests }} guests</p>
      </div>
      <div class="flex items-center gap-4">
        <button type="button" class="w-8 h-8 border border-charcoal/30 hover:border-charcoal transition-colors" @click="incrementGuests(-1)" aria-label="Decrease guests">−</button>
        <span class="w-4 text-center tabular-nums">{{ state.guests }}</span>
        <button type="button" class="w-8 h-8 border border-charcoal/30 hover:border-charcoal transition-colors" @click="incrementGuests(1)" aria-label="Increase guests">+</button>
      </div>
    </div>

    <div class="py-5 space-y-2.5 text-sm text-charcoal/70">
      <div class="flex justify-between">
        <span>${{ room.price }} × {{ nights }} {{ nights === 1 ? 'night' : 'nights' }}</span>
        <span>${{ estimateTotals(room.price).subtotal.toLocaleString() }}</span>
      </div>
      <div class="flex justify-between">
        <span>Taxes</span>
        <span>${{ estimateTotals(room.price).tax.toLocaleString() }}</span>
      </div>
      <div class="flex justify-between">
        <span>Service fee</span>
        <span>${{ estimateTotals(room.price).serviceFee.toLocaleString() }}</span>
      </div>
    </div>

    <div class="flex items-baseline justify-between py-5 border-t border-charcoal/15">
      <span class="font-display text-lg">Total</span>
      <span class="font-display text-lg">${{ estimateTotals(room.price).total.toLocaleString() }}</span>
    </div>

    <button type="button" class="btn-primary w-full" @click="reserve">Reserve This Room</button>
    <p class="text-xs text-center text-charcoal/40 mt-4">You won't be charged yet</p>
  </div>
</template>
