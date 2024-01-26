import { renderArticle } from "@/commands";
import { expect, test, describe, spyOn, beforeEach, Mock, mock, afterAll, afterEach } from "bun:test";
import * as hn from "@/utils/hn";
import * as article from "@/utils/article";

let spyGetCalculatedBestStory: Mock<() => Promise<{ title: string; url: string; time: number; }>>;
let spyExtractMarkdown: Mock<(url: string) => Promise<string>>

describe('commands', () => {
    afterEach(() => {
        mock.restore();
    });

    beforeEach(() => {
        spyGetCalculatedBestStory = spyOn(hn, 'getCalculatedBestStory');
        spyExtractMarkdown = spyOn(article, 'extractMarkdown');
        global.console.log = mock(() => {});
    });

    describe('renderArticle', () => {
        test('render an article from hackernews as markdown', async () => {
            await renderArticle();
            expect(spyGetCalculatedBestStory).toHaveBeenCalled();
            expect(spyExtractMarkdown).toHaveBeenCalled();
            expect(global.console.log).toHaveBeenCalled();
        });
    });
});