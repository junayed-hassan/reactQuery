import axios from "axios";
import { useEffect, useRef, useState } from "react";

function New() {
  const [photo, setPhoto] = useState(null); // Store API data
  const [pageNumber, setPageNumber] = useState(1); // Current page
  const btnRef = useRef(null); // Ref for "Load more" button

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

  useEffect(() => {
    const observerCallback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && photo?.next) {
        // If the button is in view and there's more data to load
        setPageNumber((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null, // Observe within the viewport
      rootMargin: "0px",
      threshold: 1.0, // Trigger only when the entire button is visible
    });

    if (btnRef.current) {
      observer.observe(btnRef.current);
    }

    return () => {
      // Cleanup observer when component unmounts or dependencies change
      if (btnRef.current) observer.unobserve(btnRef.current);
    };
  }, [photo?.next]); // Dependency ensures observer is updated if photo.next changes

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
        ref={btnRef}
        disabled={!photo?.next} // Disable button if no more pages
        className="bg-green-600 px-4 py-2 text-center text-yellow-50"
      >
        Load more...
      </button>
    </div>
  );
}

export default New;
