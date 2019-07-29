# gatsby-plugin-sri

[![Travis](https://img.shields.io/travis/com/ovhemert/gatsby-plugin-sri.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/gatsby-plugin-sri)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/gatsby-plugin-sri.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/gatsby-plugin-sri)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3216215565884e7d9f4d5f298a0288a8)](https://www.codacy.com/app/ovhemert/gatsby-plugin-sri?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ovhemert/gatsby-plugin-sri&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/npm/gatsby-plugin-sri/badge.svg)](https://snyk.io/test/npm/gatsby-plugin-sri)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/gatsby-plugin-sri.svg)](https://greenkeeper.io/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

A Gatsby plugin to add Subresource Integrity (SRI) to your generated script tags.

```html
<script src="/webpack-runtime-cde5506958f1afc4d89e.js"></script>
```
becomes
```html
<script src="/webpack-runtime-cde5506958f1afc4d89e.js" integrity="sha512-uxm8lZAnmLGO3hMOyYy7HFgEGJgDdXwZR+Pdyt2f3AKbgVZ706v9YyI4t9veKTirqfdLGvPVDsDkHEWmWsECRA=="></script>
```

## Installation

With npm:

```bash
npm install --save gatsby-plugin-sri
```

Or with Yarn:

```bash
yarn add gatsby-plugin-sri
```

## Usage

In your `gatsby-config.js` file add:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-sri',
      options: {
        hash: 'sha512', // 'sha256', 'sha384' or 'sha512' ('sha512' = default)
        crossorigin: true // Optional
      }
    }
  ]
}
```

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=github)](https://github.com/ovhemert)
[![Web](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=nextdoor)](https://ovhemert.dev)

## Contributing

If you would like to help out with some code, check the [details](./docs/CONTRIBUTING.md).

Not a coder, but still want to support? Have a look at the options available to [donate](https://ovhemert.dev/donate).

## Sponsors

[![BrowserStack](./docs/assets/browserstack-logo.svg)](https://www.browserstack.com/)

## License

Licensed under [MIT](./LICENSE).

_NOTE: This plugin only generates output when run in `production` mode! To test your generated tags, run: `gatsby build && gatsby serve`_
