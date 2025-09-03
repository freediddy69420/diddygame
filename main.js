function triggerKey(code, type = "keydown") {
  document.dispatchEvent(new KeyboardEvent(type, { key: code }));
}

function setupButton(id, key) {
  const btn = document.getElementById(id);

  // Touch support
  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    triggerKey(key, "keydown");
  });
  btn.addEventListener("touchend", e => {
    e.preventDefault();
    triggerKey(key, "keyup");
  });

  // Mouse support (for desktop clicks)
  btn.addEventListener("mousedown", e => {
    e.preventDefault();
    triggerKey(key, "keydown");
  });
  btn.addEventListener("mouseup", e => {
    e.preventDefault();
    triggerKey(key, "keyup");
  });
}

setupButton("btn-left", "ArrowLeft");
setupButton("btn-right", "ArrowRight");
setupButton("btn-up", "ArrowUp");
setupButton("btn-down", "ArrowDown");

// Add this to your JS after Firebase is initialized
function updatePlayerCount() {
    db.ref('playersOnline').on('value', snapshot => {
        const count = snapshot.numChildren();
        document.getElementById('playerCountNum').textContent = count;
    });
}

// Register this player as online
const playerSessionId = playerName + "_" + Math.random().toString(36).substr(2, 9);
db.ref('playersOnline/' + playerSessionId).set(true);

// Remove player from online list when leaving
window.addEventListener('beforeunload', () => {
    db.ref('playersOnline/' + playerSessionId).remove();
});

// Start tracking player count
updatePlayerCount();
