import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import PerfomanceForm from "../components/PerfomanceForm";
import { formatMessage, withModulesManager, withHistory, historyPush } from "@openimis/fe-core";
import { createPerformance } from "../actions";

const styles = theme => ({
    page: theme.page,
});

class PerfomancePage extends Component {

    add = () => {
        historyPush(this.props.modulesManager, this.props.history, "idps.route.performance");
    };

    save = (performance) => {
        if (!performance.id) {
            this.props.createPerformance(
                this.props.modulesManager,
                performance,
                formatMessage(this.props.intl, "idps", "createPerformance.mutationLabel")
            );
        } else {
            //dispatch(updateUser(this.props.modulesManager, performance, formatMessageWithValues("idps.createPerformance.mutationLabel")));
        }
    };

    render() {
        const { classes, modulesManager, history, performance_id } = this.props;
        return (
            <PerfomanceForm
                performance_id={performance_id}
                save={this.save}
                add={this.add}
                back={(e) => historyPush(modulesManager, history, "idps.route.performances")}
            />
        )
    }

}

const mapStateToProps = (state, props) => ({
    performance_id: props.match.params.performance_id,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createPerformance }, dispatch);
};

export default withHistory(
    withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(PerfomancePage)))))
);