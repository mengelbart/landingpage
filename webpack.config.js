const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // new CopyWebpackPlugin([
    //   {
    //     context: 'node_modules/@webcomponents/webcomponentsjs',
    //     from: '**/*.js',
    //     to: 'webcomponents'
    //   }
    // ])
  ]
}
