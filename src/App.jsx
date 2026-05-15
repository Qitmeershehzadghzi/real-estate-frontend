import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import Homepage from "./routes/homepage/homePage.jsx";
import ListPage from "./routes/listPage/listPage.jsx";
import Layout from "./routes/layout/layout.jsx";
import SinglePage from "./routes/singlePage/singlePage.jsx";
import Login from "./routes/login/login.jsx";
import Register from "./routes/register/register.jsx";
import ProfilePage from "./routes/profilePage/profilePage.jsx";
function App() {
  return (
    <Routes>
      {/* Layout route with nested pages */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/:id" element={<SinglePage />} />
        
        <Route path="/profile" element={ <ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
      </Route>
    </Routes>
  );
}

export default App;