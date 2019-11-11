# The EcoDB

I created an api using the data from [World Bank](http://wdi.worldbank.org).

Technologies:

- NodeJS
- Express
- Puppeteer

Deployed on [Heroku](https://www.heroku.com).

You can check it out [here](https://ecodb.herokuapp.com/).

Endpoints:

- GET All Countries

`"https://ecodb.herokuapp.com/api/v1/countries"`

- GET One Country

`"https://ecodb.herokuapp.com/api/v1/countries/:id"`

The JSON data is an array of objects, where
each item looks like this:

```JSON
{
    "id": 34,
    "Name": "Canada",
    "Alpha-3": "CAN",
    "Rural Population": [
      {
        "year": 2000,
        "percentage": "21"
      },
      {
        "year": 2016,
        "percentage": "19"
      }
    ],
    "Rural Population Growth": "1.0%",
    "Land Area": "9,093.5 sq. km thousands",
    "Forest Area": [
      {
        "year": 2000,
        "percentage": "38.2"
      },
      {
        "year": 2016,
        "percentage": "38.2"
      }
    ],
    "Permanent Cropland": [
      {
        "year": 2000,
        "percentage": "0.7"
      },
      {
        "year": 2016,
        "percentage": "0.5"
      }
    ],
    "Arable Land": [
      {
        "year": 2000,
        "percentage": "5.0"
      },
      {
        "year": 2016,
        "percentage": "4.8"
      }
    ],
    "Hectares Per Person": [
      {
        "year": 2000,
        "percentage": "1.49"
      },
      {
        "year": 2016,
        "percentage": "1.21"
      }
    ]
  }
```
