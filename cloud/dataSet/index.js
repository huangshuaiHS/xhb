// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  res: cloud.DYNAMIC_CURRENT_ENV
})
//调用数据库需要定义
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

 return await db.collection('dataSet').get().catch(err => {
    console.error("查询dataSet出错了", err)
  })
}