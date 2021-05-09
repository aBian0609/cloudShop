// const lodash = require('lodash') 
const add = require('lodash/add') 
App({
  /**
   * APP加载时运行回调
   */
  onLaunch: function () {
    // console.log('lodash', lodash.add(3, 4));
    console.log('lodash', add(3, 4));
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }
  },
  /**
   * 加载商品列表
   * @param {*} obj 
   */
  getGoodSList: function (obj) {
    wx.cloud.callFunction({
      name:"getGoodlist",
      success(res){
        if (obj != null && obj.success != null) {       //判断是否有success回调写入
          obj.success(res.result);            //调用回调，将商品列表信息传回
        }
      }
    })
  },
  /**
   * 加载商品详情
   * @param {*} obj 
   */
  getGoodSDetail: function (obj) {
    wx.cloud.callFunction({
      name:"getGooddetail",
      data:{
        id:obj.id
      },
      success(res){
        if (obj != null && obj.success != null) {       //判断是否有success回调写入
          obj.success(res.result);                    //根据id拿到详情对象，传回
        }
      }
    })
  },
  /**
   * 添加商品到购物车
   * @param {*} obj 
   */
  addShopCart: function (obj) {
    wx.cloud.callFunction({
      name:"addShopcart",
      data:{
        data:obj.data
      },
      success(res){
        if (obj.cart == false) {                          //是否为加入购物车，false为直接付款，也包含加入购物车的操作
          wx.setStorageSync('ids', [res.result]);           //将订单项目id放入存储里，以便在后续操作直接获取
        }
        obj.success();
      },
      fail(err){
        console.warn('error')
        console.warn(err)
      }
    })
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