// gameActions.js
import { mockApi } from "../../utils/mockApi";

export const getBoard = (gameId) => async (dispatch) => {
  try {
    const playerPromise = await mockApi.getPlayer(gameId);
    const monsterPromise = await mockApi.getMonster(gameId);
    const gamePromise = await mockApi.getGame(gameId);
    const playerCardPromise = await mockApi.getPlayerCards(playerPromise.data.id);

    const game = gamePromise.data;
    const player = playerPromise.data;
    const monster = monsterPromise.data;
    const playerCards = playerCardPromise.data;

    dispatch({
      type: "GAME_DATA",
      payload: {
        gameInfo: game,
        playerInfo: player,
        monsterInfo: monster,
        playerCards: playerCards,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const nextTurn = (cardId, gameId) => async (dispatch, getState) => {
  const state = getState().game;
  let { playerInfo, monsterInfo, gameInfo, playerCards } = state;

  // Apply card effect
  if (cardId) {
    const card = playerCards.find((c) => c.id === cardId);

    if (card) {
      if (card.effect === "DAMAGE") {
        monsterInfo = {
          ...monsterInfo,
          hp: Math.max(0, monsterInfo.hp - card.value),
        };
      } else if (card.effect === "HEAL") {
        playerInfo = {
          ...playerInfo,
          hp: Math.min(playerInfo.maxHp, playerInfo.hp + card.value),
        };
      } else if (card.effect === "SHIELD") {
        playerInfo = {
          ...playerInfo,
          shield: playerInfo.shield + card.value,
        };
      }
    }
  }

  // Advance turn
  gameInfo = {
    ...gameInfo,
    currentTurn: gameInfo.currentTurn + 1,
    turnsLeft: gameInfo.turnsLeft - 1,
  };

  // Fake monster effect from API
  const { data } = await mockApi.nextTurn(gameId, cardId);

  dispatch({
    type: "NEXT_TURN",
    payload: {
      gameInfo,
      playerInfo,
      monsterInfo,
      playerCards,
      monsterEffect: data.monsterEffect,
    },
  });
};

export const NewGame = (name) => async (dispatch) => {
  try {
    const res = await mockApi.newGame(name);
    dispatch(getBoard(res.data.id));
  } catch (e) {
    console.log(e.message);
  }
};
