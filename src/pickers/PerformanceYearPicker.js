import React, { Component, useState } from "react";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { SelectInput, formatMessage } from "@openimis/fe-core";

const INIT_STATE = {
  value: null,
  label: null
};

class PerformanceYearPicker extends Component {
  state = INIT_STATE;

  render() {
    const {
      intl,
      name,
      value,
      module,
      label,
      nullLabel = "year.null",
      min,
      max,
      onChange,
      withNull = true,
    } = this.props;
    
    const options = withNull
      ? [
        {
          value: null,
          label: formatMessage(intl, module, nullLabel),
        },
      ]
      : [];

    options.push(
      ..._.range(2000, new Date().getFullYear() + 1).map((v) => ({
        value: v,
        label: v,
      }))
    );

    return (
      <SelectInput
        module={module}
        label={label}
        options={options}
        name={name}
        value={value}
        onChange={onChange} />
    );
  }
}

export default injectIntl(PerformanceYearPicker);
