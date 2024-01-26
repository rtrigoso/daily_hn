import { parse } from "./article";

const fetchConfig = {
    headers: {
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json"
    },
};

type Story = {
    title: string,
    url: string,
    time: number
}

export async function getCurrentBestStory () {
    const topStoriesURL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    let response = await fetch(topStoriesURL, fetchConfig);
    const topstories = await response.json() as Array<number>;

    const today = new Date();
    const storyId = topstories[today.getDay()];
    const storyURL = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;
    response = await fetch(storyURL, fetchConfig)
    const item = await response.json();
    const { title, url, time } = item as Story;

    return {
        title,
        url,
        time
    }
}

export async function getCalculatedBestStory () {
    const topStoriesURL = 'http://hn.elijames.org/';
    let response = await fetch(topStoriesURL, { ...fetchConfig, headers: {
        ...fetchConfig.headers,
        'Content-Type': "text/html; charset=utf-8"
    }});
    const htmlString = await response.text();
    const doc = parse(htmlString);
    const linkTag = doc.querySelector('.row .active a') as unknown as HTMLAnchorElement;

    return {
        url: linkTag?.href || '',
        title: linkTag?.textContent || '',
        time: 0
    }
}