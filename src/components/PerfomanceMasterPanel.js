import React, { } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Checkbox, FormControlLabel } from "@material-ui/core";
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
      title = "add.performance",
      titleParams = { label: "" },
      actions,
    } = this.props;

    console.log(edited);

    let readOnly = !!edited.id ? true : false;

    if (!!edited && !!edited.id) {
      const date = new Date(edited.period);
      let year = date.getFullYear();

      const moment = require('moment');
      let monthNumber = date.getMonth();

      edited.year = year;
      edited.month = moment.months()[monthNumber];
    }

    return (
      <Grid container>
        <Grid container className={classes.item}>
          <Grid item xs={3} className={classes.item}>
            <PerformanceMonthPicker
              value={!!edited ? edited.month : null}
              module="idps"
              label="performance.month"
              readOnly={readOnly}
              required={true}
              onChange={(v) => this.updateAttribute("month", v)}
            />
          </Grid>
          <Grid item xs={2} className={classes.item}>
            <PerformanceYearPicker
              value={!!edited ? edited.year : null}
              module="idps"
              readOnly={readOnly}
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
        <Grid container className={classes.item}>
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "idps", "performance.qualifiedPersonnel")}
            </Grid>
            <Grid className={classes.item}>
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
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "idps", "performance.garbagecanAvailability")}
            </Grid>
            <Grid className={classes.item}>
              <NumberInput
                module="idps"
                label=""
                required={true}
                readOnly={readOnly}
                value={!!edited && !!edited.garbagecanAvailability ? edited.garbagecanAvailability : ""}
                onChange={(v) => this.updateAttribute(`garbagecanAvailability`, v)}
              />
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "idps", "performance.roomsCleaness")}
            </Grid>
            <Grid className={classes.item}>
              <NumberInput
                module="idps"
                label=""
                required={true}
                readOnly={readOnly}
                value={!!edited && !!edited.roomsCleaness ? edited.roomsCleaness : ""}
                onChange={(v) => this.updateAttribute("roomsCleaness", v)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.item}>
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "idps", "performance.medecineAvailability")}
            </Grid>
            <Grid className={classes.item}>
              <NumberInput
                module="idps"
                label=""
                required={true}
                readOnly={readOnly}
                value={!!edited && !!edited.medecineAvailability ? edited.medecineAvailability : ""}
                onChange={(v) => this.updateAttribute("medecineAvailability", v)}
              />
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "idps", "performance.sterilizationTools")}
            </Grid>
            <Grid className={classes.item}>
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
          {!!edited && edited.promptnessSubmission !== null && (
            <Grid item xs={4} className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.promptness")}
              </Grid>
              <Grid className={classes.item}>
                <NumberInput
                  module="idps"
                  label=""
                  readOnly={true}
                  value={!!edited && edited.promptnessSubmission !== null ? `${edited.promptnessSubmission}` : ""}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container className={classes.item}>
          <Grid item xs={5} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "idps", "performance.functionalsToilets")}
            </Grid>
            <Grid className={classes.item}>
              <NumberInput
                module="idps"
                label=""
                required={true}
                readOnly={readOnly}
                value={!!edited && !!edited.functionalsToilets ? edited.functionalsToilets : ""}
                onChange={(v) => this.updateAttribute("functionalsToilets", v)}
              />
            </Grid>
          </Grid>
          <Grid item xs={5} className={classes.item}>
            <Grid className={classes.item}>
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
        </Grid>
        {!!edited && edited.degreOfRejection !== null && (
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "idps", "performance.rejectionDegree")}
            </Grid>
            <Grid className={classes.item}>
              <NumberInput
                module="idps"
                label=""
                readOnly={true}
                value={!!edited && edited.degreOfRejection !== null ? `${edited.degreOfRejection}` : ""}
              />
            </Grid>
          </Grid>
        )}
        {!!edited && !!edited.hfScore && (
            <Grid item xs={2} className={classes.item}>
              <Grid className={classes.item}>
                {formatMessage(intl, "idps", "performance.totalScore")}
              </Grid>
              <Grid className={classes.item}>
                <NumberInput
                  module="idps"
                  label=""
                  readOnly={true}
                  value={!!edited && !!edited.hfScore ? edited.hfScore : ""}
                />
              </Grid>
            </Grid>
          )}
      </Grid>
    );
  }
}

export default withModulesManager(withTheme(withStyles(styles)(PerfomanceMasterPanel)));
