import React, { Component } from "react";
import {BaZiDate} from "../components/BaZiDate";
import "../styles/pages/Calculate.css";
import {SetupPentagramLightMode} from "../components/LightMode/SetupPentagramLightMode";
import {MobileCycles} from "../components/MobileCycles";

export class Calculate extends Component {
    static displayName = Calculate.name;
    state = {
        model: undefined
    };

    render() {
        const { model } = this.state;
        if (!model)
            return <div>Загрузка</div>;
        
        const { innerEnergyCycle, birthDate, eventDate, setupPentagram, setup } = model;
        const { bd, ed, bdhss } = this.props.match.params;
        const hourNotExists = !bdhss;
        return (
            <div className="mobile-light-calculate">
                {model && (
                    <div>
                        <div className="header">Дата рождения {bd}</div>
                        <BaZiDate model={birthDate.date} hourNotExists={hourNotExists}/>
                        <div className="header">Дата расчета {ed}</div>
                        <BaZiDate model={eventDate} hourNotExists={true}/>
                        <hr/>
                        <SetupPentagramLightMode pentagram={setupPentagram}/>
                        <div className="text-header">
                            <b>Поздравляем!</b> Ваша конституция {setup.fullName}
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
                        <hr/>
                        <div className="header">
                            <b>Расчет энергий внутреннего времени на дату {ed}</b>
                        </div>
                        <MobileCycles model={innerEnergyCycle}/>
                        <div className="inner-energy-cycle-table">
                            <table cellPadding={3}>
                                <tbody>
                                <tr>
                                    <td>Цикл</td>
                                    <td>Начало</td>
                                    <td>Конец</td>
                                    <td>Энергия</td>
                                </tr>
                                {this._getRow(innerEnergyCycle.big.eventPeriod, "Большой")}
                                {this._getRow(innerEnergyCycle.year.eventPeriod, "Годовой")}
                                {this._getRow(innerEnergyCycle.season.eventPeriod, "Сезонный")}
                                {this._getRow(innerEnergyCycle.month.eventPeriod, "Месячный")}
                                {this._getRow(innerEnergyCycle.day.eventPeriod, "Суточный")}
                                </tbody>
                            </table>
                        </div>
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

    componentDidMount() {
        this._updateExpertMode();
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

    _updateExpertMode() {
        const { bd, ed, bdheb, bdhss } = this.props.match.params;
        const birthHour = bdheb ? { skyStem: Number(bdhss), earthBranch: Number(bdheb)} : null;
        const input = {
            birthDate: bd,
            birthHour: birthHour,
            eventDate: ed
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

    _getRow(period, name) {
        return (
            <tr>
                <td className="content">{name}</td>
                <td className="content">{this._getDate(period.start)}</td>
                <td className="content">{this._getDate(period.end)}</td>
                <td>{period.energyName}</td>
            </tr>
        );
    }

    _getDate(rawDate) {
        return new Date(Date.parse(rawDate)).toLocaleDateString("ru");
    }
}

export default Calculate;