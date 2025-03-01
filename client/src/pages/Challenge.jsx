import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function Challenge() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Fetch Challenge Data
  useEffect(() => {
    if (challengeId) {
      fetch(`http://localhost:5000/challenge/${challengeId}`)
        .then((res) => res.json())
        .then((data) => {
          setChallenge(data);
          console.log("Challenge Data:", data);
        })
        .catch((err) => console.error("Error fetching challenge:", err));
    }
  }, [challengeId]);

  // ✅ Join Game
  const joinGame = () => {
    if (playerName.trim()) {
      socket.emit("join-challenge", { challengeId, playerName });
      setIsPlaying(true);
    }
  };

  // ✅ Submit Answer
  const submitAnswer = () => {
    if (!submitted) {
      const correct = answer.trim().toLowerCase() === challenge?.destination.city.toLowerCase();
      socket.emit("submit-answer", { challengeId, playerName, answer, correct });
      setSubmitted(true);
    }
  };

  // ✅ Listen for Updates
  useEffect(() => {
    socket.on("update", (updatedChallenge) => {
      console.log("Challenge Updated:", updatedChallenge);
      setChallenge(updatedChallenge);
    });

    return () => socket.off("update");
  }, []);

  if (!challenge) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      {!isPlaying ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Challenge #{challengeId}</h1>
          <p className="text-lg mt-2">Challenger: <span className="font-semibold text-yellow-400">{challenge.username}</span></p>
          <p className="text-md">Score to Beat: <span className="font-semibold text-green-400">{challenge.score} pts</span></p>

          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 rounded bg-gray-700 text-white mt-4"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button className="mt-4 bg-green-500 px-6 py-2 rounded" onClick={joinGame}>
            Join Game
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-gray-800 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Guess the City!</h2>
          <p className="mb-2">🌍 Country: {challenge.destination.country}</p>
          <p className="mb-4">📝 Clue: {challenge.destination.clues[0]}</p>

          <input
            type="text"
            placeholder="Your Guess"
            className="p-2 w-full rounded bg-gray-700 text-white"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitted}
          />
          <button
            className={`mt-4 px-6 py-2 rounded ${submitted ? "bg-gray-500" : "bg-yellow-400"}`}
            onClick={submitAnswer}
            disabled={submitted}
          >
            {submitted ? "Answer Submitted" : "Submit Answer"}
          </button>

          <div className="mt-6 bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-semibold">🔹 Scoreboard</h3>
            {Object.entries(challenge.players).map(([name, data]) => (
              <p key={name} className={name === challenge.username ? "text-yellow-400" : "text-white"}>
                {name}: {data.answer || "🤔"} → {data.score} pts
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Challenge;
