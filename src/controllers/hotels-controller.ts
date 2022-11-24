import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  console.log(userId);
  
  try {
    const enrollmentByUserId = await enrollmentsService.getOneWithAddressByUserId(userId);
    if(!enrollmentByUserId ) res.sendStatus(httpStatus.BAD_REQUEST); //verifico se existe usuário cadastrado
    
    const findTicketByUserId = await ticketService.getTicketByUserId(userId); //no service procura o ticket por enrollmentId
    if (!findTicketByUserId) res.sendStatus(httpStatus.BAD_REQUEST);
    
    const isTicketPaid = findTicketByUserId.status;
    const isHoltelIncluded = findTicketByUserId.TicketType.includesHotel;
    const isEventRemote = findTicketByUserId.TicketType.isRemote;

    if(isTicketPaid === "RESERVED") res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    if (isEventRemote === true || isHoltelIncluded === false) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } 
    
    const hotels = await hotelsService.getHotelOptions();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

