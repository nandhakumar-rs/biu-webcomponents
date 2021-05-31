import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import SearchIcon from '../../assets/search.svg';

@Component({
  tag: 'biu-search-bar',
  styleUrl: './biu-search-bar.scss',
})
export class BiuSearchBar {
  @Prop({ reflect: true }) placeholder?: string = 'Search';
  @Prop({ reflect: true }) defaultValue?: string = 'Search';

  @Event({ bubbles: true, composed: true }) biuOnChange: EventEmitter;

  @State() value: string = '';

  componentDidLoad() {
    this.value = this.defaultValue;
  }

  _onInputChange = event => {
    this.biuOnChange.emit(event.target.value);
    this.value = event.target.value;
  };

  render() {
    return (
      <div class="biu-search-bar">
        <input value={this.value} placeholder={this.placeholder} class="biu-search-bar__input" onInput={this._onInputChange} />
        <img class="biu-search-bar__icon" src={SearchIcon} />
      </div>
    );
  }
}
