import { useCallback, useEffect, useState } from "react";

function Header(props) {
  useEffect(() => {
    console.log("header mounted");
  }, []);

  useEffect(() => {
    console.log("age changed to ", props.age);
  }, [props.sayName, props.age]);

  return <h1 onClick={props.sayName}>This is header {props.age}</h1>;
}

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(20);

  // const sayName = () => {
  //   alert("Hello bro");
  // };
  const sayName = useCallback(() => {
    alert("Hello bro");
  }, []);

  return (
    <div>
      <Header sayName={sayName} age={age} />
      <p>data</p>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(+e.target.value)}
      />
      <button onClick={sayName}>Say</button>
      <br />
      {name}
    </div>
  );
}

export default App;