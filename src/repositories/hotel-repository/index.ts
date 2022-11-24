import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function findManyHotels() {
  return prisma.hotel.findMany();
}

const hotelRepository = {
  findManyHotels, 
};

export default hotelRepository;
