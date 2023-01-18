import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Fab, Tooltip } from "@material-ui/core";
import {
    withHistory,
    historyPush,
    Helmet,
    formatMessage,
    withModulesManager
} from "@openimis/fe-core";
import AddIcon from "@material-ui/icons/Add";


const styles = (theme) => ({
    page: theme.page,
    fab: theme.fab,
});

class PerformancesPage extends Component {

    add = () => {
        historyPush(this.props.modulesManager, this.props.history, "idps.route.performance");
    };

    render() {
        const { intl, classes } = this.props;

        return (
            <div className={classes.page}>
                <Helmet title={formatMessage(this.props.intl, "idps", "healthFacilities.performances")} />
                <Tooltip
                    title={formatMessage(intl, "idps", "newPerformance.tooltip")}
                >
                    <div className={classes.fab}>
                        <Fab color="primary" onClick={this.add}>
                            <AddIcon />
                        </Fab>
                    </div>
                </Tooltip>
            </div>
        );
    }

}

export default withHistory(
    withModulesManager(injectIntl((withTheme(withStyles(styles)(PerformancesPage)))))
);