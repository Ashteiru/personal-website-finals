import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

export class CreateMessageDto {
  name: string;
  email?: string;
  message: string;
}

@Controller('api/guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  /**
   * GET /api/guestbook
   * Retrieve all guestbook messages
   */
  @Get()
  async getMessages() {
    try {
      console.log('📥 GET /api/guestbook - Fetching messages...');
      const messages = await this.guestbookService.getMessages();
      console.log(`✓ GET /api/guestbook - Returning ${messages.length} messages`);
      return {
        success: true,
        data: messages,
        count: messages.length
      };
    } catch (error) {
      console.error('❌ GET /api/guestbook - Error:', {
        message: error.message,
        stack: error.stack
      });
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch messages from database',
          error: error.message,
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * POST /api/guestbook
   * Create a new guestbook message
   */
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    try {
      console.log('📤 POST /api/guestbook - Validating message...');
      
      // Validation
      if (!createMessageDto.name || !createMessageDto.message) {
        console.warn('⚠️ Validation failed: Missing required fields');
        throw new HttpException(
          {
            success: false,
            message: 'Name and message are required'
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (createMessageDto.name.length > 50) {
        console.warn('⚠️ Validation failed: Name too long');
        throw new HttpException(
          {
            success: false,
            message: 'Name must be less than 50 characters'
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (createMessageDto.message.length > 500) {
        console.warn('⚠️ Validation failed: Message too long');
        throw new HttpException(
          {
            success: false,
            message: 'Message must be less than 500 characters'
          },
          HttpStatus.BAD_REQUEST
        );
      }

      console.log('✓ Validation passed, creating message...');
      const newMessage = await this.guestbookService.createMessage(createMessageDto);
      console.log(`✓ POST /api/guestbook - Message created successfully`);
      
      return {
        success: true,
        message: 'Message created successfully',
        data: newMessage
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      console.error('❌ POST /api/guestbook - Error:', {
        message: error.message,
        stack: error.stack
      });
      
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create message in database',
          error: error.message,
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
