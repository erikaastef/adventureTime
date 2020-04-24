import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { nextTurn } from "../../store/actions/index";

import superlady from "./img/superlady.png";
import anfibio from "./img/anfibio.png";
import { CircularProgress } from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Button,
  ButtonContainer,
  TurnsReminder,
  TurnsInfo,
  Turns,
  TurnsInnerContainer,
  TurnsLabel,
  TurnsContainer,
  CardsContainer,
  Card,
  Container,
  Board,
  PlayerInfo,
  PlayerProfile,
  Players,
  ImgFrame,
  Img,
  CircularProgressContainer,
} from "./styles.js";

export default () => {
  //NormalHooks
  const dispatch = useDispatch();
  const history = useHistory();
  //Redux Data
  const monsterEffect = useSelector((state) => state.newGame.monsterEffect);
  const gameData = useSelector((state) => state.newGame.game);
  //Alerts
  const [monsterEffectAlert, setMonsterEffectAlert] = useState(false);
  const [defeatAlert, setDefeatAlert] = useState(false);
  const [luckilyWinAlert, setLuckilyWinAlert] = useState(false);
  const [horrorEffectAlert, setHorrorEffectAlert] = useState(false);

  const [readRules, setReadRulesAlert] = useState(false);
  const [card, setCard] = useState("");

  //Deconstructions
  const { gameInfo, playerInfo, monsterInfo, playerCards } = gameData;

  useEffect(() => {
    //GameResults Alerts
    if (gameData) {
      monsterInfo.hp === 0 &&
        setLuckilyWinAlert(
          <SweetAlert
            warning
            title={`IDK how but you${playerInfo.name} just Won... \n Try Another Game and see if you get how luck goes`}
            onConfirm={() => {
              history.push("/");
              dispatch({
                type: "GAME_DATA",
                payload: "",
              });
            }}
            confirmBtnText="GET HOME"
          />
        );
      gameInfo.currentTurn >= 20 &&
        setDefeatAlert(
          <SweetAlert
            warning
            title={`${monsterInfo.name} has Won... \n Try Another Game`}
            onConfirm={() => {
              history.push("/");
              dispatch({
                type: "GAME_DATA",
                payload: "",
              });
            }}
            confirmBtnText="GET HOME"
          />
        );
    }
    // Monster effect Alert
    monsterEffect.effect &&
      setMonsterEffectAlert(
        <SweetAlert
          warning
          title={`${monsterInfo.name} has used ${monsterEffect.effect}!`}
          onConfirm={() => {
            dispatch({ type: "MONSTER_EFFECT", payload: "" });
            setMonsterEffectAlert(false);
          }}
          confirmBtnText="Play Your Next Card!"
        >
          <span>{"VALUE:" + monsterEffect.value}</span>
        </SweetAlert>
      );
    //  Horror effect alert
    monsterEffect.effect === "HORROR" &&
      setHorrorEffectAlert(
        <SweetAlert
          warning
          title={`YOU LOSE A TURN IN HORROR OF THE SITUATIOON!`}
          onConfirm={() => {
            dispatch(nextTurn(null, monsterInfo.gameId));
            setHorrorEffectAlert(false);
          }}
          confirmBtnText="Go to next turn!"
        ></SweetAlert>
      );

    console.log(monsterEffect);
  }, [monsterEffect]);
  //

  return (
    <div>
      {/*Alerts*/}
      {!readRules && (
        <SweetAlert
          warning
          title={`HERE ARE THE RULES`}
          onConfirm={() => {
            setReadRulesAlert(true);
          }}
          confirmBtnText="Good luck!"
        >
          You'll be able to choose a single card per turn and your possible
          choices would be :
          <ul style={{ listStyleType: "none" }}>
            <li>Make damage to your enemy.</li>
            <li>Heal yourself.</li>
            <li>Shield yourself.</li>
          </ul>
          If your enemy activates the horror effect,you won't be able to select
          a card for this turn. <br />
          And finally, to win the game, you must kill the monster before you run
          out of turns or health points.
        </SweetAlert>
      )}
      {monsterEffectAlert}
      {defeatAlert}
      {luckilyWinAlert}
      {horrorEffectAlert}
      {gameData ? (
        <Container>
          <Board>
            <Players>
              <PlayerProfile>
                <ImgFrame>
                  <Img src={anfibio} />
                </ImgFrame>
                <PlayerInfo>
                  <span>{monsterInfo.name}</span>
                  <span>
                    HP: {monsterInfo.hp}/{monsterInfo.maxHp}
                  </span>
                  <span>SHIELD: {monsterInfo.shield}</span>
                </PlayerInfo>
              </PlayerProfile>
              <PlayerProfile>
                <ImgFrame>
                  <Img src={superlady} />
                </ImgFrame>
                <PlayerInfo>
                  <span>{playerInfo.name}</span>
                  <span>
                    HP: {playerInfo.hp}/{playerInfo.maxHp}
                  </span>
                  <span>SHIELD: {playerInfo.shield}</span>
                </PlayerInfo>
              </PlayerProfile>
            </Players>
            <CardsContainer>
              {playerCards.map((card, key) => (
                <Card
                  style={{
                    background:
                      card.effect === "SHIELD"
                        ? "#1474FF"
                        : card.effect === "HEAL"
                        ? "#13CDB1"
                        : "#E31449",
                  }}
                  onClick={() => setCard(card.id)}
                  key={`${key}+${card.id}`}
                >
                  <span>{card.effect}</span>
                  <span>{card.value}</span>
                </Card>
              ))}
            </CardsContainer>
          </Board>
          <TurnsContainer>
            <TurnsLabel>TURNS</TurnsLabel>
            <TurnsInnerContainer>
              <TurnsReminder>
                <Turns>
                  CURRENT: <TurnsInfo>{gameInfo.currentTurn}</TurnsInfo>
                </Turns>
                <Turns>
                  TOTAL: <TurnsInfo>{gameInfo.maxTurns}</TurnsInfo>
                </Turns>
                <Turns>
                  LEFT: <TurnsInfo>{gameInfo.turnsLeft}</TurnsInfo>
                </Turns>
              </TurnsReminder>
              <ButtonContainer>
                <Button
                  onClick={() => dispatch(nextTurn(card, monsterInfo.gameId))}
                >
                  End turn
                </Button>
              </ButtonContainer>
            </TurnsInnerContainer>
          </TurnsContainer>
        </Container>
      ) : (
        <CircularProgressContainer>
          <CircularProgress size={50} style={{ color: "#ff2068" }} />
        </CircularProgressContainer>
      )}
    </div>
  );
};
