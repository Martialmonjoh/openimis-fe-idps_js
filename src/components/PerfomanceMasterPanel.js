import React, { Component, Fragment } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Divider, Checkbox, FormControlLabel } from "@material-ui/core";
import {
  formatMessage,
  FormattedMessage,
  formatMessageWithValues,
  PublishedComponent,
  FormPanel,
  TextInput,
  NumberInput,
  withModulesManager,
} from "@openimis/fe-core";

const styles = (theme) => ({
  paper: theme.paper.paper,
  tableTitle: theme.table.title,
  item: theme.paper.item,
  fullHeight: {
    height: "100%",
  },
});

class PerfomanceMasterPanel extends FormPanel {
  render() {
    const {
      intl,
      classes,
      edited,
      title = "menu.perfomance",
      titleParams = { label: "" },
      readOnly = false,
      actions,
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container className={classes.tableTitle}>
              <Grid item xs={3} container alignItems="center" className={classes.item}>
                <Typography variant="h5">
                  <FormattedMessage module="idps" id={title} values={titleParams} />
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container className={classes.item}>
              <Grid item xs={6} className={classes.item}>
                <PublishedComponent
                  pubRef="core.DatePicker"
                  value={!!edited ? edited.dateFrom : null}
                  module="idps"
                  label="performance.dateFrom"
                  readOnly={readOnly}
                  required={true}
                  onChange={(v) => this.updateAttribute("dateFrom", v)}
                />
              </Grid>
              <Grid item xs={6} className={classes.item}>
                <PublishedComponent
                  pubRef="core.DatePicker"
                  value={!!edited ? edited.dateTo : null}
                  module="idps"
                  label="performance.dateTo"
                  readOnly={readOnly}
                  required={true}
                  onChange={(v) => this.updateAttribute("dateTo", v)}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item}>
              <Grid item xs={6} className={classes.item}>
                <PublishedComponent
                  pubRef="location.HealthFacilityPicker"
                  module="idps"
                  label={formatMessage(intl, "idps", "performance.healthFacility")}
                  value={!!edited && !!edited.healthFacility ? edited.healthFacility : ""}
                  readOnly={readOnly}
                  withNull={true}
                  nullLabel={formatMessage(intl, "idps", "perfomance.healthFacility.none")}
                  onChange={(v) => this.updateAttribute("healthFacility", !edited || !edited.healthFacility)}
                />
              </Grid>
              <Grid item xs={6} className={classes.item} alignItems="center">
                {formatMessage(intl, "idps", "perfomance.promptness")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={true}
                  value={!!edited && !!edited.promptness ? edited.promptness : ""}
                  onChange={(v) => this.updateAttribute("promptness", v)}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item}>
              <Grid item xs={6} className={classes.item}>
                {formatMessage(intl, "idps", "performance.permanentAvailability")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.permanentAvailability ? edited.permanentAvailability : ""}
                  onChange={(v) => this.updateAttribute("permanentAvailability", v)}
                />
              </Grid>
              <Grid item xs={6} className={classes.item}>
                {formatMessage(intl, "idps", "performance.rejectionDegree")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={true}
                  value={!!edited && !!edited.rejectionDegree ? edited.rejectionDegree : ""}
                  onChange={(v) => this.updateAttribute("rejectionDegree", v)}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item}>
              <Grid item xs={6} className={classes.item}>
                {formatMessage(intl, "idps", "performance.qualifiedPersonnel")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.qualifiedPersonnel ? edited.qualifiedPersonnel : ""}
                  onChange={(v) => this.updateAttribute("qualifiedPersonnel", v)}
                />
              </Grid>
              <Grid item xs={6} className={classes.item}>
                {formatMessage(intl, "idps", "performance.garbageAvailability")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.garbageAvailability ? edited.garbageAvailability : ""}
                  onChange={(v) => this.updateAttribute("garbageAvailability", v)}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item}>
              <Grid item xs={6} className={classes.item}>
                {formatMessage(intl, "idps", "performance.cleanliness")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.cleanliness ? edited.cleanliness : ""}
                  onChange={(v) => this.updateAttribute("cleanliness", v)}
                />
              </Grid>
              <Grid item xs={6} className={classes.item}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={!!edited && !!edited.wasteSeparation}
                      disabled={readOnly}
                      onChange={(v) => this.updateAttribute("wasteSeparation", !edited || !edited.wasteSeparation)}
                    />
                  }
                  label={formatMessage(intl, "idps", "performance.wasteSeparation")}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item}>
              <Grid item xs={6} className={classes.item}>
                {formatMessage(intl, "idps", "performance.functionalToilets")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.functionalToilets ? edited.functionalToilets : ""}
                  onChange={(v) => this.updateAttribute("functionalToilets", v)}
                />
              </Grid>
              <Grid item xs={6} className={classes.item}>
                {formatMessage(intl, "idps", "performance.sterilizationTools")}
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.sterilizationTools ? edited.sterilizationTools : ""}
                  onChange={(v) => this.updateAttribute("sterilizationTools", v)}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.item}>
              <Grid item xs={2} className={classes.item}>
                {formatMessage(intl, "idps", "performance.totalScore")}
                <NumberInput
                  module="idps"
                  label=""
                  readOnly={true}
                  value={!!edited && !!edited.totalScore ? edited.totalScore : ""}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withModulesManager(withTheme(withStyles(styles)(PerfomanceMasterPanel)));
