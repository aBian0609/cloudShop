const app = getApp();
var that = null;
Page({
    data:{
      goods:[],
      loading:true
    },
    onLoad(){
      that = this;
      // TODO 加载商品列表
      app.getGoodSList({
        success:function(list){
          that.setData({
            goods:list,
            loading:false
          })
        }
      })
    },
    todetail(e){
      wx.navigateTo({
        url: `../detail/detail?id=${e.currentTarget.dataset.id}&name=test`,
      })
    }
})
