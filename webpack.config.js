const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    //配置打包模式
    mode:'production',
    //使用webpack打包哪一个文件
    entry:path.join(__dirname,'./src/index.js'),
    //将打包好的文件输出到哪一个目录
    output:{
        path:path.join(__dirname,'./dist'),
        filename: 'main.js'
    },
    plugins:[ // 添加plugins节点配置插件
        new htmlWebpackPlugin({
            template:path.join(__dirname, './src/index.html'),//模板路径
            filename:'index.html'//自动生成的HTML文件的名称
        })
    ]
    ,
    module:{
        rules:[
            //第三方模块的匹配规则
            { test: /\.css$/,use:['style-loader', 'css-loader']},
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpg|gif)$/, use: ['url-loader?limit=30000$name=[hash:8][name].[ext]'] },
            { test: /\.(ttf|woff2|woff|eot|svg)$/, use: ['url-loader'] },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    }
}