import React from 'react'
import '../styles/App.css';
import { PostList } from './PostList';

import { useEffect, useState } from "react";

export default function App() {
  // const api = `https://jsonplaceholder.typicode.com/posts?_limit=${}&_page=${}`

  const [dataArray, setDataArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const LIMIT = 5;

  // let apiData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  const paginatedData = (page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return dataArray.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const apiCallFunction = async () => {
      const apiData = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const apiDataJson = await apiData.json();
      // console.log(apiDataJson);

      const dataArrayCopy = [...apiDataJson];
      // [...paginatedData(pageNumber, LIMIT)]

      setDataArray(dataArrayCopy);
    };

    apiCallFunction();
  }, []);

  const paginatedDataArray = paginatedData(pageNumber, LIMIT);

  // console.log(paginatedData(2, 4));

  const MAX_PAGE_NUMBER = Math.ceil(dataArray.length / LIMIT);

  const pageNumberArray = new Array(MAX_PAGE_NUMBER)
    .fill(1)
    .map((_, index) => index + 1);

  const handlePrevious = () => {
    setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1);
  };

  const handleNext = () => {
    setPageNumber(
      pageNumber >= Math.ceil(dataArray.length / LIMIT)
        ? pageNumber
        : pageNumber + 1
    );
  };

  return (
    <div className="App">
      <ul>
        {paginatedDataArray.map((data, index) => (
          <li key={index}>{data.id}</li>
        ))}
      </ul>
      <button disabled={pageNumber === 1} onClick={handlePrevious}>
        Previous
      </button>
      <button
        disabled={pageNumber === Math.ceil(dataArray.length / LIMIT)}
        onClick={handleNext}
      >
        Next
      </button>
      <div>
        {pageNumberArray.map((item, index) => (
          <button key={index} onClick={() => setPageNumber(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
