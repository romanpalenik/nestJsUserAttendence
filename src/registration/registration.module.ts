import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { UserSchema } from './schema/users_schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ 
    MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema,
    }
  ]), JwtModule.register({
    secret : 'secret', 
    signOptions : {expiresIn: '1d'}
  })
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService]
})
export class RegistrationModule {}
