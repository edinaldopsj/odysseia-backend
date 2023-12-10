import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiaryDto, UpdateDiaryDto } from './dto';

@Injectable()
export class DiaryService {
  constructor(private prismaService: PrismaService) {}

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

  async deleteDiaryEntry(tripId: number, diaryId: number) {
    return this.prismaService.diary.delete({
      where: {
        id: diaryId,
        tripId,
      },
    });
  }
}
