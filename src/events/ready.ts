import { Event } from "../structures";
import { log } from "../utils";

export default new Event("ready", (client) => {
    log(`Logged in as ${client.user!.tag}`, "ready");
})