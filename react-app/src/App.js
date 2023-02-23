import {React, useState} from 'react';
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

  const longToShort = () => {
    console.log(longUrl);
  }

  const shortToLong = () => {
    console.log(shortUrl);
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
