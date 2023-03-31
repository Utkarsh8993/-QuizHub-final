import api from "./api/users";
import About from "./About";
import { useState, useEffect } from "react";
import FinalScreen from "./pages/FinalScreen";
import CreateQuiz from "./pages/CreateQuiz";
import QuizRoom from "./pages/QuizRoom";
import Groups from "./pages/Groups";
import Questions  from '../src/pages/Questions';
import { io } from 'socket.io-client'
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MacBookPro142 from "./pages/MacBookPro142";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleUser } from "./redux/actions";
import CreateRoom from './pages/Settings'
import HomePage from './HomePage'
import Settings from "./pages/Settings";

function App() {
  const { user } = useSelector((state) => state);
  
  const [userData, setUserData] = useState([])
  const [socket , setSocket] = useState(null);
  useEffect(()=>{
    setSocket(io('http://localhost:3500'))} , 
    [])
  const dispatch = useDispatch();
  
  //const [groups, setGroups] = useState([])

useEffect(()=>{
  const fetchUser = async() =>{
    try {
      const userdata = await api.get("/users/profile",{
        withCredentials:true
      })
      console.log(userdata)
     dispatch(handleUser(userdata.data)) 
    } catch (error) {
      console.log(error)
    }
  }
  fetchUser()
} , [])


  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
    
  const pathn = location.pathn;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathn]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathn) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathn]);
  
  
    return (
    <main className="App">
      
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="score" element={<FinalScreen/>} />
        <Route path="createquiz" element={<CreateQuiz/>} />
        <Route path="quizroom" element={<QuizRoom />} />
        <Route path="groups" element={<Groups socket = {socket}/>} />
        <Route path="createquizroom" element={<CreateRoom />} />
        <Route path="login" element={<MacBookPro142 />} />
        <Route path="/questions" element={<Questions socket = {socket}/>} />
        <Route path="/setquestions" element={<Settings/>} />
      </Routes>
     
      
    </main>
    
    )
}

export default App;
