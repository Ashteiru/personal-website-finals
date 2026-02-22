<template>
  <div class="panel skills-panel">
    <h3>SKILLS</h3>
    <div class="skills-list">
      <div 
        v-for="(skill, index) in skills" 
        :key="index"
        class="skill-item"
      >
        <div class="skill-header">
          <span class="skill-name">{{ skill.name }}</span>
          <span class="skill-percentage">{{ skill.percentage }}%</span>
        </div>
        <div class="stat-bar">
          <div 
            class="stat-bar-fill" 
            :style="{ width: skill.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  props: {
    skills: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.skills-panel {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 255, 65, 0.05));
}

.skills-panel h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-item {
  background: rgba(0, 0, 0, 0.3);
  padding: 12px;
  border-left: 3px solid var(--primary-green);
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: rgba(0, 255, 65, 0.05);
  border-left-width: 5px;
  transform: translateX(5px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-name {
  color: var(--primary-green);
  font-size: 0.9rem;
}

.skill-percentage {
  color: var(--text-secondary);
  font-weight: bold;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .skill-name {
    font-size: 0.8rem;
  }

  .skill-percentage {
    font-size: 0.9rem;
  }
}
</style>
