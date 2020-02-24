import React, { Component } from "react";
import "../../styles/lightMode/MobileLightMode.css";
import Gapped from "@skbkontur/react-ui/Gapped";
import DatePicker from 'react-mobile-datepicker';
import Dropdown from "@skbkontur/react-ui/Dropdown";
import MenuItem from "@skbkontur/react-ui/MenuItem";
import Button from "@skbkontur/react-ui/Button";
import toLocalDateString from "../../shared/formatDate";
import {goTo} from "../../shared/goTo";
import Toast from "@skbkontur/react-ui/components/Toast/Toast";
const { Calendar } = require('@skbkontur/react-icons');

export class MobileLightMode extends Component {
  static displayName = MobileLightMode.name;
  state = {
    baZiBirthDateModel: undefined,
    baZiBirthHours: undefined,
    selectedBirthHour: undefined,
    birthDateValue: undefined,
    eventDateValue: undefined,
    isOpenBirthDate: false,
    isOpenEventDate: false,
  };

  render() {
    const {
      baZiBirthDateModel,
      birthDateValue,
      selectedBirthHour,
      eventDateValue,
      isOpenBirthDate,
      isOpenEventDate
    } = this.state;

    return (
      <div className="mobile-light-mode">
          <MobileDatePicker header='Дата рождения'
                            date={birthDateValue}
                            isOpen={isOpenBirthDate}
                            onOpen={this._handleOpenBirthDateClick}
                            onSelect={this._handleBirthDateSelect.bind(this)}
                            onCancel={this._handleBirthDateCancel}
          />
          <div className='hour-dropdown'>
              <Dropdown width={140} caption={selectedBirthHour ? selectedBirthHour.display : "Выбрать час"}>
                  <MenuItem onClick={() => this._handleClickSelectBirthHour(undefined)}>
                      Убрать час
                  </MenuItem>
                  {baZiBirthDateModel &&
                  baZiBirthDateModel.hours.map(h => (
                      <MenuItem
                          key={h.value}
                          onClick={() => this._handleClickSelectBirthHour(h)}
                      >
                          {h.display}
                      </MenuItem>
                  ))}
              </Dropdown>
          </div>        
        <MobileDatePicker header='Дата расчета'
                          date={eventDateValue}
                          isOpen={isOpenEventDate}
                          onOpen={this._handleOpenEventDateClick}
                          onSelect={this._handleEventDateSelect}
                          onCancel={this._handleEventDateCancel}
        />
        <div className='calculate-btn'>
          <Button use="default" width={140} onClick={this._handleClickCalculate}>
            Рассчитать
          </Button>
        </div>
      </div>
    );
  }

  _handleClickCalculate = () => {
    const { birthDateValue, selectedBirthHour, eventDateValue } = this.state;   
    if (!birthDateValue || !eventDateValue) {
        Toast.push('Выберите дату рождения и дату расчета', {
            handler: () => Toast.push('Canceled'),
        });
        return;
    }
        
    let baseUrl = `/calculate/${birthDateValue}/${eventDateValue}`;
    if (selectedBirthHour)
      goTo(`${baseUrl}/${selectedBirthHour.value.earthBranch.index}/${selectedBirthHour.value.skyStem.index}`);
    else
      goTo(baseUrl);
  };

  _handleOpenBirthDateClick = () => this.setState({ isOpenBirthDate: true });
  _handleBirthDateCancel = () => this.setState({ isOpenBirthDate: false });

  _handleClickSelectBirthHour = hour => this.setState({ selectedBirthHour: hour });

  _handleOpenEventDateClick = () => this.setState({ isOpenEventDate: true });
  _handleEventDateCancel = () => this.setState({ isOpenEventDate: false });
  
  _handleEventDateSelect = (eventDate) => this.setState({ eventDateValue: toLocalDateString(eventDate), isOpenEventDate: false });
  async _handleBirthDateSelect(birthDate) {
    const birthDateString = toLocalDateString(birthDate);
    this.setState({ birthDateValue: birthDateString, isOpenBirthDate: false });
      const url = `${process.env.REACT_APP_API_URL}/calculator/hours`;
      fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(birthDateString)
      })
          .then(response => response.json())
          .then(data => this.setState({ model: data }));
  };
}

function MobileDatePicker(props) {
  const { header, date, isOpen, onOpen, onSelect, onCancel } = props;
    return (
        <Gapped gap={10} vertical={true}>
          <div className='date-header'>{header}</div>
          <Button use='default' icon={<Calendar />} width={140} onClick={onOpen}>
            {date || 'Выбрать дату'}
          </Button>
          <DatePicker
              isOpen={isOpen}
              onSelect={onSelect}
              onCancel={onCancel}
              min={new Date(1900, 0, 1)}
              confirmText='Ок'
              cancelText='Отменить'              
          />
        </Gapped>
    )
}
