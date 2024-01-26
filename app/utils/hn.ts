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