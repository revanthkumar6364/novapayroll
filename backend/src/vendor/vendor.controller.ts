import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

interface CreateVendorDto {
  name: string;
  email?: string;
  phone?: string;
  pan?: string;
  gstin?: string;
  bankAccount?: string;
  ifsc?: string;
}

interface VendorPaymentDto {
  amount: number;
  tdsRate: number;
  remarks?: string;
  paymentDate?: string;
}

@Controller('vendor')
@UseGuards(JwtAuthGuard)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  async listVendors(@Req() req: AuthenticatedRequest) {
    const orgId = req.user.orgs[0].orgId;
    return this.vendorService.listVendors(orgId);
  }

  @Post()
  async createVendor(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateVendorDto,
  ) {
    const orgId = req.user.orgs[0].orgId;
    return this.vendorService.createVendor(orgId, dto);
  }

  @Get('payments')
  async listPayments(@Req() req: AuthenticatedRequest) {
    const orgId = req.user.orgs[0].orgId;
    return this.vendorService.listPayments(orgId);
  }

  @Post(':id/payment')
  async createPayment(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: VendorPaymentDto,
  ) {
    const orgId = req.user.orgs[0].orgId;
    return this.vendorService.createPayment(orgId, id, dto);
  }
}
