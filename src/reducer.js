import {
    parseData,
    dispatchMutationReq,
    dispatchMutationResp,
    dispatchMutationErr,
    pageInfo,
    formatServerError,
    formatGraphQLError,
} from "@openimis/fe-core";

function reducer(
    state = {
        performance: {},
        mutation: {},
        errorClaim: null,
        fetchingPerformances: false,
        fetchedPerformances: false,
        errorPerformances: null,
        performances: [],
        performancesPageInfo: { totalCount: 0 },
        submittingMutation: false,
        mutation: {},
    },
    action,
) {
    switch (action.type) {
        case "IDPS_PERFORMANCE_HEALTH_FACILITY_SELECTED":
            var claimHealthFacility = action.payload;
            var s = { ...state, claimHealthFacility };
            if (claimHealthFacility) {
                s.claimDistrict = s.claimHealthFacility.location;
                s.claimRegion = s.claimDistrict.parent;
            } else {
                delete s.claimAdmin;
            }
            return s;
        case "IDPS_PERFORMANCE_SEARCHER_REQ":
            return {
                ...state,
                fetchingPerformances: true,
                fetchedPerformances: false,
                performances: null,
                performancesPageInfo: { totalCount: 0 },
                errorPerformances: null,
            };
        case "IDPS_PERFORMANCE_SEARCHER_RESP":
            return {
                ...state,
                fetchingPerformances: false,
                fetchedPerformances: true,
                performances: parseData(action.payload.data.allCriteria),
                performancesPageInfo: pageInfo(action.payload.data.allCriteria),
                errorPerformances: formatGraphQLError(action.payload),
            };
        case "IDPS_PERFORMANCE_SEARCHER_ERR":
            return {
                ...state,
                fetchingPerformances: false,
                errorPerformances: formatServerError(action.payload),
            };
        case "IDPS_MUTATION_ERR_MUTATION_REQ":
            return dispatchMutationReq(state, action);
        case "IDPS_MUTATION_ERR":
            return dispatchMutationErr(state, action);
        case "IDPS_MUTATION_REQ":
            return dispatchMutationReq(state, action);
        case "IDPS_MUTATION_ERR":
            return dispatchMutationErr(state, action);
        case "IDPS_CREATE_PERFORMANCE_RESP":
            return dispatchMutationResp(state, "createPerformance", action);
        case "IDPS_DELETE_PERFORMANCES_RESP":
            return dispatchMutationResp(state, "deletePerformances", action);
    }
}

export default reducer;