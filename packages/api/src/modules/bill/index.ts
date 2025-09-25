import { Elysia, t } from "elysia";
import { authMacro } from "../auth";
import { createBill, updateBill, createBillPrice, createBillBooking } from "./models";
import { Bills } from "./service";
import { billSSE } from "../../utils/sse";

export const billRouter = new Elysia()
  .use(authMacro)
  .get("/bills", () => Bills.getAllBills())
  .get("/bills/kid/:kidId", ({ params }) => Bills.getBillsByKid(params.kidId), {
    params: t.Object({ kidId: t.String() })
  })
  .get("/bills/:id/prices", ({ params }) => Bills.getBillPrices(params.id), {
    params: t.Object({ id: t.String() })
  })
  .get("/bills/:id/bookings", ({ params }) => Bills.getBillBookings(params.id), {
    params: t.Object({ id: t.String() })
  })
  .get("/bills/sse", ({ user, set }) => {
    return billSSE.createSSEResponse(user.id);
  }, { auth: true })
  .post("/bills", async ({ body, status, user }) => {
    const newBill = await Bills.createBill(body);
    
    // Broadcast to all SSE connections
    const bills = await Bills.getAllBills();
    billSSE.broadcastToUser(user.id, { type: "bills_updated", bills });
    
    return status("OK");
  }, { auth: true, body: createBill })
  .post("/bills/:id/prices", async ({ body, params, status, user }) => {
    await Bills.createBillPrice({ ...body, billId: params.id });
    
    // Broadcast to all SSE connections
    const billPrices = await Bills.getBillPrices(params.id);
    billSSE.broadcastToUser(user.id, { type: "bill_prices_updated", billPrices, billId: params.id });
    
    return status("OK");
  }, { 
    auth: true, 
    body: t.Omit(createBillPrice, ['billId']), 
    params: t.Object({ id: t.String() }) 
  })
  .post("/bills/:id/bookings", async ({ body, params, status, user }) => {
    await Bills.createBillBooking({ ...body, billId: params.id });
    
    // Broadcast to all SSE connections
    const billBookings = await Bills.getBillBookings(params.id);
    billSSE.broadcastToUser(user.id, { type: "bill_bookings_updated", billBookings, billId: params.id });
    
    return status("OK");
  }, { 
    auth: true, 
    body: t.Omit(createBillBooking, ['billId']), 
    params: t.Object({ id: t.String() }) 
  })
  .patch("/bills/:id", async ({ body, params, status, user }) => {
    const bill = await Bills.getBill(params.id);
    if (!bill) {
      return status("Not Found");
    }
    
    if (!body) {
      return status("OK");
    }
    
    await Bills.updateBill(params.id, body);
    
    // Broadcast to all SSE connections
    const bills = await Bills.getAllBills();
    billSSE.broadcastToUser(user.id, { type: "bills_updated", bills });
    
    return status("OK");
  }, { auth: true, body: updateBill, params: t.Object({ id: t.String() }) })
  .delete("/bills/:id", async ({ params, status, user }) => {
    const bill = await Bills.getBill(params.id);
    if (!bill) {
      return status("Not Found");
    }
    
    await Bills.deleteBill(params.id);
    
    // Broadcast to all SSE connections
    const bills = await Bills.getAllBills();
    billSSE.broadcastToUser(user.id, { type: "bills_updated", bills });
    
    return status("OK");
  }, { auth: true, params: t.Object({ id: t.String() }) })
  .delete("/bills/prices/:priceId", async ({ params, status, user }) => {
    await Bills.deleteBillPrice(params.priceId);
    
    // Broadcast to all SSE connections - you might want to get the billId first
    billSSE.broadcastToUser(user.id, { type: "bill_price_deleted", priceId: params.priceId });
    
    return status("OK");
  }, { auth: true, params: t.Object({ priceId: t.String() }) })
  .delete("/bills/bookings/:bookingId", async ({ params, status, user }) => {
    await Bills.deleteBillBooking(params.bookingId);
    
    // Broadcast to all SSE connections
    billSSE.broadcastToUser(user.id, { type: "bill_booking_deleted", bookingId: params.bookingId });
    
    return status("OK");
  }, { auth: true, params: t.Object({ bookingId: t.String() }) });