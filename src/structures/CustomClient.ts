import {Client, ClientEvents, ClientOptions, Collection} from "discord.js"
import {existsSync, lstatSync, readdirSync} from "fs"
import { join, sep } from "path"
import { CommandType } from "../types"
import { log } from "../utils"
import { Event } from "./Event"

export class CustomClient extends Client {
    commands: Collection<string, CommandType>
    subcommands: Collection<string, CommandType>
    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.subcommands = new Collection()
    }

    async loadCommands(path: string) {
        if(existsSync(path)){            
            const files = readdirSync(path)
            for(const file of files){
                const stat = lstatSync(join(path, file));
                if(stat.isDirectory()){
                    await this.loadCommands(join(path, file))
                } else if(file.endsWith(".js") || file.endsWith(".ts") && !file.endsWith(".d.ts")){
                    const command: CommandType = (await import(`${path}/${file}`)).default;
                    if (!command.category) command.category = path.split(sep).pop();
                    if(command.subcommand){
                        this.subcommands.set(command.name, command);
                        let mainCommand = this.commands.get(command.subcommand);
                        if(mainCommand){
                            if(!mainCommand.options) mainCommand.options = [];
                            mainCommand.options.push({
                                name: command.name,
                                description: command.description,
                                type: "SUB_COMMAND"
                            });
                        }
                    }
                    this.commands.set(command.name, command)
                }
            }
        } else {
            log(`${path} does not exist`, "error")
        }
    }

    async loadEvents(path: string) {
        if(existsSync(path)){            
            const files = readdirSync(path)
            for(const file of files){
                const stat = lstatSync(join(path, file));
                if(stat.isDirectory()){
                    await this.loadEvents(join(path, file))
                } else if(file.endsWith(".js") || file.endsWith(".ts") && !file.endsWith(".d.ts")){
                    const event: Event<keyof ClientEvents> = (await import(`${path}/${file}`)).default;
                    super.on(event.name, (...args) => event.run(this, ...args))
                }
            }
        } else {
            log(`${path} does not exist`, "error")
        }
    }
}