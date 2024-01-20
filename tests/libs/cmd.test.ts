import { hideBin } from 'yargs/helpers'
import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";
import { Cmd } from '@/libs/cmd';

const yargsHelperMocks = () => ({
    hideBin: mock(() => {}),
});

const yargsMock = () => ({
    default: mock(() => ({
        scriptName: mock(() => ({})),
        alias: mock(() => ({})),
        help: mock(() => ({})),
        parse: mock(() => ({})),
        version: mock(() => ({})),
        command: mock(() => ({}))
    })),
})

describe("cmd", () => {
    let cmdHandler: Cmd;

    beforeEach(() => {
        mock.module('yargs/helpers', yargsHelperMocks);
        mock.module('yargs', yargsMock);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('constructor', () => {
        beforeEach(() => {
            cmdHandler = new Cmd('foobar', 'foobar');
        });

        test('sets the command name', () => {
            expect(cmdHandler.name).toBe('foobar');
        });

        test("calls hideBin on arguments passed to strip cmd name and exc", () => {
            cmdHandler.run();
            expect(hideBin).toHaveBeenCalledWith(process.argv);
        });
    });

    describe('setCommandHandler', () => {
        beforeEach(() => {
            cmdHandler = new Cmd('foobar', 'foobar');
        });

        test('should throw error if event has already been registered to the handler', () => {
            expect(() => {
                cmdHandler.setCommandHandler('h', 'this key should already be registered', 'foobar');
            }).toThrow();

            expect(() => {
                cmdHandler.setCommandHandler('x', 'this event name should already be registered', 'help');
            }).toThrow();
        });

        test('should register all new events', () => {
            cmdHandler.setCommandHandler('x', 'dummy command', 'foobar');
            expect(cmdHandler.eventsMap.has('x')).toBe(true);
            expect(cmdHandler.eventsMap.has('foobar')).toBe(true);
        });
    });

    describe('setDefaultHandler', () => {
        beforeEach(() => {
            cmdHandler = new Cmd('foobar', 'foobar');
        });

        test('should register a command for key $0, the default event', () => {
            cmdHandler.setDefaultHandler();
            expect(cmdHandler.eventsMap.has('$0')).toBe(true);
            expect(cmdHandler.eventsMap.has('default')).toBe(true);
        });
    })
});