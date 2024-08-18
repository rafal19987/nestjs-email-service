import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { CreateMailZodDto } from './dto/create-mail-zod.dto';
import { ResponseMessage } from 'src/common/response/response-message.decorator';
import { LogAction } from 'src/common/action/log-action.decorator';

@ApiTags('Messages')
@Controller('send')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: 'Send email' })
  @ApiBody({ type: CreateMailZodDto })
  @LogAction('Send new message', 'A new message was send')
  @ResponseMessage('Email has been sent correctly')
  async sendEmail(@Body() createMailDto: CreateMailZodDto) {
    return await this.mailService.sendEmail(createMailDto);
  }
}
