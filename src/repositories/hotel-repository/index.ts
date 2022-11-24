import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function findManyHotels() {
  return prisma.hotel.findMany();
}

async function findFirstHotel(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
  });
}

async function findHotelAndRoomsByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: { hotelId },
    include: {
      Hotel: true,
    },
  });
}

const hotelRepository = {
  findManyHotels,
  findFirstHotel,
  findHotelAndRoomsByHotelId,
};

export default hotelRepository;
