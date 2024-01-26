import { IElement, IHTMLCollection, Window } from 'happy-dom';
import { NodeHtmlMarkdown } from 'node-html-markdown'
import DOMPurify from "isomorphic-dompurify";

const fetchConfig = {
    headers: {
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "text/html; charset=utf-8"
    },
};

export function getLargestContent(htmlCollection: IHTMLCollection<IElement>) {
    if (htmlCollection.length === 1) return getLargestContent(htmlCollection[0].children);

    return Array
        .from(htmlCollection)
        .filter(el => el.tagName !== "SCRIPT" && el.tagName !== "IFRAME")
        .sort((a, b) => (b.textContent || '').length - (a.textContent || '').length)[0];
}

export function parse (htmlString: string) {
    const window = new Window({ url: 'https://foo.bar' });    
    window.document.write(htmlString);

    return window.document;
}

export function removeTagsThatRequireZlib (htmlString: string) {
    return parse(DOMPurify.sanitize(htmlString, { FORBID_TAGS: ['br', 'footer'] }));
}

export async function extractMarkdown (url: string) {
    const response = await fetch(url, fetchConfig);
    console.log(url)

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const htmlString = await response.text();
    const doc = removeTagsThatRequireZlib(htmlString);

    let largestContent = getLargestContent(doc.body.children);

    let cleanContent = DOMPurify.sanitize(largestContent.innerHTML, {USE_PROFILES: {html: true}, FORBID_TAGS: ['img', 'FOOTER', 'footer'], ADD_TAGS: ['pre']});
    cleanContent = DOMPurify.sanitize(cleanContent, { FORBID_TAGS: ['img', 'FOOTER', 'footer'] });

    return NodeHtmlMarkdown.translate(cleanContent);
}