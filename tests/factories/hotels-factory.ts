import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotelRegister() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomslRegister(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.random.alphaNumeric(2),
      capacity: Number(faker.random.numeric(1)),
      hotelId: hotelId,      
    }
  });
}
