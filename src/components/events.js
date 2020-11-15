import React, { useEffect } from "react";
import "./event.css";
import { db} from "../data/firebase";
import { useState } from "react";
import { Delete } from "@material-ui/icons";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@material-ui/core/Button";
import DatePicker from "react-datepicker";

function Events() {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState([]);
  const username = localStorage.getItem("username");
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    setDidError(false)
    try {
      await db
        .collection(username + "_TODOS")
        .doc(title)
        .set({ title: title, date: date });
    } catch (error) {
      console.error(error);
      setDidError(true);
      setErrorMessage("Something went wrong, please try again!");
    }
    setIsLoading(false)

  };

  useEffect(() => {
    const onNext = (snapshot) => {
      const docs = snapshot.docs;
      setTodo(docs);
      console.log(docs);
    };
    const onError = (error) => {
      console.error(error);
    };
    const unsubscribe = db.collection(username+ "_TODOS").orderBy("title", "desc").onSnapshot(onNext, onError);
    return unsubscribe;
  }, [username]);


  return (
    <div className="main-container">
      <div className="event-container">
        <h2>Add a new To-Do</h2>
        {didError && <h4>{errorMessage}</h4>}
        {isLoading && <h4>is loading please wait</h4>}
         <div>
          <form onSubmit={onLoginSubmit}>
            <label htmlFor="">
              <h3>Title:</h3>
            </label>
            <input value={title} onChange={onTitleChange}></input>
            <div>
              <label htmlFor="">
                <h3>Date:</h3>
              </label>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
            <Button className="event-container__submit-button" variant="contained" type="submit" disabled={isLoading}>
              Add to-do
            </Button>
          </form>
        </div>
      </div>
      <div className="todo-container">

        <h2>TO-DO</h2>
        {todo.map((todoDoc) => {
          const todoData = todoDoc.data();
          const id = todoDoc.id;
          const titles = todoData.title;
          const dates = todoData.date.toDate().toString();
          const deleteTodo = async () => {
            try {
              const docRef = db.collection(username + "_TODOS").doc(id);
              await docRef.delete();
            } catch (error) {
              console.error(error);
            }
          };
          return (
            <ul>
              <li key={id}>
              <h3>{titles}</h3>
              <h5>{dates}</h5>
              <button onClick={deleteTodo}>
              <Delete />
              </button>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
