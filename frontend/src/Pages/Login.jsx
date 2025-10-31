import { assets } from "../assets/assets.js";

function Login() {
  return (
    <div className="bg-orange-200 min-h-screen ">
      <div className="bg-violet-300">
        <img src={assets.logo} alt="" />
      </div>

      {/* form  */}
      <div>
        <form className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-400 to-violet-300 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Sign Up
          </h2>

          <label className="block mb-4">
            <span className="text-white font-medium">Full Name</span>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-white font-medium">Email</span>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-white font-medium">Password</span>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-white text-gray-800 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
