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

    console.log('🔧 Initializing Supabase connection...');
    console.log(`SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}`);
    console.log(`SUPABASE_KEY: ${supabaseKey ? '✓ Set' : '✗ Missing'}`);

    if (!supabaseUrl || !supabaseKey) {
      const error = 'CRITICAL ERROR: SUPABASE_URL and SUPABASE_KEY must be configured in environment variables';
      console.error('❌', error);
      throw new Error(error);
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      console.log('✓ Supabase client initialized successfully');
      console.log(`✓ Connected to: ${supabaseUrl}`);
    } catch (error) {
      console.error('❌ Failed to create Supabase client:', error);
      throw new Error(`Supabase initialization failed: ${error.message}`);
    }
  }

  /**
   * Get all messages from the guestbook
   * Ordered by creation date (newest first)
   */
  async getMessages(): Promise<GuestbookMessage[]> {
    console.log('📥 Fetching messages from Supabase...');
    
    try {
      const { data, error } = await this.supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('❌ Supabase query error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Failed to fetch messages: ${error.message} (Code: ${error.code})`);
      }

      console.log(`✓ Successfully fetched ${data?.length || 0} messages`);
      return data || [];
    } catch (error) {
      console.error('❌ Exception while fetching messages:', error);
      throw error;
    }
  }

  /**
   * Create a new guestbook message
   */
  async createMessage(messageData: GuestbookMessage): Promise<GuestbookMessage> {
    console.log('📤 Creating new message:', { name: messageData.name, hasEmail: !!messageData.email });
    
    try {
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
        console.error('❌ Supabase insert error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Failed to create message: ${error.message} (Code: ${error.code})`);
      }

      console.log('✓ Message created successfully with ID:', data?.id);
      return data;
    } catch (error) {
      console.error('❌ Exception while creating message:', error);
      throw error;
    }
  }

}
