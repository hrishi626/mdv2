/* ============================================================
   COMMITTEE + RESOLUTION SEARCH LOGIC
   Depends on: data-resolutions.js (COMMITTEES, RESOLUTIONS_DB,
   getAllResolutions, findResolution, findResolutionAnywhere)
   ============================================================ */

let activeCommittee = null; // null = "All Committees" mode

function initCommitteePanel() {
    const list = document.getElementById("committeeList");
    list.innerHTML = "";

    COMMITTEES.forEach(c => {
        const count = (RESOLUTIONS_DB[c.id] || []).length;
        const btn = document.createElement("button");
        btn.className = "committee-btn";
        btn.dataset.committee = c.id;
        btn.innerHTML =
            '<span class="committee-btn-name">' + escapeHTML(c.name) + '</span>' +
            '<span class="committee-btn-count">' + count + '</span>';
        btn.title = c.fullName;
        btn.addEventListener("click", () => selectCommittee(c.id));
        list.appendChild(btn);
    });

    document.getElementById("allCommitteesBtn")
        .addEventListener("click", () => selectCommittee(null));

    document.getElementById("resSearchInput")
        .addEventListener("keydown", e => { if (e.key === "Enter") runResolutionSearch(); });
    document.getElementById("resSearchButton")
        .addEventListener("click", runResolutionSearch);

    document.getElementById("resBackButton")
        .addEventListener("click", closeResolutionView);

    selectCommittee(null);
}

function selectCommittee(committeeId) {
    activeCommittee = committeeId;

    document.querySelectorAll(".committee-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.committee === committeeId);
    });
    document.getElementById("allCommitteesBtn")
        .classList.toggle("active", committeeId === null);

    const committee = COMMITTEES.find(c => c.id === committeeId);
    document.getElementById("resSearchScope").textContent =
        committee ? ("Searching within " + committee.name) : "Searching all committees";

    document.getElementById("resSearchInput").value = "";
    renderResolutionList(committeeId ? (RESOLUTIONS_DB[committeeId] || []) : getAllResolutions());
}

function runResolutionSearch() {
    const term = document.getElementById("resSearchInput").value.trim().toLowerCase();
    const pool = activeCommittee ? (RESOLUTIONS_DB[activeCommittee] || []) : getAllResolutions();

    if (!term) { renderResolutionList(pool); return; }

    const results = pool.filter(r => {
        const haystack = [
            r.id, r.agenda, r.committee,
            (r.authors || []).join(" "),
            (r.coAuthors || []).join(" ")
        ].join(" ").toLowerCase();
        return haystack.includes(term);
    });

    renderResolutionList(results);
}

function renderResolutionList(resolutions) {
    const container = document.getElementById("resolutionResults");
    container.innerHTML = "";

    if (resolutions.length === 0) {
        container.innerHTML = '<div class="res-empty">No resolutions found.</div>';
        return;
    }

    resolutions.forEach(r => {
        const card = document.createElement("div");
        card.className = "res-card";
        card.innerHTML =
            '<div class="res-card-id">' + escapeHTML(r.id) + '</div>' +
            '<div class="res-card-committee">' + escapeHTML(r.committee) + '</div>' +
            '<div class="res-card-agenda">' + escapeHTML(r.agenda || "") + '</div>';
        card.addEventListener("click", () => openResolution(r.committee, r.id));
        container.appendChild(card);
    });
}

function openResolution(committeeId, resId) {
    const r = findResolution(committeeId, resId) || findResolutionAnywhere(resId);
    if (!r) return;

    const view = document.getElementById("resolutionView");
    const body = document.getElementById("resolutionViewBody");

    const rows = [];
    const row = (label, value) => {
        if (value === undefined || value === null || value === "" ||
            (Array.isArray(value) && value.length === 0)) return;
        const display = Array.isArray(value) ? value.map(escapeHTML).join(", ") : escapeHTML(String(value));
        rows.push('<div class="res-detail-row"><div class="res-detail-label">' + label +
            '</div><div class="res-detail-value">' + display + '</div></div>');
    };

    row("Committee", r.committee);
    row("Agenda", r.agenda);
    row("Authors", r.authors);
    row("Co-authors", r.coAuthors);
    row("Signatories", r.signatories);

    if (r.votingResults) {
        row("Voting Results", "For " + r.votingResults.for + " / Against " +
            r.votingResults.against + " / Abstain " + r.votingResults.abstain);
    }
    row("Voted For", r.votesFor);
    row("Voted Against", r.votesAgainst);
    row("Abstained", r.votesAbstain);

    if (r.vetoes && r.vetoes.length) {
        row("Vetoing Country/Countries", r.vetoes.map(v => v.country));
        r.vetoes.forEach(v => {
            if (v.explanation) {
                rows.push('<div class="res-detail-row"><div class="res-detail-label">Veto Explanation (' +
                    escapeHTML(v.country) + ')</div><div class="res-detail-value">' +
                    escapeHTML(v.explanation) + '</div></div>');
            }
        });
    }

    if (r.background) {
        rows.push('<div class="res-detail-row res-detail-background"><div class="res-detail-label">Background</div>' +
            '<div class="res-detail-value">' + escapeHTML(r.background) + '</div></div>');
    }

    body.innerHTML =
        '<h2 class="res-detail-title">' + escapeHTML(r.id) + '</h2>' + rows.join("");

    view.style.display = "block";
    view.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeResolutionView() {
    document.getElementById("resolutionView").style.display = "none";
}

document.addEventListener("DOMContentLoaded", initCommitteePanel);
