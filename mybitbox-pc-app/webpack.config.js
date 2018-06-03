var path = require('path');
//Thư mục sẽ chứa tập tin được biên dịch
var BUILD_DIR = path.resolve(__dirname, 'src/public/js');
//Thư mục chứa dự án - các component React
var APP_DIR = path.resolve(__dirname, 'src/ReactApp');

//var WEB_STORE = path.resolve(__dirname, 'wp-content/themes/storefront/assets/js/utils');

var config = {
  entry: APP_DIR + '/App.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundlesreact.js'
  },
  resolve : {
      alias : {
          reducer : path.resolve(__dirname, 'App/reducers/indexReducer.js')
      }
  },
  module: {
      rules : [
        {
            loader : 'babel-loader',
            test : /\.jsx?$/,
            exclude : /node_modules/,
            query:
            {
                presets:['react',["es2015", {"modules": false}]]
            }
          }
      ]
  }
};
 
module.exports = config;