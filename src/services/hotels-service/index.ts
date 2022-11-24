import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";

async function getHotelOptions() {
  const hotels = await hotelRepository.findManyHotels();

  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

const hotelsService = {
  getHotelOptions, 
};

export default hotelsService;
