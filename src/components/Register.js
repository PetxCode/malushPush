import React, { useState } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import pix from "./log.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(pix);
  const [avatar, setAvatar] = useState("");

  const model = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref("password"), null])
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(model)
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);

    setImage(save);
    setAvatar(file);
  };

  const createUser = handleSubmit(async (user) => {
    console.log(user);
    const { name, email, password } = user;

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const url = "http://localhost:3899/api/voter/register";

    await axios.post(url, formData, config);

    navigate("/signin");
  });

  return (
    <div>
      <Container>
        <Wrapper>
          <Holder>
            <Image src={image} />
            <ImageInput id="pix" type="file" onChange={handleImage} />
            <ImageLabel htmlFor="pix">Upload An Image</ImageLabel>

            <Card onSubmit={createUser} type="multipart/form-data">
              <Input placeholder="Enter Name" {...register("name")} />
              <Input placeholder="Enter Email" {...register("email")} />
              <Input placeholder="Enter Password" {...register("password")} />
              <Input placeholder="Enter Confirm" {...register("confirm")} />
              <Button type="submit">Register</Button>

              <Info>
                Already have an account{" "}
                <Move to="/signin">Click hete to Sign in</Move>
              </Info>
            </Card>
          </Holder>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Register;

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

const ImageLabel = styled.label`
  padding: 20px 40px;
  border-radius: 30px;
  background-color: #004080;
  color: white;
  font-weight: bold;
  margin-bottom: 30px;
  transform: scale(1);
  transition: all 350ms;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  background-color: orange;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 30px;
  border: 1px solid lightgray;
`;

const Holder = styled.div`
  width: 500px;
  height: 600px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding-bottom: 30px;
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
