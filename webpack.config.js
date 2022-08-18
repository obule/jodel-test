const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const exclude = [
  /node_modules/,
  path.resolve(__dirname, '.serverless'),
  path.resolve(__dirname, '.webpack'),
  path.resolve(__dirname, '.build'),
  path.resolve(__dirname, 'tests'),
];

module.exports = {
  context: __dirname,
  stats: 'errors-warnings',
  target: 'node',
  entry: { api: './src/index.ts' },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.mjs', '.js'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~types': path.resolve(__dirname, '@types'),
      '~tests': path.resolve(__dirname, 'tests'),
    },
  },
  ignoreWarnings: [
    {
      module: /formidable/,
    },
    {
      module: /PlatformTools\.js/,
    },
    {
      module: /hash-stream-validation/,
    },
    {
      module: /ReactNativeDriver/,
    },
    {
      module: /ws\/lib\/buffer-util/,
      message: /resolve/,
    },
    {
      module: /ws\/lib\/validation/,
      message: /resolve/,
    },
    {
      module: /.*/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],
  externals: {
    sharp: 'commonjs sharp',
  },
  optimization: {
    // Disable to prevent cyclic dependency issue in production (caused by TypeORM)
    minimize: false,
    splitChunks: false,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
  },
  // plugins: [
  //   new BundleAnalyzerPlugin(),
  // ],
  module: {
    rules: [
      {
        test: /\.wasm/,
        loader: 'file-loader',
        options: {
          /**
           * want the .wasm to be in the src directory otherwise it's not found,
           * related to federation query planner
           */
          name: 'src/[name].[ext]',
        },
      },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        exclude,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.js$/,
        exclude,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ],
  },
};
