// 本项目是vue cli3搭建的，代理配置是在vue.config.js文件中:
module.exports = {
    chainWebpack: (config) => {
        // 配置 px2rem
        config.module
            .rule("scss")
            .oneOf("vue")
            .use("px2rem-loader")
            .loader("px2rem-loader")
            .before("postcss-loader") // this makes it work.
            .options({ remUnit: 75, remPrecision: 8 })
            .end();
        // 全局配置 scss
        const oneOfsMap = config.module.rule("scss").oneOfs.store;
        oneOfsMap.forEach((item) => {
            item.use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    // Provide path to the file with resources
                    // 要公用的scss的路径
                    resources: "./src/assets/css/common.scss",
                    resources: "./src/assets/css/index.scss",
                })
                .end();
        });
    },
    // devServer: {
    //     host: "127.0.0.1",
    //     disableHostCheck: true,
    //     proxy: {
    //         "/api": {
    //             // target: "http://127.0.0.1:8001/", //对应自己的接口
    //             target: "http://cangdu.org:8001",
    //             changeOrigin: true, // 是否跨域
    //             secure: false, // 如果是https接口，需要配置这个参数
    //             ws: true, // 如果要代理 websockets，配置这个参数
    //             pathRewrite: {
    //                 "^/api": "",
    //             },
    //             logLevel: "debug",
    //             // add x-forward-for header
    //             xfwd: false,
    //         },
    //     },
    // },
};
