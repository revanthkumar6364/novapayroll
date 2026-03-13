import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SandboxService } from './sandbox.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sandbox')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Post('verify-gst')
  async verifyGst(@Body() data: { orgId: string; gstin: string }) {
    return this.sandboxService.verifyGst(data.orgId, data.gstin);
  }

  @Post('verify-pan/:employeeId')
  async verifyPan(
    @Param('employeeId') employeeId: string,
    @Body() data: { pan: string },
  ) {
    return this.sandboxService.verifyPan(employeeId, data.pan);
  }

  @Post('verify-upi')
  async verifyUpi(@Body() data: { vpa: string }) {
    return this.sandboxService.verifyUpi(data.vpa);
  }
}
