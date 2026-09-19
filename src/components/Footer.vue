<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-charcoal text-ivory">
    <div class="container-page py-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
      <div class="md:col-span-4">
        <p class="font-display text-2xl mb-6">
          Aurelia <span class="italic text-brass-soft">Grand</span>
        </p>
        <p class="text-ivory/60 text-sm leading-relaxed max-w-xs">
          A coastal resort built around stillness, craft and light — on the peninsula of Vellara.
        </p>
      </div>

      <div class="md:col-span-2 md:col-start-6">
        <p class="text-xs uppercase tracking-wideish text-ivory/40 mb-5">Explore</p>
        <ul class="space-y-3 text-sm text-ivory/75">
          <li><router-link to="/rooms" class="hover:text-ivory transition-colors">Rooms &amp; Suites</router-link></li>
          <li><router-link to="/experiences" class="hover:text-ivory transition-colors">Experiences</router-link></li>
          <li><router-link to="/booking" class="hover:text-ivory transition-colors">Book a Stay</router-link></li>
          <li><router-link to="/#dining" class="hover:text-ivory transition-colors">Dining</router-link></li>
        </ul>
      </div>

      <div class="md:col-span-2">
        <p class="text-xs uppercase tracking-wideish text-ivory/40 mb-5">The Resort</p>
        <ul class="space-y-3 text-sm text-ivory/75">
          <li><a href="#" class="hover:text-ivory transition-colors">Our Story</a></li>
          <li><a href="#" class="hover:text-ivory transition-colors">Sustainability</a></li>
          <li><a href="#" class="hover:text-ivory transition-colors">Careers</a></li>
          <li><a href="#" class="hover:text-ivory transition-colors">Press</a></li>
        </ul>
      </div>

      <div class="md:col-span-3">
        <p class="text-xs uppercase tracking-wideish text-ivory/40 mb-5">Reach Us</p>
        <ul class="space-y-3 text-sm text-ivory/75">
          <li>Vellara Peninsula, Greece</li>
          <li>reservations@aureliagrand.com</li>
          <li>+30 210 000 4471</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-ivory/10">
      <div class="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
        <p>&copy; {{ year }} Aurelia Grand. A fictional resort for portfolio purposes.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-ivory/70 transition-colors">Privacy</a>
          <a href="#" class="hover:text-ivory/70 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>
