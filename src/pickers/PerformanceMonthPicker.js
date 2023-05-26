import React, { Component } from "react";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { ConstantBasedPicker } from "@openimis/fe-core";

class PerformanceMonthPicker extends Component {

  render() {
    const moment = require('moment');

    const { intl, module, label = "month", ...others } = this.props;
    return <ConstantBasedPicker
      module={module}
      label={label}
      withNull={true}
      constants={moment.months()}
      {...others}
    />;
  }
}

export default injectIntl(PerformanceMonthPicker);
