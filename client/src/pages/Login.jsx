import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_DEPLOYMENT_URL}/user/login`, {
        email,
        password
      }, {
        withCredentials: true // This ensures cookies are sent and received
      });
      console.log(response);
      
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', Cookies.get('jwtToken'));
        window.location.href = '/dashboard';
      
      } else {
        console.error(response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Internal server error');
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Navbar />
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 max-w">
          Or
          <a href="/signup" class="font-medium text-purple-600 hover:text-purple-500">
            &nbsp;create an account
          </a>
        </p>
      </div>

      <form class="mt-8 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" autocomplete="email" required
                  class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address" />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1">
                <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autocomplete="current-password" required
                  class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password" />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" onClick={handleSubmit}
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
          <div class="mt-6">

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-3">
              <div>
                <a href="http://localhost:4000/auth/google"
                  class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img class="h-5 w-5" src="https://www.svgrepo.com/show/506498/google.svg"
                    alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
      {message && <div>{message}</div>}
    </div>
  )
}

export default Login
