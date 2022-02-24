import { useRef, useState } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function NewMeetupForm({ onAddMeetup, query }) {
  const [title, setTitle] = useState(query ? query.title : "");
  const [image, setImage] = useState(query ? query.image : "");
  const [address, setAddress] = useState(query ? query.address : "");
  const [description, setDescription] = useState(
    query ? query.description : ""
  );

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = title;
    const enteredImage = image;
    const enteredAddress = address;
    const enteredDescription = description;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
      id: query && query.id,
    };
    onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            required
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>{!query ? "Add Meetup" : "Update Meetup"}</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
