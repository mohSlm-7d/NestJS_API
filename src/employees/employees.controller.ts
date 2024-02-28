/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, USER_ROLE } from '@prisma/client';

@Controller('employees/')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    try{
      return this.employeesService.create(createEmployeeDto);
    }catch(error){
      if(error instanceof HttpException){
        return JSON.stringify({
              ...((<HttpException> error).getResponse() as Object),
            });
      }
      else{
          return JSON.stringify({
                ...error
          });
      }
    }
  }

  @Get('all')
  findAll() {
    try{
      return this.employeesService.findAll();
    }catch(error){
      console.log("ERROR: ", error.message);
      if(error instanceof HttpException){
        return JSON.stringify({
              ...((<HttpException> error).getResponse() as Object),
            });
      }
      else{
          return JSON.stringify({
                ...error
          });
      }
    }
  }

  @Get()
  findOne(@Body() requestedEmployee: Prisma.EmployeeUpdateInput) {
    try{
      return this.employeesService.findOne(`${requestedEmployee.username}`);
    }catch(error){
      console.log("ERROR: ", error.message);
      if(error instanceof HttpException){
        return JSON.stringify({
              ...((<HttpException> error).getResponse() as Object),
            });
      }
      else{
          return JSON.stringify({
                ...error
          });
      }
    }
  }

  @Get(':userRole')
  findOneByRole(@Param('userRole') userRole: USER_ROLE){
    try{
      return this.employeesService.findAll(userRole);
    }catch(error){
      console.log("ERROR: ", error.message);
      if(error instanceof HttpException){
        return JSON.stringify({
              ...((<HttpException> error).getResponse() as Object),
            });
      }
      else{
          return JSON.stringify({
                ...error
          });
      }
    }
  }
  @Patch(':username')
  update(@Param('username') username: string, @Body() updatedEmployeeDto: Prisma.EmployeeUpdateInput) {
    try{
      return this.employeesService.update(username, updatedEmployeeDto);
    }catch(error){
      console.log("ERROR: ", error.message);
      if(error instanceof HttpException){
        return JSON.stringify({
              ...((<HttpException> error).getResponse() as Object),
            });
      }
      else{
          return JSON.stringify({
                ...error
          });
      }
    }
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    try{
      return this.employeesService.remove(username);
    }catch(error){
      console.log("ERROR: ", error.message);
      if(error instanceof HttpException){
        return JSON.stringify({
              ...((<HttpException> error).getResponse() as Object),
            });
      }
      else{
          return JSON.stringify({
                ...error
          });
      }
    }
  }
}
