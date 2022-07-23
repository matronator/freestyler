import React, { Component } from 'react';
import './App.css';
import './preview.css';
import './grid.css';
import './utils.css';
import { Preview, initPreview, PreviewDiv } from './controls/Preview';
import { InputSlider } from './controls/InputSlider';
import { BorderStyle } from './properties/Border';
import { BorderControl } from './controls/BorderControl';
import { PopoverPicker } from './controls/PopoverPicker';

interface AppProps {

}

interface AppState {
  preview: Preview;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {preview: initPreview()};
    this.sliderChange = this.sliderChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  sliderChange(value: number, property: string, subprop?: string) {
    this.setState(prevState => (
      !subprop ? {
        preview: {
          ...prevState.preview,
          [property]: value,
        }
      } : {
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            [subprop]: value,
          },
        }
      }
    ));
  }

  selectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      preview: {
        ...this.state.preview,
        border: {
          ...this.state.preview.border,
          style: (e.target.value) as BorderStyle
        }
      }
    });
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <main>
          <nav className="property-list">
            <ul>
              <li><InputSlider name="Width" min={0} max={400} step={1} onSliderChange={this.sliderChange} /></li>
              <li><InputSlider name="Height" min={0} max={300} step={1} onSliderChange={this.sliderChange} /></li>
              <li><div className='col-4 list-label'>Background:</div><div className='col-8 text-right w-100'><PopoverPicker color={this.state.preview.backgroundColor} onChange={(color: string) => this.setState({preview: {...this.state.preview, backgroundColor: color}})} /></div></li>
              <li><BorderControl
                  color={this.state.preview.border.color}
                  onPickerChange={(color: string) => this.setState({preview: {...this.state.preview, border: {...this.state.preview.border, color: color}}})}
                  onSelectChange={this.selectChange}
                  sliderProps={{ min: 0, max: 100, step: 1, value: 0, property: 'width', name: 'Border', onSliderChange: this.sliderChange }} />
              </li>
              <li><InputSlider name="Border" property="radius" title="Border radius" value={0} min={0} max={200} step={1} onSliderChange={this.sliderChange} /></li>
            </ul>
          </nav>

          <div className="preview-window">
            <PreviewDiv preview={this.state.preview} />
          </div>

          <aside className="tools">

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
