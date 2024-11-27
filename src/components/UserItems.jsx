
function UserItems({user}) {
  return (
    <div className="w-[48%] bg-white shadow-sm text-center py-4">
    <h2 className="text-xl font-medium">{user.name}</h2>
    <p className="text-gray-400">{user.username}</p>
    <p className="text-green-400">{user.email}</p>
    <button className="bg-cyan-600 text-yellow-50 px-4 py-2 mt-3 text-center">View Details</button>
  </div>
  )
}

export default UserItems