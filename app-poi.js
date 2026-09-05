/* ============================================================
   POI DOSSIER SYSTEM (sign in / sign up / browse / create)
   ------------------------------------------------------------
   IMPORTANT — read this before deploying:

   This runs entirely in the visitor's browser and stores
   accounts + dossiers in localStorage. That means:
     - Nothing here ever touches a server, so it costs Rs 0.
     - Passwords are never stored in plaintext, and never
       appear anywhere in this source file -- they are hashed
       with the browser's built-in SHA-256 (crypto.subtle)
       before being saved.
     - BUT: an account made on one device/browser will not be
       visible from another device. Sign-up asks for an email
       address (kept for reference/future use) but does not
       require verifying it -- signing up logs you straight in.

   To upgrade to real multi-device accounts later, swap out the
   functions marked "BACKEND HOOK" below for calls to a
   free-tier backend such as Firebase Authentication +
   Firestore. Everything above those functions (the UI, the
   data model) can stay the same.
   ============================================================ */

let currentPoiUser = null; // { username, email }

/* ---------- crypto helpers ---------- */
async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ---------- account storage (BACKEND HOOK: replace with Firebase Auth) ---------- */
function getAccountsIndex() {
    return JSON.parse(localStorage.getItem("mun_poi_accounts") || "{}");
}
function saveAccountsIndex(idx) {
    localStorage.setItem("mun_poi_accounts", JSON.stringify(idx));
}

function getUserRecord(username) {
    const raw = localStorage.getItem(poiUserKey(username));
    return raw ? JSON.parse(raw) : null;
}
function saveUserRecord(username, record) {
    localStorage.setItem(poiUserKey(username), JSON.stringify(record));
}

/* ---------- UI wiring ---------- */
function initPoiPanel() {
    document.getElementById("poiSignInBtn").addEventListener("click", handleSignIn);
    document.getElementById("poiShowSignUp").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("poiSignInForm").style.display = "none";
        document.getElementById("poiSignUpForm").style.display = "block";
    });
    document.getElementById("poiShowSignIn").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("poiSignUpForm").style.display = "none";
        document.getElementById("poiSignInForm").style.display = "block";
    });
    document.getElementById("poiSignUpBtn").addEventListener("click", handleSignUp);
    document.getElementById("poiSignOutBtn").addEventListener("click", handleSignOut);
    document.getElementById("poiAddEntryBtn").addEventListener("click", showAddDossierForm);
    document.getElementById("poiSaveEntryBtn").addEventListener("click", saveDossierEntry);
    document.getElementById("poiCancelEntryBtn").addEventListener("click", hideAddDossierForm);

    document.getElementById("poiMunSelect").addEventListener("change", populateAgendaSelect);
    document.getElementById("poiAgendaSelect").addEventListener("change", populateCountrySelect);
    document.getElementById("poiCountrySelect").addEventListener("change", renderPoiEntries);

    renderPoiAuthState();
}

async function handleSignUp() {
    const username = document.getElementById("poiSignUpUsername").value.trim();
    const email = document.getElementById("poiSignUpEmail").value.trim();
    const password = document.getElementById("poiSignUpPassword").value;
    const msg = document.getElementById("poiSignUpMsg");

    if (!username || !email || !password) {
        msg.textContent = "Please fill in every field."; return;
    }
    if (getUserRecord(username)) {
        msg.textContent = "That username is already taken."; return;
    }

    const passwordHash = await sha256(password); // BACKEND HOOK: Firebase would do this server-side

    saveUserRecord(username, {
        username, email, passwordHash,
        munsAttended: [],   // user-created MUNs
        dossiers: []         // user-created POI dossiers
    });

    const idx = getAccountsIndex();
    idx[username.toLowerCase()] = true;
    saveAccountsIndex(idx);

    document.getElementById("poiSignUpForm").style.display = "none";
    logInAs(username, email);
}

async function handleSignIn() {
    const username = document.getElementById("poiSignInUsername").value.trim();
    const password = document.getElementById("poiSignInPassword").value;
    const msg = document.getElementById("poiSignInMsg");

    const record = getUserRecord(username);
    if (!record) { msg.textContent = "No account with that username on this device."; return; }

    const hash = await sha256(password);
    if (hash !== record.passwordHash) { msg.textContent = "Incorrect password."; return; }

    logInAs(username, record.email);
}

function logInAs(username, email) {
    currentPoiUser = { username, email };
    sessionStorage.setItem("mun_poi_session", username);
    renderPoiAuthState();
}

function handleSignOut() {
    currentPoiUser = null;
    sessionStorage.removeItem("mun_poi_session");
    renderPoiAuthState();
}

function renderPoiAuthState() {
    const savedSession = sessionStorage.getItem("mun_poi_session");
    if (!currentPoiUser && savedSession && getUserRecord(savedSession)) {
        const record = getUserRecord(savedSession);
        currentPoiUser = { username: savedSession, email: record.email };
    }

    document.getElementById("poiLoggedOutView").style.display = currentPoiUser ? "none" : "block";
    document.getElementById("poiLoggedInView").style.display = currentPoiUser ? "block" : "none";

    if (currentPoiUser) {

  document.getElementById("poiWelcomeName").textContent = currentPoiUser.username;
        populateMunSelect();
    }
}

/* ---------- browsing: MUN -> Agenda -> Country -> POIs ---------- */
function getCombinedDossiers() {
    const own = currentPoiUser ? (getUserRecord(currentPoiUser.username).dossiers || []) : [];
    return SAMPLE_POI_LIBRARY.concat(own);
}

function populateMunSelect() {
    const select = document.getElementById("poiMunSelect");
    const muns = [...new Set(getCombinedDossiers().map(d => d.mun))];
    select.innerHTML = '<option value="">Select a MUN...</option>' +
        muns.map(m => '<option value="' + escapeHTML(m) + '">' + escapeHTML(m) + '</option>').join("");
    document.getElementById("poiAgendaSelect").innerHTML = '<option value="">Select agenda...</option>';
    document.getElementById("poiCountrySelect").innerHTML = '<option value="">Select country...</option>';
    document.getElementById("poiEntries").innerHTML = "";
}

function populateAgendaSelect() {
    const mun = document.getElementById("poiMunSelect").value;
    const select = document.getElementById("poiAgendaSelect");
    const agendas = [...new Set(getCombinedDossiers().filter(d => d.mun === mun).map(d => d.agenda))];
    select.innerHTML = '<option value="">Select agenda...</option>' +
        agendas.map(a => '<option value="' + escapeHTML(a) + '">' + escapeHTML(a) + '</option>').join("");
    document.getElementById("poiCountrySelect").innerHTML = '<option value="">Select country...</option>';
    document.getElementById("poiEntries").innerHTML = "";
}

function populateCountrySelect() {
    const mun = document.getElementById("poiMunSelect").value;
    const agenda = document.getElementById("poiAgendaSelect").value;
    const select = document.getElementById("poiCountrySelect");
    const countries = [...new Set(getCombinedDossiers()
        .filter(d => d.mun === mun && d.agenda === agenda).map(d => d.country))];
    select.innerHTML = '<option value="">Select country...</option>' +
        countries.map(c => '<option value="' + escapeHTML(c) + '">' + escapeHTML(c) + '</option>').join("");
    document.getElementById("poiEntries").innerHTML = "";
}

function renderPoiEntries() {
    const mun = document.getElementById("poiMunSelect").value;
    const agenda = document.getElementById("poiAgendaSelect").value;
    const country = document.getElementById("poiCountrySelect").value;
    const container = document.getElementById("poiEntries");
    container.innerHTML = "";

    const dossier = getCombinedDossiers().find(d => d.mun === mun && d.agenda === agenda && d.country === country);
    if (!dossier) return;

    const qa = (dossier.pois || []).map(p =>
        '<div class="poi-qa"><div class="poi-q">Q: ' + escapeHTML(p.question) + '</div>' +
        '<div class="poi-a">A: ' + escapeHTML(p.answer) + '</div></div>').join("");

    container.innerHTML =
        '<div class="poi-dossier-card">' +
        '<h3>' + escapeHTML(dossier.country) + ' — ' + escapeHTML(dossier.agenda) + '</h3>' +
        (dossier.notes ? '<p class="poi-notes">' + escapeHTML(dossier.notes) + '</p>' : "") +
        qa +
        '<button class="poi-download-btn" onclick="downloadDossier(\'' + dossier.id + '\')">Download Dossier</button>' +
        '</div>';
}

function downloadDossier(id) {
    const dossier = getCombinedDossiers().find(d => d.id === id);
    if (!dossier) return;

    const lines = [
        dossier.mun, dossier.agenda, dossier.country, "",
        dossier.notes || "", "",
        ...(dossier.pois || []).map(p => "Q: " + p.question + "\nA: " + p.answer + "\n")
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = dossier.country.replace(/\s+/g, "_") + "_" + dossier.agenda.replace(/\s+/g, "_") + ".txt";
    a.click();
    URL.revokeObjectURL(a.href);
}

/* ---------- user-created content ---------- */
function showAddDossierForm() {
    if (!currentPoiUser) return;
    document.getElementById("poiAddEntryForm").style.display = "block";
}
function hideAddDossierForm() {
    document.getElementById("poiAddEntryForm").style.display = "none";
}

function saveDossierEntry() {
    if (!currentPoiUser) return;

    const mun = document.getElementById("poiNewMun").value.trim();
    const agenda = document.getElementById("poiNewAgenda").value.trim();
    const country = document.getElementById("poiNewCountry").value.trim();
    const notes = document.getElementById("poiNewNotes").value.trim();
    const qaRaw = document.getElementById("poiNewQA").value.trim();

    if (!mun || !agenda || !country) {
        document.getElementById("poiAddEntryMsg").textContent = "MUN, agenda and country are required.";
        return;
    }

    const pois = qaRaw.split("\n").filter(Boolean).map(line => {
        const [q, ...rest] = line.split("|");
        return { question: (q || "").trim(), answer: rest.join("|").trim() };
    });

    const record = getUserRecord(currentPoiUser.username);
    record.dossiers.push({
        id: "user-" + Date.now(),
        mun, agenda, country, pois, notes
    });
    if (!record.munsAttended.includes(mun)) record.munsAttended.push(mun);
    saveUserRecord(currentPoiUser.username, record);

    ["poiNewMun", "poiNewAgenda", "poiNewCountry", "poiNewNotes", "poiNewQA"].forEach(id => {
        document.getElementById(id).value = "";
    });
    document.getElementById("poiAddEntryMsg").textContent = "Saved.";
    hideAddDossierForm();
    populateMunSelect();
}

document.addEventListener("DOMContentLoaded", initPoiPanel);
