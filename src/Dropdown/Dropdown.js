import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      values: []
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleOutsideClick(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showList: false });
    }
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

    return (
      <section className="dropdown-container" ref={this.setWrapperRef}>
        {this.state.values.length > 0 ? (
          <div
            className="display-selected-values"
            onClick={this.handleDropdownClick}
          >
            <ul className="selected-values-container">
              {this.state.values.map((item, index) => (
                <li key={item.value} className="selected-value">
                  {item.label}
                  {index !== this.state.values.length - 1 && ", "}
                </li>
              ))}
            </ul>
            <p className="subtitle">{this.props.subtitle}</p>
          </div>
        ) : (
          <div className="display-no-values" onClick={this.handleDropdownClick}>
            <p className="placeholder">{this.props.placeholder}</p>
          </div>
        )}

        {this.state.showList && (
          <>
            <div className="arrow-outer">
              <div className="arrow-inner"></div>
            </div>

            <ul className="dropdown-list">
              {options.map(item => (
                <li
                  key={item.value}
                  onClick={() => this.handleValueClick(item)}
                  className={
                    this.state.values.some(
                      selectedItem => selectedItem.value === item.value
                    )
                      ? "list-item-selected"
                      : "list-item"
                  }
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    );
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired
};
