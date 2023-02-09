import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import {
    withHistory,
    historyPush,
    withTooltip,
    formatMessage,
    withModulesManager,
    ProgressOrError,
    Table,
    FormattedMessage
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
        const { intl, classes, healthFacilities } = this.props;

        return (
            <div className={classes.page}>
                <PerformanceSearcher
                    cacheFiltersKey="idpsPerformancePageFiltersCache"
                    onDoubleClick={this.onDoubleClick}
                />
                {withTooltip(
                    <div className={classes.fab}>
                        <Fab color="primary" onClick={this.onAdd}>
                            <AddIcon />
                        </Fab>
                    </div>,
                    formatMessage(intl, "idps", "newPerformance.tooltip"),
                )}
            </div>
        );
    }

}




export default injectIntl((withModulesManager((withTheme(withStyles(styles)(PerformancesPage))))));