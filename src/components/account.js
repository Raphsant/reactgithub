import React from "react";
import { useState } from "react";
import { auth, provider, usersCollection } from "../data/firebase";

function Account(props) {
  const user = props.user;
  const [userCity, setUserCity] = useState("");

  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      const userToStore = result.user;
      await usersCollection
        .doc(userToStore.uid)
        .set({ name: userToStore.displayName });
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  let contents;
  if (user) {
    contents = (
      <>
        <div className="login-page__container">
          <h2>you are logged in</h2>
          <h1>{user.displayName}</h1>
          <form>
            <h3>Please enter your city </h3>
            <input></input>
          </form>

          <button className="login-page__button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </>
    );
  } else {
    contents = (
      <>
        <h1>hello</h1>
        <button onClick={signIn}>Sign in</button>
      </>
    );
  }

  return <div>{contents}</div>;
}

export default Account;
