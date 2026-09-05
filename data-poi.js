/* ============================================================
   POI DOSSIER DATA
   ------------------------------------------------------------
   POI = Point of Information (not "PY").

   Two kinds of data live here:

   1. SAMPLE_POI_LIBRARY — a small public demo so the feature
      has something to show before any user has created their
      own content. Safe to delete these entries once real data
      exists; nothing sensitive lives in this file since it is
      shipped as plain JS to everyone.

   2. Everything a real user creates (their MUNs, agendas,
      countries, dossiers, and their account) is NOT stored
      here. It is written at runtime to the browser's
      localStorage, namespaced per account (see app-poi.js).
      That keeps it out of the public, static, GitHub-Pages-
      hosted files entirely -- it never leaves the user's
      browser unless you later wire up a real backend.

   Schema for one dossier entry:
   {
     id: "unique-string",
     mun: "Conference name",
     agenda: "Agenda title",
     country: "Country/portfolio held",
     pois: [ { question: "...", answer: "..." }, ... ],
     notes: "free-form background/prep notes"
   }
   ============================================================ */

const SAMPLE_POI_LIBRARY = [
    {
        id: "sample-1",
        mun: "Sample MUN 2025",
        agenda: "The situation in the Middle East",
        country: "France",
        pois: [
            {
                question: "Delegate, does your country recognize the ICJ's jurisdiction on this matter?",
                answer: "France recognizes the ICJ's advisory jurisdiction but notes that advisory opinions are non-binding under Article 96 of the UN Charter."
            },
            {
                question: "Would your delegation support a binding ceasefire resolution?",
                answer: "France supports a ceasefire resolution but has historically abstained rather than blocked when hostage-release language was insufficiently precise."
            }
        ],
        notes: "This is placeholder demo content so the POI browser has something to display. Sign in and add your own dossiers to replace it."
    }
];

/* Storage key helpers used by app-poi.js */
const POI_STORAGE_PREFIX = "mun_poi_";
function poiUserKey(username) {
    return POI_STORAGE_PREFIX + "user_" + username.toLowerCase();
}
