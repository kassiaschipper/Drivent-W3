import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";

async function getHotelOptions() {
  const hotels = await hotelRepository.findManyHotels();

  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

async function getRoomOptions(hotelId: number) {
  const hotels = await hotelRepository.findFirstHotel(hotelId);

  if (!hotels) {
    throw notFoundError();
  }
  const rooms = await hotelRepository.findHotelAndRoomsByHotelId(hotelId);
  if(!rooms) {
    throw notFoundError();
  }

  return rooms;
}

const hotelsService = {
  getHotelOptions, 
  getRoomOptions,
};

export default hotelsService;
