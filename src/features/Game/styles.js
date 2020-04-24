import styled from "styled-components"
export const Button = styled.button`
width: fit-content;
margin: 0 2vw;
margin-bottom: 2vh;
color: black;
background: #FE4382;
border: transparent;
border-radius: 0.5rem;
font-size: 1.5rem;
font-family: Cabin Sketch, cursive;
outline: none;
:active{
    opacity:0.7
    }
`
export const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end
`
export const TurnsReminder = styled.ul`
display: flex;
justify-content: space-between;
list-style-type: none;
padding: 0;
color: white;
`
export const Turns = styled.li`
margin: 1vh;
font-size: 2.5rem
`
export const TurnsInfo = styled.span`
color: #FE4382
`
export const TurnsInnerContainer = styled.div`
border: 0.03rem solid #959697;
margin: 2vh;
width: 95%;
align-self: center;
`
export const TurnsLabel = styled.div`
color: white;
font-size: 2rem;
text-align: center;
background: #959697;
border-top-right-radius: 0.5rem;
border-top-left-radius: 0.5rem;
`
export const TurnsContainer = styled.div`
display: flex;
flex-direction: column;
background: #505050;
margin: 0 1vw;
margin-top: 5vh;
border-radius: 0.5rem;
`
export const CardsContainer = styled.div`
display: flex;
flex-wrap:wrap;
height:53vh;
overflow:scroll
`
export const Card = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items:center;
height: 25vh;
width: 10vw;
background: #FE4382;
margin: 1vh;
border: #505050 solid 0.5rem;
border-radius: 0.5rem;
:hover{

color:white;
}
:active{
    opacity:0.7 
}
`
export const PlayerInfo = styled.div`
display: flex;
flex-direction: column;
width: 15vw;
height: 100%;
font-size: 2rem;
justify-content: center;
margin-left: 1.5vw;


`
export const ImgFrame = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 15vw;
background: #505050;
border-bottom-left-radius: 0.5rem;
border-top-left-radius: 0.5rem;

`

export const Img = styled.img`
height: 15vh;
width: 15vh;
background: #959697;
border: 0.08rem solid #959697;
border-radius: 0.5rem;
padding: 10%;

`
export const PlayerProfile = styled.div`
display: flex;
height: 25vh;
width: 35vw;
background: #FE4382;
margin: 1vh;
border-radius: 0.5rem;
`
export const Players = styled.div`
display: flex;
flex-direction: column
`
export const Board = styled.div`
display: flex;
flex-direction: row
`
export const Container = styled.div`
display: flex;
flex-direction: column;
margin: 10vh 10vw;`


export const CircularProgressContainer = styled.div`
height: 100vh; 
display: flex;
justify-content: center;
align-items: center
`