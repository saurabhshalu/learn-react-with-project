import { useMemo, useState } from "react";

function Header(props) {
  return <h1>This is header {props.data}</h1>;
}

function App() {
  const [name, setName] = useState("");
  // let number = 0;
  // for (let i = 0; i <= 5; i++) {
  //   console.log(i);
  //   number += i;
  // }

  //memorize the value
  const number = useMemo(() => {
    let n = 0;
    for (let i = 0; i <= 5; i++) {
      console.log(i);
      n += i;
    }
    return n;
  }, []);

  return (
    <div>
      <Header data={number} />
      <p>data</p>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name}
    </div>
  );
}

export default App;