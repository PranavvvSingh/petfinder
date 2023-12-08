import React from 'react'

const Login = () => {
  return (
    <div className="flex justify-center items-center mt-[50px]">
      <form
        action=""
        className="w-[400px] mx-auto flex flex-col gap-2 justify-center p-5 border-2 border-amber-500 rounded-xl"
      >
        <h1 className="text-center text-3xl">PetFinder</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          size={1}
          placeholder="Email"
          className="mb-5 rounded-lg p-2 bg-transparent border border-amber-500 outline-none"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          size={1}
          placeholder="Password"
          className="mb-5 rounded-lg p-2 bg-transparent border border-amber-500 outline-none"
        />
        <button className='bg-amber-500 p-2 rounded-xl'>Login</button>
      </form>
    </div>
  );
}

export default Login