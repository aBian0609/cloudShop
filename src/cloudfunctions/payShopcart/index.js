const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
	const res = await db.collection('order').where({
		_id:_.in(event.ids)
	}).update({
		data:{
			type:2
		}
	});
	try{
		await await cloud.openapi.subscribeMessage.send({
			touser: event.userInfo.openId,
			page: 'pages/order/order',
			lang: 'zh_CN',
			data: {
				number1:{
					value:'8172872738723'
				},
				phrase12:{
					value:'待收货'
				},
				thing15:{
					value:'你的商品已发货'
				}
			},
			templateId: 'Wf8wTrm0qtXgSOcSF0i57b-24fYxFld70_Q61qut_mo',
			miniprogramState: 'developer'
		  })
	}catch(e){

	}
	return res;
}