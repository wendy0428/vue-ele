//  配置px2rem
module.exports = {
    chainWebpack(config) {
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 75
        })
    },
	// 本项目是vue cli3搭建的，代理配置是在vue.config.js文件中:
	// devServer: {
    //     host: '127.0.0.1',
    //     disableHostCheck: true,
    //     proxy: {
    //         '/api': {
    //             target: 'http://cangdu.org:8001', //对应自己的接口
    //             changeOrigin: true, // 是否跨域
    //             secure: false,  // 如果是https接口，需要配置这个参数
    //             ws: true, // 如果要代理 websockets，配置这个参数
    //             pathRewrite: { 
	// 				'^/api': ''
	// 			},
    //     	}
	// 	},
	// }
}
 

