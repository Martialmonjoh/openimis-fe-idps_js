import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReplayIcon from "@material-ui/icons/Replay";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  withModulesManager,
  withHistory,
  historyPush,
  Form,
  journalize,
  ProgressOrError,
} from "@openimis/fe-core";
import PerfomanceMasterPanel from "../components/PerfomanceMasterPanel";
import { fetchPerformance } from "../actions";

const styles = (theme) => ({
  lockedPage: theme.page.locked,
});

class PerfomanceForm extends Component {
  state = {
    lockNew: false,
    reset: 0,
    update: true,
    performance: this._newPerformance(),
    newPerformance: true,
  };

  _newPerformance() {
    let performance = {};
    performance.jsonExt = {};
    return performance;
  }

  componentDidMount() {
    if (!!this.props.performance_id) {
      this.setState(
        (state, props) => ({ performance_id: props.performance_id }),
        (e) => this.props.fetchPerformance(this.props.modulesManager, this.props.performance_id),
      );
    }
  }

  back = (e) => {
    const { modulesManager, history } = this.props;
    historyPush(modulesManager, history, "idps.route.performances");
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.fetchedPerformance !== this.props.fetchedPerformance && !!this.props.fetchedPerformance) {
      var performance = this.props.performance || {};
      performance.ext = !!performance.jsonExt ? JSON.parse(performance.jsonExt) : {};
      this.setState({ performance, performance_id: performance.id, lockNew: false, newPerformance: false });
    } else if (prevProps.performance_id && !this.props.performance_id) {
      this.setState({ performance: this._newPerformance(), newPerformance: true, lockNew: false, performance_id: null });
    } else if (prevProps.submittingMutation && !this.props.submittingMutation) {
      this.props.journalize(this.props.mutation);
      this.setState({ reset: this.state.reset + 1 });
    }
  }

  _add = () => {
    this.setState(
      (state) => ({
        performance: this._newPerformance(),
        newPerformance: true,
        lockNew: false,
        reset: state.reset + 1,
      }),
      (e) => {
        this.props.add();
        this.forceUpdate();
      },
    );
  };

  reload = () => {
    this.props.fetchPerformance(
      this.props.modulesManager,
      this.state.performance_id,
    );
  };

  canSave = () => {
    if (!this.state.performance.month) return false;
    if (!this.state.performance.year) return false;
    if (!this.state.performance.healthFacility) return false;
    if (!this.state.performance.medecineAvailability) return false;
    if (!this.state.performance.qualifiedPersonnel) return false;
    if (!this.state.performance.garbagecanAvailability) return false;
    if (!this.state.performance.roomsCleaness) return false;
    if (!this.state.performance.functionalsToilets) return false;
    if (!this.state.performance.sterilizationTools) return false;
    return true;
  };

  _save = (performance) => {
    this.setState(
      { lockNew: !performance.id },
      (e) => this.props.save(performance),
    );
  };

  onEditedChanged = (performance) => {
    this.setState({ performance, newPerformance: false });
  };

  render() {
    const {
      intl,
      fetchingPerformance,
      fetchedPerformance,
      errorPerformance,
      readOnly = false,
      save,
      add,
      performance_id,
    } = this.props;
    console.log(this.state);
    const { performance } = this.state;
    var actions = [];

    if (!!performance_id) {
      actions.push({
        doIt: (e) => this.reload(performance_id),
        icon: <ReplayIcon />,
        onlyIfDirty: !readOnly,
      });
    }

    return (
      <Fragment>
        <ProgressOrError progress={fetchingPerformance} error={errorPerformance} />
        {((!!fetchedPerformance && !!performance && performance.id === performance_id) || !performance_id) && (
          <Form
            module="idps"
            title="edit.title"
            reset={this.state.reset}
            update={this.state.update}
            edited_id={performance_id}
            edited={this.state.performance}
            HeadPanel={PerfomanceMasterPanel}
            performance={this.state.performance}
            onEditedChanged={this.onEditedChanged}
            canSave={this.canSave}
            back={this.back}
            actions={actions}
            reload={(performance_id || readOnly) && this.reload}
            save={!!save ? this._save : null}
            add={!!add && !this.state.newPerfomance ? this._add : null}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  performance: state.idps.performance,
  fetchingPerformance: state.idps.fetchingPerformance,
  fetchedPerformance: state.idps.fetchedPerformance,
  errorPerformance: state.idps.errorPerformance,
  submittingMutation: state.idps.submittingMutation,
  mutation: state.idps.mutation,
});

export default withHistory(
  withModulesManager(connect(mapStateToProps, { fetchPerformance, journalize })(injectIntl(withTheme(withStyles(styles)(PerfomanceForm)))))
);
