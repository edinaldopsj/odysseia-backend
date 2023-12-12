import { Controller, UseGuards } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('cloudinary')
@UseGuards(JwtGuard)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
}
