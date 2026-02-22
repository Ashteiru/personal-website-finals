import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface GuestbookMessage {
  id?: number;
  name: string;
  email?: string;
  message: string;
  created_at?: string;
}

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('⚠️  Supabase credentials not configured. Running in demo mode.');
      this.supabase = null;
    } else {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      console.log('✓ Supabase client initialized');
    }
  }

  /**
   * Get all messages from the guestbook
   * Ordered by creation date (newest first)
   */
  async getMessages(): Promise<GuestbookMessage[]> {
    if (!this.supabase) {
      // Return mock data if Supabase is not configured
      return this.getMockMessages();
    }

    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data || [];
  }

  /**
   * Create a new guestbook message
   */
  async createMessage(messageData: GuestbookMessage): Promise<GuestbookMessage> {
    if (!this.supabase) {
      // Return mock response if Supabase is not configured
      return {
        id: Date.now(),
        ...messageData,
        created_at: new Date().toISOString()
      };
    }

    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([
        {
          name: messageData.name,
          email: messageData.email || null,
          message: messageData.message
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Mock messages for demo mode
   */
  private getMockMessages(): GuestbookMessage[] {
    return [
      {
        id: 1,
        name: 'Vault Dweller',
        message: 'Amazing Fallout-themed portfolio! Love the attention to detail.',
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 2,
        name: 'Tech Recruiter',
        message: 'Very impressive technical skills. Would love to connect!',
        created_at: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 3,
        name: 'Fellow Developer',
        message: 'The Vue.js implementation is clean. Great work on the REST API integration!',
        created_at: new Date(Date.now() - 259200000).toISOString()
      }
    ];
  }
}
