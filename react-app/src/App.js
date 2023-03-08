import {React, useState} from 'react';
import axios from 'axios'; 
import './App.css';
import Config from '../configData.json';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState('random');
  const [urlMap, setMap] = useState([]);

  const shortenMethods = ["random", "base62"];

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setLongUrl(event.target.value);
  }

  const longToShort = async () => {
    console.log(longUrl);
    try {
      const response = await axios.post(`${Config.longToShortUrl}?url=${longUrl}&&method=${selectedOption}`);
      alert(response.data);
      const pair = {};
      pair[longUrl] = response.data;
      setMap([...urlMap, pair]);
      document.getElementById("longInput").value='';
      setLongUrl('');
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>ShortLink</h1>
      <label>Long to short</label>
      <input id="longInput" type="text" name="long" onChange={handleInputChange}></input>
      <select value={selectedOption} onChange={handleSelect}>
        {shortenMethods.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={longToShort}>Convert</button>
      {urlMap.length>0? 
        <div>{urlMap.map((obj, index) => (
          <ul key={index} style={{listStyleType : "none"}}>
            {Object.entries(obj).map(([key, value]) => (
              <li key={key}>
                <label>{key}: </label>
                <a href={value}>{value}</a>
              </li>
            ))}
          </ul>
        ))}</div>
         : <></>}
    </div>
  );
}

export default App;
