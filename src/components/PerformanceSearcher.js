import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import moment from "moment"
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Grid, IconButton, Tooltip, Box } from "@material-ui/core";
import { Search as SearchIcon, Tab as TabIcon } from "@material-ui/icons";
import {
  withModulesManager,
  formatMessageWithValues,
  formatMessage,
  Searcher,
  withHistory,
  PublishedComponent,
  decodeId
} from "@openimis/fe-core";
import { fetchPerformanceSummaries } from "../actions";

import PerformanceFilter from "./PerformanceFilter";

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

class PerformanceSearcher extends Component {
  state = {
    open: false,
    id: null,
    confirmedAction: null,
    reset: 0,
  };

  constructor(props) {
    super(props);
    this.rowsPerPageOptions = props.modulesManager.getConf(
      "fe-claim",
      "claimFilter.rowsPerPageOptions",
      [10, 20, 50, 100],
    );
    this.defaultPageSize = props.modulesManager.getConf("fe-claim", "claimFilter.defaultPageSize", 10);
  }

  canSelectAll = (selection) =>
    this.props.performances.map((s) => s.id).filter((s) => !selection.map((s) => s.id).includes(s)).length;


  fetch = (prms) => {
    this.props.fetchPerformanceSummaries(this.props.modulesManager, prms);
  };

  rowIdentifier = (r) => r.id;

  filtersToQueryParams = (state) => {
    let prms = Object.keys(state.filters)
      .filter((f) => !!state.filters[f]["filter"])
      .map((f) => state.filters[f]["filter"]);
    if (!!state.afterCursor) {
      prms.push(`after: "${state.afterCursor}"`);
    }
    if (!!state.beforeCursor) {
      prms.push(`before: "${state.beforeCursor}"`);
    }
    return prms;
  };

  headers = (filters) => {
    var h = [
      "performanceSummaries.healthFacility",
      "performanceSummaries.score",
      "performanceSummaries.period",
      "performanceSummaries.promptnessSubmission",
      "performanceSummaries.degreOfRejection",
      "performanceSummaries.medecineAvailability",
      "performanceSummaries.qualifiedPersonnel",
    ];
    return h;
  };

  sorts = (filters) => {
    var results = [
      ["id", true],
      ["period", true],
      ["hfScore", true],
      ["degreOfRejection", true],
      ["promptnessSubmission", true]
    ];
    _.times(this.locationLevels, () => results.push(null));
    results.push(["validityFrom", false], ["validityTo", false]);
    return results;
  };

  handleClose = () => {
    this.setState({ open: false, chfid: null });
  };

  formatDate = (date) => {
    return moment(date).format('YYYY-MM')
  }

  itemFormatters = (filters) => {
    var formatters = [
      (performance) => (
        <Box minWidth={300}>
          <PublishedComponent
            readOnly={true}
            pubRef="location.HealthFacilityPicker"
            withLabel={false}
            value={performance.healthFacility}
          />
        </Box>
      ),
      (performance) => performance.hfScore,
      (performance) => this.formatDate(performance.period),
      (performance) => performance.promptnessSubmission,
      (performance) => performance.degreOfRejection,
      (performance) => performance.medecineAvailability,
      (performance) => performance.qualifiedPersonnel,
    ];
    return formatters.filter(Boolean);
  };

  rowDisabled = (selection, i) => !!i.validityTo;
  rowLocked = (selection, performance) => !!performance.clientMutationId;

  render() {
    const {
      intl,
      performances,
      fetchingPerformances,
      fetchedPerformances,
      errorPerformances,
      filterPaneContributionsKey,
      cacheFiltersKey,
      onDoubleClick,
    } = this.props;

    let count = performances.length;

    let performancesPageInfo = {
      totalCount: count
    }

    return (
      <Fragment>
        <Searcher
          module="idps"
          cacheFiltersKey={cacheFiltersKey}
          FilterPane={PerformanceFilter}
          filterPaneContributionsKey={filterPaneContributionsKey}
          items={performances}
          itemsPageInfo={performancesPageInfo}
          fetchingItems={fetchingPerformances}
          fetchedItems={fetchedPerformances}
          errorItems={errorPerformances}
          tableTitle={formatMessageWithValues(intl, "idps", "performanceSummaries", { count })}
          rowsPerPageOptions={this.rowsPerPageOptions}
          defaultPageSize={this.defaultPageSize}
          fetch={this.fetch}
          rowIdentifier={this.rowIdentifier}
          filtersToQueryParams={this.filtersToQueryParams}
          defaultOrderBy="-period"
          headers={this.headers}
          itemFormatters={this.itemFormatters}
          sorts={this.sorts}
          aligns={this.aligns}
          rowLocked={this.rowLocked}
          onDoubleClick={onDoubleClick}
          reset={this.state.reset}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  performances: state.idps.performances,
  fetchingPerformances: state.idps.fetchingPerformances,
  fetchedPerformances: state.idps.fetchedPerformances,
  errorPerformances: state.idps.errorPerformances,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPerformanceSummaries }, dispatch);
};

export default withModulesManager(
  withHistory(connect(mapStateToProps, mapDispatchToProps)(injectIntl((PerformanceSearcher)))),
);
