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

    add = () => {
        historyPush(this.props.modulesManager, this.props.history, "idps.route.performance");
    };

    save = (performance) => {
        this.props.createPerformance(
            this.props.modulesManager,
            performance,
            formatMessageWithValues(this.props.intl, "idps", "CreateCriteria.mutationLabel", {
                label: !!performance.id ? performance.id : "",
            }),
        );
    };

    render() {
        const { classes, modulesManager, history } = this.props;
        return (
            <PerfomanceForm
                save={this.save}
                add={this.add}
                back={(e) => historyPush(modulesManager, history, "idps.route.performances")}
            />
        )
    }

}

const mapStateToProps = (state, props) => ({

});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createPerformance }, dispatch);
};

export default withHistory(
    withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(PerfomancePage)))))
);