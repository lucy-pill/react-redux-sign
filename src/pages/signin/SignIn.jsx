import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { signInAction } from '../../redux/modules/account';
import {
  SignInBox,
  SignInInputGroup,
  SignInInput,
  SignInButtonGroup,
  SignInButton,
  AlertSpan,
} from './SignIn.styled';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const alertEmailSpanRef = useRef();
  const alertPasswordSpanRef = useRef();

  const signInAccount = async (event) => {
    event.preventDefault();

    try {
      const q = query(collection(db, 'account'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const temp_account = [];
      querySnapshot.forEach((doc) => {
        temp_account.push(doc.data());
      });
      if (email === '') {
        alertEmailSpanRef.current.innerText = '계정을 입력해주세요.';
        alertEmailSpanRef.current.style.display = 'block';
      } else {
        if (temp_account.length === 0) {
          alertEmailSpanRef.current.innerText = '없는 계정입니다.';
          alertEmailSpanRef.current.style.display = 'block';
        } else {
          if (password === '') {
            alertEmailSpanRef.current.style.display = 'none';
            alertPasswordSpanRef.current.innerText = '패스워드를 입력해주세요.';
            alertPasswordSpanRef.current.style.display = 'block';
          } else {
            if (temp_account[0].password === password) {
              dispatch(signInAction({ userName: email, loginStatus: true }));
              navigate('/');
            } else {
              alertEmailSpanRef.current.style.display = 'none';
              alertPasswordSpanRef.current.innerText =
                '패스워드가 일치하지 않습니다.';
            }
          }
        }
      }
    } catch (error) {
      console.error("Can't dispatch your action");
    }
  };
  return (
    <SignInBox onSubmit={(event) => signInAccount(event)}>
      <SignInInputGroup>
        <SignInInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          ref={emailRef}
        />
        <AlertSpan ref={alertEmailSpanRef}></AlertSpan>
        <SignInInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          ref={passwordRef}
        />
        <AlertSpan ref={alertPasswordSpanRef}></AlertSpan>
      </SignInInputGroup>
      <SignInButtonGroup>
        <SignInButton type="submit">로그인</SignInButton>
        <SignInButton onClick={() => navigate('/signup')}>
          회원가입
        </SignInButton>
      </SignInButtonGroup>
    </SignInBox>
  );
}

export default SignIn;
