<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="contact-section">
        <h3>TERMINAL ACCESS</h3>
        <div class="contact-links">
          <a href="https://www.linkedin.com/in/ashton-brian-s-garcia-445783384/" target="_blank" rel="noopener">
            <span class="icon">💼</span> LinkedIn
          </a>
          <a href="https://github.com/Ashteiru" target="_blank" rel="noopener">
            <span class="icon">⚙</span> GitHub
          </a>
          <a href="mailto:asgarcia@student.apc.edu.ph">
            <span class="icon">📡</span> Email
          </a>
        </div>
      </div>

      <div class="divider"></div>

      <div class="about-section">
        <p class="tagline">"In the wasteland of code, only the adaptable survive."</p>
        <p class="credits">
          Built with Vue.js • Nest.js • Supabase<br>
          Inspired by Fallout Universe • Designed for the Modern Web
        </p>
      </div>

      <div class="divider"></div>

      <div class="copyright-section">
        <p>&copy; {{ currentYear }} Ashton Brian S. Garcia</p>
        <p class="small">Information Technology Student • Asia Pacific College</p>
        <p class="version">Portfolio v1.0.0 • Build {{ buildNumber }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      buildNumber: Math.floor(Math.random() * 9000) + 1000
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: 60px;
  padding: 40px 0 20px;
  border-top: 3px solid var(--border-color);
  background: linear-gradient(0deg, rgba(0, 255, 65, 0.05), transparent);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.contact-section h3 {
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.contact-links a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 2px solid var(--border-color);
  background: rgba(0, 255, 65, 0.05);
  transition: all 0.3s ease;
}

.contact-links a:hover {
  border-color: var(--primary-green);
  background: rgba(0, 255, 65, 0.15);
  transform: translateY(-3px);
}

.icon {
  font-size: 1.2rem;
}

.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
  margin: 30px 0;
}

.about-section {
  margin: 30px 0;
}

.tagline {
  color: var(--primary-green);
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.credits {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.8;
}

.copyright-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
}

.copyright-section p {
  margin: 5px 0;
}

.small {
  font-size: 0.85rem;
}

.version {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .contact-links {
    flex-direction: column;
    gap: 15px;
  }

  .contact-links a {
    justify-content: center;
  }

  .tagline {
    font-size: 1rem;
  }

  .credits {
    font-size: 0.85rem;
  }
}
</style>
