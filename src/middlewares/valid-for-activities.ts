import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './authentication-middleware';
import ticketService from '@/services/tickets-service';
import { forBiddenError } from '@/errors/forbidden-error';

export async function validForActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (ticket.status != 'PAID' || ticket.TicketType.isRemote) throw forBiddenError();
    next();
  } catch (error) {
    next(error);
  }
}
