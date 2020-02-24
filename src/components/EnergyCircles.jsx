import React, { Component } from "react";
import "../styles/EnergyCircles.css";

export class EnergyCircles extends Component {
  render() {
    const { eventDate, bigCircleCirculation } = this.props;

    let abbrColors = ["black", "black", "black", "black"];
    if (bigCircleCirculation) abbrColors = bigCircleCirculation.meridians.map(x => x.color);

    return (
      <div className="energy-circles">
        {this.renderEnergyCircle(
          abbrColors.slice(0, 4),
          this.getArrowColors(eventDate, 0, 2),
          ["MC", "TR", "VB", "F"],
          ["Шао ян", "Цзюэ инь"]
        )}
        {this.renderEnergyCircle(
          abbrColors.slice(4, 8),
          this.getArrowColors(eventDate, 2, 4),
          ["P", "GI", "E", "RP"],
          ["Ян мин", "Тай инь"]
        )}
        {this.renderEnergyCircle(
          abbrColors.slice(8, 12),
          this.getArrowColors(eventDate, 4, 6),
          ["C", "IG", "V", "R"],
          ["Тай ян", "Шао инь"]
        )}
      </div>
    );
  }

  getArrowColors(eventDate, startIndex, endIndex) {
    if (!eventDate) return [];
    const colors = [
      this.getArrowColor(eventDate.day.earthBranch.type),
      this.getArrowColor(eventDate.month.earthBranch.type),
      this.getArrowColor(eventDate.year.earthBranch.type)
    ];
    colors.sort();
    return colors.filter(x => x.index >= startIndex && x.index < endIndex);
  }

  renderEnergyCircle(abbrColors, arrowColors, abbrNames, energyNames) {
    function getColor(index) {
      return arrowColors.find(x => x.index % 2 === index);
    }
    const arrowUpData =
      "M4.28 13.22L4.28 53.62L5.39 53.62L5.39 13.22L6.33 13.22L4.83 3.4L3.33 13.22Z";
    const arrowLeftData =
      "M13.22 14.28L53.62 14.28L53.62 15.39L13.22 15.39L13.22 16.33L3.4 14.83L13.22 13.33Z";
    const cursorKeys = ["first", "second", "third"];
    return (
      <div className="circle">
        <div className="down-cursor">
          {arrowColors
            .filter(x => x.index % 2 === 0)
            .map((x, idx) => (
              <svg
                className="arrow"
                width="10"
                height="30"
                key={cursorKeys[idx]}
              >
                <path d="M4.28 13.22L4.28 33.62L5.39 33.62L5.39 13.22L6.33 13.22L4.83 3.4L3.33 13.22Z" />
              </svg>
            ))}
        </div>
        <div className="top">
          <p style={{ color: abbrColors[1] }}>{abbrNames[1]}</p>
          <svg className="arrow-left" width="60" height="20">
            <path d={arrowLeftData} />
          </svg>
          <p style={{ color: abbrColors[0] }}>{abbrNames[0]}</p>
        </div>
        <div className="center">
          <svg className="arrow-down" width="10" height="60">
            <path
              d={arrowUpData}
              stroke={getColor(0) && getColor(0).color}
              strokeWidth={3}
            />
          </svg>
          <span className="vertical-text first">{energyNames[0]}</span>
          <span className="vertical-text second">{energyNames[1]}</span>
          <svg className="arrow-up" width="10" height="60">
            <path
              d={arrowUpData}
              stroke={getColor(1) && getColor(1).color}
              strokeWidth={3}
            />
          </svg>
        </div>
        <div className="bottom">
          <p style={{ color: abbrColors[2] }}>{abbrNames[2]}</p>
          <svg className="arrow-right" width="60" height="20">
            <path d={arrowLeftData} />
          </svg>
          <p style={{ color: abbrColors[3] }}>{abbrNames[3]}</p>
        </div>
        <div className="empty-space" />
        {arrowColors
          .filter(x => x.index % 2 === 1)
          .map((x, idx) => (
            <svg
              className="arrow-up-cursor"
              width="10"
              height="30"
              key={cursorKeys[idx]}
            >
              <path d="M4.28 13.22L4.28 33.62L5.39 33.62L5.39 13.22L6.33 13.22L4.83 3.4L3.33 13.22Z" />
            </svg>
          ))}
      </div>
    );
  }

  getArrowColor(animalType) {
    if ([3, 9].includes(animalType)) return { index: 0, color: "Orange" };
    if ([6, 0].includes(animalType)) return { index: 1, color: "LimeGreen" };
    if ([4, 10].includes(animalType)) return { index: 2, color: "Gray" };
    if ([2, 8].includes(animalType)) return { index: 3, color: "Gold" };
    if ([5, 11].includes(animalType)) return { index: 4, color: "Blue" };
    if ([1, 7].includes(animalType)) return { index: 5, color: "Red" };
  }
}
