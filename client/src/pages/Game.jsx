import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaRedo, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";

function Game() {
  const [destination, setDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);

  // Fetch a random destination when the component loads
  useEffect(() => {
    fetchRandomDestination();
  }, []);

  const fetchRandomDestination = () => {
    setLoading(true);
    fetch("https://globetrotter-challenge.onrender.com/random-destination")
      .then((res) => res.json())
      .then((data) => {
        const cityData = data[0]; // First city in response
        setDestination(cityData);
        generateOptions(cityData.city);
        setSelectedOption(null);
        setFeedback(null);
        setAnswered(false);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Generate multiple-choice options (1 correct + 3 incorrect)
  const generateOptions = async (correctCity) => {
    try {
      const res = await fetch("https://globetrotter-challenge.onrender.com/random-destination");
      const otherCities = await res.json();

      const incorrectOptions = otherCities
        .filter((city) => city.city !== correctCity)
        .slice(0, 3) // Take 3 wrong choices
        .map((city) => city.city);

      const shuffledOptions = [correctCity, ...incorrectOptions].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    } catch (error) {
      console.error("Error generating options:", error);
    }
  };

  // Handle user's answer selection
  const handleAnswer = (choice) => {
    if (!selectedOption) {
      setSelectedOption(choice);
      setAnswered(true);

      if (choice === destination.city) {
        setFeedback({ correct: true, message: "✅ Correct! Well done!" });
        setScore((prev) => prev + 1);
      } else {
        setFeedback({ correct: false, message: `❌ Wrong! The correct answer was ${destination.city}.` });
      }
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-r from-purple-500 to-blue-700 text-white">
      {/* 🔥 Navigation Bar */}
      <nav className="w-full bg-white bg-opacity-10 backdrop-blur-lg p-4 shadow-md flex justify-between items-center px-8 fixed top-0 left-0 z-10">
        <Link to="/" className="text-white hover:text-yellow-300 flex items-center gap-2 transition duration-200">
          <FaArrowLeft /> Home
        </Link>
        <h1 className="text-2xl font-bold tracking-wider">🌍 Globetrotter Game</h1>
        <span className="text-lg font-semibold">Score: {score}</span>
      </nav>

      {/* 🔥 Game Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-6 w-full mt-16">
        {loading ? (
          <p className="text-2xl animate-pulse">Loading your challenge... ⏳</p>
        ) : (
          <div className="bg-white text-black p-8 rounded-xl shadow-2xl max-w-2xl">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Where is this place?
            </h2>
            <p className="text-lg mt-4 text-gray-700">{destination.clues[0]}</p>

            {/* MCQ Options */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {options.map((option, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 border-2
                    ${
                      selectedOption
                        ? option === destination.city
                          ? "bg-green-500 text-white border-green-700"
                          : "bg-red-500 text-white border-red-700"
                        : "bg-gray-100 text-black hover:bg-gray-300"
                    }`}
                  disabled={!!selectedOption}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`mt-6 text-lg font-semibold ${feedback.correct ? "text-green-600" : "text-red-600"}`}>
                {feedback.correct ? <FaCheckCircle /> : <FaTimesCircle />} {feedback.message}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {/* Next Challenge Button */}
              {answered && (
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={fetchRandomDestination}
                >
                  Next Challenge <FaArrowRight />
                </button>
              )}

              {/* Restart Game Button */}
              <button
                className="bg-yellow-400 text-black px-6 py-3 rounded-full text-xl font-semibold shadow-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => {
                  setScore(0);
                  fetchRandomDestination();
                }}
              >
                <FaRedo /> Restart Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
