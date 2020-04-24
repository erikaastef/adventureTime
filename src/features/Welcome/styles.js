import styled from 'styled-components'

export const Container = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
`
export const Title = styled.p`
font-size: 7rem; text-align: center; margin: 0
`
export const Button = styled.div`
height: 5vh;
color: black;
background: #FE4382;
border: transparent;
border-radius: 0.5rem;
outline: none;
font-size: 1.5rem;
font-family: Cabin Sketch, cursive;`

export const Input = styled.input`
width: 50%;
height: 2rem;
border: transparent;
border-radius: 0.5rem;
margin: 5%;
outline: none;
padding-left: 2%;
font-size: 1rem;
font-family: Special Elite, cursive;
`
export const Label = styled.label`
text-align: center; margin: 2%`

export const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`