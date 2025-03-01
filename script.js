async function fetchDestination() {
  const response = await fetch("http://localhost:5000/destination");
  const data = await response.json();

  if (data.length > 0) {
    const destination = data[0];
    document.getElementById("city-name").innerText = destination.city;
    document.getElementById("clue").innerText = destination.clues[0];
    document.getElementById("fun-fact").innerText = destination.fun_fact[0];
    document.getElementById("trivia").innerText = destination.trivia[0];
  }
}

// Load a destination when the page loads
window.onload = fetchDestination;
