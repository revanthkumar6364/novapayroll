import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFinalSettlementDto,
  UpdateSettlementStatusDto,
} from './dto/final-settlement.dto';

@Injectable()
export class FinalSettlementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFinalSettlementDto) {
    // Check if employee exists
    const employee = await this.prisma.employee.findUnique({
      where: { id: dto.employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Check if settlement already exists
    const existing = await this.prisma.finalSettlement.findUnique({
      where: { employeeId: dto.employeeId },
    });

    if (existing) {
      throw new ConflictException(
        'Final settlement already initiated for this employee',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Create the final settlement record
      const settlement = await tx.finalSettlement.create({
        data: {
          employeeId: dto.employeeId,
          exitDate: new Date(dto.exitDate),
          lastWorkingDay: new Date(dto.lastWorkingDay),
          noticePeriodDays: dto.noticePeriodDays,
          leaveEncashment: dto.leaveEncashment || 0,
          gratuity: dto.gratuity || 0,
          bonus: dto.bonus || 0,
          deductions: dto.deductions || 0,
          netPayable: dto.netPayable,
          notes: dto.notes,
          status: 'PENDING',
        },
      });

      // 2. Update employee status to INACTIVE/TERMINATED
      await tx.employee.update({
        where: { id: dto.employeeId },
        data: {
          status: 'INACTIVE',
          exitDate: new Date(dto.exitDate),
        },
      });

      return settlement;
    });
  }

  async findOneByEmployee(employeeId: string) {
    return this.prisma.finalSettlement.findUnique({
      where: { employeeId },
      include: { employee: true },
    });
  }

  async updateStatus(id: string, dto: UpdateSettlementStatusDto) {
    const settlement = await this.prisma.finalSettlement.findUnique({
      where: { id },
    });

    if (!settlement) {
      throw new NotFoundException('Final settlement not found');
    }

    return this.prisma.finalSettlement.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async findAll() {
    return this.prisma.finalSettlement.findMany({
      include: { employee: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
