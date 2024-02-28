/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, USER_ROLE } from '@prisma/client';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get('all')
  findAll() {
    return this.employeesService.findAll();
  }

  @Get()
  findOne(@Body() requestedEmployee: Prisma.EmployeeUpdateInput) {
    return this.employeesService.findOne(`${requestedEmployee.username}`);
  }

  @Get(':userRole')
  findOneByRole(@Param('userRole') userRole: USER_ROLE){
    return this.employeesService.findAll(userRole);
  }
  @Patch(':username')
  update(@Param('username') username: string, @Body() updatedEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(username, updatedEmployeeDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.employeesService.remove(username);
  }
}
