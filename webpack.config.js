var webpack = require('webpack'); 
module.exports = {
    entry: "./scripts/app.ts",
    output: {
        path: __dirname + "/js",
        filename: "bundle.js"
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            },
            sourceMap: true
        })
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};