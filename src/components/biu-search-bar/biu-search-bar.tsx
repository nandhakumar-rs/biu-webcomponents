import { Component, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import SearchIcon from '../../assets/search.svg';
import ResetIcon from '../../assets/close.svg'
@Component({
  tag: 'biu-search-bar',
  styleUrl: './biu-search-bar.scss',
})
export class BiuSearchBar {
  @Prop({ reflect: true }) placeholder?: string = 'Search';
  @Prop({ reflect: true }) defaultValue?: string = 'Search';

  @Event({ bubbles: true, composed: true }) biuOnChange: EventEmitter;
  @Event({ bubbles: true, composed: true }) biuOnReset: EventEmitter;

  @State() value: string = '';

  @Watch('defaultValue')
  onMonthChange() {
    this.value = this.defaultValue;
  }

  componentDidLoad() {
    this.value = this.defaultValue;
  }

  _onInputChange = event => {
    this.biuOnChange.emit(event.target.value);
    this.value = event.target.value;
  };

  _onReset = () => {
    this.biuOnReset.emit();
  };

  render() {
    return (
      <div class="biu-search-bar">
        {this.value && <img onClick={this._onReset} class="biu-search-bar__icon biu-search-bar__icon--reset" src={ResetIcon} />}
        <input value={this.value} placeholder={this.placeholder} class="biu-search-bar__input" onInput={this._onInputChange} />
        <img class="biu-search-bar__icon" src={SearchIcon} />
      </div>
    );
  }
}
