import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.getHotelOptions(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    console.log(error);
    if (error.name === "RequestError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  try {
    const hotelRooms = await hotelsService.getRoomOptions(Number(hotelId));
    return res.status(httpStatus.OK).send(hotelRooms);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
