import React, { Component } from "react";
import "../styles/BaZiDate.css";
import Gapped from "@skbkontur/react-ui/Gapped";

export class BaZiDate extends Component {
  render() {
    const { model, hourNotExists, monthNotExists, yearNotExists } = this.props;

    if (!model) {
      return (
        <div className="bazi-birth-date">
          <Gapped gap={10} verticalAlign="top">
            {!hourNotExists && (
              <div className="column">
                <p className="hour">час</p>
              </div>
            )}
            <div className="column">
              <p className="day">день</p>
            </div>
            {!monthNotExists && (
              <div className="column">
                <p className="month">месяц</p>
              </div>
            )}
            {!yearNotExists && (
              <div className="column">
                <p className="year">год</p>
              </div>
            )}
          </Gapped>
        </div>
      );
    }

    const { hour, day, month, year } = model;

    return (
      <div className="bazi-birth-date">
        <Gapped gap={10} verticalAlign="top">
          {!hourNotExists && (
            <div className="column">
              <p className="hour">час</p>
              {hour && this.renderColumnNotation(hour)}
            </div>
          )}
          <div className="column">
            <p className="day">день</p>
            {this.renderColumnNotation(day)}
          </div>
          {!monthNotExists && (
            <div className="column">
              <p className="month">месяц</p>
              {this.renderColumnNotation(month)}
            </div>
          )}
          {!yearNotExists && (
            <div className="column">
              <p className="year">год</p>
              {this.renderColumnNotation(year)}
            </div>
          )}
        </Gapped>
      </div>
    );
  }

  renderColumnNotation = period => {
      const { skyStem, earthBranch } = period;
    return (
      <div>
        <p style={{ color: skyStem.color }}>
          {skyStem.russianDisplay}
        </p>
        <p style={{ color: skyStem.color }}>
          {skyStem.chineseDisplay}
        </p>
        <p style={{ color: earthBranch.color }}>
          {earthBranch.chineseDisplay}
        </p>
        <p style={{ color: earthBranch.color }}>
          {earthBranch.russianDisplay}
        </p>
      </div>
    );
  };
}
