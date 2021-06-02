import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'biu-button',
  styleUrl: './biu-button.scss',
})
export class BiuButton {
  @Prop({ reflect: true }) label?: string = 'Button';

  @Event({ bubbles: true, composed: true }) biuOnClick: EventEmitter;


  _onClick= () => {
    this.biuOnClick.emit();
  };

  render() {
    return (
      <div class="biu-button" onClick={this._onClick}>
        <div class="biu-button__highlight"></div>
        <p class="biu-button__label">{this.label}</p>
      </div>
    );
  }
}
