import axios from "axios";
import { useEffect, useState } from "react";

function New() {
  const [photo, setPhoto] = useState(null); // Store API data
  const [pageNumber, setPageNumber] = useState(1); // Current page

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:3000/users/?_page=${pageNumber}&_per_page=10`);
        const data = response.data;

        // If loading the first page, set the data. Otherwise, append new data.
        if (pageNumber === 1) {
          setPhoto(data);
        } else {
          setPhoto((prev) => ({
            ...prev,
            data: [...(prev.data || []), ...(data.data || [])],
            next: data.next,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [pageNumber]); // Dependency added to re-run on pageNumber change

  const handleLoadMore = () => {
    if (photo?.next) {
      setPageNumber(pageNumber + 1); // Increment page number
    }
  };

  return (
    <div>
      {photo &&
        photo.data.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.thumbnailUrl} alt={item.title} />
          </div>
        ))}
      <button
        onClick={handleLoadMore}
        disabled={!photo?.next} // Disable button if no more pages
        className="bg-green-600 px-4 py-2 text-center text-yellow-50"
      >
        Load more...
      </button>
    </div>
  );
}

export default New;
