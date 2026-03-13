import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class InviteService {
  constructor(private prisma: PrismaService) {}

  async createInvite(orgId: string, dto: CreateInviteDto) {
    // Check if user already exists in this org
    const existingMember = await this.prisma.orgMembership.findFirst({
      where: {
        orgId,
        user: { email: dto.email },
      },
    });

    if (existingMember) {
      throw new ConflictException(
        'User is already a member of this organization',
      );
    }

    // Generate secure token
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    return this.prisma.invite.create({
      data: {
        email: dto.email,
        role: dto.role,
        orgId,
        token,
        expiresAt,
      },
    });
  }

  async listInvites(orgId: string) {
    return this.prisma.invite.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async revokeInvite(orgId: string, inviteId: string) {
    const invite = await this.prisma.invite.findFirst({
      where: { id: inviteId, orgId },
    });

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    return this.prisma.invite.delete({
      where: { id: inviteId },
    });
  }

  async getInviteByToken(token: string) {
    const invite = await this.prisma.invite.findUnique({
      where: { token },
      include: { org: true },
    });

    if (!invite || invite.expiresAt < new Date()) {
      throw new NotFoundException('Invite not found or expired');
    }

    return invite;
  }
}
