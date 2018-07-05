/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
    entry: {
        bundle: './private/reactjs/customer/App.js',
        admin: './private/reactjs/admin/App.js'
    },
    output: {
        path: path.resolve('public/reactjs'),
        filename: '[name].js'
    },
    mode: 'development',
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