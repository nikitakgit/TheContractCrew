
import styled from 'styled-components'
import Link from 'next/link'
import {useRouter} from 'next/router';

const MidHomeLeft = () => {
    const Router=useRouter();
  return (
    <MidHomeLeftWrap>
        
        <Heading>WHY CONTRACT CREW?</Heading>
        <Text><Paragraph>Reduces risk and cuts costs for all involved</Paragraph></Text>
        
        <Caption>
            NO PAPERWORK
            NO MIDDLEMEN 
        </Caption>
        <Text><Paragraph> Just fill a form to get your deal approved. </Paragraph></Text>
        <ButtonWrap><Link  style={{textDecoration:'none'}} href="/proposedeal" > <TNavLinks active={Router.pathname=="/proposedeal"?true:false}>
        Propose Contract
      </TNavLinks></Link></ButtonWrap>
        <Text><Paragraph>Scroll down  to see more </Paragraph></Text>
       
        
    </MidHomeLeftWrap>    
  )
}

const TNavLinks=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.colorDiv};     
    text-decoration: none;
    &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
    height: max-content;
    width: max-content;
    font-family: 'Comfortaa';
    margin:7px;
    border-radius: 6px;
    padding: 2px 5px 5px;
    cursor: pointer;
    text-transform: uppercase;
     font-weight: bold ;
     font-size: medium;
    

`

const Text=styled.p`
  margin-top: 0;
`
const MidHomeLeftWrap=styled.div`
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 10rem;
  margin-right: 4rem;
`
const Caption=styled.h1`
   font-family: 'Oswald';
   font-size:1rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.1rem;
   color:${(props) => props.theme.btnColor} ;
`
const Heading=styled.h1`
   font-family: 'Oswald';
   font-size:3.5rem;
   font-weight: 400;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.5rem;
   color:${(props) => props.theme.btnColor} ;
`
const Paragraph=styled.p`
   margin:0;
   font-size: 1rem;
   padding: 0;
   font-weight: 500;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
`
const ButtonWrap = styled.button`
margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-weight: bold;
  //transition: all 0.3s ease;
`

export default MidHomeLeft