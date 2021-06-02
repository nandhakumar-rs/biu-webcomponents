import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import ResetIcon from '../../assets/reset.svg';
@Component({
  tag: 'biu-rounded-button',
  styleUrl: './biu-rounded-button.scss',
})
export class BiuRoundedButton {
  @Prop({ reflect: true }) label?: string = 'Button';
  @Prop({ reflect: true }) icon?: string = ResetIcon;

  @Event({ bubbles: true, composed: true }) biuOnClick: EventEmitter;


  _onClick= () => {
    this.biuOnClick.emit();
  };

  render() {
    return (
      <div class="biu-rounded-button " onClick={this._onClick}>
        <div class="biu-rounded-button__highlight"></div>
        <p class="biu-rounded-button__label">{this.label}</p>
        <img class="biu-rounded-button__icon" src={this.icon} />
      </div>
    );
  }
}
