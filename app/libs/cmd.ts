import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers'
import data from "../../package.json";

export class Cmd extends EventTarget {
    cmd: Argv;
    name: string;
    description: string;
    eventsMap = new Map<string, CustomEvent | boolean >();

    constructor (name: string, description: string) {
        super();
        this.name = name
        this.description = description;

        const opts = hideBin(process.argv);
        this.cmd = yargs(opts)
        this.cmd.scriptName(this.name);  
        this.cmd.version(data.version)
        this.cmd.help()
        this.cmd.alias('h', 'help')

        this.eventsMap.set("help", true);
        this.eventsMap.set("h", true);
    }

    setCommandHandler (key: string, description: string, eventName: string, callback = () => {}) {
        if (this.eventsMap.has(eventName)) throw new Error(`Event name ${eventName} is already registered`);
        if (this.eventsMap.has(key)) throw new Error(`Event key ${key} is already registered`);

        const that = this;
        const customEvent = new CustomEvent(eventName);
        const cmdSpecidicArgsBuilder = () => {};

        this.eventsMap.set(eventName, customEvent);
        this.eventsMap.set(key, customEvent);
        this.cmd.command(key, description, cmdSpecidicArgsBuilder, () => {
            that.dispatchEvent(customEvent);
            callback();
        });
    }

    setDefaultHandler (callback = () => {}) {
        this.setCommandHandler('$0', this.description, 'default', callback);
    }

    run () {
        this.cmd.parse();
    }
}