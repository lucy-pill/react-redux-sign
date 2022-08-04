import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Main from './pages/main/Main';
import { useSelector } from 'react-redux';

const App = () => {
  const loginStatus = useSelector(state => state.account.loginStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact="true" element={loginStatus? <Main /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
 