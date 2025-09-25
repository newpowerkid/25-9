import { Elysia, t } from "elysia";
import { authMacro } from "../auth";
import { createBooking, updateBooking } from "./models";
import { Bookings } from "./service";
import { bookingSSE } from "../../utils/sse";

export const bookingRouter = new Elysia()
  .use(authMacro)
  .get("/bookings", () => Bookings.getAllBookings())
  .get("/bookings/kid/:kidId", ({ params }) => Bookings.getBookingsByKid(params.kidId), {
    params: t.Object({ kidId: t.String() })
  })
  .get("/bookings/sse", ({ user, set }) => {
    return bookingSSE.createSSEResponse(user.id);
  }, { auth: true })
  .post("/bookings", async ({ body, status, user }) => {
    const newBooking = await Bookings.createBooking(body);
    
    // Broadcast to all SSE connections
    const bookings = await Bookings.getAllBookings();
    bookingSSE.broadcastToUser(user.id, { type: "bookings_updated", bookings });
    
    return status("OK");
  }, { auth: true, body: createBooking })
  .patch("/bookings/:id", async ({ body, params, status, user }) => {
    const booking = await Bookings.getBooking(params.id);
    if (!booking) {
      return status("Not Found");
    }
    
    if (!body) {
      return status("OK");
    }
    
    await Bookings.updateBooking(params.id, body);
    
    // Broadcast to all SSE connections
    const bookings = await Bookings.getAllBookings();
    bookingSSE.broadcastToUser(user.id, { type: "bookings_updated", bookings });
    
    return status("OK");
  }, { auth: true, body: updateBooking, params: t.Object({ id: t.String() }) })
  .delete("/bookings/:id", async ({ params, status, user }) => {
    const booking = await Bookings.getBooking(params.id);
    if (!booking) {
      return status("Not Found");
    }
    
    await Bookings.deleteBooking(params.id);
    
    // Broadcast to all SSE connections
    const bookings = await Bookings.getAllBookings();
    bookingSSE.broadcastToUser(user.id, { type: "bookings_updated", bookings });
    
    return status("OK");
  }, { auth: true, params: t.Object({ id: t.String() }) });