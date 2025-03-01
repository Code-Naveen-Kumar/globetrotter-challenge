import { useState } from "react";

function ChallengeFriend() {
  const [playerName, setPlayerName] = useState("");
  const [challengeId, setChallengeId] = useState(null);
  const [shareLink, setShareLink] = useState("");

  // ✅ Create Challenge and Generate Share Link
  const createChallenge = async () => {
    if (!playerName.trim()) {
      alert("Please enter a unique username before inviting friends!");
      return;
    }
  
    try {
      const response = await fetch("https://globetrotter-challenge.onrender.com/create-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: playerName }), // Send username
      });
  
      const data = await response.json();
  
      if (!data.challengeId) {
        alert("Error: Challenge ID not received! Try again.");
        return;
      }
  
      setChallengeId(data.challengeId); // Store Challenge ID
  
      // ✅ Generate the correct link
      const link = `${window.location.origin}/challenge/${data.challengeId}`;
      setShareLink(link);
  
      console.log(`✅ Generated Challenge Link: ${link}`); // Debugging Log
  
      // ✅ Open WhatsApp Share
      shareOnWhatsApp(link);
    } catch (error) {
      console.error("Error creating challenge:", error);
      alert("Failed to create a challenge. Please try again.");
    }
  };
  

  // ✅ Share via WhatsApp
  const shareOnWhatsApp = (link) => {
    const message = `🌍 I challenge you to a travel guessing game! 🚀\nTry to beat my score in PrivacyGuard’s Globetrotter Challenge! 🏆\nClick to play: ${link}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold">Challenge a Friend</h2>
      <p className="text-lg text-gray-400 mt-2">Enter your name & send an invite!</p>

      <input
        type="text"
        placeholder="Enter your username"
        className="mt-4 p-2 rounded bg-gray-700 text-white text-center"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <button
        className="mt-4 bg-green-500 px-6 py-2 rounded text-white"
        onClick={createChallenge}
      >
        🎉 Generate Challenge & Share
      </button>

      {shareLink && (
        <div className="mt-6 bg-gray-800 p-4 rounded text-center">
          <p className="text-yellow-400 font-semibold">🔗 Your Challenge Link:</p>
          <input type="text" value={shareLink} readOnly className="mt-2 p-2 w-full bg-gray-700 text-white text-center rounded" />
          <button
            className="mt-4 bg-blue-500 px-6 py-2 rounded text-white"
            onClick={() => navigator.clipboard.writeText(shareLink)}
          >
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

export default ChallengeFriend;
