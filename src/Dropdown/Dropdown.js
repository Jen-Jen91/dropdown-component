import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Dropdown extends Component {
  render() {
    const options = this.props.data
      ? this.props.data.map((item, index) => {
          return {
            label: item,
            value: index
          };
        })
      : [{ label: "", value: 0 }];

    console.log("OPTIONS: ", options);

    return (
      <div>
        <h3>Dropdown</h3>

        <div>
          <p>{this.props.placeholder}</p>

          <ul>
            {options.map(item => (
              <li key={item.value}>
                {item.value}: {item.label}
              </li>
            ))}
          </ul>

          <p>{this.props.subtitle}</p>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired
};
