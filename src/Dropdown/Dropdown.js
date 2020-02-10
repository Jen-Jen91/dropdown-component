import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dropdown.scss";
import { checkItemIncluded, sliceText } from "../utils/helpers";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      selectedItems: []
    };

    this.sliceLabel = this.sliceLabel.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDisplayClick = this.handleDisplayClick.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.renderSelectedDisplay = this.renderSelectedDisplay.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  // Set wrapper ref as <section> of Dropdown component
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // A click outside the wrapper ref closes the dropdown list
  handleOutsideClick(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showList: false });
    }
  }

  // A click on the dropdown display opens/closes the dropdown list
  handleDisplayClick() {
    this.setState(state => ({
      showList: !state.showList
    }));
  }

  // A click on a dropdown list item adds it to or removes it from the state
  handleListItemClick(clickedItem) {
    let updatedItems = this.state.selectedItems;

    if (checkItemIncluded(clickedItem, updatedItems)) {
      updatedItems = updatedItems.filter(
        item => item.value !== clickedItem.value
      );
    } else {
      updatedItems.push(clickedItem);
    }

    this.setState({ selectedItems: updatedItems });
  }

  // Abbreviate the list item label if it's too long and there's more than 1 selected value showing
  sliceLabel(label) {
    if (label.length < 7) return label;

    let abbr = label;

    if (this.state.selectedItems.length === 1) {
      abbr = sliceText(label, 10);
    } else {
      abbr = sliceText(label, 3);
    }

    return abbr;
  }

  renderSelectedDisplay() {
    return (
      <div
        className="display-selected-values"
        onClick={this.handleDisplayClick}
      >
        {this.state.selectedItems.length > 2 ? (
          <p className="selected-value">
            {this.state.selectedItems.length + " SELECTED"}
          </p>
        ) : (
          <ul className="selected-values-list">
            {this.state.selectedItems.map((item, index) => (
              <li key={item.value} className="selected-value">
                {this.sliceLabel(item.label)}
                {index !== this.state.selectedItems.length - 1 && ", "}
              </li>
            ))}
          </ul>
        )}

        <p className="subtitle">{this.props.subtitle}</p>
      </div>
    );
  }

  render() {
    const options = this.props.listData
      ? this.props.listData.map((item, index) => {
          return {
            label: item,
            value: index
          };
        })
      : [{ label: "", value: 0 }];

    return (
      <section className="container" ref={this.setWrapperRef}>
        {this.state.selectedItems.length ? (
          this.renderSelectedDisplay()
        ) : (
          <div className="display-no-values" onClick={this.handleDisplayClick}>
            <p className="placeholder">{this.props.placeholder}</p>
          </div>
        )}

        {this.state.showList && (
          <>
            <div className="arrow-outer">
              <div className="arrow-inner" />
            </div>

            <ul className="list">
              {options.map(option => (
                <li
                  key={option.value}
                  onClick={() => this.handleListItemClick(option)}
                  className={
                    checkItemIncluded(option, this.state.selectedItems)
                      ? "list-option-selected"
                      : "list-option"
                  }
                >
                  {option.label}
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
  listData: PropTypes.arrayOf(PropTypes.string).isRequired
};
