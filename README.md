# gatsby-plugin-sri

A Gatsby plugin to add Subresource Integrity (SRI) to your generated script tags.

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
    }
  ]
}
```

_NOTE: This plugin only generates output when run in `production` mode! To test your sitemap, run: `gatsby build && gatsby serve`_
