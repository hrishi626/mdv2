/*
 * MUN DATABASE V2
 * Resolution Database Engine
 *
 * This file handles resolution searching and selection.
 * Resolution data will come from data/resolutions.json.
 */

(function () {
    "use strict";

    let resolutions = [];

    let currentCommittee = null;

    /*
     * Load the resolution database.
     */
    async function loadResolutions() {

        try {

            const response = await fetch(
                "data/resolutions.json",
                {
                    cache: "no-cache"
                }
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const data = await response.json();

            resolutions =
                Array.isArray(data.resolutions)
                    ? data.resolutions
                    : [];

            console.log(
                `MUN Database: loaded ${resolutions.length} resolutions.`
            );

            return resolutions;

        } catch (error) {

            console.error(
                "Could not load resolution database:",
                error
            );

            resolutions = [];

            return [];
        }
    }


    /*
     * Normalize text for searching.
     */
    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s/.-]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }


    /*
     * Search resolutions.
     *
     * Examples:
     *
     * search("S/RES/2728")
     * search("2728")
     * search("Gaza")
     * search("Ukraine")
     */
    function search(query, committeeId = null) {

        const normalizedQuery =
            normalize(query);

        let results = resolutions;


        /*
         * Restrict search to a committee if one
         * has been selected.
         */
        if (committeeId) {

            results =
                results.filter(resolution =>
                    normalize(
                        resolution.committeeId
                    ) === normalize(committeeId)
                );
        }


        /*
         * Empty search = return everything
         * from the selected committee.
         */
        if (!normalizedQuery) {
            return results.slice();
        }


        /*
         * Search across multiple useful fields.
         */
        return results.filter(resolution => {

            const searchableText = normalize([
                resolution.number,
                resolution.title,
                resolution.committee,
                resolution.agenda,
                resolution.authors,
                resolution.coAuthors,
                resolution.signatories,
                resolution.explanation,
                resolution.vetoExplanation
            ].flat().join(" "));

            return searchableText.includes(
                normalizedQuery
            );
        });
    }


    /*
     * Search a specific resolution number.
     */
    function findByNumber(number) {

        const target =
            normalize(number);

        return resolutions.find(
            resolution =>
                normalize(resolution.number) === target
        ) || null;
    }


    /*
     * Select a committee.
     */
    function setCommittee(committee) {

        currentCommittee =
            committee || null;

        console.log(
            "Resolution committee:",
            currentCommittee
        );

        document.dispatchEvent(
            new CustomEvent(
                "mun:resolution-committee-changed",
                {
                    detail: {
                        committee: currentCommittee
                    }
                }
            )
        );
    }


    /*
     * Get currently selected committee.
     */
    function getCurrentCommittee() {

        return currentCommittee;
    }


    /*
     * Open a resolution.
     */
    function openResolution(resolution) {

        if (!resolution) {
            return;
        }

        document.dispatchEvent(
            new CustomEvent(
                "mun:resolution-selected",
                {
                    detail: {
                        resolution: resolution
                    }
                }
            )
        );
    }


    /*
     * Get all loaded resolutions.
     */
    function getAll() {

        return resolutions.slice();
    }


    /*
     * Listen for committee selections from
     * committees.js.
     */

    document.addEventListener(
        "mun:committee-selected",
        function (event) {

            setCommittee(
                event.detail.committee
            );

        }
    );


    /*
     * Listen for "all committees".
     */

    document.addEventListener(
        "mun:all-committees-selected",
        function () {

            setCommittee(null);

        }
    );


    /*
     * Public API.
     */

    window.MUNResolutions = {

        load: loadResolutions,

        search: search,

        findByNumber: findByNumber,

        open: openResolution,

        getAll: getAll,

        setCommittee: setCommittee,

        getCurrentCommittee:
            getCurrentCommittee

    };


    /*
     * Automatically load the database.
     */

    loadResolutions();

})();
