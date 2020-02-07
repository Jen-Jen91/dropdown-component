import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      values: []
    };

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
  }

  handleDropdownClick() {
    this.setState(state => ({
      showList: !state.showList
    }));
  }

  handleValueClick(clickedItem) {
    let newValues = this.state.values;

    if (newValues.some(item => item.value === clickedItem.value)) {
      newValues = newValues.filter(item => item.value !== clickedItem.value);
    } else {
      newValues.push(clickedItem);
    }

    this.setState({ values: newValues });
  }

  render() {
    const options = this.props.data
      ? this.props.data.map((item, index) => {
          return {
            label: item,
            value: index
          };
        })
      : [{ label: "", value: 0 }];

    console.log("VALUES: ", this.state.values);

    return (
      <div>
        <h3>Dropdown</h3>

        <div>
          <p onClick={this.handleDropdownClick}>
            {this.state.values.length > 0
              ? this.props.subtitle
              : this.props.placeholder}
          </p>

          {this.state.values.length > 0 && (
            <ul>
              {this.state.values.map(item => (
                <li key={item.value}>{item.label}</li>
              ))}
            </ul>
          )}

          {this.state.showList && (
            <ul>
              {options.map(item => (
                <li
                  key={item.value}
                  onClick={() => this.handleValueClick(item)}
                >
                  {item.value}: {item.label}
                </li>
              ))}
            </ul>
          )}
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
