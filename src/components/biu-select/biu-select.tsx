import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import DownArrow from '../../assets/down-arrow.svg';

@Component({
  tag: 'biu-select',
  styleUrl: './biu-select.scss',
})
export class BiuSelect {
  selectElement: HTMLDivElement;
  optionElement: HTMLDivElement;

  @Prop({reflect:true}) defaultValue?: string | object | any = { value: '--', id: 0 };
  @Prop({reflect:true}) options?: string | object | any = [
    { id: '0', value: 'item0', label:"Item 0" },
    { id: '1', value: 'item1',label:"Item 1"  },
    { id: '2', value: 'item2',label:"Item 2"  },
  ];

  @State() selectedValue: string | object | any = {};
  @State() showOptions: boolean = false;
  @State() optionList = []

  @Event({ bubbles: true, composed: true }) biuOnOptionSelect: EventEmitter;

  componentDidLoad() {
    this.selectedValue = this.defaultValue;
    this.optionList = typeof this.options === 'string' ? JSON.parse(this.options) : this.options

    document.addEventListener('click', event => {
      if (event.target !== this.optionElement && event.target !== this.selectElement) {
        this.showOptions = false
      }
    });
  }

  _toggleOptions = () => {
    this.showOptions = !this.showOptions;
  };

  _selectOption = (event, option) => {
    event.preventDefault();
    event.stopPropagation();
    this.selectedValue = option;
    this.biuOnOptionSelect.emit(option);
    this.showOptions = false;
  };

  render() {
    return (
      <div class="biu-select">
        <div ref={el => (this.selectElement = el)}  onClick={this._toggleOptions}  class="overlay"></div>
        <img class="biu-select__icon" src={DownArrow} />
        <p class="biu-select__value">{this.selectedValue.label}</p>
        <div ref={el => (this.optionElement = el)} class={`biu-select__options ${this.showOptions ? 'biu-select__show-options' : ''}`}>
          {this.optionList.map((item: any, index: any) => (
            <div key={index} class="biu-select__option" onClick={event => this._selectOption(event, item)}>
              <p class="biu-select__option-text">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
