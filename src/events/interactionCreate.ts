import { Event } from "../structures";
import { Collection, Snowflake } from "discord.js";
import prettyMilliseconds from "pretty-ms";

const cooldowns = new Collection<string, Collection<Snowflake, number>>();

export default new Event("interactionCreate", (client, interaction) => {
    if (interaction.isCommand()) {
        let cmd = client.commands.get(interaction.commandName) ?? client.subcommands.get(interaction.commandName);
        if (!cmd) return;
        if (cmd.guildOnly && !interaction.inGuild()) {
            return interaction.reply({ content: `You can only use ${cmd.name} in guilds` });
        }

        let { user } = interaction;

        const timestamps = cooldowns.get(cmd.name);
        let cooldownAmount = (cmd.cooldown || 3) * 1000;
        const now = Date.now();

        if (timestamps!.has(user.id)) {
            const expirationTime = timestamps!.get(user.id)! + cooldownAmount;

            if (now < expirationTime) {
                const remaining = prettyMilliseconds(expirationTime - now);

                return interaction.reply({
                    content: `Please wait \`${remaining}\` before using ${cmd.name} again`,
                    ephemeral: true
                });
            }

        }

        timestamps!.set(user.id, now);
        setTimeout(() => timestamps!.delete(user.id), cooldownAmount);

        return cmd.callback({ client, interaction, user });
    }
});