/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './private/reactjs/customer/App.js',
    output: {
        path: path.resolve('public/reactjs'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
}