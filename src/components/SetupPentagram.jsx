import React, { Component } from "react";
import "../styles/SetupPentagram.css";

export class SetupPentagram extends Component {
  renderValue(source) {
    return <p style={{ color: source.color }}>{source.value}</p>;
  }

  renderValueWithClassName(source, name) {
    return (
      <p className={name} style={{ color: source.color }}>
        {source.value}
      </p>
    );
  }

  render() {
    const { pentagram } = this.props;

    return (
      <div className="setupPentagram">
        <svg className="svg" viewBox="0 0 90 90" width="90" height="90">
          <path
            d="M3.95 36.01L44.91 4.73L85.86 36.01L70.22 86.64L19.6 86.64L3.95 36.01Z"
            opacity="1"
            fillOpacity="0"
            stroke="black"
            strokeWidth="1"
            strokeOpacity="1"
          />
        </svg>        
        {pentagram && (
          <div className="energies">
            <div className="heat">
              {this.renderValue(pentagram.outerEnergies.heat)}
              {this.renderValue(pentagram.innerEnergies.heat)}
            </div>
            {this.renderValueWithClassName(
              pentagram.outerEnergies.humidity,
              "humidity-outer"
            )}
            {this.renderValueWithClassName(
              pentagram.innerEnergies.humidity,
              "humidity-inner"
            )}
            <div className="dryness">
              {this.renderValue(pentagram.innerEnergies.dryness)}
              {this.renderValue(pentagram.outerEnergies.dryness)}
            </div>
            <div className="cold">
              {this.renderValue(pentagram.innerEnergies.cold)}
              {this.renderValue(pentagram.outerEnergies.cold)}
            </div>
            {this.renderValueWithClassName(
              pentagram.outerEnergies.wind,
              "wind-outer"
            )}
            {this.renderValueWithClassName(
              pentagram.innerEnergies.wind,
              "wind-inner"
            )}
          </div>
        )}
      </div>
    );
  }
}
