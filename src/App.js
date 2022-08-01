import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact="true" element={<SignIn />} />
        <Route path="/signup" exact="true" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
