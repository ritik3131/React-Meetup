import Head from "next/head";

import MeetupList from "../../components/meetups/MeetupList";
import { Fragment } from "react";
import dbConnect from "../../utils/dbConnect";
import meetupModel from "../../models/meetupModel";
import { getSession, useSession } from "next-auth/react";
import { ObjectId } from "mongodb";

function HomePage(props) {
  const { data: session } = useSession();

  if (!session)
    return (
      <div>
        <h2>You are not authorised to this </h2>
        <p>To see this </p>
        <Link href="/api/auth/signin">
          <a
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Signin
          </a>
        </Link>
      </div>
    );

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
          sessionUser={session!==undefined ? session.user.id : "dfsdfsd"}
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

  if (session === undefined||!session)
    return {
      redirect: {
        destination: `/`,
      },
    };

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
