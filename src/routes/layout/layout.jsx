// import "./layout.scss";
// import Navbar from "../../components/navbar/Navbar"
// import { Outlet } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { AuthCOntext } from "../../context/AuthContext";

// function Layout() {
//   return (
//     <div className="layout">
//       <div className="navbar">
//         <Navbar />
//       </div>
//       <div className="content">
//         <Outlet/>
//       </div>
//     </div>
//   );
// }



// function RequireAuth() {
//   const { currentuser } = useContext(AuthCOntext);
//   return !currentuser ?(
//     <Navigate to="/login"/>
//   ) :(
//     <div className="layout">
//       <div className="navbar">
//         <Navbar />
//       </div>
//       <div className="content">
//         <Outlet/>
//       </div>
//     </div>
//   );
// }
// export default {Layout,RequireAuth};


import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCOntext } from "../../context/AuthContext";

export function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export function RequireAuth() {

  const { currentuser } = useContext(AuthCOntext);

  if (!currentuser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}