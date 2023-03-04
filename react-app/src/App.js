import {React, useState} from 'react';
import axios from 'axios'; 
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState('random');

  const shortenMethods = ["random", "base62"];

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    if(event.target.name === "long"){
      setLongUrl(event.target.value);
    }else if(event.target.name === "short"){
      setShortUrl(event.target.value);
    }
  }

  const longToShort = async () => {
    console.log(longUrl);
    try {
      const response = await axios.post(`http://localhost:7000/longToShort?url=${longUrl}&&method=${selectedOption}`);
      alert(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  const shortToLong = async () => {
    console.log(shortUrl);
    try {
      await axios.get(`http://localhost:7000/shortToLong?url=${shortUrl}`);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>ShortLink</h1>
      <label>Long to short</label>
      <input type="text" name="long" onChange={handleInputChange}></input>
      <select value={selectedOption} onChange={handleSelect}>
        {shortenMethods.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={longToShort}>Convert</button>
    </div>
  );
}

export default App;
