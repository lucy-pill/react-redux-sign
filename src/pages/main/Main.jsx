import ReactPlayer from 'react-player/youtube';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../../redux/modules/account';
import { useNavigate } from 'react-router-dom';

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;
const SignOutButton = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  right: 10px;
  bottom: 10px;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
`;
const PlayerWrapper = styled.div`
  width: 100vw;
  height: 80vh;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutAccount = () => {
    console.log('clicked!');
    dispatch(signOutAction(false));
    navigate('/');
  };
  return (
    <MainBox>
      <Header>
        <SignOutButton onClick={() => signOutAccount()}>Sign Out</SignOutButton>
      </Header>
      <PlayerWrapper>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=eGi447l2_mM"
          width="100vw"
          height="80vh"
          playing={true}
          muted={true}
          loop={true}
          controls={false}
        />
      </PlayerWrapper>
    </MainBox>
  );
}

export default Main;
