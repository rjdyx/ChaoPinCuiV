const https = 'https://cpc.find360.cn/'
const api = {
	https: https,
	// 1.首页
    homeCategorys: https + 'api/home/index/categorys', //1.1一级分类信息
    // 2.分类页
    product: https + 'api/home/category/product', // 2.1当前分类代表性产品数据
    categoryChild: https + 'api/home/category/child', //2.2 当前分类下的二级分类
    categoryRecommend: https + 'api/home/category/recommend', //榜单推荐（默认6个）
    other: https + 'api/home/category/other', // 其他人还看了
    // 3.产品详情页
    proDetails: https + 'api/home/product/details', //3.1产品详情数据
    proImgs: https + 'api/home/product/imgs', // 3.2产品图片数据
    nearbysPro: https + 'api/home/product/nearbys', // 3.3附近的产品数据
    // 4.产品列表页
    proList: https + 'api/home/product/lists', //4.1产品列表数据
    // 6. 我的收藏
    collect: https + 'api/home/collect/user',
    // 7.2 评价提交
    comment: https + 'api/home/comment', 
    commentImg: https + 'api/home/comment/img', // 提交图片
    categoryRand: https + 'api/home/category/rand',
    // 用户反馈
    feedbackImg: https + 'api/home/feedback/img',
    feedback: https + 'api/home/feedback',
}
module.exports = api;