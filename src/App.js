import { Route,Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      {/* <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
          /> */}
{/*         
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        /> */}

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  
      </Routes>
    </div>
  )
}

export default App;
