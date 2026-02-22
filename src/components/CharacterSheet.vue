<template>
  <div class="character-sheet">
    <!-- Top Section: Name and Role -->
    <div class="panel name-panel">
      <h2 class="character-name">{{ character.name }}</h2>
      <div class="role-section">
        <div class="role-label">ROLE:</div>
        <div class="role-value">{{ character.role }}</div>
      </div>
      <div class="status-section">
        <div class="status-label">STATUS:</div>
        <div class="status-value">{{ character.status }} ☢</div>
      </div>
    </div>

    <!-- Main Grid: Info, Photo, Stats -->
    <div class="main-grid">
      <!-- Left: Basic Info -->
      <div class="panel info-panel">
        <div class="info-item">
          <span class="label">AGE:</span>
          <span class="value">{{ character.age }}</span>
        </div>
        <div class="info-item">
          <span class="label">SEX:</span>
          <span class="value">{{ character.sex }}</span>
        </div>
        <div class="info-spacer"></div>
        
        <!-- Photo Section -->
        <div class="photo-container">
          <img :src="photoSrc" :alt="character.name" class="character-photo" />
          <div class="photo-overlay">
            <p class="photo-instruction">Replace with your photo:</p>
            <code>/public/assets/images/profile.jpg</code>
          </div>
        </div>

        <div class="info-spacer"></div>
        
        <div class="experience-section">
          <div class="exp-item">► IT EXPERIENCE: {{ character.experience.total }}</div>
          <div class="exp-item">► {{ character.experience.roleType }}: {{ character.experience.specific }}</div>
          <div class="exp-item">► ROLE: {{ character.role }}</div>
        </div>
      </div>

      <!-- Middle: S.P.E.C.I.A.L Attributes -->
      <Attributes :attributes="character.attributes" />

      <!-- Right: Skills -->
      <Skills :skills="character.skills" />
    </div>

    <!-- Bottom Section: Perks/Description -->
    <div class="panel perks-panel">
      <div class="perks-grid">
        <div class="perks-list">
          <h3>PERKS</h3>
          <ul>
            <li v-for="(perk, index) in character.perks" :key="index">
              <span class="perk-name">{{ perk.name }}</span>
              <span class="perk-rank">Rank {{ perk.rank }}</span>
            </li>
          </ul>
        </div>
        <div class="description-box">
          <h3>{{ selectedAttribute.name }}</h3>
          <div class="description-content">
            <div class="description-icon">
              <span class="icon-placeholder">🧠</span>
            </div>
            <p>{{ selectedAttribute.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Attributes from './Attributes.vue'
import Skills from './Skills.vue'

export default {
  name: 'CharacterSheet',
  components: {
    Attributes,
    Skills
  },
  data() {
    return {
      photoSrc: '/assets/images/profile.jpg',
      selectedAttribute: {
        name: 'INTELLIGENCE (TECH)',
        description: 'This attribute defines how deeply technology is understood, not just used. Faster comprehension. Cleaner solutions. Less superstition, more reasoning. When everyone sees chaos, technology becomes a Grid - not a mystery. Influences: Improves skills related to system internals, debugging, automation, testing, and solving problems at their technical root.'
      },
      character: {
        name: 'ASHTON BRIAN S. GARCIA',
        age: '20',
        sex: 'MALE',
        role: 'Cybersecurity Specialist / IT Student',
        status: 'AVAILABLE FOR MISSIONS',
        experience: {
          total: '2 YEARS',
          specific: '1 YEAR',
          roleType: 'CYBERSEC EXPERIENCE'
        },
        attributes: [
          { name: 'STRATEGY / SYSTEM THINKING', level: 7, description: 'Good' },
          { name: 'PRODUCT AWARENESS', level: 6, description: 'Good' },
          { name: 'ENGINEERING ENDURANCE', level: 8, description: 'Excellent' },
          { name: 'COMMUNICATION & LEADERSHIP', level: 7, description: 'Good' },
          { name: 'INTELLIGENCE (TECH)', level: 9, description: 'Excellent' },
          { name: 'AGILITY (AGILE)', level: 8, description: 'Excellent' },
          { name: 'LUCK / IMPROVISATION', level: 5, description: 'Good' }
        ],
        skills: [
          { name: 'SQL & Database Management', percentage: 88 },
          { name: 'Discrete Mathematics Logic', percentage: 92 },
          { name: 'Web Development (Vue/React)', percentage: 80 },
          { name: 'Cybersecurity Fundamentals', percentage: 75 },
          { name: 'Arduino Hardware Integration', percentage: 72 },
          { name: 'Mobile Development (Flutter)', percentage: 70 },
          { name: 'UI/UX Design (Responsive)', percentage: 82 },
          { name: 'Git / Version Control', percentage: 85 },
          { name: 'Technical Documentation', percentage: 84 }
        ],
        perks: [
          { name: 'Overclocked Mind', rank: 3 },
          { name: 'Silicon Soul', rank: 2 },
          { name: 'Vault Graduate', rank: 1 },
          { name: 'The Invincible Standard', rank: 2 },
          { name: 'Documentation is a Weapon', rank: 1 },
          { name: 'Cybersecurity Guardian', rank: 3 }
        ]
      }
    }
  },
  errorCaptured(err) {
    // Fallback if image doesn't exist
    this.photoSrc = 'https://via.placeholder.com/300x350/1a1a1a/00ff41?text=YOUR+PHOTO+HERE'
    return false
  }
}
</script>

<style scoped>
.character-sheet {
  margin-bottom: 40px;
}

.name-panel {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 0, 0, 0.5));
}

.character-name {
  font-size: 2.5rem;
  margin-bottom: 20px;
  letter-spacing: 0.3em;
}

.role-section, .status-section {
  display: inline-block;
  margin: 10px 20px;
}

.role-label, .status-label {
  display: inline;
  color: var(--text-muted);
  margin-right: 10px;
}

.role-value, .status-value {
  display: inline;
  color: var(--primary-green);
  font-weight: bold;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
  gap: 20px;
  margin: 20px 0;
}

.info-panel {
  display: flex;
  flex-direction: column;
}

.info-item {
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
}

.label {
  color: var(--text-muted);
}

.value {
  color: var(--primary-green);
  font-weight: bold;
}

.info-spacer {
  flex: 1;
}

.photo-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border: 3px solid var(--border-color);
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
}

.character-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.3) brightness(0.9);
  transition: all 0.3s ease;
}

.character-photo:hover {
  filter: sepia(0) brightness(1);
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
  text-align: center;
}

.photo-container:hover .photo-overlay {
  opacity: 1;
}

.photo-instruction {
  color: var(--primary-green);
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.photo-overlay code {
  color: var(--text-secondary);
  background: rgba(0, 255, 65, 0.1);
  padding: 5px 10px;
  border: 1px solid var(--border-color);
  font-size: 0.8rem;
  word-break: break-all;
}

.experience-section {
  padding: 15px;
  background: rgba(0, 255, 65, 0.05);
}

.exp-item {
  padding: 8px 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.perks-panel {
  padding: 30px;
}

.perks-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.perks-list h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.perks-list ul {
  list-style: none;
}

.perks-list li {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 255, 65, 0.2);
}

.perk-name {
  color: var(--primary-green);
}

.perk-rank {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.description-box {
  border-left: 3px solid var(--border-color);
  padding-left: 30px;
}

.description-box h3 {
  margin-bottom: 20px;
}

.description-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.description-icon {
  font-size: 4rem;
  flex-shrink: 0;
}

.description-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }

  .perks-grid {
    grid-template-columns: 1fr;
  }

  .description-box {
    border-left: none;
    border-top: 3px solid var(--border-color);
    padding-left: 0;
    padding-top: 20px;
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .character-name {
    font-size: 1.5rem;
    letter-spacing: 0.1em;
  }

  .role-section, .status-section {
    display: block;
    margin: 10px 0;
  }
}
</style>
