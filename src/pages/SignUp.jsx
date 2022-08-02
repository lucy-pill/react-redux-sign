import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { createAccount } from '../redux/modules/account';
import { useDispatch } from 'react-redux';

const SignUpBox = styled.form`
  width: 300px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const SignUpInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;
const SignUpInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding: 0px;
  &::placeholder {
    padding: 5px;
  }
`;
const SignUpButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;
const SignUpButton = styled.button`
  background-color: #e8e8e8;
  border-radius: 10px;
  border: none;
`;
const PasswdAlertSpan = styled.span`
  display: none;
  font-size: 12px;
  font-weight: 700;
  color: #ff9696;
`;

function SignUp() {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [passwdRe, setPasswdRe] = useState('');
  const [phone, setPhone] = useState('');

  const passwdRef = useRef();
  const passwdReRef = useRef();
  const strengthBarRef = useRef();
  const passwdReSpan = useRef();

  useRef(() => {
    console.log(passwdReSpan);
  }, [passwd]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signUpAccount(event) {
    event.preventDefault();

    if (passwd !== passwdRe) {
      passwdReRef.current.focus();
      
    } else if (strengthBarRef.current.state.score <= 2) {
      passwdRef.current.focus();
      passwdReSpan.current.style.display = 'block';
    } else {
      dispatch(
        createAccount({
          email: email,
          password: passwd,
          phone: phone,
        })
      );
      navigate('/');
    }
  }

  return (
    <SignUpBox onSubmit={(event) => signUpAccount(event)}>
      <SignUpInputGroup>
        <SignUpInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <SignUpInput
          type="password"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          placeholder="Password"
          ref={passwdRef}
          required
        />
        <PasswordStrengthBar
          password={passwd}
          style={{ display: passwd ? 'block' : 'none' }}
          ref={strengthBarRef}
        />
        <SignUpInput
          type="password"
          value={passwdRe}
          onChange={(e) => setPasswdRe(e.target.value)}
          placeholder="Re-enter password"
          ref={passwdReRef}
          required
        />
        <PasswdAlertSpan ref={passwdReSpan}>
          패스워드가 맞지 않습니다!
        </PasswdAlertSpan>
        {/* 
        사파리에서는 type="tel"만 지정해도 전화번호 형식으로 사용가능"
        하지만 다른 브라우저에서는 정규식 사용 필요
        */}
        <SignUpInput
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          minLength="9"
          maxLength="13"
          placeholder="Phone number (00*-000*-0000)"
          pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}"
          required
        />
      </SignUpInputGroup>
      <SignUpButtonGroup>
        <SignUpButton type="submit">회원가입</SignUpButton>
        <SignUpButton type="button" onClick={() => navigate('/')}>
          뒤로가기
        </SignUpButton>
      </SignUpButtonGroup>
    </SignUpBox>
  );
}

export default SignUp;
