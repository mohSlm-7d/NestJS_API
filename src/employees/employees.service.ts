/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, USER_ROLE } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService){}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: USER_ROLE) {
    if(role){
      return this.databaseService.employee.findMany({
        where: <Prisma.EmployeeCreateInput>{
          role,
        }});
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(username: string) {
    return this.databaseService.employee.findUnique({
      where: <Prisma.EmployeeCreateInput>{
        username,
      }});
  }

  async update(username: string, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: <Prisma.EmployeeCreateInput>{
        username,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(username: string) {
    return this.databaseService.employee.delete({
      where: (<Prisma.EmployeeCreateInput>{
        username,
      })
    });
  }
}
