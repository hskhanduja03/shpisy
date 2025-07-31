import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="relative inset-0 h-screen w-full bg-black overflow-hidden">
      <iframe
        src="https://my.spline.design/reactiveorb-fPJOKThlfOjCTuFFBbGNEAM9/"
        frameBorder="0"
        className="absolute w-full h-full pointer-events-none"
        title="Spline Orb Animation"
      ></iframe>

      {/* Glassmorphism button container */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Link
          to="/home"
          className="backdrop-blur-md bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-white/20 transition duration-300 ease-in-out"
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
