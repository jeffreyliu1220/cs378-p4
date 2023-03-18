import "./styles.css";
import Login from "./LoginPage/Login";
import MainPage from "./MainPage/MainPage"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



export default function App() {
  return(
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/MainPage" element={<MainPage/>} />
      </Routes>
    </Router>
    </>
  )
}
