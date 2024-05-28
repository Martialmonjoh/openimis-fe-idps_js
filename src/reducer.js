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
        fetchingPerformance: false,
        fetchedPerformance: false,
        errorPerformance: null,
        performance: null,
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
            var performanceHealthFacility = action.payload;
            var s = { ...state, performanceHealthFacility };
            if (performanceHealthFacility) {
                s.performanceDistrict = s.performanceHealthFacility.location;
                s.performanceRegion = s.performanceDistrict.parent;
            }
            return s;
        case "IDPS_PERFORMANCES_REQ":
            return {
                ...state,
                fetchingPerformances: true,
                fetchedPerformances: false,
                performances: [],
                errorPerformances: null,
            };
        case "IDPS_PERFORMANCES_RESP":
            return {
                ...state,
                fetchingPerformances: false,
                fetchedPerformances: true,
                performances: parseData(action.payload.data.allCriteria),
                performancesPageInfo: pageInfo(action.payload.data.allCriteria),
                errorPerformances: formatGraphQLError(action.payload),
            };
        case "IDPS_PERFORMANCES_ERR":
            return {
                ...state,
                fetchingPerformances: false,
                errorPerformances: formatServerError(action.payload),
            };
        case "IDPS_PERFORMANCE_REQ":
            return {
                ...state,
                fetchingPerformance: true,
                fetchedPerformance: false,
                performance: null,
                errorPerformance: null,
            };
        case "IDPS_PERFORMANCE_RESP":
            return {
                ...state,
                fetchingPerformance: false,
                fetchedPerformance: true,
                performance: parseData(action.payload.data.allCriteria)[0],
                errorPerformance: formatGraphQLError(action.payload),
            };
        case "IDPS_PERFORMANCE_ERR":
            return {
                ...state,
                fetchingPerformance: false,
                errorPerformance: formatServerError(action.payload),
            };
        case "IDPS_MUTATION_REQ":
            return dispatchMutationReq(state, action);
        case "IDPS_MUTATION_ERR":
            return dispatchMutationErr(state, action);
        case "IDPS_CREATE_PERFORMANCE_RESP":
            return dispatchMutationResp(state, "createCriteria", action);
        case "IDPS_DELETE_PERFORMANCE_RESP":
            return dispatchMutationResp(state, "deletePerformance", action);
        case "IDPS_UPDATE_PERFORMANCE_RESP":
            return dispatchMutationResp(state, "updatePerformance", action);
        // case "IDPS_DELETE_PERFORMANCES_RESP":
        //     return dispatchMutationResp(state, "deletePerformances", action);
        default:
            return state
    }
}

export default reducer;