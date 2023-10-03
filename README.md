# Web_Crawler
A CLI tool for crawling the web.
This tool takes a website URL string, `base_url` (the site to start crawling from) as input and neatly prints each internal link, including `base_url`, along with the number of times each link had been seen by the crawler to the console upon successful completion of crawling.

It recursively crawls any internal link (sites with the same domain name as `base_url`) it finds. It ignores any external link (else we crawl the entire internet) and non-HTML documents.

This tool can be used to ensure that your website is SEO friendly in that if the tool crawls your site without errors, then search engines should have no problem crawling and indexing your site.
Note that there might be non-human errors such as loss of network connectivity. Any errors that occur are caught and logged to the console in plain english.

To run this tool, simply clone this repository and run `npm start base_url` in your terminal, where `base_url` is the URL of the site to start crawling from. Node v18.7.0 was used to build this tool.