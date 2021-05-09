const app = getApp();
var that = null;
Page({
	data: {
		billList: [],
		buyNumMin: 1,
		buyNumMax: 5,
		saveHidden: true,
		totalPrice: 0,
		selectedList: []
	},
	onLoad(){
		that = this;
	},
	onShow(){
		wx.showNavigationBarLoading();
		//TODO 获取购物车商品列表
		app.getShopCart({
			success(list){
				that.setData({billList:list});
				wx.hideNavigationBarLoading();
			}
		})
	},
	/**
	 * 删除选择的商品
	 */
	deleteSelected() {
		let currentBillList = this.data.billList.filter(bill => !this.data.selectedList.includes(bill._id));
		let that = this;
		//TODO 删除商品接口
		app.delShopCart({
			list:that.data.selectedList,
			success(){
				that.setData({
					'billList': currentBillList,
					'selectedList': []
				});
			}
		});
	},
	/**
	 * 更新商品列表
	 */
	updateBillList() {
		this.data.billList.forEach(bill => {
			if (this.data.selectedList.includes(bill._id)) bill.active = true
			else bill.active = false
		})
		this.setData({
			billList: this.data.billList
		})
	},
	/**
	 * 更新总价
	 */
	updateTotalPrice() {
		let res = 0;
		this.data.billList.forEach(bill => {
			if (this.data.selectedList.includes(bill._id)) res += Number(bill.price) * Number(bill.number)
		});
		this.setData({
			totalPrice: res
		})
	},
	/**
	 * 全选所有商品
	 */
	onAllSelect() {
		let currentSelectedList = []
		if (this.data.selectedList.length === this.data.billList.length) {
			// do nothing
		} else {
			currentSelectedList = this.data.billList.map(({
				_id
			}) => _id)
		}
		this.setData({
			'selectedList': currentSelectedList
		}, () => {
			this.updateBillList()
			this.updateTotalPrice()
		})
	},
	/**
	 * 选择单个商品
	 */
	selectTap(e) {+
		console.log(e)
		let id = e.currentTarget.dataset.id;
		if (this.data.selectedList.includes(id)) {
			let idx = this.data.selectedList.indexOf(id);
			this.data.selectedList.splice(idx, 1);
		} else {
			this.data.selectedList.push(id);
		}
		this.setData({
			'selectedList': this.data.selectedList
		}, () => {
			this.updateBillList()
			this.updateTotalPrice()
		})
	},
	/**
	 * 为一个商品减小数量
	 */
	minusBtnTap(e) {
		let id = e.currentTarget.dataset.id;
		this.data.billList.forEach(bill => {
			if (bill._id === id) {
				if (bill.number > this.data.buyNumMin) bill.number--
			}
		})
		this.setData({
			'billList': this.data.billList
		})
	},
	/**
	 * 为一个商品增大数量
	 */
	addBtnTap(e) {
		let id = e.currentTarget.dataset.id;
		this.data.billList.forEach(bill => {
			if (bill._id === id) {
				if (bill.number < this.data.buyNumMax) bill.number++
			}
		})
		this.setData({
			'billList': this.data.billList
		})
	},
	/**
	 * 开启编辑模式
	 */
	editTap() {
		this.setData({
			saveHidden: false
		})
	},
	/**
	 * 关闭编辑模式
	 */
	saveTap() {
		this.setData({
			saveHidden: true
		})
	},
	/**
	 * 调转到结算页
	 */
	toPayOrder() {
		wx.setStorageSync('ids', this.data.selectedList);
		wx.navigateTo({
			url: '/pages/submit/submit'
		})
	}
})