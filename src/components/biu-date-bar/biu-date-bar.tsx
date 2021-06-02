import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import RightArrow from '../../assets/date-bar-right-arrow.svg';
import * as _ from 'moment';
const moment = (_ as any).default;
import { getDatesForNextNDays } from '../../utils/utils';

@Component({
  tag: 'biu-date-bar',
  styleUrl: './biu-date-bar.scss',
})
export class BiuDateBar {
  @Prop({ reflect: true }) label?: string = 'Button';
  @Prop({ reflect: true }) eventDates?: string = '["01/06/2021"]';
  @Prop({ reflect: true }) days?: number = 2;
  @Prop({ reflect: true, mutable: true }) daysLabel?: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  @Prop({ reflect: true, mutable: true }) monthsLabel?: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @Event({ bubbles: true, composed: true }) biuOnClick: EventEmitter;

  @State() startDate;
  @State() endDate;
  @State() dates = [];
  @State() events = [];

  componentDidLoad() {
    this.startDate = moment();
    this.endDate = moment(this.startDate).add(this.days, 'days');
    this.events = JSON.parse(this.eventDates);
    this.dates = getDatesForNextNDays(this.startDate, this.days, this.events);
  }

  _onClick = () => {
    this.biuOnClick.emit();
  };

  _nextSetOfDates = () => {
    this.startDate = this.endDate;
    this.endDate = moment(this.startDate).add(this.days, 'days');
    this.dates = getDatesForNextNDays(this.startDate, this.days, this.events);
  };

  _previousSetOfDates = () => {
    this.endDate = this.startDate;
    this.startDate = moment(this.startDate).subtract(this.days, 'days');
    console.log(this.startDate, this.endDate);
    this.dates = getDatesForNextNDays(this.startDate, this.days, this.events);
  };

  render() {
    return (
      <div class="biu-date-bar">
        <div class="biu-date-bar__dates">
          {this.dates.map((item, index) => (
            <div key={index} class="biu-date-bar__date-view">
              <p class="biu-date-bar__date-view--date">{item.date}</p>
              <p class="biu-date-bar__date-view--label">{this.monthsLabel[item.month]}</p>
              <div class={`biu-date-bar__indicator ${item.hasEvent ? 'biu-date-bar__indicator--show' : 'biu-date-bar__indicator--hide'}`}></div>
              <p class="biu-date-bar__date-view--label">{this.daysLabel[item.day]}</p>
            </div>
          ))}
        </div>
        <div class="biu-date-bar__nav">
          <img class="biu-date-bar__icon biu-date-bar__icon--left" src={RightArrow} onClick={this._previousSetOfDates} />
          <div class="biu-date-bar__bar"></div>
          <img class=" biu-date-bar__icon biu-date-bar__icon--right" src={RightArrow} onClick={this._nextSetOfDates} />
        </div>
      </div>
    );
  }
}
