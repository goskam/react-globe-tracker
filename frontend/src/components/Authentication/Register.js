import "./register.css";
import { Room, Cancel } from "@material-ui/icons";
import { useState, useRef } from "react";

function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("username from ref" + nameRef.current.value)
    console.log("email from ref" + emailRef.current.value)


    try {
        const res = await fetch("http://localhost:8802/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(newUser),
          });
          setSuccess(true);
    } catch (err) {
      setError(true);
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        Globe Tracker
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerBtn" type="submit">
          Register
        </button>

        {success && (
          <span className="success">Successful. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong.</span>}
      </form>
      <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}/>
    </div>
  );
}

export default Register;
