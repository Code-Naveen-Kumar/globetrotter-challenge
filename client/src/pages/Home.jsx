import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaUsers } from "react-icons/fa";

function Home() {
  const [challengeLink, setChallengeLink] = useState("");

  const createChallenge = async () => {
    const response = await fetch("https://globetrotter-challenge.onrender.com/create-challenge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const link = `https://globetrotter-challenge.onrender.com/challenge/${data.challengeId}`;
    setChallengeLink(link);
  };

  const shareOnWhatsApp = () => {
    const message = `🌍 Join me in a travel guessing challenge! Click here: ${challengeLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      {/* 🔥 Navbar (Fixed at Top) */}
      <nav className="w-full bg-white bg-opacity-10 backdrop-blur-lg p-4 shadow-md flex justify-between items-center px-8 fixed top-0 left-0 z-10">
        <h1 className="text-2xl font-bold tracking-wider">🌍 Globetrotter</h1>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-yellow-300 transition duration-200">Home</Link>
          <Link to="/game" className="text-white hover:text-yellow-300 transition duration-200">Play</Link>
          <Link to="/leaderboard" className="text-white hover:text-yellow-300 transition duration-200">Leaderboard</Link>
        </div>
      </nav>

      {/* 🔥 Hero Section (Full Screen with Proper Spacing) */}
      <div className="flex flex-col items-center justify-center text-center px-6 flex-grow w-full mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Globetrotter 🌎
        </h1>
        <p className="text-lg max-w-2xl mb-8">
          Test your travel knowledge! Guess cities, unlock achievements, and challenge your friends. 🌍✈️
        </p>

        {/* Play and Challenge Buttons */}
        <div className="flex gap-6">
          <Link
            to="/game"
            className="bg-yellow-400 text-black px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaPlay /> Start Playing 🎮
          </Link>

          <button
            className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-green-400 transition-all duration-300 flex items-center justify-center gap-2"
            onClick={createChallenge}
          >
            <FaUsers /> Challenge a Friend
          </button>
        </div>

        {/* Challenge Link Section */}
        {challengeLink && (
          <div className="mt-6 text-center">
            <p className="text-white font-semibold">Share this challenge link:</p>
            <a
              href={challengeLink}
              target="_blank"
              className="text-yellow-300 underline break-words block mt-2"
            >
              {challengeLink}
            </a>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-400 transition-all duration-300"
              onClick={shareOnWhatsApp}
            >
              Share on WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
