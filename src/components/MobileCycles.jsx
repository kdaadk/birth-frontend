import React, { Component } from "react";
import "../styles/MobileCycles.css";

export class MobileCycles extends Component {
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
            <div className="mob-cycles">
                {model && (
                    <div>
                        <div className="column-header">
                            {columnHeaders.map(name => (
                                <div className="name" key={name}>
                                    {name}
                                </div>
                            ))}
                        </div>
                        <CycleRow row={model.big} name="БЦ" />
                        <CycleRow row={model.year} name="ГЦ" />
                        <CycleRow row={model.season} name="СЦ" />
                        <CycleRow row={model.month} name="МЦ" />
                        <CycleRow row={model.day} name="СуЦ" />
                    </div>
                )}
            </div>
        );
    }
}

function CycleRow(props) {
    const { periods, eventPeriod } = props.row;
    const row = periods.map(period => (
        <CycleElement period={period} event={eventPeriod} key={period.start} />
    ));
    return (
        <div className="row">
            <div className="header">{props.name}</div>
            {row}
        </div>
    );
}

function CycleElement(props) {
    const { period, event } = props;

    let start = new Date(period.start);
    let end = new Date(period.end);
    end.setTime(end.getTime() - 1);

    return (
        <div className="cycle-element">
            <div className="start-date">
                <div>{getFormatDate(start)}</div>
                <div>{start.getFullYear()}</div>
            </div>
            <svg width="23" height="23">
                <path
                    d="M1 9L11 2.5L21 9L17 21L5 21L1 9Z"
                    opacity="1"
                    fillOpacity={getFillOpacity()}
                    fill={event.color}
                    stroke="#000"
                    strokeWidth="2"
                />
            </svg>
            {period.number === 5 && (
                <div className="end-date">
                    <div>{getFormatDate(end)}</div>
                    <div>{end.getFullYear()}</div>
                </div>
            )}
        </div>
    );

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
