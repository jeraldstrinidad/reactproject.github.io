import React from "react";

function Greeting() {
  const sayhi = (name, surname) => {
    alert("Hi " + name + " " + surname);
  };

  return (
    <div>
      <button onClick={() => sayhi("Jerald", "Trinidad")}>Say Hi</button>
    </div>
  );
}

export default Greeting;
