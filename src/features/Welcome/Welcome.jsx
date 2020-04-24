import React, { useState } from "react";
import { NewGame } from "../../store/actions/index"
import { dispatch, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";

import nube from "./img/nube.png";
import "./animaciones.css";
import { Button, Title, Container, Label, Input, Form } from "./styles";

export default function Welcome({ handleSubmit, handleChange }) {
  const [inputValue, setInputValue] = useState("")

  const dispatch = useDispatch()

  return (
    <Container>
      <h2>WELCOME TO</h2>
      <Title>ADVENTURE TIME</Title>
      <img className="adventure" src={nube} alt="" />
      <Form>
        <Label>
          Introduce your AWESOME moniker:
          <Input
            name="name"
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            type="text"
            placeholder="AwesomeMoniker "
          />
        </Label>
        <Link to="/game" style={{ textDecoration: "none" }}>
          <Button onClick={() => {
            dispatch(NewGame(inputValue))
          }} type="submit">
            Lets play!
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
