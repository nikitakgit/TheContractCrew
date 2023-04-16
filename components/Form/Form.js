import styled from 'styled-components';
import FormLeft from './Components/FormLeft.js';
import FormRight from './Components/FormRight.js';
import { createContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import Link from 'next/link.js';
import GovernmentBody from '../../artifacts/contracts/TheContractCrew.sol/GovernmentBody.json'
import { useRouter } from 'next/router.js';

 const FormState = createContext();

 const Form = () => {
  const Router=useRouter();
   const [form, setForm] = useState({
     category:"Highway",
     projectId:"",
    _projectName:"",
     requiredAmount:"",
     deadline:2217839572

   });

   const [loading , setLoading]= useState(false);
   const[address, setAddress]= useState("");

   const FormHandler = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
   }


   const proposeDeal = async (e) => {
      e.preventDefault();
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      if(form.projectId === ""){
        toast.warn(" Project Id Field is Empty");
      }else if(form._projectName === "")
      {
        toast.warn("Project Name field is Empty")
      }else if(form.requiredAmount === ""){
       toast.warn("Total Expenses field is Empty");
      }else if(form.deadline==""){
        toast.warn("Deadline field is Empty");
    }else{
        setLoading(true);

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_ADDRESS,
          GovernmentBody.abi,
          signer
        );

        const contractData= await contract.proposeDeal(
          form.category,
          form.projectId,
          form._projectName,
          parseInt(form.requiredAmount),
          form.deadline
        );

        
        await contractData.wait();

        setAddress(contractData.to);
      }
         
      }catch{
        console.log("You must not be at an official position to be able to propose a contract");
      }
   }
 
  return (
    <FormState.Provider value={{form, setForm, FormHandler, proposeDeal}}>
    <FormWrap>
        <Main>
        {loading == true ?
            address==""?
              <Spinner>
                  <TailSpin height={60} />
              </Spinner> :
              <Address>
                  <TopLeftWrap>
                     <Paragraph>Dear Contractor </Paragraph>
                     <Heading>CONGRATULATIONS</Heading>
                     <Text><Paragraph>Your Deal Has Been Initiated Sucessfully</Paragraph></Text>
        
                     <Caption>MAY THE BEST DEAL GET AWARDED!!</Caption>
                     <Text><Paragraph>Your deal is deployed at address:  </Paragraph></Text>
                     <Text><Paragraph>{address}</Paragraph></Text>
                     <Text><Paragraph>We encourage you to keep a copy of it for future reference </Paragraph></Text>
                     <Text><Paragraph>To see your contract proposal status  </Paragraph></Text>
                     <ButtonWrap><Link  style={{textDecoration:'none'}} href="/pendingcontract" > <TNavLinks active={Router.pathname=="/pendingcontract"?true:false}>Click Here</TNavLinks></Link></ButtonWrap>
                     <Text><Paragraph>Best Of Luck!! </Paragraph></Text>
       
        
                  </TopLeftWrap>
              </Address>
                   
            :
             <FormInputsWrap>
                 <FormLeft/>
                <FormRight/>
             </FormInputsWrap>
        }
        </Main>
     </FormWrap>
    </FormState.Provider>
  )
        }


const FormWrap=styled.div`
  padding-top:rem;
   width: 100%;
   display: flex;
   justify-content: center;
`
const Main=styled.div`
   width:60%;

`

const FormInputsWrap=styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`

const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
`

const Button = styled.button`
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
const TopLeftWrap=styled.div`
  padding-top: 5rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Caption=styled.h1`
   font-family: 'Oswald';
   font-size:1rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.2rem;
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

export default Form
export {FormState};