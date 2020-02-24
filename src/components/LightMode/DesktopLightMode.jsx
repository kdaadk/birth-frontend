import React, { Component } from "react";
import "../../styles/lightMode/DesktopLightMode.css";
import Gapped from "@skbkontur/react-ui/Gapped";
import DatePicker from "@skbkontur/react-ui/DatePicker";
import Dropdown from "@skbkontur/react-ui/Dropdown";
import MenuItem from "@skbkontur/react-ui/MenuItem";
import {BaZiDate} from "../BaZiDate";
import {SetupPentagramLightMode} from "./SetupPentagramLightMode";
import {Cycles} from "../Cycles";
import moment from "moment";
import {post} from "../../shared/api";

export class DesktopLightMode extends Component {
    static displayName = DesktopLightMode.name;
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            birthDatePickerValue: undefined,
            selectedBirthHour: undefined,
            eventDatePickerValue: undefined
        };
    }
    
    render() {
        const { model, birthDatePickerValue, selectedBirthHour, eventDatePickerValue } = this.state;
        const { innerEnergyCycle, birthDate, eventDate, setupPentagram, setup } = model;        
        const bd = birthDate ? birthDate.date : undefined;        

        return (            
            <div className="desktop-light-mode">
                <div className="date-block">
                    <div className="birth">
                        <div className="header">Дата рождения</div>
                        <Gapped gap={10} verticalAlign="baseline">
                            <DatePicker
                                onChange={this._handleChangeBirthDateValue.bind(this)}
                                value={birthDatePickerValue}
                            />
                            <Dropdown
                                caption={
                                    selectedBirthHour ? selectedBirthHour.display : "Выбрать час"
                                }
                            >
                                <MenuItem onClick={() => this._handleClickSelectBirthHour(undefined)}>
                                    Убрать час
                                </MenuItem>
                                {birthDate &&
                                birthDate.hours.map(h => (
                                    <MenuItem
                                        key={h.value}
                                        onClick={() => this._handleClickSelectBirthHour(h)}
                                    >
                                        {h.display}
                                    </MenuItem>
                                ))}
                            </Dropdown>
                        </Gapped>
                        <BaZiDate model={bd}/>
                    </div>
                    <div className="event">
                        <div className="date-picker">
                            <div className="header">Дата расчета</div>
                            <DatePicker
                                onChange={this._handleChangeEventDateValue.bind(this)}
                                value={eventDatePickerValue}
                            />
                        </div>
                        <BaZiDate model={eventDate} hourNotExists={true}/>
                    </div>
                </div>
                <div className="body">
                    <SetupPentagramLightMode pentagram={setupPentagram}/>
                    <Cycles model={innerEnergyCycle}/>
                </div>
                <div className="result">
                    {setup && (
                        <div className="first-block">
                            <div className="congrats">
                                <b>Поздравляем!</b> Ваша конституция <a href="/setup">{setup.fullName}</a>
                            </div>
                            <div className="text-result">
                                Энергетическая конституция показывает индивидуальные особенности
                                человека: строение его тела, поведение, характер, склонности и
                                потенциалы, состояние здоровья или болезни. На формирование
                                Энергетической конституции оказывают влияние многие факторы –
                                энергии места и даты рождения (включая энергии года, месяца,
                                часа и даже минут), особенности условий жизни и воспитания и т.
                                д.
                                <br/> При этом энергетическое состояние организма постоянно
                                претерпевает некоторые изменения в течении жизни.
                            </div>
                        </div>                        
                    )}
                    {this._renderInnerEnergyCycle(innerEnergyCycle, eventDatePickerValue)}
                </div>
                { innerEnergyCycle && (
                    <div className="description-content">
                        <hr/>
                        <div className="energy-header" style={{backgroundColor: setup.color}}>
                            Энергия {setup.shortName}
                        </div>
                        <hr/>
                        <div className="description-block">
                            <b>{setup.description.baseFeature.header}</b>
                            <ul>
                                {setup.description.baseFeature.list.map(x => <li key={x}>{x}</li>)}
                            </ul>
                            {this._getDescription(setup.description.mentalLevel)}
                            {this._getDescription(setup.description.emotionalLevel)}
                        </div>
                        <hr/>
                        <div className="reference">
                            Информация подготовлена по материалам сайта <a href="https://belibra.ru">belibra.ru</a>,
                            а также заимствована из обучающих вебинаров  Московской Су Джок Академии и Центра китайской медицины Синофарм.
                        </div>
                    </div>
                )}
            </div>
        );
    }

    _renderInnerEnergyCycle(innerEnergyCycle, eventDatePickerValue) {
        return (
            <div>
                {innerEnergyCycle && (
                    <div className="cycles-table">
                        <div className="message">
                            Ваши энергии внутреннего времени на дату {eventDatePickerValue}
                        </div>
                        <table border="1" cellPadding="7" cellSpacing="0">
                            <tbody>
                            {this._getRow(innerEnergyCycle.big.eventPeriod, "Большой цикл")}
                            {this._getRow(innerEnergyCycle.year.eventPeriod, "Годовой цикл")}
                            {this._getRow(innerEnergyCycle.season.eventPeriod, "Сезонный цикл")}
                            {this._getRow(innerEnergyCycle.month.eventPeriod, "Месячный цикл")}
                            {this._getRow(innerEnergyCycle.day.eventPeriod, "Суточный цикл")}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }

    _getRow(period, name) {
        return (
            <tr>
                <td className="header">{name}</td>
                <td className="content">{this._getDate(period.start)}</td>
                <td className="content">{this._getDate(period.end)}</td>
                <td>{this._getEnergyName(period.number)}</td>
            </tr>
        );
    }

    _getDate(rawDate) {
        return new Date(Date.parse(rawDate)).toLocaleDateString("en-US");
    }

    _getEnergyName(energyNumber) {
        let result = "энегрия ";
        if (energyNumber === 0) return `${result} Ветра`;
        if (energyNumber === 1) return `${result} Тепла`;
        if (energyNumber === 2) return `${result} Жара`;
        if (energyNumber === 3) return `${result} Влажности`;
        if (energyNumber === 4) return `${result} Сухости`;
        if (energyNumber === 5) return `${result} Холода`;
    }

    _getDescription(source) {
        return (
            <div>
                <b>{source.header}</b>
                <div>
                    {source.text}
                </div>
                <b>{source.excess.header}</b>
                <ul>
                    {source.excess.list.map(x => <li key={x}>{x}</li>)}
                </ul>
                <b>{source.lack.header}</b>
                <ul>
                    {source.lack.list.map(x => <li key={x}>{x}</li>)}
                </ul>
            </div>
        )
    }

    _handleClickSelectBirthHour = hour => this._setStateAndUpdate({ selectedBirthHour: hour });
    _handleChangeBirthDateValue = e => {
        if (!DatePicker.validate(e.target.value))
            return;
        
        this._setStateAndUpdate({ birthDatePickerValue: e.target.value })
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

    _setStateAndUpdate = state => this.setState(state, () => this._updateExpertMode());

    _updateExpertMode() {
        const { birthDatePickerValue, selectedBirthHour, eventDatePickerValue } = this.state;
        const birthHour = selectedBirthHour
            ? { skyStem: selectedBirthHour.value.skyStem.index, earthBranch: selectedBirthHour.value.earthBranch.index}
            : null;
        const input = {
            birthDate: birthDatePickerValue,
            birthHour: birthHour,
            eventDate: eventDatePickerValue
        };
        post("/calculator", input)
            .then(response => response.json())
            .then(data => this.setState({ model: data }));
    }
}