import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/registation_data'),
    RegistrationModule],
})
export class AppModule {}
