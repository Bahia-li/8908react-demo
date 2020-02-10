 const {
   override,
   fixBabelImports,
   addLessLoader,
   addDecoratorsLegacy,
   addWebpackAlias
 } = require('customize-cra');

 const {
   resolve
 } = require('path')

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true
   }),
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: {
       '@primary-color': '#1DA57A'
     },
   }),
   //ES7 装饰器语法兼容
   addDecoratorsLegacy(),
   //配置webpack路径别名
   addWebpackAlias({
     '$conf': resolve(__dirname, './src/config'),
     '$redux': resolve(__dirname, './src/redux'),
     '$conw': resolve(__dirname, './src/components/login'),
     '$utils': resolve(__dirname, './src/utils'),
     '$api': resolve(__dirname, './src/api')
   })
 );