import { formatPageQuery, graphql, formatMutation, formatGQLString } from "@openimis/fe-core";

export function selectHealthFacility(hf) {
  return (dispatch) => {
    dispatch({ type: "IDPS_PERFORMANCE_HEALTH_FACILITY_SELECTED", payload: hf });
  };
}

export function createPerformance(mm, performance, clientMutationLabel) {
  
  let mutation = formatMutation("createPerformance", formatPerformanceGQL(mm, performance), clientMutationLabel);
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ["PERFORMANCE_MUTATION_REQ", "PERFORMANCE_CREATE_PERFORMANCE_RESP", "PERFORMANCE_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel,
    requestedDateTime,
  });
}

export function formatPerformanceGQL(mm, performance) {
  return `
    month: "${performance.month}"
    year: "${performance.year}"
    promptness: "${performance.promptness}"
    rejectionDegree: "${performance.rejectionDegree}"
    qualifiedPersonnel: "${performance.qualifiedPersonnel}"
    garbageAvailability: "${performance.garbageAvailability}"
    cleanliness: "${performance.cleanliness}"
    permanentAvailability: "${performance.permanentAvailability}"
    functionalToilets: "${performance.functionalToilets}"
    wasteSeparation: "${performance.wasteSeparation}"
    sterilizationTools: "${performance.sterilizationTools}"
  `;
}