module.exports = {
  "parser": 'babel-eslint',
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [ "react" ],
  "rules": {
   "indent": ["warn", 4],
 //   "linebreak-style": ["warn","unix"],
    "quotes": ["warn","single"],
    "no-console": ["warn", { "allow": ["info", "error"] }]
  }
};
