import React, { useState, useEffect } from "react";
import "./App.css";
import colours from "./colours";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(getRandomIndex(quotes.length));
  const [colour, setColour] = useState(colours[getRandomIndex(colours.length)]);
  const handleNewQuote = () => {
    console.log(colours);
    setIndex(getRandomIndex(quotes.length));
    setColour(colours[getRandomIndex(colours.length)]);
  };

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((json) => setQuotes(json.quotes));
  }, []);
  const quote = quotes[index];

  if (!quote) {
    return null;
  }

  return (
    <div className="App" id="container" style={{ backgroundColor: colour }}>
      <div id="quote-box">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          size="2x"
          style={{ color: colour }}
        />
        <p id="text" style={{ color: colour }}>
          {quote.quote}
        </p>
        <p id="author" style={{ color: colour }}>
          -{quote.author}
        </p>
        <div id="buttons">
          <a
            type="button"
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text="${quote.quote}"%0a-${quote.author}`}
            target="_top"
          >
            <FontAwesomeIcon
              icon={faTwitterSquare}
              style={{ color: colour }}
              size="2x"
            />
          </a>
          <button
            id="new-quote"
            onClick={handleNewQuote}
            style={{ backgroundColor: colour }}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

export default App;
