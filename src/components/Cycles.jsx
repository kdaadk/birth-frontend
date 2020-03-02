import React, { Component } from "react";
import "../styles/Cycles.css";
import moment from "moment";

export class Cycles extends Component {
  render() {
    const { model } = this.props;
    const columnHeaders = [
      "Ветер",
      "Тепло",
      "Жар",
      "Влажность",
      "Сухость",
      "Холод"
    ];

    return (
      <div className="cycles">
        {model && (
          <div>
            <div className="column-header">
              {columnHeaders.map(name => (
                <div className="name" key={name}>
                  {name}
                </div>
              ))}
            </div>
            <CycleRow row={model.big} name={model.big.name} />
            <CycleRow row={model.year} name={model.year.name} />
            <CycleRow row={model.season} name={model.season.name} />
            <CycleRow row={model.month} name={model.month.name} />
            <CycleRow row={model.day} name={model.day.name} />
          </div>
        )}
        {!model && (
          <div>
            <div className="column-header">
              {columnHeaders.map(name => (
                <div className="name" key={name}>
                  {name}
                </div>
              ))}
            </div>
            <CycleRow name="БЦ" />
            <CycleRow name="ГЦ" />
            <CycleRow name="СЦ" />
            <CycleRow name="МЦ" />
            <CycleRow name="СуЦ" />
          </div>
        )}
      </div>
    );
  }
}

function CycleRow(props) {
  const stubColumns = ["Ве", "Те", "Жа", "Вл", "Су", "Хо"];
  if (!props.row) {
    const row = stubColumns.map(x => <CycleElement key={x} />);
    return (
      <div className="cycle-row">
        <div className="header empty">{props.name}</div>
        {row}
      </div>
    );
  }
  const { periods, eventPeriod } = props.row;
  const row = periods.map(period => (
    <CycleElement period={period} event={eventPeriod} key={period.start} />
  ));
  return (
    <div className="cycle-row">
      <div className="header">{props.name}</div>
      {row}
    </div>
  );
}

function CycleElement(props) {
  const { period, event } = props;

  if (!period) {
    return (
      <div className="cycle-element empty">
        <svg viewBox="0 0 90 90" width="45" height="45">
          <path
            d="M3.95 36.01L44.91 4.73L85.86 36.01L70.22 86.64L19.6 86.64L3.95 36.01Z"
            opacity="1"
            fillOpacity="0"
            stroke="#000"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  let start = new Date(period.start);
  let end = moment(period.end).subtract(1, 'days').toDate();
  const cycleElementClassName = isPeriodLast(period) ? "cycle-element last" : "cycle-element";
  
  return (
    <div className={cycleElementClassName}>
      <div className="start-date">
        <div>{getFormatDate(start)}</div>
        <div>{start.getFullYear()}</div>
      </div>
      <svg viewBox="0 0 90 90" width="45" height="45">
        <path
          d="M3.95 36.01L44.91 4.73L85.86 36.01L70.22 86.64L19.6 86.64L3.95 36.01Z"
          opacity="1"
          fillOpacity={getFillOpacity()}
          fill={event.color}
          stroke="#000"
          strokeWidth="2"
        />
      </svg>
      {isPeriodLast(period) && (
        <div className="end-date">
          <div>{getFormatDate(end)}</div>
          <div>{end.getFullYear()}</div>
        </div>
      )}
    </div>
  );

  function isPeriodLast(period) {
    return period.number === 5;
  }

  function getFormatDate(date) {
    return `${("0" + date.getDate()).slice(-2)}.${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}`;
  }

  function getFillOpacity() {
    return event.number === period.number ? 1 : 0;
  }
}
