const axios = require('axios')
const cheerio = require('cheerio')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function fetchHTML(url) {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error('Error fetching the URL:', error)
    }
}

function extractContent(html, selector) {
    const $ = cheerio.load(html)
    const selectedElement = $(selector).first()
    return selectedElement.text().trim()
}

rl.question('Enter URL: ', async (url) => {
    rl.question('Enter CSS selector: ', async (selector) => {
        try {
            const html = await fetchHTML(url)
            const content = extractContent(html, selector)
            console.log('Text Content:', content)
        } catch (error) {
            console.error(error.message);
        } finally {
            rl.close()
        }
    })
})