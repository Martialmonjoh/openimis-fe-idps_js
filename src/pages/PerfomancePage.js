import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import PerfomanceForm from "../components/PerfomanceForm";

const styles = theme => ({
    page: theme.page,
});

class PerfomancePage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <PerfomanceForm
            />
        )
    }

}

export default withTheme(withStyles(styles)(PerfomancePage));