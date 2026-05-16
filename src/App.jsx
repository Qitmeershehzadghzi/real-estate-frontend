import { Route, Routes } from "react-router-dom";
import "./layout.scss";

import Homepage from "./routes/homepage/homePage.jsx";
import ListPage from "./routes/listPage/listPage.jsx";
import SinglePage from "./routes/singlePage/singlePage.jsx";
import Login from "./routes/login/login.jsx";
import Register from "./routes/register/register.jsx";
import ProfilePage from "./routes/profilePage/profilePage.jsx";
import ProfileUpdate from "./routes/profileUpdatePage/profileUpdatePage.jsx";
import { Layout, RequireAuth } from "./routes/layout/layout.jsx";

function App() {
  return (
    <Routes>

      {/* Main Layout */}
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route index element={<Homepage />} />
        <Route path="list" element={<ListPage />} />
        <Route path=":id" element={<SinglePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/update" element={<ProfileUpdate />} />
        </Route>

      </Route>

    </Routes>
  );
}

export default App;