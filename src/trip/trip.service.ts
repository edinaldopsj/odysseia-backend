import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTripDto, UpdateTripDto } from './dto';

@Injectable()
export class TripService {
  constructor(private prismaService: PrismaService) {}

  async getTrips(userId: number) {
    return this.prismaService.trip.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getTripById(userId: number, tripId: number) {
    return this.prismaService.trip.findFirst({
      where: {
        id: tripId,
        userId: userId,
      },
    });
  }

  async createTrip(userId: number, dto: CreateTripDto) {
    return this.prismaService.trip.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async updateTrip(userId: number, tripId: number, dto: UpdateTripDto) {
    return this.prismaService.trip.update({
      where: {
        id: tripId,
        userId: userId,
      },
      data: dto,
    });
  }

  async removeTrip(userId: number, tripId: number) {
    return this.prismaService.trip.delete({
      where: {
        id: tripId,
        userId: userId,
      },
    });
  }
}
