import {React, useState} from 'react';
import axios from 'axios'; 
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  function handleInputChange(event) {
    if(event.target.name === "long"){
      setLongUrl(event.target.value);
    }else if(event.target.name === "short"){
      setShortUrl(event.target.value);
    }
  }

  const longToShort = async () => {
    console.log(longUrl);
    try {
      const response = await axios.get(`http://localhost:7000/shortToLong?url=${longUrl}`);
      alert(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  const shortToLong = async () => {
    console.log(shortUrl);
    try {
      const response = await axios.get(`http://localhost:7000/shortToLong?url=${shortUrl}`);
      alert(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>ShortLink</h1>
      <label>Long to short</label>
      <input type="text" name="long" onChange={handleInputChange}></input>
      <button onClick={longToShort}>Convert</button>
      <label>Short to Long</label>
      <input type="text" name="short" onChange={handleInputChange}></input>
      <button onClick={shortToLong}>Convert</button>
    </div>
  );
}

export default App;
