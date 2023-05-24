import {
  formatPageQueryWithCount,
  formatPageQuery,
  formatQuery,
  graphql,
  formatMutation,
  decodeId
} from "@openimis/fe-core";

const PERFORMANCE_FULL_PROJECTION = (mm) => [
  "id",
  "period",
  "medecineAvailability",
  "qualifiedPersonnel",
  "garbagecanAvailability",
  "roomsCleaness",
  "wasteSeparation",
  "functionalsToilets",
  "sterilizationTools",
  "promptnessSubmission",
  "hfScore",
  "healthFacility",
  "degreOfRejection",
];

export function selectHealthFacility(hf) {
  return (dispatch) => {
    dispatch({ type: "IDPS_PERFORMANCE_HEALTH_FACILITY_SELECTED", payload: hf });
  };
}

export function createPerformance(mm, performance, clientMutationLabel) {

  let mutation = formatMutation("createCriteria", formatPerformanceGQL(mm, performance), clientMutationLabel);
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ["IDPS_MUTATION_REQ", "IDPS_CREATE_PERFORMANCE_RESP", "IDPS_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel,
    requestedDateTime,
  });
}

export function formatPerformanceGQL(mm, performance) {
  const date = new Date(`${performance.month} 1, ${performance.year}`)
  let monthNumber = date.getMonth() + 1;
  if (monthNumber < 10) {
    monthNumber = `0${monthNumber}`;
  }
  return `
    ${!!performance.month && !!performance.year ? `period: "${performance.year}-${monthNumber}"` : ""}
    ${!!performance.healthFacility && !!performance.healthFacility.id ? `healthFacility: ${decodeId(performance.healthFacility.id)}` : ""}
    ${!!performance.qualifiedPersonnel ? `qualifiedPersonnel: ${performance.qualifiedPersonnel}` : ""}
    ${!!performance.garbagecanAvailability ? `garbagecanAvailability: ${performance.garbagecanAvailability}` : ""}
    ${!!performance.roomsCleaness ? `roomsCleaness: ${performance.roomsCleaness}` : ""}
    ${!!performance.medecineAvailability ? `medecineAvailability: ${performance.medecineAvailability}` : ""}
    ${!!performance.functionalToilets ? `functionalsToilets: ${performance.functionalToilets}` : ""}
    ${!!performance.wasteSeparation ? `wasteSeparation: ${performance.wasteSeparation == true ? 1 : 0}` : `wasteSeparation: 0`}
    ${!!performance.sterilizationTools ? `sterilizationTools: ${performance.sterilizationTools}` : ""}
  `;
}

export function fetchPerformanceSummaries(mm, filters) {
  var projections = [
    "id",
    "period",
    "medecineAvailability",
    "qualifiedPersonnel",
    "garbagecanAvailability",
    "roomsCleaness",
    "wasteSeparation",
    "functionalsToilets",
    "sterilizationTools",
    "promptnessSubmission",
    "hfScore",
    "healthFacility",
    "degreOfRejection",
  ];

  const payload = formatPageQueryWithCount("allCriteria", filters, projections);
  return graphql(payload, "IDPS_PERFORMANCES");
}

export function deletePerformance(mm, performance, clientMutationLabel) {
  let mutation = formatMutation(
    "deletePerformances",
    `ids: ["${performance.id}"]`,
    clientMutationLabel,
  );
  performance.clientMutationId = mutation.clientMutationId;
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ["IDPS_MUTATION_REQ", "IDPS_DELETE_PERFORMANCES_RESP", "IDPS_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel,
    requestedDateTime,
    familyUuid: family_uuid,
  });
}

export function fetchPerformance(mm, performanceId) {
  let payload = formatPageQuery(
    "allCriteria",
    [`id:${decodeId(performanceId)}`],
    [
      "id",
      "period",
      "medecineAvailability",
      "qualifiedPersonnel",
      "garbagecanAvailability",
      "roomsCleaness",
      "wasteSeparation",
      "functionalsToilets",
      "sterilizationTools",
      "promptnessSubmission",
      "hfScore",
      "healthFacility",
      "degreOfRejection",
    ],
  );
  return graphql(payload, "IDPS_PERFORMANCE");
}

export function fetchPerformancesFromHfId(mm, filters) {
  let payload = formatQuery("healthFacilityFilter", filters, PERFORMANCE_FULL_PROJECTION(mm));
  return graphql(payload, "IDPS_PERFORMANCES");
}