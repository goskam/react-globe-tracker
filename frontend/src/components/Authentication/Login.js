import { Room, Cancel } from "@material-ui/icons";
import "./login.css";
import { useState, useRef } from "react";

function Login({ setShowLogin, setCurrentUser }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch("http://localhost:8802/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(user),
      });

      setCurrentUser(nameRef.current.value)
      setError(false);
      setShowLogin(false);

    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Globe Tracker</span>
      </div>
      <form onSubmit={handleLogin}>
        <input autoFocus placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn" type="submit">Login</button>
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
      {error && <span className="failure">Something went wrong.</span>}
    </div>
  );
}

export default Login;
