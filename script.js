// Footer year
document.getElementById("y").textContent = new Date().getFullYear();

// --- STATE ---
let state = {
  aircraftControl: false,
  situationAwareness: false,
  workload: "High"
};

let score = {
  flightPathManagement: 0,
  decisionMaking: 0
};

// --- SCENARIO ---
const scenario = {
  text: "ECAM message appears. Cabin calls. ATC asks intentions.",
  choices: [
    "Start troubleshooting immediately",
    "Stabilize and reduce workload",
    "Talk to ATC and request priority",
    "Review landing performance and diversion options"
  ]
};

// --- RENDER STATUS ---
function renderStatus() {
  document.getElementById("status").innerHTML = `
    <strong>Aircraft:</strong> ${state.aircraftControl ? "✅ Stable" : "⚠️ Unstable"}<br>
    <strong>Awareness:</strong> ${state.situationAwareness ? "✅ Good" : "⚠️ Incomplete"}<br>
    <strong>Workload:</strong> ${state.workload}
  `;
}

// --- EVALUATION ---
function evaluate(choice) {
  let feedback = "";

  if (choice === "Start troubleshooting immediately") {
    feedback += "⚠️ You skipped aircraft control.\n";
    feedback += "Workload increased.\n";
    score.flightPathManagement -= 2;
  }

  if (choice === "Stabilize and reduce workload") {
    state.aircraftControl = true;
    state.workload = "Medium";
    feedback += "✔️ Correct: Fly first.\n";
    score.flightPathManagement += 2;
  }

  if (choice === "Talk to ATC and request priority") {
    if (!state.aircraftControl) {
      feedback += "⚠️ Communication before control.\n";
      score.flightPathManagement -= 1;
    } else {
      feedback += "✔️ Good timing for communication.\n";
    }
  }

  if (choice === "Review landing performance and diversion options") {
    if (!state.aircraftControl) {
      feedback += "⚠️ Analysis before control.\n";
      score.decisionMaking -= 1;
    } else {
      feedback += "✔️ Good expansion.\n";
    }
  }

  return feedback;
}

// --- RENDER CHOICES ---
function renderChoices() {
  const div = document.getElementById("choices");
  div.innerHTML = "";

  const accents = [
    "#b91c1c", // rojo
    "#15803d", // verde
    "#1d4ed8", // azul
    "#7c3aed"  // violeta
  ];

  scenario.choices.forEach((choice, index) => {
    const btn = document.createElement("button");

    btn.innerHTML = `<strong>Option ${index + 1}</strong><br>${choice}`;
    btn.style.borderLeft = `6px solid ${accents[index]}`;

    btn.onclick = () => {
      const fb = evaluate(choice);
      document.getElementById("feedback").innerText = fb;

      // BACK TO THE LOOP
      if (!state.aircraftControl) {
        div.innerHTML = "";

        const loopBtn = document.createElement("button");
        loopBtn.innerText = "→ Back to the Loop: Stabilize aircraft";
        loopBtn.style.borderLeft = "6px solid #15803d";

        loopBtn.onclick = () => {
          state.aircraftControl = true;
          state.workload = "Medium";
          render();
        };

        div.appendChild(loopBtn);
      }

      renderStatus();
    };

    div.appendChild(btn);
  });
}

// --- MAIN RENDER ---
function render() {
  renderStatus();
  renderChoices();
}

render();