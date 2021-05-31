import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import Download from '../../assets/download.svg';

@Component({
  tag: 'biu-dropdown',
  styleUrl: './biu-dropdown.scss',
})
export class BiuDropDown {
  labelElement: HTMLDivElement;
  optionElement: HTMLDivElement;

  @Prop({ reflect: true }) options?: string | object | any = [
    { id: '0', value: 'item0' },
    { id: '1', value: 'item1' },
    { id: '2', value: 'item2' },
  ];
  @Prop({ reflect: true }) icon?: string = Download;
  @Prop({ reflect: true }) label?: string = 'Download';

  @State() showOptions: boolean = false;

  @Event({ bubbles: true, composed: true }) biuOnOptionSelect: EventEmitter;

  componentDidLoad() {
    document.addEventListener('click', event => {
      if (event.target !== this.optionElement && event.target !== this.labelElement) {
        this.showOptions = false;
      }
    });
  }

  _toggleOptions = () => {
    this.showOptions = !this.showOptions;
  };

  _selectOption = (event, option) => {
    event.preventDefault();
    event.stopPropagation();
    this.biuOnOptionSelect.emit(option);
    this.showOptions = false;
  };

  render() {
    return (
      <div class="biu-dropdown">
        <div ref={el => (this.labelElement = el)} onClick={this._toggleOptions} class="overlay"></div>
        <p class="biu-dropdown__label">{this.label}</p>
        <img class="biu-dropdown__icon" src={this.icon} />
        <div ref={el => (this.optionElement = el)} class={`biu-dropdown__options ${this.showOptions ? 'biu-dropdown__show-options' : ''}`}>
          {this.options.map((item: any, index: any) => (
            <div key={index} class="biu-dropdown__option" onClick={event => this._selectOption(event, item)}>
              <p class="biu-dropdown__option-text">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
