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
            id: "S/RES/2686 (2023)",
            committee: "UNSC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: { for: 15, against: 0, abstain: 0 },
            votesFor: [],
            votesAgainst: [],
            votesAbstain: [],
            vetoes: [],
            background: "'Tolerance and international peace and security,' adopted unanimously in June 2023. Expressed deep concern at discrimination, intolerance and extremism, including instances motivated by Islamophobia, antisemitism, Christianophobia and other forms of religious hatred, much of it fueled by hate speech and disinformation on social media. Encouraged states to counter intolerant ideology through education and interreligious dialogue, and instructed UN envoys, missions and peacekeepers to monitor and report on related incidents."
        },
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
            id: "A/HRC/RES/16/18",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["Organization of Islamic Cooperation member states (led by Pakistan)"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [],
            votesAgainst: [],
            votesAbstain: [],
            vetoes: [],
            background: "Adopted by consensus (no vote) on 24 March 2011. The landmark resolution on 'combating intolerance, negative stereotyping and stigmatization of, and discrimination, incitement to violence, and violence against persons, based on religion or belief.' It set out an 8-point Action Plan asking states to combat religious intolerance through education, interfaith dialogue and criminalizing incitement to imminent violence, while explicitly avoiding restrictions on freedom of expression. It replaced the earlier, more contested 'defamation of religions' resolutions and is the foundation of the ongoing 'Istanbul Process.' Renewed annually since 2011 by both the HRC and the General Assembly."
        },
        {
            id: "A/HRC/RES/19/25",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 23 March 2012. First annual follow-up to resolution 16/18, reaffirming the same 8-point Action Plan and reviewing early implementation, including the first Istanbul Process meeting."
        },
        {
            id: "A/HRC/RES/22/31",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 22 March 2013. Continued the 16/18 follow-up series, welcoming further Istanbul Process meetings and reiterating the Action Plan."
        },
        {
            id: "A/HRC/RES/25/34",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 28 March 2014, continuing the annual 16/18 follow-up series."
        },
        {
            id: "A/HRC/RES/28/29",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 27 March 2015. Referenced heavily in later civil-society tracking as the 'most recent' follow-up resolution as of the mid-2010s Istanbul Process reviews."
        },
        {
            id: "A/HRC/RES/31/26",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 24 March 2016, continuing the same 8-point Action Plan language unchanged since 2011."
        },
        {
            id: "A/HRC/RES/34/32",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 24 March 2017, negotiated against the backdrop of the UN High Commissioner's warning that 'hate is being mainstreamed' globally."
        },
        {
            id: "A/HRC/RES/37/38",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 23 March 2018, continuing the 16/18 follow-up series."
        },
        {
            id: "A/HRC/RES/40/25",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 22 March 2019, continuing the 16/18 follow-up series."
        },
        {
            id: "A/HRC/RES/43/34",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 22 June 2020 (delayed session due to COVID-19), continuing the 16/18 follow-up series."
        },
        {
            id: "A/HRC/RES/46/27",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["OIC member states"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 24 March 2021, continuing the 16/18 follow-up series into its tenth year."
        },
        {
            id: "A/HRC/RES/6/28",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted 14 December 2007. Extended the mandate of the Special Rapporteur on the Promotion and Protection of Human Rights and Fundamental Freedoms while Countering Terrorism for three years -- the mandate holder most directly responsible for documenting how counter-terrorism measures intersect with religious profiling and discrimination against Muslim communities."
        },
        {
            id: "A/HRC/RES/35/34",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted without a vote on 23 June 2017. Renewed the mandate of the Special Rapporteur on human rights and counter-terrorism and expressed concern at violations of human rights, refugee law and international humanitarian law occurring in the name of counter-terrorism."
        },
        {
            id: "A/HRC/RES/37/27",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted in 2018 on the theme of terrorism and human rights, addressing states' obligations under international human rights law while designing and implementing counter-terrorism measures, including profiling practices affecting religious minorities."
        },
        {
            id: "A/HRC/RES/40/16",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted in 2019, renewing the mandate of the Special Rapporteur on the promotion and protection of human rights while countering terrorism."
        },
        {
            id: "A/HRC/RES/42/18",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted in 2019 on terrorism and human rights, part of the same recurring HRC series addressing rights violations in counter-terrorism enforcement."
        },
        {
            id: "A/HRC/RES/45/11",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted in 2020 on terrorism and human rights, continuing the recurring HRC mandate-and-monitoring series on counter-terrorism's human rights impact."
        },
        {
            id: "A/HRC/RES/49/10",
            committee: "UNHRC",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Renewed the mandate of the Special Rapporteur on human rights and counter-terrorism. Later cited by resolution A/HRC/58/L.29 (2025) as the baseline terms for a further three-year mandate extension."
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
            id: "A/RES/78/264",
            committee: "UNGA",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["Pakistan (on behalf of the OIC)"],
            coAuthors: [],
            signatories: [],
            votingResults: { for: 115, against: 0, abstain: 44 },
            votesFor: [],
            votesAgainst: [],
            votesAbstain: [],
            vetoes: [],
            background: "'Measures to Combat Islamophobia,' adopted 15 March 2024 (marking the International Day to Combat Islamophobia) by a recorded vote of 115-0-44. Condemned incitement to discrimination, hostility or violence against Muslims, called on states to legislate against such incitement, and requested the Secretary-General appoint a UN Special Envoy to combat Islamophobia. Several Western states abstained over concerns about the resolution's single-religion focus and the cost of creating the Special Envoy post; none voted against."
        },
        {
            id: "A/RES/76/254",
            committee: "UNGA",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: ["Pakistan (on behalf of the OIC)"],
            coAuthors: [],
            signatories: [],
            votingResults: null,
            votesFor: [], votesAgainst: [], votesAbstain: [],
            vetoes: [],
            background: "Adopted by consensus in March 2022, designating 15 March as the annual International Day to Combat Islamophobia -- the day marking the 2019 Christchurch mosque attacks."
        },
        {
            id: "A/RES/66/167",
            committee: "UNGA",
            agenda: "Addressing the rise of Islamophobia and religious discrimination in the context of counter-terrorism efforts",
            authors: [],
            coAuthors: [],
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
