const defaultWebpackOptions = {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.join(os.tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000),
    },
    stats: {
        modules: false,
        colors: true,
    },
    watch: false,
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 1,
                },
            },
        },
    },
    plugins: [],
};
