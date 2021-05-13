import { Injectable } from '@nestjs/common';
import { IUsers } from './interface/users_interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDto } from 'src/userDto';

@Injectable()
export class RegistrationService {

    //instancia modelu, aby som vedel pristupit k databaze
    constructor(@InjectModel('User') private readonly userModel:Model<IUsers>) {}

    getHello()
    {
        return 'Hello';
    }

    saveNewUser(newUser: userDto)
    {
        const user = new this.userModel(newUser);
        return user.save();
    }
}
