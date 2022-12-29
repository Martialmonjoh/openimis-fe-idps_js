import React, { Component, useState } from "react";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { SelectInput, formatMessage } from "@openimis/fe-core";

const INIT_STATE = {
  value: null,
};

class PerformanceYearPicker extends Component {
  state = INIT_STATE;

  componentDidMount() {
    if (!!this.props.value) {
      this.setState((state, props) => ({ value: props.value }));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.reset !== this.props.reset || prevProps.value !== this.props.value) {
      this.setState((state, props) => ({ value: props.value }));
    }
  }

  _onChange = (v) => {
    this.setState({ value: v }, (e) => {
      this.props.onChange(v, v);
    });
  };

  render() {
    const {
      intl,
      name,
      module,
      label,
      nullLabel = "year.null",
      withNull = true,
    } = this.props;
    const { value } = this.state;
    if (!withNull && value === null) return null;

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
        onChange={this._onChange} />
    );
  }
}

export default injectIntl(PerformanceYearPicker);
