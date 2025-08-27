// mockApi.js
let mockGameId = 1;

const mockGame = {
  id: mockGameId,
  name: "Adventure Time",
  currentTurn: 1,
  maxTurns: 20,
  turnsLeft: 19,
};

const mockPlayer = {
  id: 101,
  name: "Finn",
  hp: 100,
  maxHp: 100,
  shield: 0,
  gameId: mockGameId,
};

const mockMonster = {
  id: 201,
  name: "Ice King",
  hp: 80,
  maxHp: 80,
  shield: 0,
  gameId: mockGameId,
};

const mockCards = [
  { id: 1, effect: "DAMAGE", value: 10, cost: 1 },
  { id: 2, effect: "DAMAGE", value: 15, cost: 2 },
  { id: 3, effect: "HEAL", value: 10, cost: 1 },
  { id: 4, effect: "SHIELD", value: 5, cost: 1 },
];

export const mockApi = {
  getGame: async (gameId) => {
    return { data: { ...mockGame, id: gameId } };
  },

  getPlayer: async (gameId) => {
    return { data: { ...mockPlayer, gameId } };
  },

  getMonster: async (gameId) => {
    return { data: { ...mockMonster, gameId } };
  },

  getPlayerCards: async (playerId) => {
    return { data: mockCards };
  },

  nextTurn: async (gameId, cardId) => {
    // Fake monster effect
    const monsterEffect = {
      effect: "ATTACK",
      value: 5,
    };

    return {
      data: {
        game: {
          ...mockGame,
          id: gameId,
          currentTurn: mockGame.currentTurn + 1,
          turnsLeft: mockGame.turnsLeft - 1,
        },
        monsterEffect,
      },
    };
  },

  newGame: async (name) => {
    mockGameId++;
    return { data: { id: mockGameId, name } };
  },
};
