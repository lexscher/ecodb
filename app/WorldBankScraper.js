// Our file adapter
const FileAdapter = require('./FileAdapter');
// Parent class
const ScraperSetup = require('./ScraperSetup');
// Dependency
const puppeteer = require('puppeteer');

module.exports = class WorldBankScraper extends ScraperSetup {
  constructor(url, splitUrl) {
    super(url, splitUrl);
    // get the domain name to name the file
    this.domain = this.splitUrl[1].includes('/')
      ? this.splitUrl[0]
      : this.splitUrl[1];
  }

  // Get countries, and turn that data into json
  getJson = async () => {
    try {
      // create browser instance
      const browser = await puppeteer.launch();
      // create a new page within the browser
      const page = await browser.newPage();
      // go to our url
      await page.goto(this.url);
      // parse through our page
      const countries = await page.evaluate(() => {
        const countriesTable = document.querySelector('#scrollTable tbody')
          .children;
        const countriesArr = [...countriesTable];

        /* helper methods */
        // country name:
        let getName = country => {
          return country.querySelector('a').innerText;
        };
        // country ISO alpha-3 code:
        let getAlpha3 = country => {
          let code = country
          // find the spacer
            .querySelector('.spacer')
            // split the inner HTML that Looks like: "<a data-customlink="nl:body" data-text="Metadata:Afghanistan" href="javascript:void(0)" class="metaLink" onclick="loadMetaData('AFG', 'C' ,'Country',  'Afghanistan')">Afghanistan</a>"
            .innerHTML.split("'")
            // find the alpha3 code
            .find(str => str.length === 3);
            // return our code
          return code;
        };
        // rural population: { 2000: val, 2016: val }
        let getRuralPop = country => {
          // Get the containers for the rural population data
          let [valOfYear2000, year2016] = [
            country.children[1].innerText,
            country.children[2].innerText
          ];
          // turn into an array
          let ruralPopulation = [
            {
              "year" : 2000,
              "percentage": valOfYear2000
            },
            {
              "year" : 2016,
              "percentage": year2016
            }
          ];
          // return the rural population
          return ruralPopulation;
        };
        // rural population growth (Annual %):  "2.4%"
        let getRuralPopGrowth = country => {
          // get the population growth rate from the most recent year they have available.
          let latestYear = country.children[3].innerText;
          // return the string
          return latestYear + '%';
        };
        // Land Area:  "652.9" <~ sq. km thousands
        let getLandArea = country => {
          // get the land area
          let landArea = country.children[4].innerText;
          // return the string
          return landArea + ' sq. km thousands';
        };
        // forest Area: { 2000: "2.1%", 2016: "2.1%" } <~ % of land area
        let getForestArea = country => {
          // Get the containers for the rural population data
          let [valOfYear2000, valOfYear2016] = [
            country.children[5].innerText,
            country.children[6].innerText
          ];
          // make object
          let forestArea = [
            {
              "year" : 2000,
              "percentage": valOfYear2000
            },
            {
              "year" : 2016,
              "percentage": valOfYear2016
            }
          ];
          // return information
          return forestArea;
        };
        // permanent cropland: { 2000: "0.1%", 2016: "0.3%" } <~ % of land area
        let getPermanentCropland = country => {
          // Get the containers for the rural population data
          let [valOfYear2000, valOfYear2016] = [
            country.children[7].innerText,
            country.children[8].innerText
          ];
          // make object
          let permanentCropland = [
            {
              "year" : 2000,
              "percentage": valOfYear2000
            },
            {
              "year" : 2016,
              "percentage": valOfYear2016
            }
          ];
          // return information
          return permanentCropland;
        };
        // arable land: { 2000: "11.8%", 2016: "11.8%" } <~ % of land area
        let getArableLand = country => {
          // Get the containers for the rural population data
          let [valOfYear2000, valOfYear2016] = [
            country.children[9].innerText,
            country.children[10].innerText
          ];
          // make object
          let arableLand = [
            {
              "year" : 2000,
              "percentage": valOfYear2000
            },
            {
              "year" : 2016,
              "percentage": valOfYear2016
            }
          ]

          // return information
          return arableLand;
        };
        // hectares per person: { 2000: "0.38", 2016: "0.22" } <~ hectares per person
        let getHectaresPerPerson = country => {
          // Get the containers for the rural population data
          let [valOfYear2000, valOfYear2016] = [
            country.children[11].innerText,
            country.children[12].innerText
          ];
          // make object
          let hectaresPerPerson = [
            {
              "year" : 2000,
              "percentage": valOfYear2000
            },
            {
              "year" : 2016,
              "percentage": valOfYear2016
            }
          ];
          // return information
          return hectaresPerPerson;
        };
        /* end of helper methods */

        let countriesData = [];

        for (const country of countriesArr) {
          // Items for our final object
          let [
            id,
            name,
            alpha3,
            ruralPopulation,
            ruralPopulationGrowth,
            landArea,
            forestArea,
            permanentCropland,
            arableLand,
            hectaresPerPerson
          ] = [
            countriesArr.indexOf(country),
            getName(country),
            getAlpha3(country),
            getRuralPop(country),
            getRuralPopGrowth(country),
            getLandArea(country),
            getForestArea(country),
            getPermanentCropland(country),
            getArableLand(country),
            getHectaresPerPerson(country)
          ];
          // shape our data
          let countryObj = {
            id,
            "Name": name,
            "Alpha-3": alpha3,
            "Rural Population": ruralPopulation,
            "Rural Population Growth": ruralPopulationGrowth,
            "Land Area": landArea,
            "Forest Area": forestArea,
            "Permanent Cropland": permanentCropland,
            "Arable Land": arableLand,
            "Hectares Per Person": hectaresPerPerson
          };
          // push object into array
          countriesData.push(countryObj);
        }
        return countriesData;
      });
      // close the browser
      await browser.close();
      // return the countries
      return countries;
    } catch (err) {
      this.handleError(err);
    }
  };

  // create the json file using the get json method
  makeJson = async () => {
    // use the getJson method
    await this.getJson().then(countries => {
      try {
        // count how many files are in our json folder
        const pageNumber = FileAdapter.getFileCountInFolder('./json');
        // create a new file path
        const path = `./json/${this.domain}-${pageNumber}.json`
        // stringify the json
        const jsonStr = JSON.stringify(countries, null, 2);
        // write the new file with our json
       FileAdapter.createNewFileInFolder(path, jsonStr)
        } catch (err) {
          // error handling
          this.handleError(err)
        }
    })
  }
};
