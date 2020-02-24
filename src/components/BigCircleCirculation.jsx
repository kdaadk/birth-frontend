import React, { Component } from "react";
import "../styles/BigCircleCirculation.css";

export class BigCircleCirculation extends Component {
  render() {
    return (
      <div className="big-circle-circulation">
        <div className="arrows">
          {this.renderBigArrow("big-arrow first")}
          {this.renderBigArrow("big-arrow second")}
          {this.renderBigArrow("big-arrow third")}
          {this.renderSmallArrow("small-arrow first")}
          {this.renderSmallArrow("small-arrow second")}
          {this.renderSmallArrow("small-arrow third")}
        </div>
        <div className="abbr">{this.renderEarthBranchAbbrs()}</div>
      </div>
    );
  }

  renderEarthBranchAbbrs() {
    const { bigCircleCirculation } = this.props;
    if (!bigCircleCirculation) {
      return [
        "MC",
        "TR",
        "VB",
        "F",
        "P",
        "GI",
        "E",
        "RP",
        "C",
        "IG",
        "V",
        "R"
      ].map(x => <p key={x}>{x}</p>);
    }

    return bigCircleCirculation.meridians.map(a => {
      return (
        <p
          style={{ color: a.color }}
          className={a.isMaxWeak ? "weak" : undefined}
          key={a.name}
        >
          {a.name}
        </p>
      );
    });
  }

  renderBigArrow = className => {
    return (
      <svg className={className} width="100" height="150">
        <path d="M4.92 5L5.45 80.96L4.61 81L4.07 5.05L4.92 5Z" />
        <path d="M25.08 80.5L15.26 79L15.26 79.95L4.86 79.95L4.86 81.06L15.26 81.06L15.26 82L25.08 80.5Z" />
        <path d="M25.08 5.5L15.26 4L15.26 4.95L4.86 4.95L4.86 6.06L15.26 6.06L15.26 7L25.08 5.5Z" />
      </svg>
    );
  };

  renderSmallArrow = className => {
    return (
      <svg className={className} width="50" height="50">
        <path d="M23.03 35.32L23.87 35.33L24.41 5.35L23.56 5.33L23.03 35.32Z" />
        <path d="M13.22 33.33L13.22 34.28L23.62 34.28L23.62 35.39L13.22 35.39L13.22 36.33L3.4 34.83L13.22 33.33Z" />
        <path d="M13.22 4.33L13.22 5.28L23.62 5.28L23.62 6.39L13.22 6.39L13.22 7.33L3.4 5.83L13.22 4.33Z" />
      </svg>
    );
  };
}
