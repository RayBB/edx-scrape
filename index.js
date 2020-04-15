/*
edX course scraper
For the latest updates visit: https://github.com/RayBB/edx-scrape
*/


async function loadScript(url, funToCheck) {
    function moduleLoaded(){return eval(`typeof ${funToCheck}`) != "undefined"}
    if (!moduleLoaded()){
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.head.appendChild(script);
    }
    return new Promise(resolve => {
        function checkForScriptLoad(){
            moduleLoaded() ? resolve() : setTimeout(checkForScriptLoad, 1000);
            console.log("waiting for " + funToCheck)
        }
        checkForScriptLoad() 
    });
}

async function downloadPages(progressLinks, limit=Number.MAX_VALUE) {

    var zip = new JSZip();
    const pages = zip.folder("pages");
    for (let i = 0; i < progressLinks.length; i++){
        console.log(`downloading page ${i} of ${progressLinks.length}`)
        const response = await fetch(progressLinks[i])
        const text = await response.text()
        pages.file(`page${String(i).padStart(progressLinks.length.toString().length, '0')}.html`, text)
        if (i == limit) break;
    }
    const courseTitle = document.querySelector(".course-name").innerText.replace(/[^0-9a-zA-Z]+/g, "_");
    zip.generateAsync({ type: "blob" })
    .then(function (content) {
        saveAs(content, `${courseTitle}.zip`);
    });
}

function findLinksOnPage(){
    const progressElement = document.querySelector("#course-info-progress");
    if (progressElement == null){
        throw "course progress element not found, please make sure you're on the course page."
    }
    const progressLinks = Array.from(progressElement.querySelectorAll('a')).map((a) => { return a.href });
    return progressLinks;
}

async function main(){
    // Loads the two libraries needed by this sccript
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.3.0/jszip.min.js', "JSZip");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js", "saveAs")

    // Finds all the links
    const links = findLinksOnPage()
    // Downloads content at links
    downloadPages(links)
}

main()