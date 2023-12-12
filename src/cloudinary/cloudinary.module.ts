import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';

@Global()
@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  controllers: [CloudinaryController],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class CloudinaryModule {}
