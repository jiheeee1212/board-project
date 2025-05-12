// frontend/src/pages/MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>환영합니다!</h1>
      <Link to="/login">로그인</Link> | <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default MainPage;
