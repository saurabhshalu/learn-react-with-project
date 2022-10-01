import { useRef, useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const totalCharactersRef = useRef(0);
  let totalCharacters = 0;

  console.log("ref=>", totalCharactersRef.current);
  console.log("let=>", totalCharacters);
  return (
    <div>
      <h1>useRef</h1>
      <br />
      <input
        type="text"
        placeholder="name"
        ref={nameRef}
        value={name}
        onChange={(e) => {
          totalCharacters = totalCharacters + 1;
          totalCharactersRef.current = totalCharactersRef.current + 1;
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          alert("Hello");
        }}
      >
        Say
      </button>
      <br />
      {name}
    </div>
  );
}

export default App;