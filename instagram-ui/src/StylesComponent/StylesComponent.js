import styled, { css } from 'styled-components';

const Line = css`
    width: 150px;
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: rotate(-3deg) translateX(-50%);
    height: 2px;
    background-color: rgb(223, 0, 243);
    `;

const Line2 = css`
width: 100%;
content: "";
position: absolute;;
left: -1px;
bottom: 0;
transform: rotate(3deg);
height: 2px;
background-color: rgb(223, 0, 243);
transition: all 0.3s ease-in-out;
    :hover{
        transform: rotate(-3deg);
    }
`;


export const LABEL= styled.label`
position: relative;
::after{ 
    ${Line2}
}
:hover {
color: blue;
}
`;

export const H2 = styled.h2`
font-size: 2em;
text-align: center;
color: greenyellow;
position: relative;
${props => {
        return props.primary && css`
        color:#7c11f7;
      &::after {
       ${Line}
    `
    }}
`;
