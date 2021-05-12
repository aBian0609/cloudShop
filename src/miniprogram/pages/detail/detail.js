const app = getApp();
Page({
	data: {
		autoplay: true,
		interval: 5000,
		duration: 1000,
		loading: true,
		detail: {},
		buyNumMin: 1,
		buyNumMax: 5,
		billNum: 0,
		bill: {
			number: 1
		},
		shopType: '',
		hideShopPopup: true,
		imgheight: 0
	},
	onLoad: function (options) {
		//TODO 获取商品详情信息
		this.getGoodSDetail({id: options.id})
	},
	getGoodSDetail: function (obj) {
    wx.cloud.callFunction({
      name:"getGooddetail",
      data:{
        id:obj.id
      }
    }).then(res => {
			if(res.result){
				this.setData({
					loading: false,
					detail: res.result
				})
			}
		})
  },
	goShopCart() {
		//TODO 跳转到购物车页面
		wx.switchTab({
			url: '/pages/cart/cart'
		})
	},
	/**
	 * 增加商品到购物车
	 */
	addShopCart() {
		// if (this.data.bill.options==null || Object.keys(this.data.bill.options).length != this.data.detail.options.length) {
		// 	wx.showToast({
		// 		title: "请选择类型",
		// 		icon: 'none'
		// 	})
		// 	return
		// }
		this.renderBillOptionToList();
		//TODO 调用增加商品到购物车的接口
		this.addShopsCart({
			data: Object.assign({}, this.data.bill, {
				commodityId: this.data.detail._id
			}),
			cart:true
		})
		
	},

  /**
   * 添加商品到购物车
   * @param {*} obj 
   */
  addShopsCart: function (obj) {
    wx.cloud.callFunction({
      name:"addShopcart",
      data:{
        data:obj.data
      },
    }).then(res => {
			if (obj.cart == false) {                          //是否为加入购物车，false为直接付款，也包含加入购物车的操作
				wx.setStorageSync('ids', [res.result]);           //将订单项目id放入存储里，以便在后续操作直接获取
				wx.navigateTo({
					url: '../submit/submit',
				})
			}
			this.closePopupTap()
		}).catch(e => {
			console.warn(e)
			wx.showModal({
				title:"抱歉",
				content:"购物车加入失败，请稍后再试",
				showCancel:false
			})
		})
  },
	/**
	 * 直接购买商品
	 */
	buyNow() {
		if (Object.keys(this.data.bill.options).length != this.data.detail.options.length) {
			wx.showToast({
				title: "请选择类型",
				icon: 'none'
			})
			return
		}
		this.renderBillOptionToList();
		//TODO 调用增加商品直接购买的接口
		this.addShopsCart({
			data: Object.assign({}, this.data.bill, {
				commodityId: this.data.detail._id
			}),
			cart:false
		})
	},
	/**
	 * 点击加入购物车按钮
	 */
	toAddShopCart() {
		this.setData({
			shopType: 'addShopCart',
			hideShopPopup: false
		})
	},
	/**
	 * 点击立即购买按钮
	 */
	toBuy() {
		this.setData({
			shopType: 'buy',
			hideShopPopup: false
		})
	},
	/**
	 * 关闭商品选择模态框
	 */
	closePopupTap() {
		this.setData({
			hideShopPopup: true,
			"bill.options": {}
		})
	},
	/**
	 * 变更选择标签
	 */
	labelItemTap(e) {
		let dataset = e.currentTarget.dataset || {}
		let options = Object.assign({}, this.data.bill.options)
		options[dataset.key] = dataset.idx
		this.setData({
			"bill.options": options
		})
	},
	/**
	 * 减小商品数量
	 */
	numMinusTap() {
		if (this.data.bill.number > this.data.buyNumMin) {
			this.setData({
				'bill.number': --this.data.bill.number
			})
		}
	},
	/**
	 * 增大商品数量
	 */
	numAddTap() {
		if (this.data.bill.number < this.data.buyNumMax) {
			this.setData({
				'bill.number': ++this.data.bill.number
			})
		}
	},
	/**
	 * 转换商品可读标签
	 */
	renderBillOptionToList() {
		let optionList = []
		let options = this.data.bill.options
		// Object.keys(options).forEach(key => {
		// 	this.data.detail.options.forEach(option => {
		// 		if (option.key === key) {
		// 			optionList.push({
		// 				name: option.name,
		// 				value: option.value[options[key]]
		// 			})
		// 		}
		// 	})
		// })
		this.data.detail.options.forEach(option => {
			optionList.push({
				name: option.name,
				value:option.value[options[option.key]]
			})
			
		})
		this.setData({
			'bill.options': optionList
		})
	},
	/**
	 * 监听图片加载完成
	 */
	imgload(e) {
		let height = e.detail.height / e.detail.width * 750;
		this.setData({
			imgheight: height
		})
	}
})