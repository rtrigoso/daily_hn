import { getCurrentBestStory } from "@/utils/hn";
import { expect, test, describe, mock, afterEach, beforeEach } from "bun:test";
import { mockFetch } from "../helpers";

const mockStoryResponse = {
    "by" : "dhouston",
    "descendants" : 71,
    "id" : 8863,
    "kids" : [ 9224, 8917, 8884, 8887, 8952, 8869, 8873, 8958, 8940, 8908, 9005, 9671, 9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8870, 8878, 8980, 8934, 8943, 8876 ],
    "score" : 104,
    "time" : 1175714200,
    "title" : "My YC app: Dropbox - Throw away your USB drive",
    "type" : "story",
    "url" : "http://www.getdropbox.com/u/2/screencast.html"
};

global.Date.prototype.getUTCHours = mock(() => 1),

describe('hn', () => {
    describe('getCurrentBestStory', () => {
        beforeEach(() => {
            mockFetch({
                'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty': '[39070871,39071169,39058428]',
                "https://hacker-news.firebaseio.com/v0/item/39071169.json?print=pretty": JSON.stringify(mockStoryResponse)
            });
        });
        afterEach(() => {
            mock.restore();           
        });

        test('should parse the hn best stories', async () => {
            await getCurrentBestStory();
            expect(global.fetch).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", expect.any(Object));
        });

        test('should pick the article to use by using the current hour', async () => {
            await getCurrentBestStory();
            expect(global.fetch).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/item/39071169.json?print=pretty", expect.any(Object));
        });

        test('should return the title, date, and link to article', async () => {
            const res = await getCurrentBestStory();
            expect(res).toEqual({
                title: mockStoryResponse.title,
                url: mockStoryResponse.url,
                time: mockStoryResponse.time
            })
        })
    });
});