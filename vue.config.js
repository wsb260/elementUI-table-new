module.exports = {
    // 部署应用包时的基本URL。用法和webpack本身的output.publicPath一致。publicPath并不会对生成文件的
    //路径造成影响，主要是对你在页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片
    //publicPath:'',
    // 当运行vue-cli-service build时生成的生产环境构建文件的目录
    //outputDir:'',
    // 放置生成的静态资源（js,css,img,fonts）的（相对于outputDir）的目录
    //assetsDir:'',
    // 指定生成的index.html的输出路径（相对于outputDir）,也可以是一个绝对的路径
    //indexPath:'',
    // 通过这个选项设为false来关闭文件名的哈希
    //filenameHashing:false,
    // 在multi-page(多页面)模式下构建应用。每个page对应一个JavaScript入口文件
    // pages:{
    //     index:{
    //         // page的入口
    //         entry:'src/index/main.js',
    //         // 模板来源
    //         template:'public/index.html',
    //         // 在dist/index.html的输出
    //         filename:'index.html',
    //         // 当使用title选项时，template中的title标签需要是<title><%= htmlWebpackPlugin.options.title %></title>
    //         title:'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的chunk和vendor chunk
    //         chunks:['chunk-vendors','chunk-common','index']
    //     },
    //     // 当使用只有入口的字符串格式时，模板会被推导为'public/subpage.html'
    //     // 并且如果找不到的话，就回退到'public/index.html'
    //     // 输出文件名会被推导为'subpage.html'
    //     subpage:'src/subpage/main.js'
    // },
    // 是否在开发环境下通过eslint-loader在每次保存时lint代码
    //lintOnSave:false,
    // 是否使用包含运行时编译器的Vue构建版本
    //runtimeCompiler:true,
    // 默认情况下babel-loader会忽略所有node_modules中的文件。
    // 如果你想通过Babel显式转译一个依赖，可以在这个选项中列出来
    //transpileDependencies:[],
    // 如果你不需要生产环境的source.map,可以将其设置为false以加速生产环境构建.默认true
    //productionSourceMap:true,
    // 设置生成的HTML中<link rel='stylesheet'>和<script>标签的crossorigin属性。
    // 需要注意的是该选项仅影响由html-webpack-plugin在构建时注入的标签，直接写在模板（public/index.html）中的标签不受影响
    //crossorigin:'',
    // 设置生成的HTML中<link rel='stylesheet'>和<script>标签上启用SRI,提供额外CDN文件的安全性
    //integrity:false,
    // 通过webpack-merge合并到最终的配置中
    //configureWebpack:{},
    // 是一个函数，允许对内部的webpack配置进行更细粒度的修改
    //chainWebpack:function(){},
    // css相关配置
    // css:{
    //     // 默认情况下，只有*.module.[ext]结尾的文件才会被视作为CSS Modules模块。设置为true后你就可以去掉文件名中的
    //     // .module并合并所有的*.(css|scss|sass|less|styl(us))文件视为CSS Modules模块  
    //     modules:false,
    //     // 是否将组件中的css提取到一个独立的css文件中。默认生产环境下是true,开发环境下是false。
    //     // 提取css在开发环境模式下是默认不开启的，因为它和css热重载不兼容。
    //     extract:false,
    //     // 是否为css开启source map.设置true之后可能会影响构建的性能
    //     sourceMap:false,
    //     // 向css相关的loader传递选项
    //     loaderOptions:{
    //         css:{
    //             // 这里的选项会传递给css-loader
    //         },
    //         postcss:{
    //             // 这里的选项会传递给postcss-loader
    //         }
    //     }
    // },
    // 所有的webpack-dev-server都支持
    // devServer:{
    //     // 请求代理
    //     proxy:{}
    // },
    // 是否为Babel或TypeScript使用thread-loader。
    //parallel:require('os').cpus().length>1,
    // 向PWA查件传递选项
    //pwa:{},
    // 这是一个不进行任何schema验证的对象，因此它可以用来传递任何第三方插件选项
    //pluginOptions:{}
}