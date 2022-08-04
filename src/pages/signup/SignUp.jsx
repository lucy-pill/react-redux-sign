import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { signUpAction } from '../../redux/modules/account';
import { useDispatch } from 'react-redux';
import { db } from '../../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  SignUpBox,
  SignUpInputGroup,
  SignUpInput,
  SignUpButtonGroup,
  SignUpButton,
  AlertSpan,
  EmailGroup,
  EmailInput,
  EmailButton,
} from './SignUp.styled';

function SignUp() {
  const [email, setEmail] = useState('');
  const [dupCheck, setDupCheck] = useState(false);
  const [passwd, setPasswd] = useState('');
  const [passwdRe, setPasswdRe] = useState('');
  const [phone, setPhone] = useState('');

  const emailRef = useRef();
  const emailSpanRef = useRef();
  const emailButtonRef = useRef();
  const passwdRef = useRef();
  const passwdReRef = useRef();
  const strengthBarRef = useRef();
  const passwdSpanRef = useRef();
  const passwdReSpanRef = useRef();

  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newAccount = {
    email: email,
    password: passwd,
    phone: phone,
  };

  useEffect(() => {
    if (passwd !== passwdRe) {
      passwdReSpanRef.current.style.display = 'block';
    } else {
      passwdReSpanRef.current.style.display = 'none';
    }
  }, [passwd, passwdRe]);

  const emailModify = () => {
    emailRef.current.disabled = false;
    emailRef.current.focus();
    emailButtonRef.current.innerText = '중복확인';
    emailSpanRef.current.style.display = 'none';
    setDupCheck(false);
  };

  const emailDupCheck = async () => {
    try {
      const q = query(collection(db, 'account'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        emailRef.current.focus();
        emailSpanRef.current.style.display = 'block';
        emailSpanRef.current.innerText = '중복되는 메일입니다.';
      } else {
        if (regExp.test(email) === false) {
          emailRef.current.focus();
          emailSpanRef.current.style.display = 'block';
          emailSpanRef.current.innerText = '이메일 형식에 맞지 않습니다.';
        } else if (email !== '') {
          emailRef.current.disabled = true;
          emailSpanRef.current.style.display = 'block';
          emailSpanRef.current.style.color = '#6360ff';
          emailSpanRef.current.innerText = '사용 가능한 메일입니다.';
          emailButtonRef.current.innerText = '수정하기';
          setDupCheck(true);
        }
      }
    } catch (error) {
      console.error('Email duplication check occured unknown error.');
    }
  };

  function signUpAccount(event) {
    event.preventDefault();
    if (dupCheck) {
      if (strengthBarRef.current.state.score <= 2) {
        passwdRef.current.focus();
        passwdSpanRef.current.style.display = 'block';
        passwdReSpanRef.current.style.display = 'none';
      } else if (passwd !== passwdRe) {
        passwdReRef.current.focus();
        passwdSpanRef.current.style.display = 'none';
        passwdReSpanRef.current.style.display = 'block';
      } else {
        dispatch(signUpAction(newAccount));
        navigate('/');
      }
    } else {
      emailRef.current.focus();
      emailSpanRef.current.style.display = 'block';
      emailSpanRef.current.innerText = '중복 확인을 진행해주세요.';
    }
  }

  return (
    <SignUpBox onSubmit={(event) => signUpAccount(event)}>
      <SignUpInputGroup>
        <EmailGroup>
          <EmailInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            ref={emailRef}
            required
          />
          <EmailButton
            type="button"
            onClick={() => (dupCheck ? emailModify() : emailDupCheck())}
            ref={emailButtonRef}
          >
            중복확인
          </EmailButton>
        </EmailGroup>
        <AlertSpan ref={emailSpanRef}></AlertSpan>
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
        <AlertSpan ref={passwdSpanRef}>패스워드가 취약합니다!</AlertSpan>
        <SignUpInput
          type="password"
          value={passwdRe}
          onChange={(e) => setPasswdRe(e.target.value)}
          placeholder="Re-enter password"
          ref={passwdReRef}
          required
        />
        <AlertSpan ref={passwdReSpanRef}>패스워드가 맞지 않습니다!</AlertSpan>
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
