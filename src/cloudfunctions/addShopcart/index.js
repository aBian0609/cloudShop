const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
	let data = event.data;
	data.openid = event.userInfo.openId;
	data.type = 0;
	let list = (await db.collection('goods').where({
		_id:data.commodityId
	}).field({
		title:true,
		price:true,
		imgs:true
	}).get()).data
	for(let i in list){
		list[i].img = list[i].imgs[0]
		delete list[i].imgs
	}
	if(list.length!=0){
		data.title = list[0].title;
		data.price = list[0].price;
		data.img = list[0].img;
		const res = await db.collection('order').add({
			data:data
		})
		return res._id
	}
	else {
		return null
	}
}