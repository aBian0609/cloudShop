// const lodash = require('lodash') 
// const add = require('lodash/add') 
App({
  /**
   * APP加载时运行回调
   */
  onLaunch: function () {
    // console.log('lodash', lodash.add(3, 4));
    // console.log('lodash', add(3, 4));
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'develop-2g9mkqf6b1299c62'
      })
    }
  },


  /**
   * 获取信息列表
   * @param {*} obj 
   */
  getShopCart: function (obj) {
    wx.cloud.callFunction({
      name:"getShopcart",
      data:{
        cart:obj.cart,
        done:obj.done
      },
      success(res){
        if (obj != null && obj.success != null) {         //判断是否有success回调写入
          obj.success(res.result);                          //调用回调，将订单列表信息传回
        }
      }
    }) 
  },
  /**
   * 删除购物车商品
   * @param {*} obj 
   */
  delShopCart: function (obj) {
    wx.cloud.callFunction({
      name:'delShopcart',
      data:{
        ids:obj.list
      },
      success(res){
        if (obj != null && obj.success != null) {         //判断是否有success回调写入
          obj.success();                                  //调用回调
        }
      }
    })
  },
  /**
   * 获取订单提交信息
   * @param {*} obj 
   */
  getBillList: function (obj) {
    wx.cloud.callFunction({
      name:"getShopcart",
      data:{
        ids:obj.ids
      },
      success(res){
        if (obj != null && obj.success != null) {         //判断是否有success回调写入
          obj.success(res.result);                          //调用回调，将订单列表信息传回
        }
      }
    }) 
  },
  /**
   * 订单提交信息
   * @param {*} obj 
   */
  submitorder: function (obj) {
    wx.cloud.callFunction({
      name:"submitShopcart",
      data:{
        deliveryType : obj.deliveryType,
        remark : obj.remark,
        addressData : obj.addressData,
        ids : obj.ids
      },
      success(res){
        obj.success();
      }
    })
  },
  /**
   * 模拟，为商品付款
   * @param {*} obj 
   */
  toPayTap: function (obj) {
    wx.cloud.callFunction({
      name:"payShopcart",
      data:{
        ids : obj.ids
      },
      success(res){
        obj.success();
      }
    })
  },
  /**
   * 商品收货完成
   * @param {*} obj 
   */
  toDoneOrder: function (obj) {
    wx.cloud.callFunction({
      name:"doneShopcart",
      data:{
        ids : obj.ids
      },
      success(res){
        obj.success();
      }
    })
  },
  /**
   * 删除已完成的订单
   * @param {*} obj 
   */
  delOrderTap: function (obj) {
    wx.cloud.callFunction({
      name:'delShopcart',
      data:{
        ids:obj.ids
      },
      success(res){
        if (obj != null && obj.success != null) {         //判断是否有success回调写入
          obj.success();                                  //调用回调
        }
      }
    })
  }
})