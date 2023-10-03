const { sortPages } = require('./report_utils.js')

function printReport(pages) {
    // Takes the pages object obtained after crawling successfuly completes and neatly logs the results to stdout.
    console.log('\n\n\nPreparing crawl results for presentation...\n')
    const sortedPages = sortPages(pages)
    for (const count of sortedPages.keys()) {
        let urls = sortedPages.get(count)
        for (const url of urls) {
            console.log(`Found ${count} internal links to ${url}`)
        }
    }
}

module.exports = {
    printReport
}