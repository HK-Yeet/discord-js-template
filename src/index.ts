import path from "path";
import { CustomClient } from "./structures";
import { log } from "./utils";

import "dotenv/config";

(async () => {
    const client = new CustomClient({ intents: [] });

    log("Loading Commands", "info");
    await client.loadCommands(path.join(__dirname, "commands"));
    log("Loading Events", "info");
    await client.loadEvents(path.join(__dirname, "events"));

    await client.login(process.env.TOKEN);

})();