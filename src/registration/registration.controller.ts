import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';


@Controller('registration')
export class RegistrationController {

    constructor(private readonly regService: RegistrationService,
        private jwtService: JwtService) {}

    @Get()
    printHello(){
        return this.regService.getHello()
    }

    @Post()
    public async saveUser(
        @Body('name') email: string,
        @Body('password') password:string,
        @Body() newUser){

        const passwdhash = await bcrypt.hash(password,12);

        
        return this.regService.saveNewUser(email, passwdhash);
        
    }

    @Get('login')
    public async checkUser(
        @Body('name') email: string,
        @Body('password') password:string,
        @Res({passthrough: true}) response: Response
    )
    {
        
        if( this.regService.login(email, password))
        {

            const jwt = await this.jwtService.signAsync({id: email});
    
            response.cookie('jwt', jwt, {httpOnly: true}); 
            return {
                message: 'success'
            }
        }
        
       
    }

    @Get('user')
    async authenticate(
        @Req() request: Request) {

        const cookie = request.cookies['jwt'];

        const date = await this.jwtService.verifyAsync(cookie);

        return cookie;
    }

    @Post('logout')
    async logout( @Res({passthrough: true}) response: Response)
    {
        response.clearCookie('jwt');

        return {message: 'logout'}
    }

 }
