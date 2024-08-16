# Subgraph Prettier Config

Opinionated Prettier configuration used by [subgraphs maintained](https://github.com/protofire?q=subgraph) by [ProtoFire](https://protofire.io/)

## Install

```Shell
$ yarn add --dev @protofire/subgraph-prettier-config
```

## Usage

Add reference to configuration module in the `package.json` file:

```JSON with Comments
{
  // ...
  "prettier": "@protofire/subgraph-prettier-config"
}
```

Or, if you don't want to use `package.json`, use instead any of the [supported extensions](https://prettier.io/docs/en/configuration.html)
to export a string, e.g. `.prettierrc.json`:

```JSON
"@protofire/subgraph-prettier-config"
```

To extend the configuration to overwrite some properties from the shared configuration, import the module in a `prettier.config.js`or `.prettierrc.js` file and export the modifications, e.g:

```JavaScript
module.exports = {
  ...require('@protofire/subgraph-prettier-config'),
  semi: false, // override desired properties
}
```

That's it!
