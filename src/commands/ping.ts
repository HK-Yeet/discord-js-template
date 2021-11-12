import { Command } from "../structures";

export default new Command({
    name: "ping",
    description: "Pong!",
    category: "misc",
    callback: ({client, interaction}) => {
        interaction.reply(`this doesn't mean a lot: \`${client.ws.ping}\``);
    }
})