import { prisma } from "@/config";

async function findManyHotels() {
  return prisma.hotel.findMany();
}

async function findFirstHotel(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
  });
}

async function findHotelAndRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findMany({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findManyHotels,
  findFirstHotel,
  findHotelAndRoomsByHotelId,
};

export default hotelRepository;
