import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Search as SearchIcon, Tab as TabIcon } from "@material-ui/icons";
import {
  withModulesManager,
  formatMessageWithValues,
  formatMessage,
  Searcher,
  withHistory,
  PublishedComponent,
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
      "fe-idps",
      "performanceFilter.rowsPerPageOptions",
      [10, 20, 50, 100],
    );
    this.defaultPageSize = props.modulesManager.getConf("fe-idps", "performanceFilter.defaultPageSize", 10);
    this.locationLevels = this.props.modulesManager.getConf("fe-location", "location.Location.MaxLevels", 4);
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
    prms.push(`first: ${state.pageSize}`);
    if (!!state.afterCursor) {
      prms.push(`after: "${state.afterCursor}"`);
    }
    if (!!state.beforeCursor) {
      prms.push(`before: "${state.beforeCursor}"`);
    }
    if (!!state.orderBy) {
      prms.push(`orderBy: ["${state.orderBy}"]`);
    }
    return prms;
  };

  headers = (filters) => {
    var h = [
      "idps.performanceSummaries.period",
      "idps.performanceSummaries.healthFacility",
      "idps.performanceSummaries.score",
      "",
    ];
    return h.filter(Boolean);
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

  itemFormatters = (filters) => {
    var formatters = [
      (performance) => performance.period,
      (performance) => (
        <PublishedComponent
          readOnly={true}
          pubRef="location.HealthFacilityPicker"
          withLabel={false}
          value={performance.healthFacility}
        />
      ),
      (performance) => performance.hfScore,
    ];
    formatters.push(
      (performance) => (
        <Grid container wrap="nowrap" spacing="2">
          <Grid item>
            <IconButton
              size="small"
              onClick={(e) => !performance.clientMutationId && this.setState({ open: true, id: performance.id })}
            >
              <SearchIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <Tooltip title={formatMessage(this.props.intl, "insuree", "insureeSummaries.openNewTabButton.tooltip")}>
              <IconButton
                size="small"
                onClick={(e) => !performance.clientMutationId && this.props.onDoubleClick(performance, true)}
              >
                <TabIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ),
    );
    return formatters.filter(Boolean);
  };

  rowDisabled = (selection, i) => !!i.validityTo;
  rowLocked = (selection, i) => !!i.clientMutationId;

  render() {
    const {
      intl,
      performances,
      performancesPageInfo,
      fetchingPerformances,
      fetchedPerformances,
      errorPerformances,
      filterPaneContributionsKey,
      cacheFiltersKey,
      onDoubleClick,
    } = this.props;

    let count = performancesPageInfo.totalCount;

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
          contributionKey={IDPS_SEARCHER_CONTRIBUTION_KEY}
          tableTitle={formatMessageWithValues(intl, "idps", "performanceSummaries", { count })}
          rowsPerPageOptions={this.rowsPerPageOptions}
          defaultPageSize={this.defaultPageSize}
          fetch={this.fetch}
          rowIdentifier={this.rowIdentifier}
          filtersToQueryParams={this.filtersToQueryParams}
          defaultOrderBy="id"
          headers={this.headers}
          itemFormatters={this.itemFormatters}
          sorts={this.sorts}
          rowDisabled={this.rowDisabled}
          rowLocked={this.rowLocked}
          onDoubleClick={(i) => !i.clientMutationId && onDoubleClick(i)}
          reset={this.state.reset}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  performances: state.idps.performances,
  performancesPageInfo: state.idps.performancesPageInfo,
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
