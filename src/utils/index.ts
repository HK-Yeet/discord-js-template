import moment from "moment";
import chalk from "chalk";

type logType = "info" | "warn" | "error" | "ready";

export function log(content: string, type: logType = "info") {
    const timestamp = `[${moment().format("MM-DD-YYYY hh:mm:ss")}]`;
    switch (type) {
        case "info":
            return console.log(`${chalk.grey(timestamp)} [${chalk.blue(type.toUpperCase())}] ${content}`);
        case "warn":
            return console.log(`${chalk.grey(timestamp)} [${chalk.yellow(type.toUpperCase())}] ${content}`);
        case "error":
            return console.log(`${chalk.grey(timestamp)} [${chalk.red(type.toUpperCase())}] ${content}`);
        case "ready":
            return console.log(`${chalk.grey(timestamp)} [${chalk.green(type.toUpperCase())}] ${content}`);

    }
}

export function trimArray(arr: string[], maxLen = 10) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} more...`);
    }
    return arr;
}
