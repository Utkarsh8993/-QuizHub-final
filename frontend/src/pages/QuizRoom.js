import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleQuizID, handleQuizCode } from '../redux/actions';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import api from "../api/users";
import "./Quizroom.css";

const QuizRoom = () => {

    const [err , setErr] = useState('')
    const navigate = useNavigate();
    const [pass, setPass] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [pass3, setPass3] = useState('')
    const dispatch = useDispatch();

    const handlePassChange = (e) => {
      e.preventDefault();
        setPass(e.target.value);
    }
    const handlePassChange1 = (e) => {
      e.preventDefault();
        setPass1(e.target.value);
    }
    const handlePassChange2 = (e) => {
      e.preventDefault();
        setPass2(e.target.value);
    }
    const handlePassChange3 = (e) => {
      e.preventDefault();
        setPass3(e.target.value);
    }

      const  handleCreateRoom =  () =>{
       /*  e.preventDefault();
        try {
          console.log(value)
          const addition = await api.post(`/quiz/${quizid}`, {
            name : value
          },{
            withCredentials:true
          });
          console.log(addition.data)
        } catch (error) {
          console.log(error)
        } */
        navigate("/")
    }

     const  handleJoinRoom = async (e) =>{
       e.preventDefault();
      
       try {
       
         const join = await api.post('/quiz/join', {
           requestKey : pass + pass1 + pass2 + pass3
         },{
           withCredentials:true
         });
         console.log(join)
         if(join.status === 200){
          console.log(join.data.code)
          dispatch(handleQuizCode(join.data.code.RoomID))
          dispatch(handleQuizID(join.data.code._id))
          navigate('/groups')
         } 
         
       } catch (error) {
       
        if(error.response){
          setErr(error.response.data.message)
        }
         console.log(error.response)
       }
      
   }

 

    
    return (
      
      <div className="room-enter">  
      <div className="frame-parent-5">
        <div className="keyoutline-parent">
          {err === '' &&
             <img className="keyoutline-icon" alt="" src="/keyoutline.svg" />
          }
          { err !== '' && 
              <span className="enter-the-code">{err}</span>
          }
          { err === '' &&
            <span className="enter-the-code">Enter the code</span>
          }
        </div>
        <div className="otp-enter">
      <input className="otp-enter-item" type="text" placeholder="1" 
            maxLength={1}
            value={pass}
      onChange={(e) => handlePassChange(e)}
      required
      autoFocus
          />
          <input className="otp-enter-item" type="text" placeholder="2" maxLength={1}
          value={pass1}
          onChange={(e) => handlePassChange1(e)}required
          />
          <input className="otp-enter-item" type="text" placeholder="3" maxLength={1}
          value={pass2}
          onChange={(e) => handlePassChange2(e)}required
          />
          <input className="otp-enter-item" type="text" placeholder="A" maxLength={1}
          value={pass3}
          onChange={(e) => handlePassChange3(e)}required
          />
    </div>
        <button className="next-container"  onClick={(e) => handleJoinRoom(e)}>
          <div className="next1" >Next</div>
        </button>
      </div>
    </div>
    )
  
  }

export default QuizRoom
    

