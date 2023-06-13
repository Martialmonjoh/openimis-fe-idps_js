import _ from "lodash";

export function performanceLabel(perfomance) {
  if (!perfomance) return "";
  return `${_.compact([perfomance?.id, perfomance?.period]).join(" ")}${
    !!perfomance?.period ? ` (${perfomance?.id})` : ""
  }`;
}