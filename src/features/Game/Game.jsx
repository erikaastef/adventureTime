import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nextTurn } from "../../store/actions/index";

import superlady from "./img/superlady.png";
import anfibio from "./img/anfibio.png";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
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
  const navigate = useNavigate();

  const [readRules, setReadRulesAlert] = useState(false);
  const [card, setCard] = useState("");

  const { playerInfo, monsterInfo, playerCards, gameInfo, monsterEffect } = useSelector((s) => s.game);

  const gameData = gameInfo; 
  

  useEffect(() => {
    if (!readRules) {
      Swal.fire({
        title: "HERE ARE THE RULES",
        icon: "warning",
        html: `
          You'll be able to choose a single card per turn and your possible choices would be :
          <ul style="list-style-type: none; text-align: left;">
            <li>• Make damage to your enemy.</li>
            <li>• Heal yourself.</li>
            <li>• Shield yourself.</li>
          </ul>
          If your enemy activates the horror effect, you won't be able to select a card for this turn. <br/>
          And finally, to win the game, you must kill the monster before you run out of turns or health points.
        `,
        confirmButtonText: "Good luck!",
      }).then(() => {
        setReadRulesAlert(true);
      });
    }
  }, [readRules]);
  
  useEffect(() => {
    //GameResults Alerts
    if (gameData) {
      monsterInfo.hp === 0 &&
      Swal.fire({
        icon: "warning",
        title: `IDK how but you ${playerInfo.name} just Won...`,
        text: "Try Another Game and see how luck goes!",
        confirmButtonText: "GET HOME"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
          dispatch({
            type: "GAME_DATA",
            payload: "",
          });
        }
      });

      gameInfo.currentTurn >= 20 &&
      Swal.fire({
        icon: "warning",
        title: `${monsterInfo.name} has Won... \n Try Another Game`,
        confirmButtonText: "GET HOME"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
          dispatch({
            type: "GAME_DATA",
            payload: "",
          });
        }
      });
    // Monster effect Alert
    monsterEffect.effect &&
    Swal.fire({
      icon: "warning",
      title: `${monsterInfo.name} has used ${monsterEffect.effect}!`,
      html: "VALUE:" + monsterEffect.value,
      confirmBtnText:"Play Your Next Card!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "MONSTER_EFFECT", payload: "" });
      }
    });
    
    //  Horror effect alert
    monsterEffect.effect === "HORROR" &&
    Swal.fire({
      icon: "warning",
      title:`YOU LOSE A TURN IN HORROR OF THE SITUATIOON!`,
       confirmBtnText:"Go to next turn!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(nextTurn(null, monsterInfo.gameId));
      }
    });
    }
  

  }, [monsterEffect]);
  //

  return (
    <div>
     
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
