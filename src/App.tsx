import './styles/App.scss';
import './styles/preview.css';
import './styles/grid.css';
import './styles/form.css';
import './styles/utils.css';
import React, { ChangeEvent, Component } from 'react';
import { Preview, initPreview, PreviewType } from './controls/Preview';
import { InputSlider } from './controls/Input/InputSlider';
import { BorderControl } from './controls/Input/BorderControl';
import { PopoverPicker } from './controls/Input/PopoverPicker';
import { PreviewItem, PreviewList } from './controls/PreviewList';
import { SelectInput } from './controls/Input/SelectInput';
import { Position } from './properties/Position';
import { Display } from './properties/Display';
import Switch from 'react-switch';
import { ExportModal } from './controls/Modals/ExportModal';
import { Button } from './controls/Button/Button';
import ClipboardJS from 'clipboard';
import { FlexDirection } from './properties/Flex';

new ClipboardJS(`.btn`);

interface AppProps {

}

interface AppState {
  preview: Preview;
  previewItems: PreviewItem[];
  selectedId: number | string;
  highlight: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const newPreview = initPreview(0);
    this.state = {preview: newPreview, previewItems: [{ id: 0, preview: newPreview, selected: true, isParent: true, children: null }], selectedId: 0, highlight: true };
    this.changeClass = this.changeClass.bind(this);
    this.changeId = this.changeId.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.addPreviewItem = this.addPreviewItem.bind(this);
    this.addChild = this.addChild.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  changeClass(e: ChangeEvent<HTMLInputElement>) {
    this.setState(prevState => (
      {
        ...prevState,
        preview: {
          ...prevState.preview,
          className: e.target.value,
        }
      }
    ));
  }

  changeId(e: ChangeEvent<HTMLInputElement>) {
    this.setState(prevState => (
      {
        ...prevState,
        preview: {
          ...prevState.preview,
          cssId: e.target.value,
        }
      }
    ));
  }

  toggleHighlight(highlight: boolean) {
    this.setState(prevState => ({
      ...prevState,
      highlight: highlight,
    }));
  }

  sliderChange(value: number, property: string, subprop?: string) {
    this.setState(prevState => (
      !subprop ? {
        preview: {
          ...prevState.preview,
          [property]: value,
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      } : {
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            [subprop]: value,
          },
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      }
    ));
  }

  addPreviewItem() {
    const newItem: PreviewItem = {
      id: this.state.previewItems.length,
      preview: initPreview(this.state.previewItems.length),
      selected: true,
      children: null,
      isParent: true,
    };
    this.setState(prevState => ({
      preview: newItem.preview,
      previewItems: [
        ...prevState.previewItems.map((item, index) => {
          if (item.id === prevState.preview.id) {
            item.preview = prevState.preview;
          } else {
            if (item.children && typeof item.children !== 'undefined') {
              item.children.forEach(child => {
                if (child.id === prevState.selectedId) {
                  child.preview = prevState.preview;
                }
                child.selected = false;
              });
            }
          }
          item.selected = false;
          return item;
        }),
        newItem,
      ],
      selectedId: newItem.id,
    }));
  }

  addChild() {
    const id = `${this.state.selectedId}-${(this.state.preview.children && this.state.preview.children?.length > 0) ? this.state.preview.children?.length : 0}`;
    const newItem: PreviewItem = {
      id: id,
      preview: initPreview(id, true),
      selected: true,
      children: null,
      isParent: false,
    };
    this.setState(prevState => ({
      preview: newItem.preview,
      previewItems: [...prevState.previewItems.map((item, index) => {
        if (item.selected === true) {
          item.preview = prevState.preview;
          if (item.preview.children === null || typeof item.preview.children === 'undefined') {
            item.preview.children = [newItem.preview];
          } else {
            item.preview.children.push(newItem.preview);
          }
          if (item.children === null || typeof item.children === 'undefined') {
            item.children = [newItem];
          } else {
            item.children.push(newItem);
          }
        }
        item.selected = false;
        return item;
      })],
      selectedId: newItem.id,
    }));
  }

  selectChange(value: any, property: string, subprop?: string) {
    this.setState(prevState => (
      !subprop ? {
        preview: {
          ...prevState.preview,
          [property]: value,
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      } : {
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            [subprop]: value,
          },
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      }
    ));
  }

  selectItem(id: number | string) {
    const selectedItem = typeof id === 'number' ? this.state.previewItems.find(item => item.id === id) :
      this.state.previewItems.find(item => item.id.toString() === id.substring(0, id.indexOf('-')))?.children?.find(child => child.id === id);
    if (selectedItem) {
      selectedItem.selected = true;
      this.setState(prevState => ({
        preview: selectedItem.preview,
        previewItems: [...prevState.previewItems.map((item, index) => {
          if (item.id === prevState.preview.id) {
            item.preview = prevState.preview;
          } else {
            if (item.children && typeof item.children !== 'undefined') {
              item.children.forEach(child => {
                if (child.id === prevState.selectedId && child.id !== selectedItem.id) {
                  child.preview = prevState.preview;
                  child.selected = false;
                } else if (child.id === selectedItem.id) {
                  child.selected = true;
                } else {
                  child.selected = false;
                }
              });
            }
          }
          if (item.id !== selectedItem.id) {
            item.selected = false;
          } else {
            item.selected = true;
          }
          return item;
        })],
        selectedId: selectedItem.id,
      }));
    }
  }

  render(): React.ReactNode {
    return (
      <div className={this.state.highlight ? 'App' : 'App no-highlight'}>
        <main>
          <nav className="property-list">
            <ul>
              <li>
                <div className='col-6 list-label text-center'>Position:</div>
                <div className='col-6 list-label text-center'>Display:</div>
                <div className='col-6 text-center w-100'><SelectInput id='position' name='position' type='Position' items={Object.values(Position)} value={this.state.preview.position} onSelectChange={this.selectChange} /></div>
                <div className='col-6 text-center w-100'><SelectInput id='display' name='display' items={Object.values(Display)} value={this.state.preview.display} onSelectChange={this.selectChange} /></div>
              </li>
              {this.state.preview.display === Display.Flex && <li>
                <div className='col-12 list-label text-center'>Flex direction:</div>
                <div className='col-12 text-center w-100'><SelectInput id='flexDirection' name='flexDirection' items={Object.values(FlexDirection)} value={this.state.preview.flexDirection} onSelectChange={this.selectChange} /></div>
              </li>}
              <li><InputSlider name="Width" title={this.state.preview.type === PreviewType.Child ? 'Width in %' : undefined} min={0} max={400} step={1} relative={this.state.preview.type === PreviewType.Child} onSliderChange={this.sliderChange} value={this.state.preview.width} /></li>
              <li><InputSlider name="Height" title={this.state.preview.type === PreviewType.Child ? 'Height in %' : undefined} min={0} max={300} step={1} relative={this.state.preview.type === PreviewType.Child} onSliderChange={this.sliderChange} value={this.state.preview.height} /></li>
              <li><div className='col-4 list-label'>Background:</div><div className='col-8 text-right w-100'><PopoverPicker color={this.state.preview.backgroundColor} onChange={(color: string) => this.setState({preview: {...this.state.preview, backgroundColor: color}, previewItems: this.state.previewItems, selectedId: this.state.selectedId})} /></div></li>
              <li><BorderControl
                  color={this.state.preview.border.color}
                  selectValue={this.state.preview.border.style}
                  onPickerChange={(color: string) => this.setState({preview: {...this.state.preview, border: {...this.state.preview.border, color: color}}})}
                  onSelectChange={this.selectChange}
                  sliderProps={{ min: 0, max: 100, step: 1, value: this.state.preview.border.width, property: 'width', name: 'Border', onSliderChange: this.sliderChange }} />
              </li>
              <li><InputSlider name="Border" property="radius" title="Border radius" value={this.state.preview.border.radius} min={0} max={200} step={1} onSliderChange={this.sliderChange} /></li>
              <li>
                <InputSlider name="BoxShadow" property="x" title="Shadow X" value={this.state.preview.boxShadow.x} min={-100} max={100} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="BoxShadow" property="y" title="Shadow Y" value={this.state.preview.boxShadow.y} min={-100} max={100} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="BoxShadow" property="blur" title="Shadow Blur" value={this.state.preview.boxShadow.blur} min={0} max={100} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="BoxShadow" property="spread" title="Shadow Spread" value={this.state.preview.boxShadow.spread} min={-100} max={100} step={1} onSliderChange={this.sliderChange} />
                <div className='col-4 list-label'>Shadow Color:</div><div className='col-8 text-right w-100'><PopoverPicker color={this.state.preview.boxShadow.color} onChange={(color: string) => this.setState({preview: {...this.state.preview, boxShadow: {...this.state.preview.boxShadow, color: color}}, previewItems: this.state.previewItems, selectedId: this.state.selectedId})} /></div>
              </li>
              <li>
                <InputSlider name="Margin" property="top" title="Margin Top" value={this.state.preview.margin.top} min={-100} max={200} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="Margin" property="right" title="Margin Right" value={this.state.preview.margin.right} min={-100} max={200} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="Margin" property="bottom" title="Margin Bottom" value={this.state.preview.margin.bottom} min={-100} max={200} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="Margin" property="left" title="Margin Left" value={this.state.preview.margin.left} min={-100} max={200} step={1} onSliderChange={this.sliderChange} />
              </li>
              <li>
                <InputSlider name="Padding" property="top" title="Padding Top" value={this.state.preview.padding.top} min={0} max={100} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="Padding" property="right" title="Padding Right" value={this.state.preview.padding.right} min={0} max={100} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="Padding" property="bottom" title="Padding Bottom" value={this.state.preview.padding.bottom} min={0} max={100} step={1} onSliderChange={this.sliderChange} />
                <InputSlider name="Padding" property="left" title="Padding Left" value={this.state.preview.padding.left} min={0} max={100} step={1} onSliderChange={this.sliderChange} />
              </li>
            </ul>
          </nav>

          <div className="preview-window">
            <PreviewList activePreview={this.state.preview} items={this.state.previewItems} activeIndex={this.state.selectedId} onSelectItem={this.selectItem} />
          </div>

          <aside className="tools">
            <div className="tools-global">
              <label className="label row align-middle">
                Highlight selected <Switch onChange={this.toggleHighlight} checked={this.state.highlight} className='mx-2' /> {this.state.highlight ? 'on' : 'off'}
              </label>
              <div className="col">
                <Button onClick={this.addPreviewItem} className='btn-sm mr-1'>&#10133; Add</Button>
                <Button onClick={this.addChild} className='btn-sm' disabled={this.state.preview.id.toString().includes('-')}>&#10133; Child</Button>
              </div>
            </div>
            <div className="tools-element">
              <div className="row justify-center">
                <div className="col label">
                  Element ID:
                </div>
                <div className="col">
                  <input type="text" name="cssId" id="cssId" className='input-text' value={this.state.preview.cssId} onChange={this.changeId} />
                </div>
              </div>
              <div className="row mt-1 justify-center">
                <div className="col label">
                  CSS Class:
                </div>
                <div className="col">
                  <input type="text" name="classname" id="classname" className='input-text' value={this.state.preview.className} onChange={this.changeClass} />
                </div>
              </div>
              <ExportModal preview={this.state.preview} />
            </div>
          </aside>
        </main>
      </div>
    );
  }
}

export default App;
