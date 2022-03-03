import react, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthProvider";

export const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Container>
        <Wrapper>
          <LogoHolder>
            <Logo />
          </LogoHolder>

          <Navigation>
            <Nav to="/">Home</Nav>
            {user ? <Nav to="/voters">Vote</Nav> : null}
          </Navigation>
          <Space />
          <Navigation>
            {user?.isAdmin ? <Nav to="/addCandidate">Add Candidate</Nav> : null}

            {user ? (
              <Nav1
                onClick={() => {
                  localStorage.removeItem("inec");
                }}
              >
                Log
              </Nav1>
            ) : (
              <Nav to="/register">Register</Nav>
            )}
          </Navigation>
        </Wrapper>
      </Container>
    </div>
  );
};

const Space = styled.div`
  flex: 1;
`;

const Nav = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 15px 40px;
  transform: scale(1);
  transition: all 350ms;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  font-weight: bold;
  margin: 0 10px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.8);
    color: #004080;
  }
`;

const Nav1 = styled.div`
  padding: 15px 40px;
  transform: scale(1);
  transition: all 350ms;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  font-weight: bold;
  margin: 0 10px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.8);
    color: #004080;
  }
`;

const Navigation = styled.div`
  display: flex;
`;

const Logo = styled.img`
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const LogoHolder = styled.div`
  margin: 0px 20px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #004080;
  color: white;
`;
