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
        case "PERFORMANCE_MUTATION_REQ":
            return dispatchMutationReq(state, action);
        case "PERFORMANCE_MUTATION_ERR":
            return dispatchMutationErr(state, action);
        case "PERFORMANCE_CREATE_PERFORMANCE_RESP":
            return dispatchMutationResp(state, "createPerformance", action);
    }
}

export default reducer;