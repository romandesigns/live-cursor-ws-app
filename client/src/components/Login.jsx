import React from "react";
import { useState } from "react";

export function Login({ onSubmit }) {
  const [userName, setUserName] = useState("");

  return (
    <div>
      <h1>Welcome</h1>
      <p>What should people call you</p>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(userName);
        }}
      >
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          id=""
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
