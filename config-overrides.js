 const {
   override,
   fixBabelImports,
   addLessLoader,
   addDecoratorsLegacy,
   addWebpackAlias
 } = require('customize-cra');

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'true',
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
   addWebpackAlias({})
 );