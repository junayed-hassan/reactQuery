import axios from "axios";
import UserItems from "./UserItems";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getData = async (page) => {
  const response = await axios.get(`http://localhost:3000/users/?_page=${page}&_per_page=4`);
  return response.data.data || [];
};

function UserList() {
  const [page, setPage] = useState(1); 

  const { data: users = [], error, isFetching } = useQuery({
    queryKey: ["users", page], 
    queryFn: () => getData(page),
    keepPreviousData: true, 
  });

  const handleNext = (e) => {
    setPage((prevPage) => prevPage + 1);
    e.target.prevalentDefault
} 

    
    
  const handlePrevious = (e) => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    e.target.prevalentDefault;
  } 

  if (isFetching) {
    return <div className="w-6/12 bg-gray-50 p-4 rounded-sm">Data is loading....</div>;
  }
  if (error) {
    return <div className="w-6/12 bg-gray-50 p-4 rounded-sm">Something went wrong: {error.message}</div>;
  }

  if (!users.length) {
    return <div className="w-6/12 bg-gray-50 p-4 rounded-sm">No users found.</div>;
  }

  return (
    <div className="w-6/12 bg-gray-50 p-4 rounded-sm">
      <h1 className="text-2xl font-semibold pb-4">All Users Here</h1>
      <div className="flex gap-5 flex-wrap">
        {users.map((user) => (
          <UserItems key={user.id} user={user} />
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-3">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={`bg-cyan-600 text-yellow-50 px-4 py-2 mt-3 text-center ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`bg-cyan-600 text-yellow-50 px-4 py-2 mt-3 text-center ${
            page === 8 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;
