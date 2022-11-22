import { formatPageQuery, graphql} from "@openimis/fe-core";

export function selectHealthFacility(hf) {
    return (dispatch) => {
      dispatch({ type: "IDPS_PERFORMANCE_HEALTH_FACILITY_SELECTED", payload: hf });
    };
  }