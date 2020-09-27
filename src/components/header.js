import React, { useState } from "react";

/**
 * Here is where the message containing the greeting message is going to be.
 * Welcome, Raph
 * Could be Good morning, Good afternoon, or evening depending on the time of the day.
 */

function Header() {
    let [name, setName] = useState("");
    const onNameChange = (event) => {
        
        setName(event.target.value);
      };

    name = prompt("Pleaser enter your name")
    return (
        <div>
            <h1>Greetings, {name}</h1>
        </div>

        
        
    )
}

export default Header
