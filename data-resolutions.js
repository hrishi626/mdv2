/* ============================================================
   RESOLUTIONS DATA
   ------------------------------------------------------------
   Kept separate from index.html on purpose (per project spec)
   so the main file doesn't grow further. To add a resolution,
   copy an existing object inside RESOLUTIONS_DB[<committee>]
   and fill in the fields. Fields left out are simply not shown
   on the resolution page.

   Schema:
   {
     id: "UNSC/RES/2728 (2024)",   // the SRES/resolution number, shown as title
     committee: "UNSC",             // must match a key in COMMITTEES below
     agenda: "string",
     authors: ["Country", ...],
     coAuthors: ["Country", ...],
     signatories: ["Country", ...],
     votingResults: { for: 14, against: 0, abstain: 1 },
     votesFor: ["Country", ...],
     votesAgainst: ["Country", ...],
     votesAbstain: ["Country", ...],
     vetoes: [{ country: "Country", explanation: "string" }],
     background: "Longer paragraph(s) of context/explanation."
   }
   ============================================================ */

const COMMITTEES = [
    { id: "UNSC",    name: "UNSC",    fullName: "United Nations Security Council" },
    { id: "UNHRC",   name: "UNHRC",   fullName: "United Nations Human Rights Council" },
    { id: "DISEC",   name: "DISEC",   fullName: "Disarmament and International Security Committee" },
    { id: "SPECPOL", name: "SPECPOL", fullName: "Special Political and Decolonization Committee" },
    { id: "ECOSOC",  name: "ECOSOC",  fullName: "Economic and Social Council" },
    { id: "UNGA",    name: "UNGA",    fullName: "United Nations General Assembly Plenary" }
];

const RESOLUTIONS_DB = {

    UNSC: [
        {
            id: "S/RES/2728 (2024)",
            committee: "UNSC",
            agenda: "The situation in the Middle East, including the Palestinian question",
            authors: ["Mozambique", "Sierra Leone", "Algeria"],
            coAuthors: [],
            signatories: [],
            votingResults: { for: 14, against: 0, abstain: 1 },
            votesFor: ["France", "United Kingdom", "China", "Russia", "Algeria", "Ecuador", "Guyana", "Japan", "Malta", "Mozambique", "Republic of Korea", "Sierra Leone", "Slovenia", "Switzerland"],
            votesAgainst: [],
            votesAbstain: ["United States"],
            vetoes: [],
            background: "Demanded an immediate ceasefire for the month of Ramadan respected by all parties, leading to a lasting sustainable ceasefire, and demanded the immediate and unconditional release of all hostages. The United States abstained rather than vetoing, a departure from its usual practice on Middle East resolutions at the time."
        },
        {
            id: "S/RES/2712 (2023)",
            committee: "UNSC",
            agenda: "The situation in the Middle East, including the Palestinian question",
            authors: ["Malta"],
            coAuthors: ["United Arab Emirates"],
            signatories: [],
            votingResults: { for: 12, against: 0, abstain: 3 },
            votesFor: ["France", "China", "Ecuador", "Gabon", "Ghana", "Japan", "Malta", "Mozambique", "Switzerland", "United Arab Emirates", "Brazil", "Albania"],
            votesAgainst: [],
            votesAbstain: ["United States", "United Kingdom", "Russia"],
            vetoes: [],
            background: "Called for urgent extended humanitarian pauses in Gaza to allow aid access, and for the release of hostages. The first resolution the Council adopted on the 2023 escalation after two prior drafts failed."
        }
    ],

    UNHRC: [
        {
            id: "A/HRC/RES/52/1",
            committee: "UNHRC",
            agenda: "Human rights situations that require the Council's attention",
            authors: ["Ukraine", "Poland"],
            coAuthors: ["Germany", "France"],
            signatories: ["Canada", "Australia", "Japan"],
            votingResults: { for: 28, against: 2, abstain: 17 },
            votesFor: ["Germany", "France", "United Kingdom", "United States", "Japan", "Poland", "Ukraine"],
            votesAgainst: ["Russia", "Eritrea"],
            votesAbstain: ["China", "India", "South Africa", "Pakistan"],
            vetoes: [],
            background: "Extended the mandate of the Independent International Commission of Inquiry, requesting a further written report on the human rights situation under review, with continued reporting to both the Council and the General Assembly."
        }
    ],

    DISEC: [
        {
            id: "A/RES/78/48",
            committee: "DISEC",
            agenda: "Prevention of an arms race in outer space",
            authors: ["Egypt", "Sri Lanka"],
            coAuthors: [],
            signatories: [],
            votingResults: { for: 163, against: 0, abstain: 8 },
            votesFor: ["Egypt", "Sri Lanka", "India", "Brazil", "South Africa", "Indonesia"],
            votesAgainst: [],
            votesAbstain: ["United States", "Israel"],
            vetoes: [],
            background: "Reaffirmed that the prevention of an arms race in outer space would avert a grave danger to international peace and security, and called on all states, especially major space powers, to refrain from actions contrary to the peaceful use of outer space."
        }
    ],

    SPECPOL: [
        {
            id: "A/RES/78/12",
            committee: "SPECPOL",
            agenda: "Effects of atomic radiation",
            authors: ["Belarus"],
            coAuthors: ["Kazakhstan", "Japan"],
            signatories: [],
            votingResults: { for: 172, against: 0, abstain: 3 },
            votesFor: ["Belarus", "Kazakhstan", "Japan", "Germany", "Brazil"],
            votesAgainst: [],
            votesAbstain: ["United States"],
            vetoes: [],
            background: "Endorsed the continuation of the scientific work of the UN Scientific Committee on the Effects of Atomic Radiation and requested it continue reporting on levels, effects, and risks of ionizing radiation from all sources."
        }
    ],

    ECOSOC: [],

    UNGA: [
        {
            id: "A/RES/ES-11/1",
            committee: "UNGA",
            agenda: "Aggression against Ukraine",
            authors: ["Poland", "Lithuania"],
            coAuthors: ["Ukraine"],
            signatories: [],
            votingResults: { for: 141, against: 5, abstain: 35 },
            votesFor: ["Poland", "Lithuania", "Ukraine", "United States", "Germany", "France", "Japan"],
            votesAgainst: ["Russia", "Belarus", "Syria", "North Korea", "Eritrea"],
            votesAbstain: ["China", "India", "South Africa", "Pakistan", "Cuba"],
            vetoes: [],
            background: "Adopted at an Emergency Special Session under the Uniting for Peace mechanism (used specifically because a veto blocked Security Council action). Deplored the invasion in the strongest terms and demanded a full withdrawal of forces."
        }
    ]

};

/* Helper: flatten every resolution across all committees, tagging
   nothing extra since `committee` is already on each object. */
function getAllResolutions() {
    return Object.values(RESOLUTIONS_DB).flat();
}

function findResolution(committeeId, resId) {
    const list = RESOLUTIONS_DB[committeeId] || [];
    return list.find(r => r.id === resId);
}

function findResolutionAnywhere(resId) {
    return getAllResolutions().find(r => r.id === resId);
}
