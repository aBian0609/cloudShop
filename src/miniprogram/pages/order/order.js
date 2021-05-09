const app = getApp();
var that = null;
Page({
	data: {
		orderList: [],
		statusType: ["进行中", "已完成"],
		currentType: 0,
	},
	onLoad(){
		that = this;
	},
	/**
	 * 变更状态
	 * @param {} e 
	 */
	statusTap: function (e) {
		const curType = e.currentTarget.dataset.index;
		this.data.currentType = curType
		this.setData({
			currentType: curType
		});
		this.onShow();
	},
	onShow() {
		this.getOrderList();
	},
	/**
	 * 获取商品列表
	 * @param {} e 
	 */
	getOrderList() {
		wx.showNavigationBarLoading();
		//TODO 获取商品列表接口
		app.getShopCart({
			cart:false,
			done:that.data.currentType,
			success(list){
				that.setData({orderList:list});
				wx.hideNavigationBarLoading();
			}
		})
	},
	/**
	 * 模拟付款
	 * @param {} e 
	 */
	toPayTap(e){
		wx.showModal({
		  title:'模拟付款',
		  content:'是否付款，付款不可回退，请确认',
		  success(res){
			  if(res.confirm){
				//TODO 模拟付款接口
				app.toPayTap({
					ids:[e.currentTarget.dataset.id],
					success(res){
						that.onShow();
					}
				})
			  }
		  }
		})
	},
	/**
	 * 确认收货
	 * @param {} e 
	 */
	toDoneOrder(e){
		wx.showModal({
			title:'确认收货',
			content:'请确认货物是否收到？',
			success(res){
				if(res.confirm){
					//TODO 确认收货接口
				  app.toDoneOrder({
					  ids:[e.currentTarget.dataset.id],
					  success(res){
						  that.onShow();
					  }
				  })
				}
			}
		  })
	},
	/**
	 * 删除订单
	 * @param {*} e 
	 */
	cancelOrderTap(e){
		wx.showModal({
			title:'确认删除',
			content:'删除后将不可以找回，请确认操作',
			success(res){
				if(res.confirm){
					//TODO 删除订单
				  app.delOrderTap({
					  ids:[e.currentTarget.dataset.id],
					  success(res){
						  that.onShow();
					  }
				  })
				}
			}
		  })
	}
})