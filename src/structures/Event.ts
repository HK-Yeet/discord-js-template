import { ClientEvents } from "discord.js";
import { CustomClient } from "./CustomClient";

export class Event<Key extends keyof ClientEvents> {
    constructor(
        public name: Key,
        public run: (client: CustomClient, ...args: ClientEvents[Key]) => any
    ) {}
}