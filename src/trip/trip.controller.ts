import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TripService } from './trip.service';
import { GetUser } from 'src/auth/decorator';
import { CreateTripDto, UpdateTripDto } from './dto';

@UseGuards(JwtGuard)
@Controller('trips')
export class TripController {
  constructor(private tripService: TripService) {}

  @Get()
  getTrips(@GetUser('id') userId: number) {
    return this.tripService.getTrips(userId);
  }

  @Post()
  createTrip(@GetUser('id') userId: number, @Body() dto: CreateTripDto) {
    return this.tripService.createTrip(userId, dto);
  }

  @Get(':tripId')
  getTrip(
    @GetUser('id') userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
  ) {
    return this.tripService.getTripById(userId, tripId);
  }

  @Put(':tripId')
  updateTrip(
    @GetUser('id') userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() dto: UpdateTripDto,
  ) {
    return this.tripService.updateTrip(userId, tripId, dto);
  }

  @Delete(':tripId')
  removeTrip(
    @GetUser('id') userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
  ) {
    return this.tripService.removeTrip(userId, tripId);
  }
}
