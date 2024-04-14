const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // чистит папку dist
const CopyWebpackPlugin = require('copy-webpack-plugin') // скопировать спрайты

const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log(__dirname)

module.exports = {
    context: path.resolve(__dirname, '../src'),
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
    },
    devtool: false,
    performance: {
        hints: false,
        maxEntrypointSize: 900000,
        maxAssetSize: 900000
    },
    output: {
        filename: '[name].js', // название чанка - main 
        path: path.resolve(__dirname, '../dist'), // так корректнее
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            minify: {
                collapseWhitespace: true // постоянно оптимизирован, если true
            }
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/**/*')]
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "../assets/sounds"),
              to: path.resolve(__dirname, "../dist/assets/sounds"),
              globOptions: {
                ignore: ["*.DS_Store"],
              },
              noErrorOnMissing: true,
            },
          ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname, '../assets/sprites'),
                  to: path.resolve(__dirname, '../dist/assets/sprites'),
                  globOptions: {
                      ignore: ['*.DS_Store'],
                  },
                  noErrorOnMissing: true,
                },
                {
                  from: path.resolve(__dirname, "../assets/styles"),
                  to: path.resolve(__dirname, "../dist/assets/styles"),
                  globOptions: {
                      ignore: ["*.DS_Store", "**/scss-styles"],
                  },
                  noErrorOnMissing: true,
                },
                {
                  from: path.resolve(__dirname, "../assets/html"),
                  to: path.resolve(__dirname, "../dist/assets/html"),
                  globOptions: {
                      ignore: ["*.DS_Store"],
                  },
                  noErrorOnMissing: true,
                },
                {
                  from: path.resolve(__dirname, "../assets/images"),
                  to: path.resolve(__dirname, "../dist/assets/images"),
                  globOptions: {
                      ignore: ["*.DS_Store"],
                  },
                  noErrorOnMissing: true,
                },
            ]
        }),
        new CopyWebpackPlugin({
          patterns: [                {
                  from: path.resolve(__dirname, "../assets/fonts"),
                  to: path.resolve(__dirname, "../dist/assets/fonts"),
                  globOptions: {
                      ignore: ["*.DS_Store"],
                  },
                  noErrorOnMissing: true,
                }]
        }),
        new MiniCssExtractPlugin({
        filename: "../assets/styles/main-styles.css",
        }),
        new ImageminWebpWebpackPlugin({
            config: [
                {
                test: /\.(jpe?g|png)/,
                options: {
                    quality: 75,
                },
                },
            ],
            overrideExtension: true,
            detailedLogs: false,
            silent: false,
            strict: true,
        }),
    ],
    module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "../assets/styles/scss-styles")],

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpeg|svg|gif|webp)$/,
        use: ["file-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "../dist/assets/fonts/[name][ext]",
        },
      },
    ],
  },
};