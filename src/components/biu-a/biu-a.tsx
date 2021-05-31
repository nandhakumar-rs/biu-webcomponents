import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'biu-a',
  styleUrl: './biu-a.scss',
})
export class BiuButton {
  @Prop({ reflect: true }) label?: string = 'Link';
  @Prop({ reflect: true }) isActive?: boolean = false;

  @State() active = false;

  @Event({ bubbles: true, composed: true }) biuOnClick: EventEmitter;

  _onClick = () => {
    this.biuOnClick.emit(this.active);
    this.active = !this.active;
  };

  componentDidLoad() {
    this.active = this.isActive;
  }

  render() {
    return (
      <p class="biu-a" onClick={this._onClick}>
        {this.label}
        <div class={`biu-a__highlight ${this.active ? 'biu-a__highlight--active' : 'biu-a__highlight--inactive'}`}></div>
      </p>
    );
  }
}
