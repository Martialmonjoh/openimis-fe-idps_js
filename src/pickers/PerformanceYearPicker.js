import React, { Component , useState } from "react";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { SelectInput } from "@openimis/fe-core";

//const setSelectedYear = useState(null);

class PerformanceYearPicker extends Component {

  render() {
    const { intl, module , label = "year", ...others } = this.props;
    const options = [];

    options.push(
      ..._.range(2000, new Date().getFullYear() + 1).map((v) => ({
        value: v,
        label: v,
      }))
    );

    _onChange = (v) => {
      this.setState({ value: v }, (e) => {
        this.props.onChange(v, setSelectedYear(v));
      });
    };

    return <SelectInput module={module} label={label} options={options} onChange={this._onChange} {...others}/>;
  }
}

export default injectIntl(PerformanceYearPicker);
