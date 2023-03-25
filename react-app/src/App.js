import {React, useState} from 'react';
import axios from 'axios'; 
import './App.css';
import Config from './configData.json';

function App() {
  const [longUrl, setLongUrl] = useState('Enter URL here ...');
  const [selectedOption, setSelectedOption] = useState('random');
  const [urlMap, setMap] = useState([]);

  const shortenMethods = ["random", "base62"];

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    if(event.target.value === ''){
      setLongUrl('Enter URL here ...');
    }else if(event.target.value.includes('Enter URL here ...')){
      setLongUrl(event.target.value.split('Enter URL here ...')[1]);
    }else{
      setLongUrl(event.target.value);
    }
  }

  const longToShort = async () => {
    console.log(longUrl);
    try {
      const response = await axios.post(`${Config.longToShortUrl}?url=${longUrl}&&method=${selectedOption}`);
      alert(response.data);
      const pair = {};
      pair[longUrl] = response.data;
      setMap([...urlMap, pair]);
      setLongUrl('Enter URL here ...');
      document.getElementById("longInput").value=longUrl;
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="App">
      <h1 className="title">ShortLink</h1>
      <div className="inputContainer">
        <input id="longInput" type="text" name="long" onChange={handleInputChange} className="inputField" value={longUrl}></input>
        <select value={selectedOption} onChange={handleSelect} className="selectMethod">
          {shortenMethods.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <button onClick={longToShort} className="convertButton">Convert</button>
      </div>
      {urlMap.length>0? 
        <div>{urlMap.map((obj, index) => (
          <ul key={index} style={{listStyleType : "none"}}>
            {Object.entries(obj).map(([key, value]) => (
              <li key={key}>
                <div>
                  <label style={{color: "white"}}>{key}: </label>
                  <a href={value}>{value}</a>
                </div>
              </li>
            ))}
          </ul>
        ))}</div>
         : <></>}
    </div>
  );
}

export default App;
