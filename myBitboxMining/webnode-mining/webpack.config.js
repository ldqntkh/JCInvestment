/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
    entry: ['./private/reactjs/customer/App.js', './private/reactjs/user/App.js'],
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