import webpack from 'webpack';
import path from 'path';

export default {

    entry: [
        'webpack-hot-middleware/client?reload=true',
        'babel-regenerator-runtime',
        path.resolve(__dirname, 'src/')

    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        //allows for Hotmodule to work
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        //defines variables in scope of application
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        })
    ],
    resolve: {
        extensions: ['.js','.jsx','.json']
    },
    module: {
        loaders : [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname,'src')
            }
        ]
    }
}