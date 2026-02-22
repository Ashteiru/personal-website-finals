<template>
  <div class="panel guestbook-panel">
    <h2>GUESTBOOK / TERMINAL MESSAGES</h2>
    <p class="guestbook-intro">Leave a message in the wasteland...</p>

    <!-- Message Form -->
    <form @submit.prevent="submitMessage" class="message-form">
      <div class="form-row">
        <input 
          v-model="newMessage.name" 
          type="text" 
          placeholder="Your Name" 
          required 
          maxlength="50"
        />
        <input 
          v-model="newMessage.email" 
          type="email" 
          placeholder="Email (optional)" 
          maxlength="100"
        />
      </div>
      <textarea 
        v-model="newMessage.message" 
        placeholder="Your message..." 
        required 
        rows="4"
        maxlength="500"
      ></textarea>
      <button type="submit" :disabled="isSubmitting">
        <span v-if="!isSubmitting">► TRANSMIT MESSAGE</span>
        <span v-else class="loading">● TRANSMITTING...</span>
      </button>
      <div v-if="submitStatus.message" :class="['status-message', submitStatus.type]">
        {{ submitStatus.message }}
      </div>
    </form>

    <!-- Messages List -->
    <div class="messages-section">
      <div class="messages-header">
        <h3>INCOMING TRANSMISSIONS</h3>
        <button @click="loadMessages" class="refresh-btn">
          ⟳ REFRESH
        </button>
      </div>

      <div v-if="isLoading" class="loading-state">
        <span class="loading">● LOADING MESSAGES...</span>
      </div>

      <div v-else-if="messages.length === 0" class="empty-state">
        <p>No messages yet. Be the first to leave a transmission!</p>
      </div>

      <div v-else class="messages-list">
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message-item"
        >
          <div class="message-header">
            <span class="message-author">{{ message.name }}</span>
            <span class="message-date">{{ formatDate(message.created_at) }}</span>
          </div>
          <div class="message-content">{{ message.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default {
  name: 'Guestbook',
  data() {
    return {
      messages: [],
      newMessage: {
        name: '',
        email: '',
        message: ''
      },
      isLoading: false,
      isSubmitting: false,
      submitStatus: {
        type: '',
        message: ''
      }
    }
  },
  mounted() {
    this.loadMessages()
  },
  methods: {
    async loadMessages() {
      this.isLoading = true
      try {
        // GET request to NestJS backend
        const response = await axios.get(`${API_URL}/api/guestbook`)
        
        if (response.data.success) {
          this.messages = response.data.data || []
        } else {
          throw new Error('Failed to load messages')
        }
      } catch (error) {
        console.error('Error loading messages:', error)
        this.messages = this.getMockMessages()
      } finally {
        this.isLoading = false
      }
    },

    async submitMessage() {
      this.isSubmitting = true
      this.submitStatus = { type: '', message: '' }

      try {
        // POST request to NestJS backend
        const response = await axios.post(`${API_URL}/api/guestbook`, {
          name: this.newMessage.name,
          email: this.newMessage.email || null,
          message: this.newMessage.message
        })

        if (response.data.success) {
          this.submitStatus = {
            type: 'success',
            message: '✓ Message transmitted successfully!'
          }

          // Clear form
          this.newMessage = { name: '', email: '', message: '' }

          // Reload messages
          setTimeout(() => {
            this.loadMessages()
            this.submitStatus = { type: '', message: '' }
          }, 2000)
        } else {
          throw new Error(response.data.message || 'Failed to submit message')
        }

      } catch (error) {
        console.error('Error submitting message:', error)
        this.submitStatus = {
          type: 'error',
          message: error.response?.data?.message || '✗ Transmission failed. Please try again.'
        }
      } finally {
        this.isSubmitting = false
      }
    },

    getMockMessages() {
      return [
        {
          id: 1,
          name: 'Vault Dweller',
          message: 'Great portfolio! Love the Fallout theme!',
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 2,
          name: 'Tech Recruiter',
          message: 'Impressive skills! Would love to connect.',
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return 'Today'
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }
}
</script>

<style scoped>
.guestbook-panel {
  margin: 40px 0;
}

.guestbook-panel h2 {
  text-align: center;
  margin-bottom: 10px;
}

.guestbook-intro {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 30px;
}

.message-form {
  background: rgba(0, 0, 0, 0.3);
  padding: 25px;
  margin-bottom: 30px;
  border: 2px solid var(--border-color);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}

.message-form textarea {
  margin-bottom: 15px;
  resize: vertical;
  min-height: 100px;
}

.message-form button {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
}

.status-message {
  margin-top: 15px;
  padding: 10px;
  text-align: center;
  border: 2px solid;
}

.status-message.success {
  border-color: var(--primary-green);
  color: var(--primary-green);
  background: rgba(0, 255, 65, 0.1);
}

.status-message.error {
  border-color: #ff4444;
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
}

.status-message.warning {
  border-color: #ffaa00;
  color: #ffaa00;
  background: rgba(255, 170, 0, 0.1);
}

.messages-section {
  background: rgba(0, 0, 0, 0.3);
  padding: 25px;
  border: 2px solid var(--border-color);
}

.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--border-color);
}

.messages-header h3 {
  margin: 0;
}

.refresh-btn {
  padding: 8px 15px;
  font-size: 0.9rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-item {
  background: rgba(0, 255, 65, 0.05);
  padding: 15px;
  border-left: 3px solid var(--primary-green);
  transition: all 0.3s ease;
}

.message-item:hover {
  background: rgba(0, 255, 65, 0.1);
  transform: translateX(5px);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 255, 65, 0.2);
}

.message-author {
  color: var(--primary-green);
  font-weight: bold;
}

.message-date {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.message-content {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .messages-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .refresh-btn {
    width: 100%;
  }
}
</style>
