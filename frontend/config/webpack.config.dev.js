const path = require("path");
const webpack = require("webpack");

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /lib/],
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  
  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    contentBase: path.join(__dirname, '../public'),
    historyApiFallback: true,
    port: 7070,
    host: "localhost",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  mode: 'development'

};
