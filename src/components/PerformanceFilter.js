import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _debounce from "lodash/debounce";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import {
  withModulesManager,
  ControlledField,
  PublishedComponent,
  TextInput,
  NumberInput,
} from "@openimis/fe-core";
import { selectHealthFacility } from "../actions";
import PerformanceMonthPicker from "../pickers/PerformanceMonthPicker";
import PerformanceYearPicker from "../pickers/PerformanceYearPicker";

const styles = (theme) => ({
  dialogTitle: theme.dialog.title,
  dialogContent: theme.dialog.content,
  form: {
    padding: 0,
  },
  item: {
    padding: theme.spacing(1),
  },
  paperDivider: theme.paper.divider,
});

class PerformanceFilter extends Component {
  state = {
    showHistory: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.filters["showHistory"] !== this.props.filters["showHistory"] &&
      !!this.props.filters["showHistory"] &&
      this.state.showHistory !== this.props.filters["showHistory"]["value"]
    ) {
      this.setState((state, props) => ({ showHistory: props.filters["showHistory"]["value"] }));
    }
  }

  debouncedOnChangeFilter = _debounce(
    this.props.onChangeFilters,
    this.props.modulesManager.getConf("fe-idps", "debounceTime", 800),
  );

  _filterValue = (k) => {
    const { filters } = this.props;
    return !!filters[k] ? filters[k].value : null;
  };

  _onChangeShowHistory = () => {
    let filters = [
      {
        id: "showHistory",
        value: !this.state.showHistory,
        filter: `showHistory: ${!this.state.showHistory}`,
      },
    ];
    this.props.onChangeFilters(filters);
    this.setState((state) => ({
      showHistory: !state.showHistory,
    }));
  };

  _healthFacilityFilter = (v) => {
    if (!!v) {
      return {
        id: "healthFacility",
        value: v,
        filter: `hfid: "${v.id}"`,
      };
    } else {
      return { id: "healthFacility", value: null, filter: null };
    }
  };

  _onChangeHealthFacility = (v, s) => {
    this.props.onChangeFilters([
      this._healthFacilityFilter(v),
    ]);
    this.setState((state) => ({
      reset: this.state.reset + 1,
    }));
    this.props.selectHealthFacility(v);
  };

  render() {
    const { intl, classes, filters, onChangeFilters } = this.props;
    return (
      <Grid container className={classes.form}>
        <ControlledField
          module="idps"
          id="PerformanceFilter.healthFacility"
          field={
            <Grid item xs={3} className={classes.item}>
              <PublishedComponent
                pubRef="location.HealthFacilityPicker"
                value={this._filterValue("healthFacility")}
                reset={this.state.reset}
                onChange={this._onChangeHealthFacility}
              />
            </Grid>
          }
        />
        <ControlledField
          module="idps"
          id="performanceFilter.period"
          field={
            <Grid item xs={2} className={classes.item}>
              <PerformanceMonthPicker
                module="idps"
                label="performance.month"
                value={this._filterValue("period")}
                withNull={true}
                onChange={(v) =>
                  this.debouncedOnChangeFilter([
                    {
                      id: "period",
                      value: v,
                      filter: `period: "${v}"`,
                    },
                  ])
                }
              />
            </Grid>
          }
        />
        <ControlledField
          module="idps"
          id="performanceFilter.period"
          field={
            <Grid item xs={2} className={classes.item}>
              <PerformanceYearPicker
                module="idps"
                label="performance.year"
                value={this._filterValue("period")}
                onChange={(v) =>
                  this.debouncedOnChangeFilter([
                    {
                      id: "period",
                      value: v,
                      filter: `period: "${v}"`,
                    },
                  ])
                }
              />
            </Grid>
          }
        />
        <ControlledField
          module="idps"
          id="performanceFilter.score"
          field={
            <Grid item xs={2} className={classes.item}>
              <NumberInput
                value={this._filterValue("score")}
                reset={this.state.reset}
                module="idps"
                label={"performanceFilter.score"}
                onChange={(v) =>
                  this.debouncedOnChangeFilter([
                    {
                      id: "score",
                      value: v,
                      filter: `score: "${v}"`,
                    },
                  ])
                }
              />
            </Grid>
          }
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectHealthFacility }, dispatch);
};

export default withModulesManager(connect(mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(PerformanceFilter)))));
