const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
};
