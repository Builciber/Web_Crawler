const { argv } = require('node:process')
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


async function main() {
    const arguments = argv
    if (arguments.length !== 3) {
        console.error(`Supplied ${arguments.length - 2} CLI arguments, expected 1 CLI argument.`)
        return
    } else {
        const baseURL = arguments[2]

        try {
            const url = new URL(baseURL)
            console.log('Initiating the crawling process...\n\n\n')
            const pages = await crawlPage(baseURL, baseURL, {})
            printReport(pages)
        } catch (error) {
            if (error.message === 'invalid url') {
                console.error(`Cannot parse "${string}" as URL, please supply a valid website url!.`)
            } else {
                console.error(`An error occured: ${error.message}`)
            }
            
        }
    }
}


main()