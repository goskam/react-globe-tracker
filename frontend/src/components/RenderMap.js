import * as React from "react";
import { useState, useEffect } from "react";
import Map from "react-map-gl";
import { Star, Room } from "@material-ui/icons";
import { format } from "timeago.js";
import { Popup, Marker } from "react-map-gl";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import NewPlacePopup from "./Popup/NewPlacePopup";


function RenderMap() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [selectedPointId, setSelectedPointId] = useState(null);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  //EXISTING PINS

  //get all existing pins

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await fetch("http://localhost:8802/api/pins");
        if (res.ok) {
          const data = await res.json();
          console.log("Received JSON data:", data);
          setPins(data);
        } else {
          console.log(`Error: ${res.status} - ${res.statusText}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPins();
  }, []);

  //find pin id for selected point, selectedPin is used to set Popup information for existing pin

  let selectedPin = pins.find((pin) => pin._id === selectedPointId);
  console.log("selected pin ----", selectedPin);

  //showing popup for existing pin - on marker click

  const handleMarkerClick = (id) => {
    setSelectedPointId(id);
    console.log("handlePointClick ------" + id);
  };

  //NEW PLACE

  //adding new place - double click on map

  const handleAddClick = (e) => {
    console.log("current user is: " + currentUser);
    console.log("double click event = ", e);

    let newLat = e.lngLat.lat;
    let newLong = e.lngLat.lng;

    if (currentUser) {
      setNewPlace({
        latitude: newLat,
        longitude: newLong,
      });
    }

    console.log("new lat ----- " + newLat);
    console.log("new long ----- " + newLong);
  };

  //adding new place - submitting new place details

  const handleNewPopupSubmit = async (newPin) => {
  
    const pin = {
      username: currentUser,
      long: newPin.longitude,
      lat: newPin.latitude,
      rating: newPin.rating,
      desc: newPin.desc,
      title: newPin.title,
    };

    console.log("Log a new pin details" + pin);
    try {
      const response = await fetch("http://localhost:8802/api/pins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(pin),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      setPins([...pins, data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  //set current user to null on logout

  const handleLogout = () => {
    setCurrentUser(null);
  };




  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: 16,
        latitude: 48,
        zoom: 4,
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      style={{ width: "100vw", height: "50vw" }}
      onDblClick={handleAddClick}
    >

      {pins.map((p) => (
        <Marker
          longitude={p.long}
          latitude={p.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room
            style={{
              color: p.username === currentUser ? "tomato" : "slateblue",
              cursor: "pointer",
            }}
            onClick={() => handleMarkerClick(p._id)}
          />
        </Marker>
      ))}

       {newPlace && <NewPlacePopup latitude={newPlace.latitude} longitude={newPlace.longitude} onSubmit={handleNewPopupSubmit} onClose={()=>{setNewPlace(null)}}/>}

{/* 
      {newPlace && (
        <Popup
          longitude={newPlace.newLong}
          latitude={newPlace.newLat}
          anchor="right"
          onClose={() => setNewPlace(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Review</label>
              <textarea
                placeholder="Say something about this place"
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">
                Add Pin
              </button>
            </form>
          </div>
        </Popup>
      )} */}

      {selectedPointId && (
        <Popup
          closeOnClick={false}
          onClose={() => setSelectedPointId(null)}
          longitude={selectedPin.long}
          latitude={selectedPin.lat}
          key={selectedPin.long + selectedPin.long}
          anchor="left"
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{selectedPin.title}</h4>
            <label>Review</label>
            <p className="desc">{selectedPin.desc}</p>
            <label>Rating</label>
            <div className="stars">
              {Array(selectedPin.rating).fill(<Star className="star" />)}
            </div>
            <label>Information</label>
            <span className="username">
              Created by <b>{selectedPin.username}</b>
            </span>
            <span className="date">{format(selectedPin.createdAt)}</span>
          </div>
        </Popup>
      )}

      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}

      {currentUser ? (
        <button className="button logout" onClick={() => handleLogout()}>
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
    </Map>
  );
}

export default RenderMap;
