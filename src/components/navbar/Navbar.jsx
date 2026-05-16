import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthCOntext } from "../../context/AuthContext";

function Navbar() {

  const [open, setOpen] = useState(false);

  const { currentuser } = useContext(AuthCOntext);

  console.log(currentuser);

  return (
    <nav>
      <div className="left">

        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </Link>

        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>

      </div>

      <div className="right">

        {currentuser ? (

          <div className="user">

            <img
              src={currentuser?.avatar || "/logo.png"}
              alt=""
            />

            <span>{currentuser?.name || currentuser?.username}</span>

            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>

          </div>

        ) : (

          <>
            <Link to="/login">Sign in</Link>

            <Link to="/register" className="register">
              Sign up
            </Link>
          </>

        )}

        <div className="menuIcon">

          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />

        </div>

        <div className={open ? "menu active" : "menu"}>

          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>

          {!currentuser && (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
