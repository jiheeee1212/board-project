const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // 모델 불러오기
const jwt = require('jsonwebtoken');

const router = express.Router();

// 회원가입 API
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: '이메일과 비밀번호를 모두 입력해주세요.' });
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 유저 데이터베이스에 저장
  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: '회원가입 성공!' });
  } catch (error) {
    res.status(500).json({ error: '회원가입에 실패했습니다.' });
  }
});


// 로그인 API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: '이메일을 찾을 수 없습니다.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });

    // (선택) JWT 토큰 발급
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ message: '로그인 성공', token });
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
});


module.exports = router;
