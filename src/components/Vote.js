import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthProvider";

const Voters = () => {
  const { user } = useContext(AuthContext);
  const [viewData, setViewData] = useState([]);

  const getData = async () => {
    const url = "http://localhost:3899/api/president/candidate";
    const res = await axios.get(url);
    if (res) {
      setViewData(res.data.data);
    }
  };

  const castVote = async (id) => {
    const url = "http://localhost:3899/api/president/candidate";

    const voteCount = {
      who: user?.token
    };

    await axios.post(`${url}/${id}`, voteCount);
  };

  const deCastVote = async (id, voteID) => {
    const url = "http://localhost:3899/api/president/candidate";

    await axios.delete(`${url}/${id}/${voteID}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Container>
        <Wrapper>
          <Holder>
            <Title>President</Title>
            <Hold>
              {viewData?.map((props) => (
                <Card key={props._id}>
                  <Image />
                  <Name>{props.name}</Name>
                  <Vote>{props.voteCount.length}</Vote>

                  {/* <Button
                    bg
                    onClick={() => {
                      castVote(props._id);
                    }}
                  >
                    Vote for {props.name}
                  </Button>

                  {props.voteCount?.map((el) => (
                    <Button
                      key={el._id}
                      onClick={() => {
                        deCastVote(props._id, el._id);
                      }}
                    >
                      take back Vote for {props.name}
                    </Button>
                  ))} */}

                  {props.voteCount.some((el) =>
                    el.who === user?.token ? <div>True</div> : <div>False</div>
                  )}

                  {props.voteCount.length === 0 ? (
                    <div>
                      <Button
                        bg
                        onClick={() => {
                          castVote(props._id);
                        }}
                      >
                        Vote for {props.name}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {props.voteCount?.map((el) => (
                        <div>
                          {el.who === user?.token ? (
                            <Button
                              key={el._id}
                              onClick={() => {
                                deCastVote(props._id, el._id);
                              }}
                            >
                              take back Vote for {props.name}
                            </Button>
                          ) : (
                            <div>
                              <Button
                                bg
                                onClick={() => {
                                  castVote(props._id);
                                }}
                              >
                                Vote for {props.name}
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </Hold>
          </Holder>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Voters;

const Button = styled.div`
  transform: scale(1);
  transition: all 350ms;
  margin-top: 20px;
  padding: 15px 40px;
  border: 1px solid lightgray;
  border-radius: 3px;
  background-color: ${({ bg }) => (bg ? "#004080" : "red")};
  color: white;
  font-weight: bold;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Vote = styled.div``;

const Name = styled.div`
  margin: 20px 0;
  font-weight: bold;
`;

const Image = styled.img`
  background-color: orange;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 5px;
  border: 1px solid lightgray;
  margin-top: -20px;
`;

const Card = styled.div`
  margin: 20px;
  width: 300px;
  min-height: 150px;
  height: 100%;
  background: white;
  border-radius: 5px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hold = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 30px;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  background-color: lightgray;
`;
