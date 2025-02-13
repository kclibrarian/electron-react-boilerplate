import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import bookLove from '../../assets/icons/bookLove.svg';
import './App.css';

function Hello() {
  const [bookTitle, setBookTitle] = useState('');

  const searchBookByISBN = async () => {
    const isbn = (document.getElementById('myTextField') as HTMLInputElement)
      .value;
    if (!isbn) {
      setBookTitle('Please enter an ISBN.');
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      );
      const data = await response.json();

      if (data.totalItems > 0) {
        const { title } = data.items[0].volumeInfo;
        setBookTitle(`Title: ${title}`);
      } else {
        setBookTitle('No book found with this ISBN.');
      }
    } catch (error) {
      setBookTitle('Error fetching book data.');
    }
  };

  document.getElementById('submitButton')?.addEventListener('click', () => {
    const textField = (
      document.getElementById('myTextField') as HTMLInputElement
    )?.value;
    document.getElementById('output')!.innerText = `You entered: ${textField}`;
  });

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={bookLove} />
      </div>
      <div className="body">
        <h1>Search for your book title by ISBN:</h1>
        <div className="search-container">
          <input type="text" id="myTextField" placeholder="Enter ISBN here" />
          <button type="button" onClick={searchBookByISBN}>
            Search
          </button>
          <p id="output">{bookTitle}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
