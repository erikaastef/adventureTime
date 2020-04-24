
import axios from "axios"

export const getBoard = (gameId) => async dispatch => {
    try {

        //fetchs
        const playerPromise = await axios.get(`http://game.bons.me/api/games/${gameId}/player`)
        const monsterPromise = await axios.get(`http://game.bons.me/api/games/${gameId}/monster`)
        const gamePromise = await axios.get(`http://game.bons.me/api/games/${gameId}`)

        //PlayerCards
        const playerCardPromise = await axios.get(`http://game.bons.me/api/players/${playerPromise.data.id}/cards`)

        //Responses
        const game = gamePromise.data
        const player = playerPromise.data
        const monster = monsterPromise.data
        const playerCards = playerCardPromise.data

        dispatch({
            type: "GAME_DATA", payload: {
                gameInfo: game,
                playerInfo: player,
                monsterInfo: monster,
                playerCards: playerCards
            }
        })
    }
    catch (error) {
        console.log(error.message)
    }


}

export const nextTurn = (cardId, gameId) => dispatch => {
    axios.post(`http://game.bons.me/api/games/${gameId}/next-turn`, { "card": cardId })
        .then(res => {
            dispatch({ type: "MONSTER_EFFECT", payload: res.data.monsterEffect })
            dispatch(getBoard(res.data.game.id))
        })
        .catch(e => console.log(e.message))

}

export const NewGame = (name) => dispatch => {
    return axios.post('http://game.bons.me/api/games', { name: name })
        .then(res => res.data.id)
        .then(id => dispatch(getBoard(id)))
        .catch(e => console.log(e.message))
}

