import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  formatMessageWithValues,
  formatMessage,
  withModulesManager,
  Form,
  Helmet,
} from "@openimis/fe-core";
import PerfomanceMasterPanel from "../components/PerfomanceMasterPanel";

const styles = (theme) => ({
  page: theme.page,
});

class PerfomanceForm extends Component {
  state = {
    lockNew: false,
    performance: this._newPerformance(),
    newPerfomance: true,
  };

  canSave = () => {
    if (!this.state.performance.dateFrom) return false;
    if (!this.state.performance.dateTo) return false;
    if (!this.state.performance.healthFacility) return false;
    if (!this.state.performance.promptness) return false;
    if (!this.state.performance.permanentAvailability) return false;
    if (!this.state.performance.rejectionDegree) return false;
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

  _newPerformance() {
    let performance = {};
    performance.jsonExt = {};
    return performance;
  }

  render() {
    const {
      intl,
    } = this.props;
    const { performance } = this.state;
    return (
      <Form
        module="idps"
        Panels={[PerfomanceMasterPanel]}
        performance={this.state.performance}
        onEditedChanged={this.onEditedChanged}
        canSave={this.canSave}
      />
    );
  }
}



export default withModulesManager(injectIntl(withTheme(withStyles(styles)(PerfomanceForm))));
