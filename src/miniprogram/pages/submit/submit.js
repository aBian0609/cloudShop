const app = getApp();
var that = null;
Page({
	data: {
		deliveryCost: 0,
		deliveryType: 'fast',
		addressData: {
			name: '张三',
			phone: '18912345678',
			address: "深圳市南山区"
		}
	},
	/**
	 * 记录备注信息
	 * @param {*} e 
	 */
	onDeliveryTypeChange(e) {
		this.setData({
			deliveryType: e.detail.value
		})
	},
	/**
	 * 记录备注信息
	 * @param {*} e 
	 */
	getremark(e) {
		that.remark = e.detail.value;
	},
	/**
	 * 加载信息
	 */
	onLoad() {
		that = this;
		let ids = wx.getStorageSync('ids');
		//TODO 获取提交信息
		app.getBillList({
			ids: ids,
			success(list) {
				const totalAmount = list.reduce((amount, good) => {
					return (amount + good.number * good.price);
				}, 0);
				that.setData({
					ids: ids,
					billNum: list.length,
					billList: list,
					totalAmount
				})
			}
		});
	},
	/**
	 * 提交订单
	 */
	submitorder() {
		wx.requestSubscribeMessage({
			tmplIds: ['Wf8wTrm0qtXgSOcSF0i57b-24fYxFld70_Q61qut_mo'],
			success(res){
				console.log(res)
			},
			fail(e){
				console.log(e)
			},
			complete() {
				//TODO 提交订单接口
				app.submitorder({
					ids: that.data.ids,
					deliveryType: that.data.deliveryType,
					addressData: that.data.addressData,
					remark: that.remark,
					success() {
						wx.showModal({
							title: '模拟付款',
							content: '是否付款，付款不可回退，请确认',
							success(res) {
								if (res.confirm) {
									app.toPayTap({
										ids: that.data.ids,
										success(res) {
											wx.switchTab({
												url: '../order/order',
											})
										}
									})
								} else {
									wx.switchTab({
										url: '../order/order',
									})
								}
							}
						})
					}
				})
			}
		})
	}
})