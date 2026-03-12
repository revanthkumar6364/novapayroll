import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgSetupDto } from './dto/org-setup.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orgs')
@UseGuards(JwtAuthGuard)
export class OrgController {
  constructor(private orgService: OrgService) { }

  @Get(':orgId')
  getOrg(@Param('orgId') orgId: string) {
    return this.orgService.getOrg(orgId);
  }

  @Patch(':orgId')
  updateOrg(@Param('orgId') orgId: string, @Body() dto: OrgSetupDto) {
    return this.orgService.updateSetup(orgId, dto);
  }

  @Post(':orgId/setup/step')
  saveStep(
    @Param('orgId') orgId: string,
    @Body() body: { step: number; data: any },
  ) {
    return this.orgService.saveWizardStep(orgId, body.step, body.data);
  }
}
