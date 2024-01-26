export async function getRepoReadme(repoUrl: string) {
    let url = repoUrl.replace('https://github.com', `https://raw.githubusercontent.com`) + '/main/README.md';
    let response;
    try {
        response = await fetch(url);
    }
    catch (err) {
        url = url.replace('/main/README.md', '/master/README.md');
        response = await fetch(url);
    }
    
    return response.text();
}