import {  CommandInteraction, ApplicationCommandData, ApplicationCommandOptionData, User } from "discord.js";
import { CustomClient } from "./structures";

export type CommandCallback = (context: {
    user: User;
    client: CustomClient;
    interaction: CommandInteraction;
}) => unknown;

export type CommandType = {
    callback: CommandCallback;
    category?: string;
    subcommand?: string;
    options?: ApplicationCommandOptionData[];
    description: string;
    guildOnly?: boolean;
    cooldown?: number;
} & ApplicationCommandData;