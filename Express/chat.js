const mongoose = require('mongoose')

// mongoDB에 회원정보를 저장할 스키마를 chatSchema에 정의
const chatSchema = mongoose.Schema({
  helpId:{
    type:Number,
    required:true,
  },
  name: {
    type: String,
    maxlength: 16,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  }
})

// 데이터베이스 모델을 정의
const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat