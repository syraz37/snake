var webpack = require('webpack'); 
module.exports = {
    entry: {
        main: "./scripts/app.ts",
        vendor: ["socket.io-client"]
    },
    output: {
        path: __dirname + "/assets/js",
        filename: "[name].bundle.js"
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    resolve: {
        modules: ["node_modules"],
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    // Add minification
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('prod'),
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        }),
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
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                loader: 'url-loader?limit=20000'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings 
                    }, {
                        loader: "css-loader", // translates CSS into CommonJS 
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", // compiles Sass to CSS 
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};