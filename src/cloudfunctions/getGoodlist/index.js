const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
	console.log('event', event)
	console.log('call getGoodList select database ...')
	let list = (await db.collection('goods').field({
		title:true,
		price:true,
		origin:true,
		imgs:true
	}).get()).data
	for(let i in list){
		list[i].img = list[i].imgs[0]
		delete list[i].imgs
	}
	return list;
}