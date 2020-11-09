import React from 'react'
import "./app.css"

/**
 * CRUD OPERATION, READ THE DOCUMENT TO GET THE ARRAY OF TO-DOS
 * YOU ARE GOING TO BE ABLE TO DELETE AND EDIT THE TO-DO ELEMENTS
 * I'm going to need a reference of the document of the particular user and map through the entire array of objects to display the elements.
 */

function Events() {
    return (
        <div className="container">
            <h2>
                To-Do
            </h2>
            <h3>Array of to-dos!</h3>
            Placeholder
        <p>
            <button>delete</button>
            <button>edit</button>
        </p>
        </div>
    )
}

export default Events
