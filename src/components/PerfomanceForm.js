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
  ProgressOrError
} from "@openimis/fe-core";
import PerfomanceMasterPanel from "../components/PerfomanceMasterPanel";
import { fetchPerformance } from "../actions";

const styles = (theme) => ({
  page: theme.page,
});

class PerfomanceForm extends Component {
  state = {
    lockNew: false,
    reset: 0,
    performance_id: null,
    performance: this._newPerformance(),
    newPerformance: true,
  };

  canSave = () => {
    console.log(this.state.performance)
    if (!this.state.performance.month) return false;
    if (!this.state.performance.year) return false;
    if (!this.state.performance.healthFacility) return false;
    if (!this.state.performance.medecineAvailability) return false;
    if (!this.state.performance.qualifiedPersonnel) return false;
    if (!this.state.performance.garbageAvailability) return false;
    if (!this.state.performance.cleanliness) return false;
    if (!this.state.performance.functionalToilets) return false;
    if (!this.state.performance.sterilizationTools) return false;
    return true;
  };

  back = (e) => {
    const { modulesManager, history } = this.props;
    historyPush(modulesManager, history, "idps.route.performances");
  };

  onEditedChanged = (performance) => {
    this.setState({ performance, newPerformance: false });
  };

  _save = (performance) => {
    this.setState(
      { lockNew: !performance.id }, // avoid duplicates
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

  componentDidMount() {
    if (!!this.props.performance_id) {
      this.setState(
        (state, props) => ({ performance_id: props.performance_id }),
        (e) => this.props.fetchPerformance(this.props.modulesManager, this.props.performance_id),
      );
    }
  }

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

  reload = () => {
    this.props.fetchPerformance(
      this.props.modulesManager,
      this.state.performance_id,
    );
  };
  
  render() {
    const {
      intl,
      fetchingPerformance,
      fetchedPerformance,
      errorPerformance,
      save,
      add,
      back,
      performance_id
    } = this.props;
    const { performance } = this.state;

    let readOnly = true;
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
            edited_id={performance_id}
            edited={this.state.performance}
            HeadPanel={PerfomanceMasterPanel}
            performance={this.state.performance}
            onEditedChanged={this.onEditedChanged}
            canSave={this.canSave}
            back={back}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPerformance, journalize }, dispatch);
};

export default withHistory(
  withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(PerfomanceForm)))))
);
