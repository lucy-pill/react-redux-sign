import styled from 'styled-components';

export const SignInBox = styled.form`
  width: 400px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 0 10px;
  padding: 20px 0;
  border-radius: 20px;
`;
export const SignInInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;
export const SignInInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: none;
  padding: 0px;
  &::placeholder {
    padding: 5px;
  }
`;
export const SignInButtonGroup = styled.div`
  display: flex;
  gap: 30px;
`;
export const SignInButton = styled.button`
  background-color: #e8e8e8;
  border-radius: 10px;
  border: none;
  background-color: #768361;
  color: white;
  width: 100px;
  height: 30px;
`;
export const AlertSpan = styled.span`
  display: none;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.color || '#ff9696'};
`;
