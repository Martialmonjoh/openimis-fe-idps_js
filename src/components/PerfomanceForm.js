import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  withModulesManager,
  withHistory,
  historyPush,
  Form,
} from "@openimis/fe-core";
import PerfomanceMasterPanel from "../components/PerfomanceMasterPanel";

const styles = (theme) => ({
  page: theme.page,
});

class PerfomanceForm extends Component {
  state = {
    lockNew: false,
    reset: 0,
    performance: this._newPerformance(),
    newPerfomance: true,
  };

  canSave = () => {
    console.log(this.state.performance)
    if (!this.state.performance.month) return false;
    if (!this.state.performance.year) return false;
    if (!this.state.performance.healthFacility) return false;
    if (!this.state.performance.permanentAvailability) return false;
    if (!this.state.performance.qualifiedPersonnel) return false;
    if (!this.state.performance.garbageAvailability) return false;
    if (!this.state.performance.cleanliness) return false;
    if (!this.state.performance.wasteSeparation) return false;
    if (!this.state.performance.functionalToilets) return false;
    if (!this.state.performance.sterilizationTools) return false;
    return true;
  };

  onEditedChanged = (performance) => {
    this.setState({ performance, newPerformance: false });
  };

  _save = () => {
    this.setState(
      { lockNew: !performance.uuid }, // avoid duplicates
      (e) => this.props.save(performance),
    );
  };

  _newPerformance() {
    let performance = {};
    performance.jsonExt = {};
    return performance;
  }

  _add = () => {
    this.setState(
      (state) => ({
        insuree: this._newInsuree(),
        newInsuree: true,
        lockNew: false,
        reset: state.reset + 1,
      }),
      (e) => {
        this.props.add();
        this.forceUpdate();
      },
    );
  };

  render() {
    const {
      intl,
      save,
      add
    } = this.props;
    const { performance } = this.state;
    return (
      <Form
        module="idps"
        reset={this.state.reset}
        Panels={[PerfomanceMasterPanel]}
        edited={this.state.performance}
        performance={this.state.performance}
        onEditedChanged={this.onEditedChanged}
        canSave={this.canSave}
        save={!!save ? this._save : null}
        add={!!add && !this.state.newPerfomance ? this._add : null}
      />
    );
  }
}



export default withHistory(
  withModulesManager(injectIntl(withTheme(withStyles(styles)(PerfomanceForm))))
);
