import React, { useState, useContext } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import pix from "./log.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const AddCadidate = () => {
  const { user } = useContext(AuthContext);
  const [position, setPosition] = useState("President");

  const navigate = useNavigate();
  const [image, setImage] = useState(pix);
  const [avatar, setAvatar] = useState("");

  const model = yup.object().shape({
    name: yup.string().required()
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
    const { name } = user;

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${user.token}`
      }
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("avatar", avatar);

    const url = "http://localhost:3899/api/president/candidate/create";

    await axios.post(url, formData, config);

    navigate("/signin");
  });

  const createUser2 = handleSubmit(async (user) => {
    console.log(user);
    const { name } = user;

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: `CodeLab ${user.token}`
      }
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("avatar", avatar);

    const url = "http://localhost:3899/api/secretary/candidate/create";

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

              <Select
                value={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              >
                <option value="President">President</option>
                <option value="vicePresident">Vice President</option>
              </Select>

              {position === "President" ? (
                <Button type="submit">Register {position}</Button>
              ) : position === "vicePresident" ? (
                <Button type="submit">Register {position}</Button>
              ) : null}
            </Card>
          </Holder>
        </Wrapper>
      </Container>
    </div>
  );
};

export default AddCadidate;

const Select = styled.select`
  margin-top: 20px;
  width: 320px;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 3px;
  outline: none;
  padding-left: 10px;
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
