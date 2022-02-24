// our-domain.com/new-meetup
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import axios from "axios";

function NewMeetupPage() {
  const router = useRouter();

  const query = router.query;

  async function updateMeetupHandler(enteredMeetupData) {
    await fetch("/api/update-meetup", {
      method: "PUT",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Updates a New Meetup</title>
        <meta
          name="description"
          content="Updated your on meetups and create amazing network opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={updateMeetupHandler} query={query} />
    </Fragment>
  );
}

export default NewMeetupPage;
