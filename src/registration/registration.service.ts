import { Injectable } from '@nestjs/common';
import { IUsers } from './interface/users_interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {

    //instancia modelu, aby som vedel pristupit k databaze
    // create model to add object to database
    constructor(@InjectModel('User') private readonly userModel:Model<IUsers>) {}

    getHello()
    {
        return this.userModel.find().exec();
    }

    public async saveNewUser(email: string, hash:string)
    {
        //this must be same as model, to be added to database
        var person = {
            name:email,
            passwordHash:hash
        }
   
        
        const user = await new this.userModel(person);
        return user.save();
    }

    public async login(email: string, password: string): Promise<boolean>
    {
        const user = await this.userModel.findOne({name: email}).exec();
        
        if(!await bcrypt.compare(password, (await user).passwordHash)){
            throw new Error('No user');
        }
        else{
            return true;
        }
        
}
}
