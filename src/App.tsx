import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");

  const handleSubmit = async () => {

    const payload = {
      language,
      code
    }
    try{
      const { data } = await axios.post("http://localhost:8080/run", payload)
      setOutput(data.output)
    }
    catch(err: any) {
      setOutput(err.response.data.err.stderr)
      console.log(err.response.data.err.stderr)
    }
  }

  const Languages =[
    {
      value: "cpp",
      lable: "C++",
    },
    {
      value: "c",
      lable: "C",
    },
    {
      value: "py",
      lable: "Python",
    },
  ]

  return (
    <div className="App">
      <h1>Online Compiler</h1>
      <div>
       <label> Language: </label>
        <select
          value={language}
          onChange={(e:any) => setLanguage(e.target.value)}
        >
          {
            Languages.map((item:any,index:any) =>{
              return (
                <option value={item.value} key={`language-${index}`}>{item.lable}</option>
              )
            })
          }
        </select>
      </div>
      <br/>
      <textarea
        rows={20}
        cols={75}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
