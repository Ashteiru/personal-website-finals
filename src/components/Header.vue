<template>
  <header class="header">
    <div class="header-content">
      <div class="title-section">
        <h1 class="glitch">ASHTEIRU</h1>
        <div class="subtitle">Terminal Access: Portfolio v1.0</div>
      </div>
      <div class="status-badge">
        <span class="status-indicator"></span>
        <span>{{ status }}</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      status: 'AVAILABLE FOR MISSIONS'
    }
  }
}
</script>

<style scoped>
.header {
  padding: 30px 0;
  border-bottom: 3px solid var(--border-color);
  margin-bottom: 30px;
  background: linear-gradient(180deg, rgba(0, 255, 65, 0.05), transparent);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.title-section h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  letter-spacing: 0.2em;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.9rem;
  opacity: 0.8;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border: 2px solid var(--primary-green);
  background: rgba(0, 255, 65, 0.1);
  text-transform: uppercase;
  font-size: 0.9rem;
}

.status-indicator {
  width: 10px;
  height: 10px;
  background: var(--primary-green);
  border-radius: 50%;
  animation: blink 2s infinite;
  box-shadow: 0 0 10px var(--primary-green);
}

@media (max-width: 768px) {
  .title-section h1 {
    font-size: 2rem;
  }

  .header-content {
    justify-content: center;
    text-align: center;
  }

  .status-badge {
    font-size: 0.8rem;
    padding: 8px 15px;
  }
}
</style>
