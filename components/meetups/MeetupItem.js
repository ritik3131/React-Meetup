import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(`/${props.id}`);
  };
  const deleteHandler = async () => {
    const response = await fetch("/api/delete-meetup", {
      method: "DELETE",
      body: JSON.stringify(props.id),
    });

    const data = await response.json();

    router.replace("/");
  };

  const updateHandler = () => {
    router.push({ pathname: "/update-meetup", query: props });
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
          {props.put && (
            <>
              {" "}
              <button onClick={updateHandler}>Update</button>
              <button onClick={deleteHandler}>Delete</button>
            </>
          )}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
