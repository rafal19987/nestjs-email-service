import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { ResponseMessage } from '../common/response/response-message.decorator';
import { LogAction } from '../common/action/log-action.decorator';

@ApiTags('Messages')
@Controller('send')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: 'Send email' })
  @ApiBody({ type: CreateMailDto })
  @LogAction('Send new message', 'A new message was send')
  @ResponseMessage('Email has been sent correctly')
  async sendEmail(@Body() createMailDto: CreateMailDto) {
    return await this.mailService.sendEmail(createMailDto);
  }
}
