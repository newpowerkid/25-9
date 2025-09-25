import { Elysia, t } from "elysia";
import { authMacro } from "../auth";
import { createBanner, updateBanner } from "./models";
import { Banners } from "./service";
import { bannerSSE } from "../../utils/sse";

export const bannerRouter = new Elysia()
    .use(authMacro)
    .get("/banners", () => Banners.getAllBanners())
    .get("/banners/sse", ({ user, set }) => {
        return bannerSSE.createSSEResponse(user.id);
    }, { auth: true })
    .post("/banners", async ({ body, status, user }) => {
        const newBanner = await Banners.createBanner(body);

        // Broadcast to all SSE connections
        const banners = await Banners.getAllBanners();
        bannerSSE.broadcastToUser(user.id, { type: "banners_updated", banners });

        return status("OK");
    }, { auth: true, body: createBanner })
    .patch("/banners/:id", async ({ body, params, status, user }) => {
        const banner = await Banners.getBanner(params.id);
        if (!banner) {
            return status("Not Found");
        }

        if (!body) {
            return status("OK");
        }

        await Banners.updateBanner(params.id, body);

        // Broadcast to all SSE connections
        const banners = await Banners.getAllBanners();
        bannerSSE.broadcastToUser(user.id, { type: "banners_updated", banners });

        return status("OK");
    }, { auth: true, body: updateBanner, params: t.Object({ id: t.String() }) })
    .delete("/banners/:id", async ({ params, status, user }) => {
        const banner = await Banners.getBanner(params.id);
        if (!banner) {
            return status("Not Found");
        }

        await Banners.deleteBanner(params.id);

        // Broadcast to all SSE connections
        const banners = await Banners.getAllBanners();
        bannerSSE.broadcastToUser(user.id, { type: "banners_updated", banners });

        return status("OK");
    }, { auth: true, params: t.Object({ id: t.String() }) });