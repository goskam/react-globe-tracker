import { Popup } from "react-map-gl";
import { useState } from "react";


function NewPlacePopup(props) {

    const {latitude, longitude, onSubmit, onClose} = props;

    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPin = {
            latitude,
            longitude,
            title,
            desc,
            rating
        }
        onSubmit(newPin)
    }

    return(
        <Popup
        longitude={longitude}
        latitude={latitude}
        anchor="right"
        onClose={onClose}
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
    )
}

export default NewPlacePopup;