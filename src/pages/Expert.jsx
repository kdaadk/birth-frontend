import React, { Component } from "react";
import "../styles/pages/Expert.css";
import { BaZiDate } from "../components/BaZiDate";
import Dropdown from "@skbkontur/react-ui/Dropdown";
import MenuItem from "@skbkontur/react-ui/MenuItem";
import DatePicker from "@skbkontur/react-ui/DatePicker";
import Gapped from "@skbkontur/react-ui/Gapped";
import { SetupPentagram } from "../components/SetupPentagram";
import { BigCircleCirculation } from "../components/BigCircleCirculation";
import { Cycles } from "../components/Cycles";
import { EnergyCircles } from "../components/EnergyCircles";
import moment from "moment";

export class Expert extends Component {
    static displayName = Expert.name;
    constructor(props) {
        super(props);
        this._handleChangeBirthDateValue = this._handleChangeBirthDateValue.bind(this);
        this._handleChangeEventDateValue = this._handleChangeEventDateValue.bind(this);
        this._handleChangeReceptionDateValue = this._handleChangeReceptionDateValue.bind(this);
        this.state = {
            model: {},
            birthDatePickerValue: null,
            selectedBirthHour: null,
            eventDatePickerValue: null,
            receptionDatePickerValue: null,
            selectedReceptionHour: null,
        };
    }

    render() {
        const {
            model,
            birthDatePickerValue,
            selectedBirthHour,
            eventDatePickerValue,
            receptionDatePickerValue,
            selectedReceptionHour            
        } = this.state;

        const {
            innerEnergyCycle,
            birthDate,
            eventDate,
            setupPentagram,
            bigCircleCirculation,
            receptionDate
        } = model;
        const bd = birthDate ? birthDate.date : undefined;
        const rd = receptionDate ? receptionDate.date : undefined;

        return (
            <div className="expert-mode">
                <div className="date-block">
                    <div className="birth">
                        <div className="header">Дата рождения</div>
                        <Gapped gap={10} verticalAlign="baseline">
                            <DatePicker
                                onChange={this._handleChangeBirthDateValue}
                                value={birthDatePickerValue}
                            />
                            {this.renderDropdown(selectedBirthHour, birthDate, this._handleClickSelectBirthHour)}
                        </Gapped>
                        <BaZiDate model={bd}/>
                    </div>
                    <div className="event">
                        <div className="date-picker">
                            <div className="header">Дата расчета</div>
                            <DatePicker
                                onChange={(e) => this._handleChangeEventDateValue(e)}
                                value={eventDatePickerValue}
                            />
                        </div>
                        <BaZiDate model={eventDate} hourNotExists={true}/>
                    </div>
                    <div className="reception">
                        <div className="header">Дата приема</div>
                        <Gapped gap={10} verticalAlign="baseline">
                            <DatePicker
                                onChange={this._handleChangeReceptionDateValue}
                                value={receptionDatePickerValue}
                            />
                            {this.renderDropdown(selectedReceptionHour, receptionDate, this._handleClickSelectReceptionHour)}
                        </Gapped>
                        <BaZiDate
                            model={rd}
                            monthNotExists={true}
                            yearNotExists={true}
                        />
                    </div>
                </div>
                <div className="body">
                    <div className="main-block">
                        <BigCircleCirculation bigCircleCirculation={bigCircleCirculation}/>
                        <SetupPentagram pentagram={setupPentagram}/>
                        <Cycles model={innerEnergyCycle}/>
                    </div>
                    <EnergyCircles
                        eventDate={eventDate}
                        bigCircleCirculation={bigCircleCirculation}
                    />
                </div>
            </div>
        );
    }

    renderDropdown(selectedHour, date, selectFunction) {
        return (
            <Dropdown
                caption={
                    selectedHour ? selectedHour.display : "Выбрать час"
                }
            >
                <MenuItem onClick={() => this._handleClickSelectBirthHour(undefined)}>
                    Убрать час
                </MenuItem>
                {date &&
                date.hours.map(h => (
                    <MenuItem
                        key={h.value}
                        onClick={() => selectFunction(h)}
                    >
                        {h.display}
                    </MenuItem>
                ))}
            </Dropdown>
        )
    }

    _updateExpertMode() {
        const { birthDatePickerValue, selectedBirthHour, eventDatePickerValue, receptionDatePickerValue, selectedReceptionHour } = this.state;
        const birthHour = selectedBirthHour
            ? { skyStem: selectedBirthHour.value.skyStem.index, earthBranch: selectedBirthHour.value.earthBranch.index}
            : null;
        const receptionHour = selectedReceptionHour
            ? { skyStem: selectedReceptionHour.value.skyStem.index, earthBranch: selectedReceptionHour.value.earthBranch.index}
            : null;
        const input = {
            birthDate: birthDatePickerValue,
            birthHour: birthHour,
            eventDate: eventDatePickerValue,
            receptionDate: receptionDatePickerValue,
            receptionHour: receptionHour
        };
        const url = `${process.env.REACT_APP_API_URL}/calculator`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        })            
            .then(response => response.json())
            .then(data => this.setState({ model: data }));
    }

    _handleChangeBirthDateValue = e => {
        if (!DatePicker.validate(e.target.value))
            return;
        
        this._setStateAndUpdate({ birthDatePickerValue: e.target.value });
    };
    _handleChangeEventDateValue = e => {
        if (!DatePicker.validate(e.target.value))
            return;
        
        const { birthDatePickerValue } = this.state;
        let eventDate = moment(e.target.value, 'DD-MM-YYYY').toDate();
        let birthDate = birthDatePickerValue && moment(birthDatePickerValue, 'DD-MM-YYYY').toDate();
        if (eventDate.getTime() < birthDate.getTime())
            return;
        this._setStateAndUpdate({ eventDatePickerValue: e.target.value });   
    };
    _handleChangeReceptionDateValue = e => {
        if (!DatePicker.validate(e.target.value))
            return;
        
        const { eventDatePickerValue } = this.state;
        let receptionDate = moment(e.target.value, 'DD-MM-YYYY').toDate();
        let eventDate = eventDatePickerValue && moment(eventDatePickerValue, 'DD-MM-YYYY').toDate();
        if (receptionDate.getTime() < eventDate.getTime())
            return;
        this._setStateAndUpdate({ receptionDatePickerValue: e.target.value });  
    };

    _handleClickSelectBirthHour = hour => this._setStateAndUpdate({ selectedBirthHour: hour });
    _handleClickSelectReceptionHour = hour => this._setStateAndUpdate({ selectedReceptionHour: hour });
    
    _setStateAndUpdate = state => this.setState(state, () => this._updateExpertMode());
}

export default Expert;