import { Popup } from "react-map-gl";
import { Star } from "@material-ui/icons";
import { format } from "timeago.js";

function SelectedPlacePopup(props) {

    const {latitude, longitude, username, rating, desc, title, createdAt, onClose} = props;

    // const latitude = props.selectedPointId.lat;
    // const longitude = props.selectedPointId.long;
    // const username = props.selectedPointId.username;
    // const rating = props.selectedPointId.rating;
    // const desc = props.selectedPointId.desc;
    // const title = props.selectedPointId.title;
    // const createdAt = props.selectedPointId.createdAt;
    // const onClose = props.onClose;



    return(
        <Popup
        closeOnClick={false}
        onClose={onClose}
        longitude={longitude}
        latitude={latitude}
        anchor="left"
      >
        <div className="card">
          <label>Place</label>
          <h4 className="place">{title}</h4>
          <label>Review</label>
          <p className="desc">{desc}</p>
          <label>Rating</label>
          <div className="stars">
            {Array(rating).fill(<Star className="star" />)}
          </div>
          <label>Information</label>
          <span className="username">
            Created by <b>{username}</b>
          </span>
          <span className="date">{format(createdAt)}</span>
        </div>
      </Popup>
    )
}

export default SelectedPlacePopup;