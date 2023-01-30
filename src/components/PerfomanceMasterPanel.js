import React, { Component, Fragment, useState } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Paper, Box, Grid, Typography, Checkbox, FormControlLabel } from "@material-ui/core";
import {
  formatMessage,
  FormattedMessage,
  PublishedComponent,
  FormPanel,
  NumberInput,
  withModulesManager,
} from "@openimis/fe-core";
import PerformanceMonthPicker from "../pickers/PerformanceMonthPicker";
import PerformanceYearPicker from "../pickers/PerformanceYearPicker";

const styles = (theme) => ({
  paper: theme.paper.paper,
  tableTitle: theme.table.title,
  item: theme.paper.item,
  fullHeight: {
    height: "100%",
  },
});


class PerfomanceMasterPanel extends FormPanel {

  updateAttribute = (attr, v) => {
    let edited = { ...this.props.edited };
    edited[attr] = v;
    console.log(edited)
    this.props.onEditedChanged(edited);
  };

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
            <Grid container className={classes.item}>
              <Grid item xs={3} className={classes.item}>
                <PerformanceMonthPicker
                  value={!!edited ? edited.month : null}
                  module="idps"
                  label="performance.month"
                  required={true}
                  withNull={true}
                  nullLabel={formatMessage(intl, "idps", "performance.month.none")}
                  onChange={(v) => this.updateAttribute("month", v)}
                />
              </Grid>
              <Grid item xs={2} className={classes.item}>
                <PerformanceYearPicker
                  value={!!edited ? edited.year : null}
                  module="idps"
                  label="performance.year"
                  required={true}
                  onChange={(v) => this.updateAttribute("year", v)}
                />
              </Grid>
              <Grid item xs={4} className={classes.item}>
                <PublishedComponent
                  pubRef="location.HealthFacilityPicker"
                  module="idps"
                  label={formatMessage(intl, "idps", "performance.healthFacility")}
                  value={!!edited && !!edited.healthFacility ? edited.healthFacility : ""}
                  readOnly={readOnly}
                  required={true}
                  withNull={true}
                  nullLabel={formatMessage(intl, "idps", "perfomance.healthFacility.none")}
                  onChange={(v) => this.updateAttribute("healthFacility", v)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.qualifiedPersonnel")}
              </Grid>
              <Grid item xs={1} className={classes.item}>
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.qualifiedPersonnel ? edited.qualifiedPersonnel : ""}
                  onChange={(v) => this.updateAttribute("qualifiedPersonnel", v)}
                />
              </Grid>

            </Grid>
            <Grid className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.garbageAvailability")}
              </Grid>
              <Grid item xs={1} className={classes.item}>
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.garbageAvailability ? edited.garbageAvailability : ""}
                  onChange={(v) => this.updateAttribute(`garbageAvailability`, v)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.cleanliness")}
              </Grid>
              <Grid item xs={1} className={classes.item}>
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.cleanliness ? edited.cleanliness : ""}
                  onChange={(v) => this.updateAttribute("cleanliness", v)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.medecineAvailability")}
              </Grid>
              <Grid item xs={1} className={classes.item}>
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.permanentAvailability ? edited.permanentAvailability : ""}
                  onChange={(v) => this.updateAttribute("medecineAvailability", v)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.functionalToilets")}
              </Grid>
              <Grid item xs={1} className={classes.item}>
                <NumberInput
                  module="idps"
                  label=""
                  required={true}
                  readOnly={readOnly}
                  value={!!edited && !!edited.functionalToilets ? edited.functionalToilets : ""}
                  onChange={(v) => this.updateAttribute("functionalToilets", v)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.sterilizationTools")}
              </Grid>
              <Grid item xs={1} className={classes.item}>
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
            <Grid className={classes.item}>
              <Grid item xs={5} className={classes.item}>
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
            {!!edited && !!edited.totalScore && (
              <Grid className={classes.item}>
                <Grid className={classes.item}>
                  {formatMessage(intl, "idps", "performance.totalScore")}
                </Grid>
                <Grid item xs={1} className={classes.item}>
                  <NumberInput
                    module="idps"
                    label=""
                    readOnly={true}
                    value={!!edited && !!edited.totalScore ? edited.totalScore : ""}
                  />
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withModulesManager(withTheme(withStyles(styles)(PerfomanceMasterPanel)));
