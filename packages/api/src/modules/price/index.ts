import { Elysia, t } from "elysia";
import { authMacro } from "../auth";
import { createPrice, updatePrice } from "./models";
import { Prices } from "./service";
import { priceSSE } from "../../utils/sse";

export const priceRouter = new Elysia()
  .use(authMacro)
  .get("/prices", () => Prices.getAllPrices())
  .get("/prices/sse", ({ user, set }) => {
    return priceSSE.createSSEResponse(user.id);
  }, { auth: true })
  .post("/prices", async ({ body, status, user }) => {
    const newPrice = await Prices.createPrice(body);
    
    // Broadcast to all SSE connections
    const prices = await Prices.getAllPrices();
    priceSSE.broadcastToUser(user.id, { type: "prices_updated", prices });
    
    return status("OK");
  }, { auth: true, body: createPrice })
  .patch("/prices/:id", async ({ body, params, status, user }) => {
    const price = await Prices.getPrice(params.id);
    if (!price) {
      return status("Not Found");
    }
    
    if (!body) {
      return status("OK");
    }
    
    await Prices.updatePrice(params.id, body);
    
    // Broadcast to all SSE connections
    const prices = await Prices.getAllPrices();
    priceSSE.broadcastToUser(user.id, { type: "prices_updated", prices });
    
    return status("OK");
  }, { auth: true, body: updatePrice, params: t.Object({ id: t.String() }) })
  .delete("/prices/:id", async ({ params, status, user }) => {
    const price = await Prices.getPrice(params.id);
    if (!price) {
      return status("Not Found");
    }
    
    await Prices.deletePrice(params.id);
    
    // Broadcast to all SSE connections
    const prices = await Prices.getAllPrices();
    priceSSE.broadcastToUser(user.id, { type: "prices_updated", prices });
    
    return status("OK");
  }, { auth: true, params: t.Object({ id: t.String() }) });