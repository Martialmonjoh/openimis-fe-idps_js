import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import {
    withHistory,
    historyPush,
    withTooltip,
    formatMessage,
    withModulesManager
} from "@openimis/fe-core";
import AddIcon from "@material-ui/icons/Add";
import PerformanceSearcher from "../components/PerformanceSearcher";


const styles = (theme) => ({
    page: theme.page,
    fab: theme.fab,
});

class PerformancesPage extends Component {

    onDoubleClick = (i, newTab = false) => {
        historyPush(this.props.modulesManager, this.props.history, "idps.route.performance", [i.id], newTab);
    };

    add = () => {
        historyPush(this.props.modulesManager, this.props.history, "idps.route.performance");
    };

    render() {
        const { intl, classes } = this.props;

        return (
            <div className={classes.page}>
                <PerformanceSearcher
                    cacheFiltersKey="idpsPerformancesPageFiltersCache"
                    onDoubleClick={this.onDoubleClick}
                />
                {withTooltip(
                    <div className={classes.fab}>
                        <Fab color="primary" onClick={this.add}>
                            <AddIcon />
                        </Fab>
                    </div>,
                    formatMessage(intl, "idps", "newPerformance.tooltip")
                )}
            </div>
        );
    }

}

export default withHistory(
    withModulesManager(injectIntl(withTheme(withStyles(styles)(PerformancesPage))))
);