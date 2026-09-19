import { reactive, computed } from 'vue'

function defaultDate(offsetDays) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().split('T')[0]
}

const state = reactive({
  checkIn: defaultDate(14),
  checkOut: defaultDate(17),
  guests: 2,
  roomsCount: 1,
  selectedRoomSlug: null,
  extras: {
    breakfast: false,
    transfer: false,
    spa: false,
    dinner: false,
    lateCheckout: false
  },
  guestDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: ''
  }
})

export const extrasCatalog = [
  { key: 'breakfast', label: 'Daily Breakfast', description: 'A curated table each morning, in-room or at the terrace.', price: 38, unit: 'per guest / night' },
  { key: 'transfer', label: 'Private Airport Transfer', description: 'A quiet car waiting at arrivals, both ways.', price: 120, unit: 'per stay' },
  { key: 'spa', label: 'Spa Treatment', description: 'A 60-minute treatment of your choosing at the spa house.', price: 180, unit: 'per stay' },
  { key: 'dinner', label: 'Private Dinner', description: 'A table set for two on your terrace, prepared by the estate kitchen.', price: 260, unit: 'per stay' },
  { key: 'lateCheckout', label: 'Late Checkout', description: 'Keep the room until 4pm on your day of departure.', price: 60, unit: 'per stay' }
]

export function nightsBetween(checkIn, checkOut) {
  const inD = new Date(checkIn)
  const outD = new Date(checkOut)
  const diff = (outD - inD) / (1000 * 60 * 60 * 24)
  return Math.max(1, Math.round(diff))
}

export function useBookingState() {
  const nights = computed(() => nightsBetween(state.checkIn, state.checkOut))

  const extrasTotal = computed(() => {
    return extrasCatalog.reduce((sum, item) => {
      if (!state.extras[item.key]) return sum
      if (item.unit === 'per guest / night') {
        return sum + item.price * state.guests * nights.value
      }
      return sum + item.price
    }, 0)
  })

  function roomSubtotal(pricePerNight) {
    return pricePerNight * nights.value * state.roomsCount
  }

  function estimateTotals(pricePerNight) {
    const subtotal = roomSubtotal(pricePerNight)
    const tax = Math.round(subtotal * 0.12)
    const serviceFee = Math.round(subtotal * 0.06)
    const total = subtotal + tax + serviceFee + extrasTotal.value
    return { subtotal, tax, serviceFee, extras: extrasTotal.value, total }
  }

  return { state, nights, extrasTotal, roomSubtotal, estimateTotals }
}
