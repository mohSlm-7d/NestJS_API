import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

type Gender = 'Male' | 'Female';
export enum USER_ROLE {
    INTERN_SOFTWARE_DEVELOPER = "Intern Software Developer",
    SOFTWARE_DEVELOPER = "Software Developer",
    SENIOR_SOFTWARE_DEVELOPER = "Senior Software Developer",
    MANAGER = "Manager",
    SENIOR_MANAGER = "Senior Manager",
    DIRECTOR = "Director",
    SENIOR_DIRECTOR = "Senior Director",
    EXECUTIVE_DIRECTOR = "Executive Director",
    VICE_PRESIDENT = "VP - Vice President",
    GENERAL_MANAGER = "GM - General Manager",
};

// Best practice:
export class CreateUserDto{
    
    @IsNumber()
    _id?: number | undefined;
    
    @IsAlphanumeric()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    userName: string;
    
    @IsEmail()
    userEmail: string;
    
    @IsEnum(['Male', 'Female'])
    userGender: Gender;
    
    @IsEnum(USER_ROLE)
    userRole: string;
}


// My Code below:
// export class CreateUserDto{
//     @IsNumber()
//     private id?: number | undefined;
    
//     @IsAlphanumeric()
//     @IsNotEmpty()
//     private _username: string;
    
//     @IsString()
//     @IsNotEmpty()
//     private _userName: string;
    
//     @IsEmail()
//     private _userEmail: string;
    
//     @IsEnum(['Male', 'Female'])
//     private _userGender: Gender;
    
//     @IsEnum(USER_ROLE)
//     private _userRole: string;


//     public get _id(){
//         return this.id;
//     }
//     set _id(value: number){
//         this.id = value;
//     }

//     public get username(): string{
//         return this._username;
//     }
//     set username(value: string){
//         this._username = value;
//     }

//     public get userName(): string{
//         return this._userName;
//     }
//     set userName(value: string){
//         this._userName = value;
//     }

//     public get userEmail(): string{
//         return this._userEmail;
//     }
//     set userEmail(value: string){
//         this._userEmail = value;
//     }

//     public get userGender(): Gender{
//         return this._userGender;
//     }
//     set userGender(value: Gender){
//         this._userGender = value;
//     }


//     public get userRole(): string{
//         return this._userRole;
//     }
//     set userRole(value: string){
//         this._userRole = value;
//     }
// };