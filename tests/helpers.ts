import { mock } from "bun:test";

export function mockFetch (resMap: { [key: string]: string; } = {}) {
    global.fetch = mock((url) => new Promise((callback: (value: Response) => void) => {
        setTimeout(() => {
            callback(new Response(resMap[url]));
        }, 100 * 3 );
    }));
}