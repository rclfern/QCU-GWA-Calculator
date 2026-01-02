function addSubject() {
    const container = document.getElementById("subjects");

    const div = document.createElement("div");
    div.className = "subject";

    div.innerHTML = `
        <input type="number" placeholder="Midterm %" step="0.01" class="mid" min="0" max="100">
        <input type="number" placeholder="Final %" step="0.01" class="final" min="0" max="100">
        <input type="number" placeholder="Units" class="units" min="0">

        <div class="badge-container"></div>

        <button class="remove-btn" onclick="removeSubject(this)">✕</button>
    `;

    container.appendChild(div);
}

function removeSubject(button) {
    button.parentElement.remove();
}

/* ------------------ GRADING SYSTEM ------------------ */

function convertToGrade(percent) {
    if (percent >= 96.5) return 1.00;
    if (percent >= 92.5) return 1.25;
    if (percent >= 88.5) return 1.50;
    if (percent >= 84.5) return 1.75;
    if (percent >= 80.5) return 2.00;
    if (percent >= 76.5) return 2.25;
    if (percent >= 72.5) return 2.50;
    if (percent >= 68.5) return 2.75;
    if (percent >= 64.5) return 3.00;
    return 5.00; // failed
}

function calculateGWA() {
    const mids = document.querySelectorAll(".mid");
    const finals = document.querySelectorAll(".final");
    const units = document.querySelectorAll(".units");
    const badges = document.querySelectorAll(".badge-container");

    let totalWeighted = 0;
    let totalUnits = 0;

    for (let i = 0; i < mids.length; i++) {
        const midRaw = parseFloat(mids[i].value);
        const finRaw = parseFloat(finals[i].value);
        const u = parseFloat(units[i].value);

        if (isNaN(midRaw) || isNaN(finRaw) || isNaN(u)) continue;

        // Clamp values between 0 and 100
        const mid = Math.min(100, Math.max(0, midRaw));
        const fin = Math.min(100, Math.max(0, finRaw));

        const finalGradePercent = (mid * 0.5) + (fin * 0.5);
        const numerical = convertToGrade(finalGradePercent);

        badges[i].innerHTML = "";

        const badge = document.createElement("div");
        badge.className = "badge";
        badge.style.background = numerical <= 3.0 ? "var(--pass)" : "var(--fail)";
        badge.textContent = numerical <= 3.0 ? "Passed ✓" : "Failed ✗";

        const percentDisplay = document.createElement("span");
        percentDisplay.style.marginLeft = "8px";
        percentDisplay.textContent = `(${finalGradePercent.toFixed(2)}%)`;

        badges[i].appendChild(badge);
        badges[i].appendChild(percentDisplay);

        totalWeighted += numerical * u;
        totalUnits += u;
    }

    const gwa = totalUnits > 0 ? (totalWeighted / totalUnits).toFixed(4) : "--";
    document.getElementById("result").textContent = `GWA: ${gwa}`;
}

/* ------------------ THEME ------------------ */

function toggleTheme() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        document.getElementById("themeToggle").textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        document.getElementById("themeToggle").textContent = "🌙";
    }
}

window.onload = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.body.classList.add("dark");
        document.getElementById("themeToggle").textContent = "☀️";
    }
};
