<template>
  <div class="app">
    <div class="scanlines"></div>
    <div class="noise"></div>
    
    <div class="container">
      <Header />
      <CharacterSheet />
      <Guestbook />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import CharacterSheet from './components/CharacterSheet.vue'
import Guestbook from './components/Guestbook.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    CharacterSheet,
    Guestbook,
    Footer
  }
}
</script>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  background: #0a0a0a;
}

.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 1000;
}

.noise {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
  opacity: 0.5;
}

.container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  z-index: 1;
}
</style>
