const path = require('path');
var sourceMap = require('source-map');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");
   return {
    entry: './src/app.js',
    //entry: './src/playground/hoc.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
       options: {
          babelrc: false,
          presets:["@babel/preset-env", '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-object-rest-spread', "@babel/plugin-proposal-class-properties"]
        },
      exclude: /(node_modules|bower_components)/,
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    },
    node: {
      fs: "empty"
    }
  };
};
