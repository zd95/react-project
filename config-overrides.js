
//配置antd

/*

npm npm install antd --save

npm i react-app-rewired customize-cra babel-plugin-import --dev

npm i  less less-loader --dev
  修改package.json配置
   "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
*/
const {
   override,
   fixBabelImports,
   addLessLoader
 } = require('customize-cra');

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: {
       '@primary-color': '#1DA57A'
     },
   }),
 );