import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import dbConnect from "../../utils/dbConnect";
import meetupModel from "../../models/meetupModel";
import userModel from "../../models/userModel";
import { redirect } from "express/lib/response";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        createdBy={props.meetupData.createdBy}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  dbConnect();

  const meetups = await meetupModel.find({});

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  dbConnect();

  const selectedMeetup = await meetupModel.findById(meetupId);
  const creatorUser = await userModel.findById(selectedMeetup.createdBy);

  if (!selectedMeetup&&!creatorUser)
    return {
      redirect: {
        destination: `/blog/dfds`,
      },
    };

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        createdBy: creatorUser.name,
      },
    },
  };
}

export default MeetupDetails;
