import * as React from "react";
import { useState, useEffect } from "react";
import Map from "react-map-gl";
import "./app.css";
import { Star, Room } from "@material-ui/icons";
import { format } from "timeago.js";
import { Popup, Marker } from "react-map-gl";


function App() {
  const currentUser = "gosia";
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [selectedPointId, setSelectedPointId] = useState(null);

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

  const handleAddClick = (e) => {
    console.log("double click event = ", e);

    let newLat = e.lngLat.lat;
    let newLong = e.lngLat.lng;

    console.log("new lat ----- " + newLat);
    console.log("new long ----- " + newLong);

    setNewPlace({
      newLong,
      newLat,
    });
  };

  const handleMarkerClick = (id) => {
    setSelectedPointId(id);
    console.log("handlePointClick ------" + id);
  };

  let selectedPin = pins.find((pin) => pin._id === selectedPointId);
  console.log("selected pin ----", selectedPin);

  return (
    <div className="App">
      <Map
        key={Math.random}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: 15,
          latitude: 45,
          zoom: 4,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={{ width: "100vw", height: "100vw" }}
        onDblClick={handleAddClick}
      >
        {pins.map((p) => ( <Marker
            longitude={p.long}
            latitude={p.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <Room
              style={{ color: p.username === currentUser ? "tomato" : "slateblue", cursor: "pointer" }}
              onClick={()=>handleMarkerClick(p._id)}

            />
          </Marker>
        ))}

        {newPlace && (
          <Popup
            longitude={newPlace.newLong}
            latitude={newPlace.newLat}
            anchor="right"
            onClose={() => setNewPlace(null)}
          >
            <div>
            <form>
              <label>Title</label>
              <input placeholder="Enter a title"/>
              <label>Review</label>
              <textarea placeholder="Say something about this place" />
              <label>Rating</label>
              <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Add  Pin</button>
            </form>
            </div>
            </Popup>
        )}

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
                <Star className="star" />
                <Star className="star" />
                <Star className="star" />
                <Star className="star" />
                <Star className="star" />
              </div>
              <label>Information</label>
              <span className="username">
                Created by <b>{selectedPin.username}</b>
              </span>
              <span className="date">{format(selectedPin.createdAt)}</span>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;

// longitude={selectedPin.long}
// latitude={selectedPin.lat}
// {pins.map(p => (
// <>
//   <Marker
//     key={Math.Random}
//     longitude={p.long}
//     latitude={p.lat}
//     offsetLeft={-20}
//     offsetTop={-10}
//   >
//     <Room
//     key={Math.Random}
//     style={{ color: "slateblue", cursor: "pointer" }}
//     onClick={()=>handleMarkerClick(p._id)}
//     />
//   </Marker>

// {p._id === currentPlaceId && (<Popup
//     key={Math.Random}
//     longitude={p.long}
//     latitude={p.lat}
//       anchor="left"
//       onClose={() => setCurrentPlaceId(null)}>
//       <div className="card">
//         <label>Place</label>
//         <h4 className="place">{p.title}</h4>
//         <label>Review</label>
//         <p className="desc">{p.desc}</p>
//         <label>Rating</label>
//         <div className="stars">
//           <Star className='star' />
//           <Star className='star' />
//           <Star className='star' />
//           <Star className='star' />
//           <Star className='star' />
//         </div>
//         <label>Information</label>
//         <span className="username">Created by <b>{p.username}</b></span>
//         <span className="date">{format(p.createdAt)}</span>

//       </div>
//     </Popup>) }

// </>

// )
// )}


          // <Points
          //   longitude={p.long}
          //   latitude={p.lat}
          //   id={p._id}
          //   title={p.title}
          //   desc={p.desc}
          //   username={p.username}
          //   createdAt={p.createdAt}
          //   onClick={handlePointClick}
          // />

          //onClose={() => setShowPopup(false)}
