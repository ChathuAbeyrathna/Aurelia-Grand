<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { rooms, getRoomBySlug } from '../data/rooms'
import { useBookingState, extrasCatalog, nightsBetween } from '../composables/useBookingState'

const { state, nights, extrasTotal, estimateTotals } = useBookingState()

const steps = ['Stay', 'Guest Details', 'Extras', 'Payment', 'Confirmation']
const currentStep = ref(1)
const stepContent = ref(null)
const confirmationNumber = ref('')

const selectedRoom = computed({
  get: () => getRoomBySlug(state.selectedRoomSlug) || rooms[0],
  set: (val) => (state.selectedRoomSlug = val.slug)
})

if (!state.selectedRoomSlug) state.selectedRoomSlug = rooms[0].slug

const totals = computed(() => estimateTotals(selectedRoom.value.price))

const errors = reactive({})

function validateStay() {
  errors.dates = new Date(state.checkOut) <= new Date(state.checkIn) ? 'Check-out must be after check-in.' : ''
  return !errors.dates
}

function validateGuestDetails() {
  const g = state.guestDetails
  errors.firstName = g.firstName.trim() ? '' : 'First name is required.'
  errors.lastName = g.lastName.trim() ? '' : 'Last name is required.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g.email) ? '' : 'Enter a valid email address.'
  errors.phone = g.phone.trim().length >= 7 ? '' : 'Enter a valid phone number.'
  errors.country = g.country.trim() ? '' : 'Country is required.'
  return !errors.firstName && !errors.lastName && !errors.email && !errors.phone && !errors.country
}

const payment = reactive({ cardNumber: '', expiry: '', cvc: '', cardholder: '' })

function formatCardNumber(e) {
  let digits = e.target.value.replace(/\D/g, '').slice(0, 16)
  payment.cardNumber = digits.replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(e) {
  let digits = e.target.value.replace(/\D/g, '').slice(0, 4)
  payment.expiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

function validatePayment() {
  errors.cardNumber = payment.cardNumber.replace(/\s/g, '').length === 16 ? '' : 'Enter a valid 16-digit card number.'
  errors.expiry = /^\d{2}\/\d{2}$/.test(payment.expiry) ? '' : 'Use MM/YY format.'
  errors.cvc = /^\d{3,4}$/.test(payment.cvc) ? '' : 'Enter a valid CVC.'
  errors.cardholder = payment.cardholder.trim() ? '' : 'Cardholder name is required.'
  return !errors.cardNumber && !errors.expiry && !errors.cvc && !errors.cardholder
}

function generateConfirmation() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'AG-'
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

async function goToStep(target) {
  if (target > currentStep.value) {
    if (currentStep.value === 1 && !validateStay()) return
    if (currentStep.value === 2 && !validateGuestDetails()) return
    if (currentStep.value === 4) {
      if (!validatePayment()) return
      confirmationNumber.value = generateConfirmation()
    }
  }
  await animateOut()
  currentStep.value = target
  await nextTick()
  animateIn()
}

function animateOut() {
  return gsap.to(stepContent.value, { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in' })
}
function animateIn() {
  gsap.fromTo(stepContent.value, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
}

function next() {
  goToStep(Math.min(5, currentStep.value + 1))
}
function back() {
  goToStep(Math.max(1, currentStep.value - 1))
}

function startNewBooking() {
  state.extras = { breakfast: false, transfer: false, spa: false, dinner: false, lateCheckout: false }
  currentStep.value = 1
  nextTick(() => animateIn())
}

function todayISO() {
  return new Date().toISOString().split('T')[0]
}
</script>

<template>
  <div class="pt-24 md:pt-28 min-h-screen">
    <div class="container-page pt-8 pb-6">
      <h1 class="font-display text-3xl md:text-4xl text-charcoal">Reserve Your Stay</h1>
    </div>

    <!-- Step indicator -->
    <div class="container-page pb-10">
      <ol class="flex flex-wrap gap-x-6 gap-y-3">
        <li v-for="(label, i) in steps" :key="label" class="flex items-center gap-2">
          <span
            class="w-7 h-7 flex items-center justify-center text-xs border rounded-full"
            :class="currentStep === i + 1
              ? 'bg-charcoal text-ivory border-charcoal'
              : currentStep > i + 1
                ? 'border-brass text-brass'
                : 'border-charcoal/25 text-charcoal/40'"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <span
            class="text-sm hidden sm:inline"
            :class="currentStep === i + 1 ? 'text-charcoal' : 'text-charcoal/40'"
          >
            {{ label }}
          </span>
        </li>
      </ol>
    </div>

    <div class="container-page pb-28">
      <div class="grid lg:grid-cols-[1fr_360px] gap-16">
        <div ref="stepContent">
          <!-- Step 1: Stay -->
          <div v-if="currentStep === 1">
            <h2 class="font-display text-2xl mb-8">Your Stay</h2>
            <div class="grid sm:grid-cols-2 gap-6 max-w-xl">
              <div>
                <label class="field-label" for="stay-checkin">Check-in</label>
                <input id="stay-checkin" v-model="state.checkIn" type="date" :min="todayISO()" class="field-input" />
              </div>
              <div>
                <label class="field-label" for="stay-checkout">Check-out</label>
                <input id="stay-checkout" v-model="state.checkOut" type="date" :min="state.checkIn" class="field-input" />
              </div>
              <div>
                <label class="field-label" for="stay-guests">Guests</label>
                <input id="stay-guests" v-model.number="state.guests" type="number" min="1" max="8" class="field-input" />
              </div>
              <div>
                <label class="field-label" for="stay-rooms">Rooms</label>
                <input id="stay-rooms" v-model.number="state.roomsCount" type="number" min="1" max="4" class="field-input" />
              </div>
            </div>
            <p v-if="errors.dates" class="text-sm text-red-700/80 mt-3">{{ errors.dates }}</p>

            <div class="mt-10">
              <label class="field-label" for="room-select">Selected Room</label>
              <select
                id="room-select"
                class="field-input max-w-xl"
                :value="selectedRoom.slug"
                @change="state.selectedRoomSlug = $event.target.value"
              >
                <option v-for="r in rooms" :key="r.id" :value="r.slug">{{ r.name }} — ${{ r.price }} / night</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Guest Details -->
          <div v-else-if="currentStep === 2">
            <h2 class="font-display text-2xl mb-8">Guest Details</h2>
            <div class="grid sm:grid-cols-2 gap-6 max-w-xl">
              <div>
                <label class="field-label" for="first-name">First name</label>
                <input id="first-name" v-model="state.guestDetails.firstName" type="text" class="field-input" autocomplete="given-name" />
                <p v-if="errors.firstName" class="text-sm text-red-700/80 mt-2">{{ errors.firstName }}</p>
              </div>
              <div>
                <label class="field-label" for="last-name">Last name</label>
                <input id="last-name" v-model="state.guestDetails.lastName" type="text" class="field-input" autocomplete="family-name" />
                <p v-if="errors.lastName" class="text-sm text-red-700/80 mt-2">{{ errors.lastName }}</p>
              </div>
              <div>
                <label class="field-label" for="email">Email</label>
                <input id="email" v-model="state.guestDetails.email" type="email" class="field-input" autocomplete="email" />
                <p v-if="errors.email" class="text-sm text-red-700/80 mt-2">{{ errors.email }}</p>
              </div>
              <div>
                <label class="field-label" for="phone">Phone</label>
                <input id="phone" v-model="state.guestDetails.phone" type="tel" class="field-input" autocomplete="tel" />
                <p v-if="errors.phone" class="text-sm text-red-700/80 mt-2">{{ errors.phone }}</p>
              </div>
              <div class="sm:col-span-2">
                <label class="field-label" for="country">Country</label>
                <input id="country" v-model="state.guestDetails.country" type="text" class="field-input" autocomplete="country-name" placeholder="e.g. United Kingdom" />
                <p v-if="errors.country" class="text-sm text-red-700/80 mt-2">{{ errors.country }}</p>
              </div>
            </div>
          </div>

          <!-- Step 3: Extras -->
          <div v-else-if="currentStep === 3">
            <h2 class="font-display text-2xl mb-8">Enhance Your Stay</h2>
            <div class="space-y-4 max-w-xl">
              <label
                v-for="item in extrasCatalog"
                :key="item.key"
                class="flex items-start gap-4 border border-stone-light p-5 cursor-pointer transition-colors"
                :class="state.extras[item.key] ? 'border-charcoal' : 'hover:border-charcoal/40'"
              >
                <input type="checkbox" v-model="state.extras[item.key]" class="w-4 h-4 mt-1 accent-charcoal" />
                <div class="flex-1">
                  <div class="flex items-baseline justify-between gap-4">
                    <span class="font-display text-lg">{{ item.label }}</span>
                    <span class="text-sm text-charcoal/60 whitespace-nowrap">${{ item.price }} <span class="text-xs">{{ item.unit }}</span></span>
                  </div>
                  <p class="text-sm text-charcoal/55 mt-1">{{ item.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 4: Payment -->
          <div v-else-if="currentStep === 4">
            <h2 class="font-display text-2xl mb-8">Payment</h2>
            <p class="text-sm text-charcoal/50 mb-8 max-w-xl">This is a demonstration form — no real payment is processed.</p>
            <div class="grid gap-6 max-w-xl">
              <div>
                <label class="field-label" for="card-name">Cardholder name</label>
                <input id="card-name" v-model="payment.cardholder" type="text" class="field-input" autocomplete="cc-name" />
                <p v-if="errors.cardholder" class="text-sm text-red-700/80 mt-2">{{ errors.cardholder }}</p>
              </div>
              <div>
                <label class="field-label" for="card-number">Card number</label>
                <input
                  id="card-number"
                  :value="payment.cardNumber"
                  @input="formatCardNumber"
                  type="text"
                  inputmode="numeric"
                  placeholder="0000 0000 0000 0000"
                  maxlength="19"
                  class="field-input"
                  autocomplete="cc-number"
                />
                <p v-if="errors.cardNumber" class="text-sm text-red-700/80 mt-2">{{ errors.cardNumber }}</p>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="field-label" for="expiry">Expiry</label>
                  <input
                    id="expiry"
                    :value="payment.expiry"
                    @input="formatExpiry"
                    type="text"
                    inputmode="numeric"
                    placeholder="MM/YY"
                    maxlength="5"
                    class="field-input"
                    autocomplete="cc-exp"
                  />
                  <p v-if="errors.expiry" class="text-sm text-red-700/80 mt-2">{{ errors.expiry }}</p>
                </div>
                <div>
                  <label class="field-label" for="cvc">CVC</label>
                  <input
                    id="cvc"
                    v-model="payment.cvc"
                    type="text"
                    inputmode="numeric"
                    placeholder="123"
                    maxlength="4"
                    class="field-input"
                    autocomplete="cc-csc"
                  />
                  <p v-if="errors.cvc" class="text-sm text-red-700/80 mt-2">{{ errors.cvc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 5: Confirmation -->
          <div v-else-if="currentStep === 5" class="max-w-xl">
            <div class="w-14 h-14 border border-brass flex items-center justify-center mb-8">
              <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="#A9814F" stroke-width="1.6"><path d="M4 12l5 5L20 6"/></svg>
            </div>
            <p class="text-sm text-brass mb-3">Reservation confirmed</p>
            <h2 class="font-display text-3xl md:text-4xl text-charcoal mb-8">Thank you, {{ state.guestDetails.firstName || 'Guest' }}.</h2>

            <div class="border border-stone-light p-7 space-y-5">
              <div class="flex justify-between pb-5 border-b border-stone-light">
                <span class="text-sm text-charcoal/50">Confirmation number</span>
                <span class="font-display text-lg tracking-wide">{{ confirmationNumber }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-charcoal/50">Guest</span>
                <span>{{ state.guestDetails.firstName }} {{ state.guestDetails.lastName }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-charcoal/50">Room</span>
                <span>{{ selectedRoom.name }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-charcoal/50">Dates</span>
                <span>{{ state.checkIn }} → {{ state.checkOut }} ({{ nights }} nights)</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-charcoal/50">Guests</span>
                <span>{{ state.guests }}</span>
              </div>
              <div class="flex justify-between pt-5 border-t border-stone-light">
                <span class="font-display text-lg">Total Paid</span>
                <span class="font-display text-lg">${{ totals.total.toLocaleString() }}</span>
              </div>
            </div>

            <p class="text-sm text-charcoal/55 mt-6 leading-relaxed">
              A confirmation has been sent to {{ state.guestDetails.email || 'your email' }}. Our reservations team
              will reach out one week before arrival with transfer details.
            </p>

            <div class="flex flex-wrap gap-4 mt-10">
              <router-link to="/" class="btn-primary">Return Home</router-link>
              <button type="button" class="btn-secondary" @click="startNewBooking">Make Another Booking</button>
            </div>
          </div>

          <!-- Navigation -->
          <div v-if="currentStep < 5" class="flex items-center justify-between mt-14 max-w-xl">
            <button
              type="button"
              class="btn-ghost text-sm"
              :class="currentStep === 1 ? 'opacity-0 pointer-events-none' : ''"
              @click="back"
            >
              ← Back
            </button>
            <button type="button" class="btn-primary" @click="next">
              {{ currentStep === 4 ? 'Confirm & Pay' : 'Continue' }}
            </button>
          </div>
        </div>

        <!-- Order summary -->
        <aside v-if="currentStep < 5">
          <div class="lg:sticky lg:top-28 border border-stone-light bg-ivory p-7">
            <div class="flex gap-4 pb-6 border-b border-stone-light">
              <img :src="selectedRoom.images[0]" :alt="selectedRoom.name" class="w-20 h-20 object-cover shrink-0" />
              <div>
                <p class="font-display text-lg leading-snug">{{ selectedRoom.name }}</p>
                <p class="text-sm text-charcoal/50 mt-1">{{ selectedRoom.category }} · {{ selectedRoom.view }}</p>
              </div>
            </div>
            <div class="py-6 space-y-2.5 text-sm text-charcoal/70 border-b border-stone-light">
              <div class="flex justify-between"><span>Check-in</span><span>{{ state.checkIn }}</span></div>
              <div class="flex justify-between"><span>Check-out</span><span>{{ state.checkOut }}</span></div>
              <div class="flex justify-between"><span>Guests</span><span>{{ state.guests }}</span></div>
              <div class="flex justify-between"><span>Nights</span><span>{{ nights }}</span></div>
            </div>
            <div class="py-6 space-y-2.5 text-sm text-charcoal/70 border-b border-stone-light">
              <div class="flex justify-between">
                <span>Room ({{ nights }} nights)</span>
                <span>${{ totals.subtotal.toLocaleString() }}</span>
              </div>
              <div v-if="extrasTotal > 0" class="flex justify-between">
                <span>Extras</span>
                <span>${{ extrasTotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between"><span>Taxes</span><span>${{ totals.tax.toLocaleString() }}</span></div>
              <div class="flex justify-between"><span>Service fee</span><span>${{ totals.serviceFee.toLocaleString() }}</span></div>
            </div>
            <div class="flex justify-between items-baseline pt-6">
              <span class="font-display text-lg">Total</span>
              <span class="font-display text-lg">${{ totals.total.toLocaleString() }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
