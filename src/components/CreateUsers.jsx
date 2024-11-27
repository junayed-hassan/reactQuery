import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function CreateUsers() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables) => axios.post("http://localhost:3000/users", variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user.");
    },
    onMutate: (variables) => {
      return `Hello ${variables.fullname}. How are you?`;
    },
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = Object.fromEntries(formData);
    mutation.mutate(
      {
        ...newData,
        id: crypto.randomUUID(),
      },
      {
        onSuccess: () => e.target.reset(),
      }
    );
  };

  return (
    <div className="w-3/12 bg-gray-50 p-4 rounded-sm">
      <h1 className="text-2xl font-semibold pb-3">Create a New User</h1>
      <div>
        <form onSubmit={handlerSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Save User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUsers;
