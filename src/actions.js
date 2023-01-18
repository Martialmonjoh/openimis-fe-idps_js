import { formatPageQuery, graphql, formatMutation, formatGQLString,decodeId } from "@openimis/fe-core";

export function selectHealthFacility(hf) {
  return (dispatch) => {
    dispatch({ type: "IDPS_PERFORMANCE_HEALTH_FACILITY_SELECTED", payload: hf });
  };
}

export function createPerformance(mm, performance, clientMutationLabel) {

  let mutation = formatMutation("createCriteria", formatPerformanceGQL(mm, performance), clientMutationLabel);
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ["PERFORMANCE_MUTATION_REQ", "PERFORMANCE_CREATE_PERFORMANCE_RESP", "PERFORMANCE_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel,
    requestedDateTime,
  });
}

export function formatPerformanceGQL(mm, performance) {
  const date = new Date(`${performance.month} 1, ${performance.year}`)
  let monthNumber = date.getMonth() + 1;
  if(monthNumber < 10){
    monthNumber = `0${monthNumber}`;
  }
  return `
    ${!!performance.month && !!performance.year ? `date: "${performance.year}-${monthNumber}"` : ""}
    ${!!performance.promptness ? `promptness: ${performance.promptness}` : ""}
    ${!!performance.healthFacility && !!performance.healthFacility.id ? `healthFacility: ${decodeId(performance.healthFacility.id)}` : ""}
    ${!!performance.rejectionDegree ? `rejectionDegree: ${performance.rejectionDegree}` : ""}
    ${!!performance.qualifiedPersonnel ? `qualifiedPersonnel: ${performance.qualifiedPersonnel}` : ""}
    ${!!performance.garbageAvailability ? `garbagecanAvailability: ${performance.garbageAvailability}` : ""}
    ${!!performance.cleanliness ? `roomsCleaness: ${performance.cleanliness}` : ""}
    ${!!performance.medecineAvailability ? `medecineAvailability: ${performance.medecineAvailability}` : ""}
    ${!!performance.functionalToilets ? `functionalsToilets: ${performance.functionalToilets}` : ""}
    ${!!performance.wasteSeparation ? `wasteSeparation: ${performance.wasteSeparation==true ? 1: 0}` : ""}
    ${!!performance.sterilizationTools ? `sterilizationTools: ${performance.sterilizationTools}` : ""}
  `;
}