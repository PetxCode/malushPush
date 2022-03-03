import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [viewData, setViewData] = useState([]);

  const getData = async () => {
    const url = "http://localhost:3899/api/president/candidate";
    const res = await axios.get(url);
    if (res) {
      setViewData(res.data.data);
    }
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
                </Card>
              ))}
            </Hold>
          </Holder>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Home;

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
