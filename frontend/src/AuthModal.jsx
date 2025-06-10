import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

 const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setMessage('Please enter a valid email address.');
    setIsSuccess(false);
    return; // stop submission if invalid email
  }

  // continue with fetch login/signup request as before...
  const endpoint = isLogin ? '/auth/login' : '/auth/signup';

  try {
    const res = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`${isLogin ? 'Login' : 'Signup'} successful!`);
      setIsSuccess(true);
      setTimeout(() => {
        setMessage('');
        onLoginSuccess(email);
        onClose();
        setEmail('');
        setPassword('');
        setIsSuccess(false);
      }, 1000);
    } else {
      setMessage(data.message || 'Something went wrong.');
      setIsSuccess(false);
    }
  } catch (error) {
    setMessage('Server error. Please try again.');
    setIsSuccess(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96 relative">
        <button
          onClick={() => {
            onClose();
            setMessage('');
            setEmail('');
            setPassword('');
            setIsSuccess(false);
          }}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {message && (
          <p className={`text-sm text-center mt-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <div className="text-sm text-center mt-4">
          {isLogin ? 'Don’t have an account?' : 'Already registered?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
              setIsSuccess(false);
            }}
            className="text-blue-500 font-medium underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
