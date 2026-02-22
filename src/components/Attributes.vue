<template>
  <div class="panel attributes-panel">
    <h3>S.P.E.C.I.A.L.</h3>
    <div class="attributes-list">
      <div 
        v-for="(attr, index) in attributes" 
        :key="index"
        class="attribute-item"
      >
        <div class="attribute-header">
          <div class="attribute-icon">{{ getAttributeIcon(attr.name) }}</div>
          <div class="attribute-info">
            <div class="attribute-name">{{ attr.name }}</div>
            <div class="attribute-desc">{{ attr.description }}</div>
          </div>
          <div class="attribute-level">{{ attr.level }}</div>
        </div>
        <div class="attribute-bar">
          <div 
            class="attribute-bar-fill" 
            :style="{ width: (attr.level / 10 * 100) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Attributes',
  props: {
    attributes: {
      type: Array,
      required: true
    }
  },
  methods: {
    getAttributeIcon(name) {
      const icons = {
        'STRATEGY / SYSTEM THINKING': 'S',
        'PRODUCT AWARENESS': 'P',
        'ENGINEERING ENDURANCE': 'E',
        'COMMUNICATION & LEADERSHIP': 'C',
        'INTELLIGENCE (TECH)': 'I',
        'AGILITY (AGILE)': 'A',
        'LUCK / IMPROVISATION': 'L'
      }
      return icons[name] || '?'
    }
  }
}
</script>

<style scoped>
.attributes-panel {
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.05), rgba(0, 0, 0, 0.5));
}

.attributes-panel h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.attributes-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.attribute-item {
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.attribute-item:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
}

.attribute-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.attribute-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-green);
  color: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  flex-shrink: 0;
}

.attribute-info {
  flex: 1;
}

.attribute-name {
  color: var(--primary-green);
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 3px;
}

.attribute-desc {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.attribute-level {
  font-size: 2rem;
  color: var(--primary-green);
  font-weight: bold;
  min-width: 50px;
  text-align: center;
}

.attribute-bar {
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--dark-green);
  height: 10px;
  position: relative;
  overflow: hidden;
}

.attribute-bar-fill {
  background: linear-gradient(90deg, var(--secondary-green), var(--primary-green));
  height: 100%;
  transition: width 1s ease;
  box-shadow: 0 0 10px var(--primary-green);
}

@media (max-width: 768px) {
  .attribute-icon {
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
  }

  .attribute-level {
    font-size: 1.5rem;
    min-width: 40px;
  }

  .attribute-name {
    font-size: 0.8rem;
  }
}
</style>
