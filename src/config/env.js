/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 */

let baseUrl = ''; 
let routerMode = 'hash';
let imgBaseUrl = '';

if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'http://cangdu.org:8001';
    imgBaseUrl = 'https://fuss10.elemecdn.com';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = '//elm.cangdu.org';
    imgBaseUrl = '//elm.cangdu.org/img/';
}
console.log('imgBaseUrl',imgBaseUrl)
export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}