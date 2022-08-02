import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import styled from 'styled-components';

const SignInBox = styled.form`
  width: 300px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const SignInInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;
const SignInInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding: 0px;
  &::placeholder {
    padding: 5px;
  }
`;
const SignInButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;
const SignInButton = styled.button`
  background-color: #e8e8e8;
  border-radius: 10px;
  border: none;
`;

function SignIn() {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');

  const navigate = useNavigate();

  const signInAccount = () => {
    console.log('login');

    // 로그인 로직 구현
  };
  return (
    <SignInBox>
      <SignInInputGroup>
        <SignInInput type="text" placeholder="E-mail" />
        <SignInInput type="text" placeholder="Password" />
      </SignInInputGroup>
      <SignInButtonGroup>
        <SignInButton type="submit" onClick={() => signInAccount}>
          로그인
        </SignInButton>
        <SignInButton onClick={() => navigate('/signup')}>
          회원가입
        </SignInButton>
      </SignInButtonGroup>
    </SignInBox>
  );
}

export default SignIn;
