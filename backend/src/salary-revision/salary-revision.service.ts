import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSalaryRevisionDto,
  UpdateSalaryRevisionStatusDto,
} from './dto/salary-revision.dto';

@Injectable()
export class SalaryRevisionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSalaryRevisionDto) {
    return this.prisma.salaryRevision.create({
      data: {
        employeeId: dto.employeeId,
        oldCtc: dto.oldCtc,
        newCtc: dto.newCtc,
        effectiveDate: new Date(dto.effectiveDate),
        reason: dto.reason,
        status: 'PENDING',
      },
    });
  }

  async findAllByEmployee(employeeId: string) {
    return this.prisma.salaryRevision.findMany({
      where: { employeeId },
      orderBy: { effectiveDate: 'desc' },
    });
  }

  async updateStatus(id: string, dto: UpdateSalaryRevisionStatusDto) {
    const revision = await this.prisma.salaryRevision.findUnique({
      where: { id },
    });

    if (!revision) {
      throw new NotFoundException('Salary revision not found');
    }

    return this.prisma.salaryRevision.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async delete(id: string) {
    return this.prisma.salaryRevision.delete({
      where: { id },
    });
  }
}
