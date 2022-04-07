//import { fireEvent, getByText } from ''
require("@testing-library/jest-dom/extend-expect");
const domEvents = require("@testing-library/dom");
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { number } = require("yargs");
const api = "http://covid19.mathdro.id/api/countries";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let container;
const { JSDOM } = jsdom;
describe("popup.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });
  it('renders a heading element', () => {
    expect(container.querySelector('h1')).not.toBeNull()
    expect(domEvents.getByText(container, 'Enter a country name to get more information')).toBeInTheDocument()
  })
  it('renders a input element', () => {
    expect(container.querySelector('input')).not.toBeNull()
  })
async function testCovid(coun){
    const response = await axios.get(`${api}/${coun}`);
    console.log(response.data.confirmed.value)

    return response.data.confirmed.value
}

describe('search for covid cases', () => {
    test('should return the total no of cases',async () => {
      expect( await testCovid("india") ).toBe( 43029839)
    })
  })

})