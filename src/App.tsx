import './styles/App.css';
import './styles/preview.css';
import './styles/grid.css';
import './styles/utils.css';
import React, { Component } from 'react';
import { Preview, initPreview } from './controls/Preview';
import { InputSlider } from './controls/Input/InputSlider';
import { BorderStyle } from './properties/Border';
import { BorderControl } from './controls/Input/BorderControl';
import { PopoverPicker } from './controls/Input/PopoverPicker';
import { PreviewItem, PreviewList } from './controls/PreviewList';

interface AppProps {

}

interface AppState {
  preview: Preview;
  previewItems: PreviewItem[];
  selectedId: number;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const newPreview = initPreview(0);
    this.state = {preview: newPreview, previewItems: [{ id: 0, preview: newPreview, selected: true }], selectedId: 0 };
    this.sliderChange = this.sliderChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.addPreviewItem = this.addPreviewItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  sliderChange(value: number, property: string, subprop?: string) {
    this.setState(prevState => (
      !subprop ? {
        preview: {
          ...prevState.preview,
          [property]: value,
        },
        previewItems: [...prevState.previewItems],
        selectedId: prevState.selectedId,
      } : {
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            [subprop]: value,
          },
        },
        previewItems: [...prevState.previewItems],
        selectedId: prevState.selectedId,
      }
    ));
  }

  addPreviewItem() {
    const newItem = {
      id: this.state.previewItems.length,
      preview: initPreview(this.state.previewItems.length),
      selected: true,
    };
    this.setState(prevState => ({
      preview: newItem.preview,
      previewItems: [
        ...prevState.previewItems.map((item, index) => {
          if (item.id === prevState.preview.id) {
            item.preview = prevState.preview;
          }
          item.selected = false;
          return item;
        }),
        newItem,
      ],
      selectedId: newItem.id,
    }));
  }

  selectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState(prevState => ({
      preview: {
        ...prevState.preview,
        border: {
          ...prevState.preview.border,
          style: (e.target.value) as BorderStyle
        }
      },
      previewItems: prevState.previewItems,
      selectedId: prevState.selectedId,
    }));
  }

  selectItem(id: number) {
    const selectedItem = this.state.previewItems.find(item => item.id === id);
    if (selectedItem) {
      console.log("item selected: " + selectedItem.id);
      selectedItem.selected = true;
      this.setState(prevState => ({
        preview: selectedItem.preview,
        previewItems: prevState.previewItems.map((item, index) => {
          if (item.id === prevState.preview.id) {
            item.preview = prevState.preview;
          }
          item.selected = false;
          return item;
        }),
        selectedId: selectedItem.id,
      }));
    }
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <main>
          <nav className="property-list">
            <ul>
              <li><InputSlider name="Width" min={0} max={400} step={1} onSliderChange={this.sliderChange} value={this.state.preview.width} /></li>
              <li><InputSlider name="Height" min={0} max={300} step={1} onSliderChange={this.sliderChange} value={this.state.preview.height} /></li>
              <li><div className='col-4 list-label'>Background:</div><div className='col-8 text-right w-100'><PopoverPicker color={this.state.preview.backgroundColor} onChange={(color: string) => this.setState({preview: {...this.state.preview, backgroundColor: color}, previewItems: this.state.previewItems, selectedId: this.state.selectedId})} /></div></li>
              <li><BorderControl
                  color={this.state.preview.border.color}
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
            </ul>
          </nav>

          <div className="preview-window">
            <PreviewList activePreview={this.state.preview} items={this.state.previewItems} activeIndex={this.state.selectedId} onSelectItem={this.selectItem} />
          </div>

          <aside className="tools">
            <button onClick={this.addPreviewItem}>Add Item</button>
          </aside>
        </main>
      </div>
    );
  }
}

// const preview: Preview = {
//   width: 100,
//   height: 100,
//   border: 0,
//   borderStyle: "solid",
// };

// function sliderChange(value: number, property: string) {
//   preview[property] = value;
//   const previewDiv = document.getElementById('preview');
//   if (previewDiv) {
//     previewDiv.style.width = `${preview.width}px`;
//     previewDiv.style.height = `${preview.height}px`;
//     previewDiv.style.border = `${preview.border}px ${preview.borderStyle} black`;
//   }
// }

// function selectChange(e: React.ChangeEvent<HTMLSelectElement>) {
//   preview.borderStyle = e.target.value;
// }

// function App() {
//   return (
//     <div className="App">
//       <main>
//         <nav className="property-list">
//           <ul>
//             <li><InputSlider name="Width" min={0} max={400} step={1} onSliderChange={sliderChange} /></li>
//             <li><InputSlider name="Height" min={0} max={300} step={1} onSliderChange={sliderChange} /></li>
//             <li>
//               <InputSlider name="Border" min={0} max={100} step={1} onSliderChange={sliderChange} />
//               <br />
//               <select name="borderStyle" id="borderStyle" onChange={selectChange}>
//                 <option value="none">None</option>
//                 <option value="solid">Solid</option>
//                 <option value="dashed">Dashed</option>
//                 <option value="dotted">Dotted</option>
//                 <option value="double">Double</option>
//               </select>
//             </li>
//           </ul>
//         </nav>

//         <div className="preview-window">
//           <div id="preview"></div>
//         </div>

//         <aside className="tools">

//         </aside>
//       </main>
//     </div>
//   );
// }

export default App;
