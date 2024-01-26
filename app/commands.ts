import { getCalculatedBestStory } from "@/utils/hn";
import { extractMarkdown } from "@/utils/article";
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal'
import { getRepoReadme } from "@/utils/github";

export async function renderArticle () {
    const hnItem = await getCalculatedBestStory();

    let { url } = hnItem;
    let mdContent;
    if (hnItem.url.includes('github.com')) {
        mdContent = await getRepoReadme(hnItem.url);
    } else {
        mdContent = await extractMarkdown(url);
    }

    
    marked.use(markedTerminal());  
    console.log(marked.parse(mdContent));
    process.stdin.resume();
}