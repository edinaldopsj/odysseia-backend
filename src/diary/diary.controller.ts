import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { DiaryService } from './diary.service';
import { CreateDiaryDto, UpdateDiaryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('diary')
@UseGuards(JwtGuard)
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Get(':tripId')
  getDiaries(@Param('tripId', ParseIntPipe) tripId: number) {
    return this.diaryService.getDiaries(tripId);
  }

  @Get(':tripId/:diaryId')
  getDiaryById(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('diaryId', ParseIntPipe) diaryId: number,
  ) {
    return this.diaryService.getDiaryById(tripId, diaryId);
  }

  @Post(':tripId')
  createDiary(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() body: CreateDiaryDto,
  ) {
    return this.diaryService.createDiaryEntry(tripId, body);
  }

  @Put(':tripId/:diaryId')
  updateDiary(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('diaryId', ParseIntPipe) diaryId: number,
    @Body() body: UpdateDiaryDto,
  ) {
    return this.diaryService.updateDiaryEntry(tripId, diaryId, body);
  }

  @Patch(':tripId/:diaryId')
  @UseInterceptors(FileInterceptor('file'))
  updateDiaryImage(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('diaryId', ParseIntPipe) diaryId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.diaryService.updateDiaryImage(tripId, diaryId, file);
  }

  @Delete(':tripId/:diaryId')
  deleteDiary(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('diaryId', ParseIntPipe) diaryId: number,
  ) {
    return this.diaryService.deleteDiaryEntry(tripId, diaryId);
  }
}
