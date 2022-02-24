import Head from "next/head";

import MeetupList from "../../components/meetups/MeetupList";
import { Fragment } from "react";
import dbConnect from "../../utils/dbConnect";
import meetupModel from "../../models/meetupModel";
import { getSession, useSession } from "next-auth/react";
import { ObjectId } from "mongodb";

function HomePage(props) {
  const { data: session } = useSession();
  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>{" "}
      {props.meetups.length > 0 ? (
        <MeetupList
          meetups={props.meetups}
          sessionUser={session ? session.user.id : "dfsdfsd"}
        />
      ) : (
        <p>Nothing to show</p>
      )}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  // fetch data from an API
  const session = await getSession(context);

  dbConnect();

  const meetups = await meetupModel
    .find({ createdBy: ObjectId(session.user.id) })
    .exec();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        description: meetup.description,
        createdBy: meetup.createdBy.toString(),
      })),
    },
  };
}

export default HomePage;
