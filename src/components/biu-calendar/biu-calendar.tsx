import { Component, Prop, h, State, Watch, Event, EventEmitter } from '@stencil/core';
import LeftArrow from '../../assets/left-arrow.svg';
import RightArrow from '../../assets/right-arrow.svg';
import { getDatesForMonth, isDateBetween, getMomentDate, formatDate } from '../../utils/utils';
import * as _ from 'moment';
const moment = (_ as any).default;

@Component({
  tag: 'biu-calendar',
  styleUrl: './biu-calendar.scss',
})
export class BiuCalendar {
  @Prop({ reflect: true }) label = 'Calendar';
  @Prop({ reflect: true }) headerLabel = 'Month';
  @Prop({ reflect: true }) dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Prop({ reflect: true }) months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @State() currentYear = null;
  @State() currentMonth = null;
  @State() currentDay = null;
  @State() dates = [];
  @State() startDate = null;
  @State() endDate = null;
  @State() showCalendar = false;
  @State() isCalendarActive = false;

  @Event({
    eventName: 'biuOnDateSelection',
    composed: true,
    bubbles: true,
  })
  onDateSelection: EventEmitter;

  @Watch('currentMonth')
  onMonthChange() {
    this._getDates();
  }

  componentDidLoad() {
    this.currentMonth = moment().get('month') + 1;
    this.currentYear = moment().get('year');

    const labelRef = document.querySelector('.biu-calendar__label');
    labelRef.addEventListener('mouseenter', () => {
      this.isCalendarActive = true;
    });
    labelRef.addEventListener('mouseleave', () => {
      if (!this.showCalendar) {
        this.isCalendarActive = false;
      }
    });
  }

  _getDates = () => {
    this.currentDay = moment().get('day');
    this.dates = getDatesForMonth(this.currentMonth, this.currentYear);
  };

  _setDate = date => {
    date = formatDate(getMomentDate(date, this.currentMonth, this.currentYear));
    if (date === this.startDate) {
      this.startDate = null;
      this.endDate = null;
    }
    if (date === this.endDate) {
      this.endDate = null;
      this.startDate = null;
    }

    if (date !== NaN && this.startDate && !this.endDate) {
      this.endDate = date;
      this.onDateSelection.emit({ startDate: this.startDate, endDate: this.endDate });
      this._toggleCalendar()
      return;
    }
    if (date !== NaN && !this.startDate) {
      this.startDate = date;
      return;
    }
    if (this.startDate && this.endDate) {
      this.startDate = date;
      this.endDate = null;
      return;
    }
  };

  _checkIfDateIsBetween = date => {
    if (date !== NaN && this.startDate && this.endDate) {
      return isDateBetween(date, this.startDate, this.endDate, this.currentMonth, this.currentYear) ? 'isBetween' : '';
    }
    return '';
  };

  _checkIfDateIsSelected = date => {
    date = formatDate(getMomentDate(date, this.currentMonth, this.currentYear));
    if (date === this.startDate) return 'selected selected--start';
    if (date === this.endDate) return 'selected selected--end';
    return '';
  };

  _nextMonth = () => {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
  };

  _previousMonth = () => {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
  };

  _toggleCalendar = () => {
    this.showCalendar = !this.showCalendar;
    this.isCalendarActive = this.showCalendar;
  };

  render() {
    return (
      <div class="biu-calendar">
        <p class="biu-calendar__label" onClick={this._toggleCalendar}>
          {this.label}
          <div class={`biu-calendar__label-highlight ${this.isCalendarActive ? 'biu-calendar__label-highlight--active' : 'biu-calendar__label-highlight--inactive'}`}></div>
        </p>
        {this.showCalendar && (
          <div class="biu-calendar__panel">
            <div class="biu-calendar__panel-header">
              <img src={LeftArrow} onClick={this._previousMonth} />
              <p class="biu-calendar__panel-header-label">
                {this.currentYear} {this.months[this.currentMonth - 1]}
              </p>
              <img onClick={this._nextMonth} src={RightArrow} />
            </div>
            <div class="biu-calendar__dates">
              {this.dayHeaders.map(dayHeader => (
                <p class="biu-calendar__date-header">{dayHeader}</p>
              ))}
            </div>

            <div class="biu-calendar__dates-2">
              {this.dates.length > 0 &&
                this.dates.map(date => {
                  return (
                    <div class={`biu-calendar__date ${this._checkIfDateIsSelected(date)} ${this._checkIfDateIsBetween(date)}`} onClick={() => void this._setDate(date)}>
                      <p class="biu-calendar__date-text">{date ? date : ''}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
