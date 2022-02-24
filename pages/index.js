import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import dbConnect from "../utils/dbConnect";
import meetupModel from "../models/meetupModel";

function HomePage(props) {
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
        <MeetupList meetups={props.meetups}/>
      ) : (
        <p>Nothing to show</p>
      )}
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  dbConnect();

  const meetups = await meetupModel.find({}).exec();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
