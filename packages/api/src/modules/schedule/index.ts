import { Elysia, t } from "elysia";
import { authMacro } from "../auth";
import { createSchedule, updateSchedule } from "./models";
import { Schedules } from "./service";
import { scheduleSSE } from "../../utils/sse";

export const scheduleRouter = new Elysia()
  .use(authMacro)
  .get("/schedules", () => Schedules.getAllSchedules())
  .get("/schedules/sse", ({ user, set }) => {
    return scheduleSSE.createSSEResponse(user.id);
  }, { auth: true })
  .post("/schedules", async ({ body, status, user }) => {
    const newSchedule = await Schedules.createSchedule(body);
    
    // Broadcast to all SSE connections
    const schedules = await Schedules.getAllSchedules();
    scheduleSSE.broadcastToUser(user.id, { type: "schedules_updated", schedules });
    
    return status("OK");
  }, { auth: true, body: createSchedule })
  .patch("/schedules/:id", async ({ body, params, status, user }) => {
    const schedule = await Schedules.getSchedule(params.id);
    if (!schedule) {
      return status("Not Found");
    }
    
    if (!body) {
      return status("OK");
    }
    
    await Schedules.updateSchedule(params.id, body);
    
    // Broadcast to all SSE connections
    const schedules = await Schedules.getAllSchedules();
    scheduleSSE.broadcastToUser(user.id, { type: "schedules_updated", schedules });
    
    return status("OK");
  }, { auth: true, body: updateSchedule, params: t.Object({ id: t.String() }) })
  .delete("/schedules/:id", async ({ params, status, user }) => {
    const schedule = await Schedules.getSchedule(params.id);
    if (!schedule) {
      return status("Not Found");
    }
    
    await Schedules.deleteSchedule(params.id);
    
    // Broadcast to all SSE connections
    const schedules = await Schedules.getAllSchedules();
    scheduleSSE.broadcastToUser(user.id, { type: "schedules_updated", schedules });
    
    return status("OK");
  }, { auth: true, params: t.Object({ id: t.String() }) });