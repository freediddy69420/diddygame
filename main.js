function triggerKey(code, type = "keydown") {
  document.dispatchEvent(new KeyboardEvent(type, { key: code }));
}

function setupButton(id, key) {
  const btn = document.getElementById(id);

  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    triggerKey(key, "keydown");
  });
  btn.addEventListener("touchend", e => {
    e.preventDefault();
    triggerKey(key, "keyup");
  });

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
// Add this JS after your DOM is loaded
const commitsBtn = document.getElementById('commitsBtn');
const commitsPopup = document.getElementById('commitsPopup');
const commitsList = document.getElementById('commitsList');

commitsBtn.onclick = function(e) {
    e.stopPropagation();
    // Show popup
    commitsPopup.style.display = (commitsPopup.style.display === "none" || commitsPopup.style.display === "") ? "block" : "none";
    // Fetch latest commits from GitHub API
    if (commitsPopup.style.display === "block") {
        fetch('https://api.github.com/repos/Ashton20271/diddygame/commits')
            .then(res => res.json())
            .then(data => {
                commitsList.innerHTML = "";
                data.slice(0, 8).forEach(commit => {
                    const li = document.createElement('li');
                    li.style.marginBottom = "8px";
                    li.innerHTML = `<strong>${commit.commit.message.split('\n')[0]}</strong><br>
                        <span style="font-size:12px;">${commit.commit.author.name} &middot; ${new Date(commit.commit.author.date).toLocaleString()}</span>`;
                    commitsList.appendChild(li);
                });
            });
    }
};

// Hide popup when clicking outside
document.addEventListener('mousedown', function(e) {
    if (!commitsPopup.contains(e.target) && e.target !== commitsBtn)
     commitsPopup.style.display = "none";
    }
});