import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import startanimation from "../assets/animations/start_animation.json";

const IntroPage = () => {
  const startanimationContainer = useRef(null);
  useEffect(() => {
    if (startanimationContainer.current.childElementCount == 0) {
      Lottie.loadAnimation({
        container: startanimationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: startanimation,
      });
    }
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <div className="flex items-center">
          <Link
            to="/login"
            className="bg-btnbg text-btntxtcol px-4 py-2 rounded-lg mr-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-btnbg text-btntxtcol px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
      <div ref={startanimationContainer} className="w-1/6"></div>
      <h1 className="text-8xl font-bold mb-6 text-right text-txtcol">
        QuestCraft
      </h1>
      <p className="mb-4 text-right text-txtcol-900">
        QuestCraft is a web application designed to help educators create and
        manage question papers for their students.
      </p>
      <p className="mb-4 text-right text-txtcol-900">
        Our platform offers a comprehensive solution for generating question
        papers, managing question banks, and tracking historical data.
      </p>
      <p className="mb-4 text-right text-txtcol-900">
        We prioritize security and user privacy, ensuring a safe and efficient
        experience for all users.
      </p>
    </div>
  );
};

export default IntroPage;
