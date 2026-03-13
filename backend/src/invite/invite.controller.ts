import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('invites')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Post(':orgId')
  @UseGuards(JwtAuthGuard)
  createInvite(@Param('orgId') orgId: string, @Body() dto: CreateInviteDto) {
    return this.inviteService.createInvite(orgId, dto);
  }

  @Get('org/:orgId')
  @UseGuards(JwtAuthGuard)
  listInvites(@Param('orgId') orgId: string) {
    return this.inviteService.listInvites(orgId);
  }

  @Delete(':orgId/:inviteId')
  @UseGuards(JwtAuthGuard)
  revokeInvite(
    @Param('orgId') orgId: string,
    @Param('inviteId') inviteId: string,
  ) {
    return this.inviteService.revokeInvite(orgId, inviteId);
  }

  @Get('token/:token')
  getInviteByToken(@Param('token') token: string) {
    return this.inviteService.getInviteByToken(token);
  }
}
