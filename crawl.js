const { JSDOM } = require('jsdom')


function normalizeURL(urlString) {
    // Takes a url in string format as input.
    // Returns the host name of a url string concatenated with its non-empty path.
    const url = new URL(urlString)
    const hostName = url.hostname
    let path = url.pathname

    if (path[path.length-1] === '/') {
        path = path.slice(0, -1)
    }

    return `${hostName}${path}`
}


function getURLsFromHTML(htmlBody, baseURL) {
    // Takes a HTML document and a url string as inputs.
    // Returns an array containing all the webpage links found on the HTML document.
    // Relative links are converted to absolute links through the `baseURL` argument
    const dom = new JSDOM(htmlBody)
    const urlStrings = dom.window.document.querySelectorAll('a')
    const arr = []
    for (const urlString of urlStrings) {
        url = new URL(urlString, baseURL)
        arr.push(url.href)
    }

    return arr
}


async function crawlPage(baseURL, currentURL, pages) {
    /* A recursive function that crawls each internal link found on baseURl  
    webpage and keeps count of how many times each link has been seen.
    / Takes the baseURL: string (site to begin crawling from),
    currentURL: string (current site to crawl) and pages: object literal as inputs.
    / Returns the pages object, a key-value pair showing each internal link 
    along with the number of times each link has been seen whilst crawling.
    */
    const baseURLObj = new URL(baseURL)
    const currentURLOBj = new URL(currentURL)
    
    if (pages == {} && (baseURLObj.protocol !== 'http:' && baseURLObj.protocol !== 'https:')) {
        console.error(`"${baseURL}" does not point to a webpage!.`)
        return pages
    }
    if (currentURLOBj.hostname !== baseURLObj.hostname) {
        // if currentURL is an external link, do not crawl it.
        return pages
    }
    
    const normalized = normalizeURL(currentURL)
    if (pages[normalized] > 0) {
        pages[normalized]++
        return pages
    }

    if (currentURL === baseURL){
        pages[normalized] = 0
      } else {
        pages[normalized] = 1
      }
    
    console.log(`Crawling "${currentURL}"...`)
    let response = null
    try {
        response = await fetch(currentURL)
    } catch (error) {
        console.error(`An error occured: ${error.message}`)
        return pages
    }
    if (response.status > 399){
        console.error(`Something went wrong, Error code: ${response.status} -- ${response.statusText}`)
        return pages
    }
    if (!response.headers.get('Content-Type').includes('text/html')) {
        console.error(`"${currentURL}" is NOT a webpage!.`)
        return pages
    }

    let htmlBody = null
    try {
        htmlBody = await response.text()
    } catch(error) {
        console.error(`An error occured: ${error.message}`)
        return pages
    }
    const URLsOnPage = getURLsFromHTML(htmlBody, baseURL)
    // Crawl each link, if it is an internal link, found on the webpage at `currentURL`.
    for (const url of URLsOnPage) {
        pages = await crawlPage(baseURL, url, pages)
    }

    return pages
}


async function logWEbPagesURLS(url) {
    // Logs every link found on the webpage at url: string along with its HTML body.
    // THIS FUNCTION IS USED FOR TESTING PURPOSES ONLY!.
    const urlObj = new URL(url)
    const baseURL = urlObj.origin
    const response = await fetch(url)
    const htmlBody = await response.text()
    const urls = getURLsFromHTML(htmlBody, baseURL)
    for (const url of urls) {
        console.log(url)
    }
    console.log(`\n\n\n${htmlBody}`)
    
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
    logWEbPagesURLS
}