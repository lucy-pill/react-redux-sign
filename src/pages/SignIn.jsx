import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  return (
    <div>
      Sign In
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
}

export default SignIn;
