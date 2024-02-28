/* eslint-disable prettier/prettier */
import { Body, Controller,
    Delete, Get, Param, Patch, Post, Query,
    ParseEnumPipe, ValidationPipe,
    HttpException
     } from '@nestjs/common';
import { UsersService } from './users.service';
// import { response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user/')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get("generate/otp")
    generateOTP(@Query('name') name: string): string{
        try{
            return this.userService.generateOTP(name);
        }catch(error){
            console.log(`ERROR: `, error.message);
            return JSON.stringify({
                status: 500,
                mssg: error.message,
        });
        }
    }

    @Post("generate/otp/:name")
    generateOTPJSON(@Param('name') name: string, @Body() requestBody): string{
        try{
            console.log(requestBody, typeof requestBody);
            return JSON.stringify({
                status: 200,
                verificationCode: this.userService.generateOTP(requestBody.name),
            });
        }catch(error){
            console.log(`ERROR: `, error.message);
            return JSON.stringify({
                    status: 500,
                    mssg: error.message,
            });
        }
    }




    @Get('fetch/:userGender')
    getUsersByGender(@Param('userGender', new ParseEnumPipe(['Male', 'Female'])) userGender){
        try{
            return JSON.stringify({
                status: 200,
                user: this.userService.getUsersByUserGender(userGender),
            });
        }catch(error){
            console.log(`ERROR: `, error.message);
            
            if(error instanceof HttpException){
                return JSON.stringify({
                    ...((<HttpException>error).getResponse() as Object),
                })
            }
            else{
                return JSON.stringify({
                    status: 500,
                    mssg: error.message,
                });
            }
        }
    }

    
    @Get('fetch')
    getAllUsers(){
        try{
            return JSON.stringify({
                status: 200,
                users: this.userService.getAllUsers(),
            });
        }catch(error){
            console.log(`ERROR: `, error.message);

            if(error instanceof HttpException){
                return JSON.stringify({
                    ...(((<HttpException> error).getResponse()) as Object),
                })
            }
            else{
                return JSON.stringify({
                        status: 500,
                        mssg: error.message,
                });
            }
        }
    }

    @Post('fetch')
    getUserByUsername(@Body(ValidationPipe) requestBody: UpdateUserDto){
        try{
            const foundUser: CreateUserDto = this.userService.getUserByUsername(requestBody.username);
            return JSON.stringify({
                status: 200,
                user: foundUser,
            })
        }catch(error){
            console.log(`ERROR: `, error.message);

            if(error instanceof HttpException){
                return JSON.stringify({
                    ...((<HttpException>error).getResponse() as Object),
                });
            }
            else{
                return JSON.stringify({
                    statusCode: 500,
                    mssg: error.message,
                });
            }
        }
    }



    @Post('register')
    registerUser(@Body(ValidationPipe) newUser: CreateUserDto){
        try{
            this.userService.registerUser(newUser);
            
            // response.status(userCreated ? 201 : 400);
            return JSON.stringify({
                status: 201,
                mssg: "User registered successfully!",
            });
        }catch(error){
            console.log(`ERROR: `, error.message);
            
            if(error instanceof HttpException){
                return JSON.stringify({
                    ...((<HttpException> error).getResponse() as Object),
                })
            }
            else{
                return JSON.stringify({
                    statusCode: error.statusCode ? error.statusCode : 500,
                    mssg: error.message,
                });
            }
        }
    }


    @Patch('update/:username')
    // updateUser(@Param('username') username: string, @Body() requestBody: Partial<CreateUser>){
    updateUser(@Param('username') username: string, @Body(ValidationPipe) updatedUser: UpdateUserDto){
        try{
            let userUpdated = this.userService.updateUserbyId(username, updatedUser);
            
            // response.status(userUpdated ? 200 : 400);
            return JSON.stringify({
                status: userUpdated ? 200 : 400,
                mssg: userUpdated ? "User updated successfully!" : "Something went wrong!",
            });
        }catch(error){
            console.log(`ERROR: `, error.message);
            
            if(error instanceof HttpException){
                return JSON.stringify({
                    ...((<HttpException> error).getResponse() as Object),
                })
            }
            else{
                return JSON.stringify({
                    status: 500,
                    mssg: error.message,
                });
            }
        }
    }


    @Delete("delete/:username")
    deleteUser(@Param('username') username){
        try{
            let userDeleted = this.userService.deleteUserByUsername(username);
            
            // response.status(userDeleted ? 200 : 400);
            return JSON.stringify({
                status: userDeleted ? 200 : 400,
                mssg: userDeleted ? "User deleted successfully!" : "The user does not exist!",
            });
        }catch(error){
            console.log(`ERROR: `, error.message);

            if(error instanceof HttpException){
                return JSON.stringify({
                    ...((<HttpException> error).getResponse() as Object),
                })
            }
            else{
                return JSON.stringify({
                    status: 500,
                    mssg: error.message,
                });
            }
        }
    }
}
