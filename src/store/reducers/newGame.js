const initialState = {
    gameInfo: { id: "mockGame1", name: "Adventure Mock", currentTurn: 1, maxTurns: 20, turnsLeft: 20 },
    playerInfo: { id: "p1", name: "Hero", hp: 100, maxHp: 100, shield: 0 },
    monsterInfo: { id: "m1", name: "Monster", hp: 50, maxHp: 50, shield: 0, gameId: "mockGame1" },
    playerCards: [
      { id: "c1", effect: "DAMAGE", value: 10 },
      { id: "c2", effect: "DAMAGE", value: 20 },
      { id: "c3", effect: "HEAL", value: 15 },
      { id: "c4", effect: "SHIELD", value: 5 },
    ],
    monsterEffect:  { effect: "" }, 
  };
  
  export default function gameReducer(state = initialState, action) {
    switch (action.type) {
      case "GAME_DATA":
        return {
          ...state,
          ...action.payload,
        };
      case "NEXT_TURN":
        return {
          ...state,
          gameInfo: action.payload.gameInfo,
          playerInfo: action.payload.playerInfo,
          monsterInfo: action.payload.monsterInfo,
          playerCards: action.payload.playerCards,
          monsterEffect: action.payload.monsterEffect,
        };
      case "MONSTER_EFFECT":
        return {
          ...state,
          monsterEffect: action.payload,
        };
      default:
        return state;
    }
  }