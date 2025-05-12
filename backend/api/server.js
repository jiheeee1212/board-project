const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // 라우터 불러오기

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/board_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express 설정
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 라우터 연결
app.use('/api', userRoutes);

// 서버 실행
app.listen(5000, () => {
  console.log('서버가 5000번 포트에서 실행 중입니다.');
});
