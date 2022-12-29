import { formatPageQuery, graphql,formatMutation, formatGQLString } from "@openimis/fe-core";

export function selectHealthFacility(hf) {
  return (dispatch) => {
    dispatch({ type: "IDPS_PERFORMANCE_HEALTH_FACILITY_SELECTED", payload: hf });
  };
}

export function createPerformance(mm, performance, clientMutationLabel) {
  let mutation = formatMutation("createPerformance", formatPerformanceGQL(mm, performance),clientMutationLabel);
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ["PERFORMANCE_MUTATION_REQ", "PERFORMANCE_CREATE_PERFORMANCE_RESP", "PERFORMANCE_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel,
    requestedDateTime,
  });
}

export function formatPerformanceGQL(mm, performance) {
  return `
    ${!!performance.month ? `month: "${formatGQLString(performance.month)}"` : ""}
    ${!!performance.year ? `year: "${formatGQLString(performance.year)}"` : ""}
    ${!!performance.promptness ? `promptness: "${formatGQLString(performance.promptness)}"` : ""}
    ${!!performance.rejectionDegree ? `rejectionDegree: "${performance.rejectionDegree}"` : ""}
    ${!!performance.qualifiedPersonnel ? `qualifiedPersonnel: "${performance.qualifiedPersonnel}"` : ""}
    ${!!performance.garbageAvailability ? `garbageAvailability: "${performance.garbageAvailability}"` : ""}
    ${!!performance.cleanliness ? `cleanliness: "${formatGQLString(performance.cleanliness)}"` : ""}
    ${!!performance.permanentAvailability ? `permanentAvailability: "${formatGQLString(performance.permanentAvailability)}"` : ""}
    ${!!performance.functionalToilets ? `functionalToilets: "${formatGQLString(performance.functionalToilets)}"` : ""}
    wasteSeparation:${!!performance.wasteSeparation}
    ${!!performance.sterilizationTools ? `sterilizationTools: ${performance.sterilizationTools}` : ""}
    ${!!insuree.jsonExt ? `jsonExt: ${formatJsonField(insuree.jsonExt)}` : ""}
  `;
}