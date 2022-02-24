// our-domain.com/new-meetup
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useSession } from "next-auth/react";
import Link from "next/link";

function NewMeetupPage() {
  const router = useRouter();

  const query = router.query;

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
