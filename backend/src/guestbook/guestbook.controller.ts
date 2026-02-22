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
      const messages = await this.guestbookService.getMessages();
      return {
        success: true,
        data: messages,
        count: messages.length
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to fetch messages',
          error: error.message
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
      // Validation
      if (!createMessageDto.name || !createMessageDto.message) {
        throw new HttpException(
          {
            success: false,
            message: 'Name and message are required'
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (createMessageDto.name.length > 50) {
        throw new HttpException(
          {
            success: false,
            message: 'Name must be less than 50 characters'
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (createMessageDto.message.length > 500) {
        throw new HttpException(
          {
            success: false,
            message: 'Message must be less than 500 characters'
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const newMessage = await this.guestbookService.createMessage(createMessageDto);
      
      return {
        success: true,
        message: 'Message created successfully',
        data: newMessage
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create message',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
