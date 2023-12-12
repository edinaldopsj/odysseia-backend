import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiaryDto, UpdateDiaryDto } from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class DiaryService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getDiaries(tripId: number) {
    return this.prismaService.diary.findMany({
      where: {
        tripId,
      },
    });
  }

  async getDiaryById(tripId: number, diaryId: number) {
    return this.prismaService.diary.findFirst({
      where: {
        id: diaryId,
        tripId,
      },
    });
  }

  async createDiaryEntry(tripId: number, dto: CreateDiaryDto) {
    return this.prismaService.diary.create({
      data: {
        ...dto,
        tripId,
      },
    });
  }

  async updateDiaryEntry(tripId: number, diaryId: number, dto: UpdateDiaryDto) {
    {
      return this.prismaService.diary.update({
        where: {
          id: diaryId,
          tripId,
        },
        data: dto,
      });
    }
  }

  async updateDiaryImage(
    tripId: number,
    diaryId: number,
    file: Express.Multer.File,
  ) {
    const image = await this.cloudinaryService.uploadFile(file);

    if (!image.secure_url || !image.public_id) {
      throw new NotFoundException('Unable to upload image to cloudinary');
    }

    return this.prismaService.diary.update({
      where: {
        id: diaryId,
        tripId,
      },
      data: {
        imgUrl: image.secure_url,
      },
    });
  }

  async deleteDiaryEntry(tripId: number, diaryId: number) {
    return this.prismaService.diary.delete({
      where: {
        id: diaryId,
        tripId,
      },
    });
  }
}
