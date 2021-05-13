import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { userDto } from 'src/userDto';

@Controller('registration')
export class RegistrationController {

    constructor(private readonly regService: RegistrationService) {}

    @Get()
    printHello() : string{
        return this.regService.getHello()
    }

    @Post()
    saveUser(@Body() newUser: userDto){
        this.regService.saveNewUser(newUser);
    }


}
