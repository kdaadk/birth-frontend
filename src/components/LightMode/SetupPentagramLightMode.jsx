import React, { Component } from "react";
import "../../styles/lightMode/SetupPentagramLightMode.css";

export class SetupPentagramLightMode extends Component {
    renderValueWithClassName(source, name) {
        const sign = source.color.toLowerCase() === 'red' ? '+' : '-';
        return (
            <p className={name} style={{ color: source.color }}>
                {sign}
            </p>
        );
    }

    render() {
        const { pentagram } = this.props;

        return (
            <div className="setupPentagram-light-mode">
                <svg className="svg" width="120" height="120">
                    <path
                        d="M2,43 L60,2 L120,43 L95,110 L24,110 L2,43Z"
                        opacity="1"
                        fillOpacity="0"
                        stroke="black"
                        strokeWidth="2"
                        strokeOpacity="1"
                    />
                </svg>
                {pentagram && (
                    <div className="energies">
                        {this.renderValueWithClassName(
                            pentagram.outerEnergies.heat,
                            "heat-outer"
                        )}
                        {this.renderValueWithClassName(
                            pentagram.innerEnergies.heat,
                            "heat-inner"
                        )}
                        {this.renderValueWithClassName(
                            pentagram.outerEnergies.humidity,
                            "humidity-outer"
                        )}
                        {this.renderValueWithClassName(
                            pentagram.innerEnergies.humidity,
                            "humidity-inner"
                        )}
                        {this.renderValueWithClassName(
                            pentagram.outerEnergies.dryness,
                            "dryness-outer"
                        )}
                        {this.renderValueWithClassName(
                            pentagram.innerEnergies.dryness,
                            "dryness-inner"
                        )}
                        {this.renderValueWithClassName(
                            pentagram.outerEnergies.cold,
                            "cold-outer"
                        )}
                        {this.renderValueWithClassName(
                            pentagram.innerEnergies.cold,
                            "cold-inner"
                        )}
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
