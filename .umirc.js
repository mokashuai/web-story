
// ref: https://umijs.org/config/
const path = require('path'), resolve = (...p) => path.resolve(__dirname, ...p);
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'beauty',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
          /utils\//,
          /connect\.(t|j)sx?$/
        ],
      },
    }],
  ],
  publicPath: './',
  /*exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },*/
  disableCSSModules: true,
  alias: {
    '@': resolve('src'),
    'utils': resolve('src', 'utils'),
    'components': resolve('src', 'utils', 'components'),
  },
}
