import "react";
import  { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import PasswordShowHideBtn from "./PasswordShowHideBtn";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-5xl font-bold mb-6 text-center text-txtcol">
            Register
          </h1>
          <div className="bg-txtcol w-auto h-0.5 mb-5" />
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-txtcol-900 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-txtcol leading-tight focus:outline-background"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-txtcol-900 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-txtcol leading-tight focus:outline-background"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-txtcol-900 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-txtcol leading-tight focus:outline-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-txtcol-900 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-txtcol leading-tight focus:outline-background"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute right-1 bottom-1 mt-2 mr-2 text-btntxtcol">
                <PasswordShowHideBtn
                  width={"30px"}
                  fill={"#1C3342"}
                  id={"pass1"}
                  onClickPassShowHide={() => handlePasswordVisibility()}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-btnbg text-btntxtcol px-4 py-2 rounded-lg"
              >
                Register
              </button>
            </div>
            <div className="flex justify-center mt-3 mb-3">
              <span className="text-txtcol">
                Already have an account?&nbsp;
              </span>
              <Link to="/login" className="text-background mr-2">
                Login Now
              </Link>
            </div>
            <div className="bg-txtcol w-auto h-0.5 mb-3 mt-3" />
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-btnbg text-btntxtcol px-4 py-2 rounded-lg"
              >
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
