import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  formatMessageWithValues,
  formatMessage,
  withModulesManager,
  Form,
  Helmet,
} from "@openimis/fe-core";
import PerfomanceMasterPanel from "../components/PerfomanceMasterPanel";

const styles = (theme) => ({
  page: theme.page,
});

class PerfomanceForm extends Component {
  state = {
    lockNew: false,
    criteria: this._newCriteria(),
    newCriteria: true,
  };

  _newCriteria() {
    let criteria = {};
    criteria.jsonExt = {};
    return criteria;
  }

  render() {
    const {
      intl,
    } = this.props;
    const { criteria } = this.state;
    return (
      <Fragment>
        <Helmet
          title={formatMessage(intl, "idps", "menu.perfomance")}
        />
        <Form
              module="idps"
              title={formatMessage(intl, "idps", "performance.evaluation")}
              Panels={[PerfomanceMasterPanel]}
              criteria={this.state.criteria}
            />
      </Fragment>
    );
  }
}



export default withModulesManager(injectIntl(withTheme(withStyles(styles)(PerfomanceForm))));
