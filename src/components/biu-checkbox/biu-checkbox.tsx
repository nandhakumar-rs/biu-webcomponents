import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import DownArrow from '../../assets/check.svg';

@Component({
  tag: 'biu-checkbox',
  styleUrl: './biu-checkbox.scss',
})
export class BiuCheckbox {
  @Prop({ mutable: true, reflect: true }) checked?: boolean = true;
  @Prop({ reflect: true }) label?: string = 'Checkbox';

  @Event({ bubbles: true, composed: true }) biuOnCheck: EventEmitter;

  componentDidLoad() {}

  _toggleCheckbox = () => {
    this.checked = !this.checked;
    this.biuOnCheck.emit({ label: this.label, checked: this.checked });
  };

  render() {
    return (
      <div class="biu-checkbox" onClick={this._toggleCheckbox}>
        <p class="biu-checkbox__label">{this.label}</p>
        <div class="biu-checkbox__check-mark">{this.checked && <img class="biu-checkbox__check-icon" src={DownArrow} />}</div>
      </div>
    );
  }
}
