import React from "react";
import { useState } from "react";
import { auth, provider, usersCollection } from "../data/firebase";
import "./account.css";
import glogo from "../images/glogo.webp";




function Account(props) {
  const user = props.user;
  const [userCity, setUserCity] = useState("");
  const [city, setCity] = useState("");
  const profilePic = user.photoURL;
  const [isLoading, setIsLoading] = useState(false);
  
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
  

  getCity()

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
          <h1 className="login-page__header">Welcome to Hub</h1>
          <h3 className="login-page__header">
            Your dashboard to everything you need
          </h3>
          <h5 className="login-page__header">To proceed, please sign in</h5>

          <button id="glogo" className="login-page__button" onClick={signIn}>
            <img src={glogo} alt="google-logo" />
          </button>
        </div>
      </>
    );
  }

  return <div>{contents}</div>;
}

export default Account;
