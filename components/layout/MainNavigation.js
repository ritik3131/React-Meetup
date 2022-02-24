import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function MainNavigation() {
  const { data: session } = useSession();
  const router =useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Next Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>

          {!session && (
            <li style={{marginRight:'3rem'}}>
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
            </li>
          )}
          {session && (
            <div className={classes.signin}>
              <li>
                <Link href="/new-meetup">Add New Meetup</Link>
              </li>
              <li>
                <Link href="/our-meetup">Our Meetup</Link>
              </li>
              <li>
                <Link href="/api/auth/signout">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign Out
                  </a>
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
