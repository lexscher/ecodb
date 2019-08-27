// create and export scraper class
module.exports = class ScraperSetup {
  constructor(url) {
    this.url = url;
    // split the url on each '.'
    this.splitUrl = url.split('.');
  }

  // error handler
  handleError = error => {
    console.log("Something went wrong: ");
    console.error(error.stack);
  };
};
