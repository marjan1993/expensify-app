// babel.config.js
module.exports = {
    // presets: [
    //   [
    //     '@babel/preset-env',
    //     {
    //       targets: {
    //         node: 'current',
    //       },
    //     },
    //   ],
    //   '@babel/preset-typescript',
    //   '@babel/preset-react'
    // ],
    // plugins: ['babel-plugin-rewire-ts', "@babel/plugin-proposal-class-properties"]
    env: {
      test: {
        plugins: ['babel-plugin-rewire-ts', "@babel/plugin-proposal-class-properties"],
        presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/preset-react'],
      },
    }
  };