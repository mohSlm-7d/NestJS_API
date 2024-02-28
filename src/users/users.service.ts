import { Injectable } from '@nestjs/common';
import { encryptText } from 'src/utils/bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: Map<string, CreateUserDto>;
  private static _id: number = 1;
  constructor() {
    this.users = new Map<string, CreateUserDto>();
  }

  static get userId(): number {
    return UsersService._id;
  }

  static set userId(val: number) {
    UsersService._id++;
  }
  generateOTP(name: string): string {
    let encryptedText: string = '';
    encryptText(name).then((returnedText) => {
      console.log('RETURNED TEXT: ', returnedText);
      encryptedText = returnedText;
      console.log('encryptedText: ', encryptedText);
    });

    let key: string = '';
    for (let charCounter = 0; charCounter < 6; charCounter++) {
      let choice: number = Math.random() * 10;
      choice =
        choice - parseInt(`${choice}`) >= 0.5
          ? parseInt(`${choice}`) + 1
          : parseInt(`${choice}`);

      choice = choice % 2 === 0 ? 1 : 2;
      key =
        choice === 1
          ? key + parseInt(`${Math.random() * 9}`)
          : Math.random() >= 0.5
            ? key + String.fromCharCode(parseInt(`${Math.random() * 26}`) + 65)
            : key + String.fromCharCode(parseInt(`${Math.random() * 26}`) + 97);
      // console.log(`charCounter`, charCounter, choice, key);
    }
    return `Dear ${name}, <br/><br> 
            your OTP key is ${key}. <br><br>
            ${encryptedText}`;
  }

  getUserByUsername(username: string) {
    const foundUser: CreateUserDto = this.users.get(username);
    if (foundUser) {
      return foundUser;
    }

    throw new NotFoundException('User not found!');
  }
  getUsersByUserGender(userGender: 'Male' | 'Female') {
    const users: CreateUserDto[] = [...this.users.entries()]
    .map(entry => entry[1]);
    
    return users.filter((user) => user.userGender === userGender);
  }

  getAllUsers() {
    const allUsers: Object[] = [];
    this.users.forEach((user) => allUsers.push(user));
    return allUsers;
  }

  registerUser(newUser: CreateUserDto) {
    if (this.users.has(newUser.username)) {
      throw new BadRequestException('The user is already registered!');
    }

    // newUser = { ...newUser, _id: UsersService._id++};
    newUser._id = UsersService._id++;

    this.users.set(newUser.username, newUser);
    return true;
  }

  updateUserbyId(username: string, updatedUser: UpdateUserDto) {
    const foundUser: CreateUserDto = this.users.get(username);
    if (foundUser) {
      this.users.set(username, <CreateUserDto>{ ...foundUser, ...updatedUser });
      return true;
    }

    throw new NotFoundException('The user does not exist!');
  }

  deleteUserByUsername(username: string) {
    if (this.users.has(username)) {
      this.users.delete(username);
      return true;
    }

    throw new NotFoundException('the user does not exist!');
  }
}
