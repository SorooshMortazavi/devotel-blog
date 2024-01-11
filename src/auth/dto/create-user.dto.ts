import { UserRoles } from "src/common/constants/UserRoles";

export class CreateUserDto {
    
    email:string;

    role:UserRoles

    firebaseUid:string
}