import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vendor')
@UseGuards(JwtAuthGuard)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  async listVendors(@Request() req) {
    return this.vendorService.listVendors(req.user.orgId);
  }

  @Post()
  async createVendor(@Request() req, @Body() dto: any) {
    return this.vendorService.createVendor(req.user.orgId, dto);
  }

  @Get('payments')
  async listPayments(@Request() req) {
    return this.vendorService.listPayments(req.user.orgId);
  }

  @Post(':id/payment')
  async createPayment(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    return this.vendorService.createPayment(req.user.orgId, id, dto);
  }
}
