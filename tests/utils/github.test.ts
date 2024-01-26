import { getRepoReadme } from "@/utils/github";
import { expect, test, describe, mock, afterEach, beforeEach } from "bun:test";
import { mockFetch } from "../helpers";

describe('hn', () => {
    describe('getCurrentBestStory', () => {
        beforeEach(() => {
            mockFetch({
                "https://raw.githubusercontent.com/HackerNews/API/main/README.md": `foobar`
            });
        });
        afterEach(() => {
            mock.restore();           
        });

        test('should return the readme content of the github repo', async () => {
            await getRepoReadme('https://github.com/HackerNews/API');
            expect(global.fetch).toHaveBeenCalledWith("https://raw.githubusercontent.com/HackerNews/API/main/README.md");
        });
    });
});