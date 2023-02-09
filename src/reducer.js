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
                performances: action.payload.data.allCriteria,
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
            return dispatchMutationResp(state, "createPerformance", action);
        case "IDPS_DELETE_PERFORMANCES_RESP":
            return dispatchMutationResp(state, "deletePerformances", action);
        default:
            return state
    }
}

export default reducer;