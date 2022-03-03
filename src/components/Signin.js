import React, { useState } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import pix from "./log.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Signin = () => {
  const [image, setImage] = useState(pix);
  const [avatar, setAvatar] = useState("");

  const model = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(model)
  });

  const createUser = handleSubmit(async (user) => {
    console.log(user);
    const { email, password } = user;

    const url = "http://localhost:3899/api/voter/signin";

    const res = await axios.post(url, { email, password });

    localStorage.setItem("inec", JSON.stringify(res.data.data));
  });

  return (
    <div>
      <Container>
        <Wrapper>
          <Holder>
            <Card onSubmit={createUser}>
              <Input placeholder="Enter Email" {...register("email")} />
              <Input placeholder="Enter Password" {...register("password")} />
              <Button type="submit">Sign in</Button>

              <Info>
                Don't have an account{" "}
                <Move to="/register">Click here to Register </Move>
              </Info>
            </Card>
          </Holder>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Signin;

const Move = styled(Link)`
  text-decoration: none;
  color: red;
`;

const Info = styled.div`
  margin-top: 30px;
  font-weight: bold;
`;

const Button = styled.button`
  transform: scale(1);
  transition: all 350ms;
  margin-top: 20px;
  padding: 15px 40px;
  border: 1px solid lightgray;
  border-radius: 3px;
  background-color: #004080;
  color: white;
  font-weight: bold;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 300px;
  height: 40px;
  padding-left: 5px;
  margin: 5px 0;
`;

const Card = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Holder = styled.div`
  width: 500px;
  height: 350px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  background-color: lightgray;
`;
