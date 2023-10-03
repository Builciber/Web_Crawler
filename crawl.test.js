const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


const testNormalizeURl = (unNormalizedURL, expectedOutput) => {
    const inner = () => {
        expect(normalizeURL(unNormalizedURL)).toBe(expectedOutput)
    }

    return inner
}

const testGetURLsFromHTML = (HTML, baseURL, expectedOutput) => {
    const inner = () => {
        expect(getURLsFromHTML(HTML, baseURL)).toStrictEqual(expectedOutput)
    }

    return inner
}

test('normalizeURL test 1', testNormalizeURl('https://blog.boot.dev/path/', 'blog.boot.dev/path'))
test('normalizeURL test 2', testNormalizeURl('https://blog.boot.dev/path', 'blog.boot.dev/path'))
test('normalizeURL test 3', testNormalizeURl('http://blog.boot.dev/', 'blog.boot.dev'))


test('getURLsFromHTML test 1', testGetURLsFromHTML(`<html>
<body>
    <a href="/jobs/what-does-webdev-earn/"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev/education/learn-to-code-the-slow-way/">
</body>
</html>`, 'https://blog.boot.dev', ['https://blog.boot.dev/jobs/what-does-webdev-earn/', 'https://blog.boot.dev/education/learn-to-code-the-slow-way/']))

test('getURLsFromHTML test 2', testGetURLsFromHTML(`<html>
<body>
    <a href="/jobs/what-does-webdev-earn/"><span>Go to Boot.dev</span></a>
    <a href="/education/learn-to-code-the-slow-way/">
</body>
</html>`, 'https://blog.boot.dev', ['https://blog.boot.dev/jobs/what-does-webdev-earn/', 'https://blog.boot.dev/education/learn-to-code-the-slow-way/']))