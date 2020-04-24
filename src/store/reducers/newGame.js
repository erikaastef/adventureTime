
const initialState = {
    game: "",
    monsterEffect: ""
}

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case "GAME_DATA":
            return { ...state, game: payload }
        case "MONSTER_EFFECT":
            return { ...state, monsterEffect: payload }
        default:
            return state

    }
}