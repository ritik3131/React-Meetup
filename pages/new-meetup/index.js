// our-domain.com/new-meetup
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { signIn, useSession } from "next-auth/react";

function NewMeetupPage() {
  const router = useRouter();
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

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

     await response.json();
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your on meetups and create amazing network opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
