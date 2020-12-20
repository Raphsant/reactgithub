import React from "react";
import { useState } from "react";
import { auth, usersCollection } from "../data/firebase";
import "./account.css";


function Account(props) {
  const user = props.user;
  const [userCity, setUserCity] = useState("");
  const [city, setCity] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    setIsLoading(true);

    try {
      await auth.signInWithEmailAndPassword(username, password);
    } catch (error) {
      if (error.code === "auth/user-disabled") {
        setErrorMessage("That account has been disabled.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("The email or password is incorrect.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("The email or password is incorrect.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage(
          "That email isn't valid. Please try a valid email address."
        );
      } else {
        setErrorMessage("Something went wrong. Please try logging in again.");
      }
      console.error(error);
    }
    setIsLoading(false);
  };

  const createAccount = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await auth.createUserWithEmailAndPassword(username, password);
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setErrorMessage(
          "That password is too weak. Please try a more secure password with at least 6 characters."
        );
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage(
          "That email isn't valid. Please try a valid email address."
        );
      } else if (error.code === "auth/operation-not-allowed") {
        setErrorMessage(
          "Password log in hasn't been enabled. If you are dev, make sure to enable it in your Firebase Console."
        );
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMessage("That email is already in use.");
      } else {
        setErrorMessage("Something went wrong. Please try logging in again.");
      }
      console.error(error);
    }
    setIsLoading(false);
  };

  const onAccountDetailsChange = (event) => {
    setUserCity(event.target.value);
  };

  const onAccountDetailSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      await usersCollection.doc(user.uid).set(
        {
          city: userCity,
        },
        { merge: true }
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }

    document.getElementById("input").value = "";
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
    const profilePic = user.photoURL;
    async function getCity() {
      usersCollection
        .doc(user.uid)
        .get()
        .then(function (doc) {
          const data = doc.data();
          setCity(data.city);
        });
      return city;
    }
    getCity();
    contents = (
      <>
        <div className="account__container">
          <div className="account-details">
            <div className="account-details__name">
              <h1>{user.displayName}</h1>
            </div>
            <div className="account-details__picture">
              <img id="pfp" src={profilePic} alt="profilePicture" />
            </div>
          </div>
          {isLoading && <h4>is loading please wait...</h4>}
          <form onSubmit={onAccountDetailSubmit}>
            <h3>Please enter your city </h3>
            <input
              id="input"
              value={userCity}
              onChange={onAccountDetailsChange}
            ></input>
            <button className="account__button"> enter </button>
          </form>
          <h5>Current city: {city}</h5>
        </div>
        <div>
          <button className="login-page__button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </>
    );
  } else {
    contents = (
      <>
        <div className="sign-in__container">
          {errorMessage}
          <h1 className="login-page__header">Welcome to Hub</h1>
          <h3 className="login-page__header">
            Your dashboard to everything you need
          </h3>
          <h5 className="login-page__header">
            To proceed, please sign in or create a new account
          </h5>
          <form>
            <input
              type="email"
              value={username}
              placeholder="email"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <button className="account__button" onClick={signIn}>
            {" "}
            sign in{" "}
          </button>
          <button className="account__button" onClick={createAccount}>
            {" "}
            create account{" "}
          </button>
        </div>
      </>
    );
  }

  return <div>{contents}</div>;
}

export default Account;
