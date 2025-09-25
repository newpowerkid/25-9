import { Elysia, t } from "elysia";
import { authMacro } from "../auth";
import { createKid, updateKid, createUserKid } from "./models";
import { Kids } from "./service";
import { kidSSE } from "../../utils/sse";

export const kidRouter = new Elysia()
  .use(authMacro)
  .get("/kids", () => Kids.getAllKids())
  .get("/kids/user", ({ user }) => Kids.getUserKids(user.id), { auth: true })
  .get("/kids/sse", ({ user, set }) => {
    return kidSSE.createSSEResponse(user.id);
  }, { auth: true })
  .post("/kids", async ({ body, status, user }) => {
    const newKid = await Kids.createKid(body);
    
    // Broadcast to all SSE connections
    const kids = await Kids.getAllKids();
    kidSSE.broadcastToUser(user.id, { type: "kids_updated", kids });
    
    return status("OK");
  }, { auth: true, body: createKid })
  .post("/kids/user", async ({ body, status, user }) => {
    await Kids.createUserKid(user.id, body);
    
    // Broadcast to all SSE connections
    const userKids = await Kids.getUserKids(user.id);
    kidSSE.broadcastToUser(user.id, { type: "user_kids_updated", userKids });
    
    return status("OK");
  }, { auth: true, body: createUserKid })
  .patch("/kids/:id", async ({ body, params, status, user }) => {
    const kid = await Kids.getKid(params.id);
    if (!kid) {
      return status("Not Found");
    }
    
    if (!body) {
      return status("OK");
    }
    
    await Kids.updateKid(params.id, body);
    
    // Broadcast to all SSE connections
    const kids = await Kids.getAllKids();
    kidSSE.broadcastToUser(user.id, { type: "kids_updated", kids });
    
    return status("OK");
  }, { auth: true, body: updateKid, params: t.Object({ id: t.String() }) })
  .delete("/kids/:id", async ({ params, status, user }) => {
    const kid = await Kids.getKid(params.id);
    if (!kid) {
      return status("Not Found");
    }
    
    await Kids.deleteKid(params.id);
    
    // Broadcast to all SSE connections
    const kids = await Kids.getAllKids();
    kidSSE.broadcastToUser(user.id, { type: "kids_updated", kids });
    
    return status("OK");
  }, { auth: true, params: t.Object({ id: t.String() }) })
  .delete("/kids/user/:kidId", async ({ params, status, user }) => {
    await Kids.deleteUserKid(user.id, params.kidId);
    
    // Broadcast to all SSE connections
    const userKids = await Kids.getUserKids(user.id);
    kidSSE.broadcastToUser(user.id, { type: "user_kids_updated", userKids });
    
    return status("OK");
  }, { auth: true, params: t.Object({ kidId: t.String() }) });