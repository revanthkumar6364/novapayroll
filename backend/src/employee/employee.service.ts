import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async listEmployees(orgId: string) {
    return this.prisma.employee.findMany({
      where: { orgId, deletedAt: null },
      include: {
        salaryStructures: {
          orderBy: { effectiveFrom: 'desc' },
          take: 1,
        },
      },
    });
  }

  async createEmployee(orgId: string, dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        ...dto,
        orgId,
        joinDate: new Date(dto.joinDate),
      },
    });
  }

  async getEmployee(orgId: string, id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { id, orgId, deletedAt: null },
      include: {
        bankAccount: true,
        documents: true,
        salaryStructures: true,
      },
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async updateEmployee(
    orgId: string,
    id: string,
    dto: Partial<CreateEmployeeDto>,
  ) {
    return this.prisma.employee.update({
      where: { id },
      data: {
        ...dto,
      } as any, // Cast to any to avoid complex deep-mapped issues with Partial while maintaining DTO contract
    });
  }
}
