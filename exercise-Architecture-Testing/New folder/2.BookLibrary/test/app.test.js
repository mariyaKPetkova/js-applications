const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;
const clientURL = 'http://127.0.0.1:5500/02.BookLibrary/';

function fakeResponse(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

const testServerMessages = {
    1: {
        author: 'Sarah Willow',
        title: 'The Wild Nature'
    },
    2: {
        author: 'David Monete',
        title: 'Shadows'
    }
}

describe('End to end tests', () => {
    before(async () => {
        // browser = await chromium.launch();
        browser = await chromium.launch({ headless: false, slowMo: 500 });
    });

    after(async () => {
        browser = await browser.close();
    });

    beforeEach(
    )


})