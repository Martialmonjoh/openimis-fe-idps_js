import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import PerfomanceForm from "../components/PerfomanceForm";
import { formatMessageWithValues, withModulesManager, withHistory, historyPush } from "@openimis/fe-core";
import { createPerformance } from "../actions";

const styles = theme => ({
    page: theme.page,
});



class PerfomancePage extends Component {

    save = (performance) => {
        this.props.createPerformance(
            this.props.modulesManager,
            performance,
            formatMessageWithValues(this.props.intl, "idps", "CreatePerformance.mutationLabel", {
                label: !!performance.uuid ? performance.uuid : "",
            }),
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <PerfomanceForm
                save={this.save}
                add={this.add}
            />
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createPerformance }, dispatch);
};

export default withHistory(
    withModulesManager(connect(mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(PerfomancePage)))))
);