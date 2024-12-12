import { useEffect } from "react";



function App() {
  useEffect(()=>{
    fetch("http://localhost:5000/api")
    .then(res => res.json())
    .then(data => console.log(data))
  })

  return (
    <div className="App"> 
      Test
    </div>
  );
}

export default App;

















