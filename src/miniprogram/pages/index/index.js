const app = getApp();
Page({
  data: {
    goods: [],
    loading: true
  },
  onLoad() {
    // TODO 加载商品列表
    this.getGoodlist()
  },
  getGoodlist() {
    wx.cloud.callFunction({
      name: 'getGoodlist',
      data: {
        id: 1
      }
    }).then(res => {
      if (res.result) {
        this.setData({
          goods: res.result,
          loading: false
        })
      }
    })
  },
  todetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}&name=test`,
    })
  }
})