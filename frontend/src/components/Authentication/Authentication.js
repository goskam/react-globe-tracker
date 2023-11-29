import Register from "./Register";
import Login from "./Login";
import { useState } from "react";


function Authentication({currentUser, setCurrentUser}) {

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}

      {currentUser ? (
        <button className="button logout" onClick={()=>setCurrentUser(null)}>
          Log out
        </button>
      ) : (
        <div className="buttons">
          <button className="button login" onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button
            className="button register"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      )}

    </div>
  );
}

export default Authentication;