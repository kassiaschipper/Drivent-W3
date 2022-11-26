import { notFoundError, requestError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketService from "../tickets-service";

async function getHotelOptions(userId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
 
  if(ticket.status !== "PAID") {
    throw requestError(402, "paymentRequired");
  } 
  if(!ticket) { 
    throw notFoundError();
  }
  if(!ticket.TicketType.includesHotel) {
    throw notFoundError();
  } 
  if(ticket.TicketType.isRemote) {
    throw notFoundError();
  } 
    
  const hotels = await hotelRepository.findManyHotels();
  if(!hotels) {
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
