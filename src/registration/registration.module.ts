import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { UserSchema } from './schema/users_schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([
    {
      name: 'Users',
      schema: UserSchema,
    }
  ])
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService]
})
export class RegistrationModule {}
