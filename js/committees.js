/*
 * MUN DATABASE V2
 * Committee System
 *
 * This file does NOT modify the Incident Database.
 * It creates the committee navigation for the new systems.
 */

(function () {
    "use strict";

    const committees = [
        {
            id: "unsc",
            name: "UNSC",
            fullName: "United Nations Security Council"
        },
        {
            id: "unhrc",
            name: "UNHRC",
            fullName: "United Nations Human Rights Council"
        },
        {
            id: "disec",
            name: "DISEC",
            fullName: "Disarmament and International Security Committee"
        },
        {
            id: "specpol",
            name: "SPECPOL",
            fullName: "Special Political and Decolonization Committee"
        },
        {
            id: "ecosoc",
            name: "ECOSOC",
            fullName: "Economic and Social Council"
        },
        {
            id: "who",
            name: "WHO",
            fullName: "World Health Organization"
        },
        {
            id: "unep",
            name: "UNEP",
            fullName: "United Nations Environment Programme"
        },
        {
            id: "unesco",
            name: "UNESCO",
            fullName:
                "United Nations Educational, Scientific and Cultural Organization"
        },
        {
            id: "unwomen",
            name: "UN Women",
            fullName:
                "United Nations Entity for Gender Equality and the Empowerment of Women"
        },
        {
            id: "icj",
            name: "ICJ",
            fullName: "International Court of Justice"
        }
    ];

    /*
     * Return a copy so other scripts cannot accidentally
     * modify the original committee list.
     */
    function getCommittees() {
        return committees.map(committee => ({ ...committee }));
    }

    function getCommittee(id) {
        return committees.find(
            committee => committee.id === id
        ) || null;
    }

    /*
     * Tell the future Resolution Database which committee
     * the user selected.
     */
    function selectCommittee(id) {
        const committee = getCommittee(id);

        if (!committee) {
            console.warn(
                "Unknown committee:",
                id
            );
            return;
        }

        document.dispatchEvent(
            new CustomEvent(
                "mun:committee-selected",
                {
                    detail: committee
                }
            )
        );
    }

    /*
     * Tell the future Resolution Database that the user
     * wants to search every committee.
     */
    function selectAllCommittees() {
        document.dispatchEvent(
            new CustomEvent(
                "mun:all-committees-selected"
            )
        );
    }

    /*
     * Public API.
     *
     * Other files can use:
     *
     * MUNCommittees.getAll()
     * MUNCommittees.get("unsc")
     * MUNCommittees.select("unsc")
     * MUNCommittees.selectAll()
     */
    window.MUNCommittees = {

        getAll: getCommittees,

        get: getCommittee,

        select: selectCommittee,

        selectAll: selectAllCommittees

    };

})();
