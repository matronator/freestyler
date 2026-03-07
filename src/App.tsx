import './styles/App.scss';
import './styles/preview.css';
import './styles/grid.css';
import './styles/form.css';
import './styles/utils.css';
import React, { ChangeEvent, Component } from 'react';
import { Preview, initPreview, PreviewType, PreviewElement } from './controls/Preview';
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
import { DeleteButton } from './controls/Button/DeleteButton';
import ClipboardJS from 'clipboard';
import { AlignItems, FlexDirection, JustifyContent } from './properties/Flex';
import { ExportAllModal } from './controls/Modals/ExportAllModal';
import { ButtonGroup } from './controls/Button/ButtonGroup';
import { ShadowControl } from './controls/InputGroups/ShadowControl';
import { Box, BoxSizing, SyncedBox } from './properties/Box';
import { SyncControl } from './controls/MarginPadding/SyncControl';
import { BoxShadow, BoxShadowItem } from './properties/BoxShadow';
import { DragDropContext,Draggable,Droppable,DropResult } from '@hello-pangea/dnd';

new ClipboardJS(`.btn`);

interface AppProps {

}

interface AppState {
  preview: Preview;
  previewItems: PreviewItem[];
  selectedId: number | string;
  highlight: boolean;
  childType: PreviewElement;
  idCounter: number;
  shadowIdCounter: number;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const newPreview = initPreview(0);
    this.state = { preview: newPreview, previewItems: [{ id: 0, preview: newPreview, selected: true, isParent: true, children: null, childIdCounter: 0, shadowIdCounter: 0, }], selectedId: 0, highlight: true, childType: PreviewElement.Div, idCounter: 1, shadowIdCounter: 0, };
    this.setChildType = this.setChildType.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.changeId = this.changeId.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.syncedSliderChange = this.syncedSliderChange.bind(this);
    this.syncCheckboxChange = this.syncCheckboxChange.bind(this);
    this.addPreviewItem = this.addPreviewItem.bind(this);
    this.addChild = this.addChild.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addBoxShadow = this.addBoxShadow.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  setChildType(e: ChangeEvent<HTMLInputElement>) {
    this.setState(prevState => (
      {
        ...prevState,
        childType: (e.target.value) as PreviewElement,
      }
    ));
  }

  changeContent(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState(prevState => (
      {
        ...prevState,
        preview: {
          ...prevState.preview,
          content: e.target.value,
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

  inputChange(value: any, property: string, subprop?: string, shadowId?: number) {
    if (property === 'boxShadow') {
      this.setState(prevState => ({
        preview: {
          ...prevState.preview,
          boxShadows: [
            ...prevState.preview.boxShadows.map((shadow: BoxShadowItem, index: number) => {
              if (shadow.id === shadowId) {
                return {
                  ...shadow,
                  style: {
                    ...shadow.style,
                    [subprop as keyof BoxShadow]: value,
                  }
                };
              }
              return shadow;
            }),
          ],
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      }));
      return;
    }

    this.setState(prevState => (
      subprop ? {
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            [subprop]: value,
          },
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      } : {
        preview: {
          ...prevState.preview,
          [property]: value,
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      }
    ));
  }

  syncedSliderChange(value: number, property: string, subprop: keyof Box) {
    const propsToChange = this.getPropsToChange(property, subprop);

    this.setState(prevState => ({
      ...prevState,
      preview: {
        ...prevState.preview,
        [property]: {
          ...prevState.preview[property],
          ...Object.fromEntries(propsToChange.map(prop => [prop, value])),
        },
      },
    }));
  }

  getPropsToChange(property: string, subprop: keyof Box): Array<keyof Box> {
    const vertical = (this.state.preview[property] as SyncedBox).syncVertical;
    const horizontal = (this.state.preview[property] as SyncedBox).syncHorizontal;
    const all = (this.state.preview[property] as SyncedBox).syncAll;

    if (all) {
      return ['top', 'right', 'bottom', 'left'];
    }

    const propsToChange: (keyof Box)[] = [subprop];

    switch (subprop) {
      case 'bottom':
        if (vertical) {
          propsToChange.push('top');
        }
        break;
      case 'right':
        if (horizontal) {
          propsToChange.push('left');
        }
        break;
      case 'top':
        if (vertical) {
          propsToChange.push('bottom');
        }
        break;
      case 'left':
        if (horizontal) {
          propsToChange.push('right');
        }
        break;
      default:
        break;
    }
    return propsToChange;
  }

  syncCheckboxChange(value: boolean, property: string, subprop: keyof Pick<SyncedBox, 'syncVertical' | 'syncHorizontal' | 'syncAll'>) {
    if (subprop === 'syncAll' && value === true) {
      this.setState(prevState => ({
        ...prevState,
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            syncHorizontal: true,
            syncVertical: true,
            [subprop]: value,
          },
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      }));
    } else if (subprop !== 'syncAll' && value === false) {
      this.setState(prevState => ({
        ...prevState,
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            syncAll: false,
            [subprop]: value,
          },
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        preview: {
          ...prevState.preview,
          [property]: {
            ...prevState.preview[property],
            [subprop]: value,
          },
        },
        previewItems: prevState.previewItems,
        selectedId: prevState.selectedId,
      }));
    }
  }

  addPreviewItem() {
    const id = this.state.idCounter;

    const newItem: PreviewItem = {
      id,
      preview: initPreview(id),
      selected: true,
      children: null,
      isParent: true,
      childIdCounter: 0,
      shadowIdCounter: 0,
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
      idCounter: prevState.idCounter + 1,
    }));
  }

  addChild(parentId: number | string) {
    const parent = this.state.previewItems.find(item => item.id === parentId);
    if (!parent) { return; }
    const id = `${parentId}-${parent.childIdCounter}`;
    const newItem: PreviewItem = {
      id: id,
      preview: initPreview(id, true, this.state.childType),
      selected: true,
      children: null,
      isParent: false,
      childIdCounter: 0,
      shadowIdCounter: 0,
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
        item.childIdCounter = item.id === parentId ? item.childIdCounter + 1 : item.childIdCounter;
        return item;
      })],
      selectedId: newItem.id,
    }));
  }

  selectItem(id: number | string) {
    // const selectedItem = typeof id === 'number' ? this.state.previewItems.find(item => item.id === id) :
    //   this.state.previewItems.find(item => item.id.toString() === id.substring(0, id.indexOf('-')))?.children?.find(child => child.id === id);
    let selectedItem = this.state.previewItems.find(item => item.id === id);
    if (!selectedItem) {
      if (typeof id === 'number') { return; }
      selectedItem = this.state.previewItems.find(item => item.id.toString() === id.substring(0, id.indexOf('-')))?.children?.find(child => child.id === id);
    }
    if (selectedItem && selectedItem.id !== this.state.selectedId) {
      selectedItem.selected = true;
      this.setState(prevState => ({
        preview: selectedItem!.preview,
        previewItems: [...prevState.previewItems.map((item, index) => {
          if (item.id === prevState.preview.id) {
            item.preview = prevState.preview;
          } else {
            if (item.children && typeof item.children !== 'undefined') {
              item.children.forEach(child => {
                if (child.id === prevState.selectedId && child.id !== selectedItem!.id) {
                  child.preview = prevState.preview;
                  child.selected = false;
                } else if (child.id === selectedItem!.id) {
                  child.selected = true;
                } else {
                  child.selected = false;
                }
              });
            }
          }
          if (item.id !== selectedItem!.id) {
            item.selected = false;
          } else {
            item.selected = true;
          }
          return item;
        })],
        selectedId: selectedItem!.id,
      }));
    }
  }

  deleteItem() {
    if (!this.canBeDeleted()) { return; }
    const id = this.state.selectedId;
    let selectedItem = this.state.previewItems.find(item => item.id === id);
    let nextId = this.state.selectedId === id ? this.state.previewItems.find(item => item.id !== id)!.id : this.state.selectedId;
    if (!selectedItem) {
      if (typeof id === 'number') { return; }
      const parentId = Number(id.substring(0, id.indexOf('-')));
      selectedItem = this.state.previewItems.find(item => item.id === parentId)?.children?.find(child => child.id === id);
      nextId = parentId;
    }
    this.setState(prevState => ({
      preview: this.state.previewItems.find(item => item.id === nextId)!.preview,
      previewItems: [...prevState.previewItems.map((item, index) => {
        item.children = item.children?.filter(child => child.id !== id);
        item.selected = false;
        if (item.id === nextId) {
          item.selected = true;
        }
        return item;
      }).filter(item => item.id !== id)],
      selectedId: nextId,
    }));
  }

  canBeDeleted() {
    if (this.state.previewItems.length < 2) {
      const children = this.state.previewItems[0].children;
      if (children && typeof children !== 'undefined') {
        if (children.length > 0) {
          return typeof this.state.selectedId === 'string' && this.state.selectedId.includes('-');
        }
        return false;
      }
      return false;
    }
    return true;
  }

  addBoxShadow() {
    this.setState(prevState => ({
      preview: {
        ...prevState.preview,
        boxShadows: [...prevState.preview.boxShadows, {
          id: prevState.shadowIdCounter,
          order: 0,
          enabled: true,
          style: {
            x: 0,
            y: 0,
            blur: 3,
            spread: 0,
            color: '#000000',
            inset: false,
          },
        }],
      },
      previewItems: prevState.previewItems,
      selectedId: prevState.selectedId,
      shadowIdCounter: prevState.shadowIdCounter + 1,
    }));
  }

  deleteBoxShadow(id: number) {
    this.setState(prevState => ({
      preview: {
        ...prevState.preview,
        boxShadows: prevState.preview.boxShadows.filter(shadow => shadow.id !== id),
      },
      previewItems: prevState.previewItems,
      selectedId: prevState.selectedId,
    }));
  }

  reorder(list: BoxShadowItem[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const items = this.reorder(this.state.preview.boxShadows, result.source.index, result.destination.index);

    this.setState(prevState => ({
      preview: {
        ...prevState.preview,
        boxShadows: items,
      },
      previewItems: prevState.previewItems,
      selectedId: prevState.selectedId,
    }));
  }

  render() {
    return (
      <div className={this.state.highlight ? 'App' : 'App no-highlight'}>
        <main>
          <nav className="property-list">
            <ul>
              <li><div className='col-4 list-label'>Background:</div><div className='col-8 text-right w-100'><PopoverPicker color={this.state.preview.backgroundColor} onChange={(color: string) => this.setState({ preview: { ...this.state.preview, backgroundColor: color }, previewItems: this.state.previewItems, selectedId: this.state.selectedId })} /></div></li>
              <li><InputSlider name="Width" title={this.state.preview.type === PreviewType.Child ? 'Width in %' : undefined} min={0} max={640} step={1} relative={this.state.preview.type === PreviewType.Child} onSliderChange={this.inputChange} value={this.state.preview.width} /></li>
              <li><InputSlider name="Height" title={this.state.preview.type === PreviewType.Child ? 'Height in %' : undefined} min={0} max={480} step={1} relative={this.state.preview.type === PreviewType.Child} onSliderChange={this.inputChange} value={this.state.preview.height} /></li>
              <li>
                <div className='col-6 list-label text-center'>Box Sizing:</div>
                <div className='col-6 list-label text-center'>Display:</div>
                <div className='col-6 text-center w-100'><SelectInput id='boxSizing' name='boxSizing' type='BoxSizing' items={Object.values(BoxSizing)} value={this.state.preview.boxSizing} onSelectChange={this.inputChange} /></div>
                <div className='col-6 text-center w-100'><SelectInput id='display' name='display' items={Object.values(Display)} value={this.state.preview.display} onSelectChange={this.inputChange} /></div>
              </li>
              {[Display.Grid, Display.InlineGrid].includes(this.state.preview.display) && (
                <li>
                  <InputSlider name="GridColumns" title="Grid columns" value={this.state.preview.gridColumns} min={1} max={12} step={1} onSliderChange={this.inputChange} />
                </li>
              )}
              {[Display.Flex, Display.Grid, Display.InlineFlex, Display.InlineGrid].includes(this.state.preview.display) && <li>
                {[Display.Flex, Display.InlineFlex].includes(this.state.preview.display) && (
                  <>
                    <div className='col-12 list-label text-center'>Flex direction:</div>
                    <div className='col-12 text-center w-100 mb-2'><SelectInput id='flexDirection' name='flexDirection' items={Object.values(FlexDirection)} value={this.state.preview.flexDirection} onSelectChange={this.inputChange} /></div>
                  </>
                )}
                <div className='col-6 list-label text-center'>Justify content:</div>
                <div className='col-6 list-label text-center'>Align items:</div>
                <div className='col-6 text-center w-100'><SelectInput id='justifyContent' name='justifyContent' items={Object.values(JustifyContent)} value={this.state.preview.justifyContent} onSelectChange={this.inputChange} /></div>
                <div className='col-6 text-center w-100'><SelectInput id='alignItems' name='alignItems' items={Object.values(AlignItems)} value={this.state.preview.alignItems} onSelectChange={this.inputChange} /></div>
              </li>}
              <li>
                <BorderControl
                  color={this.state.preview.border.color}
                  selectValue={this.state.preview.border.style}
                  onPickerChange={(color: string) => this.setState({ preview: { ...this.state.preview, border: { ...this.state.preview.border, color: color } } })}
                  onSelectChange={this.inputChange}
                  sliderProps={{ min: 0, max: 100, step: 1, value: this.state.preview.border.width, property: 'width', name: 'Border', onSliderChange: this.inputChange }}
                />
              </li>
              <li><InputSlider name="Border" property="radius" title="Border radius" value={this.state.preview.border.radius} min={0} max={200} step={1} onSliderChange={this.inputChange} /></li>
              <li>
                <div className="col-12 mb-2">
                  <Button onClick={this.addBoxShadow} className='btn-sm'>&#10133; Add Box Shadow</Button>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="col-12 grid">
                        {this.state.preview.boxShadows.map((shadow: BoxShadowItem, index: number) => (
                          <Draggable key={shadow.id} draggableId={shadow.id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <div className="col-12 grid shadow-item align-middle" ref={provided.innerRef} {...provided.draggableProps}>
                                <ShadowControl
                                  key={index}
                                  id={shadow.id}
                                  handle={provided.dragHandleProps}
                                  deleteItem={() => this.deleteBoxShadow(shadow.id)}
                                  offsetX={{ min: -100, max: 100, step: 1, name: 'BoxShadow', property: 'x', title: 'Shadow X', value: shadow.style.x, onSliderChange: this.inputChange }}
                                  offsetY={{ min: -100, max: 100, step: 1, name: 'BoxShadow', property: 'y', title: 'Shadow Y', value: shadow.style.y, onSliderChange: this.inputChange }}
                                  blur={{ min: 0, max: 100, step: 1, name: 'BoxShadow', property: 'blur', title: 'Shadow Blur', value: shadow.style.blur, onSliderChange: this.inputChange }}
                                  spread={{ min: -100, max: 100, step: 1, name: 'BoxShadow', property: 'spread', title: 'Shadow Spread', value: shadow.style.spread, onSliderChange: this.inputChange }}
                                  inset={{ name: 'BoxShadow', property: 'inset', title: 'Inset', value: shadow.style.inset, onCheckboxChange: this.inputChange }}
                                  color={shadow.style.color}
                                  colorLabel='Shadow Color:'
                                  onColorChange={(color: string) => this.setState({ preview: { ...this.state.preview, boxShadows: this.state.preview.boxShadows.map((item: BoxShadowItem, i: number) => i === index ? { ...item, style: { ...item.style, color: color } } : item) }, previewItems: this.state.previewItems, selectedId: this.state.selectedId })}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </li>
              {[PreviewElement.Heading, PreviewElement.Paragraph, PreviewElement.Subheading].includes(this.state.preview.element) && (
                <li>
                  <ShadowControl
                    offsetX={{ min: -100, max: 100, step: 1, name: 'TextShadow', property: 'x', title: 'Text Shadow X', value: this.state.preview.textShadow.x, onSliderChange: this.inputChange }}
                    offsetY={{ min: -100, max: 100, step: 1, name: 'TextShadow', property: 'y', title: 'Text Shadow Y', value: this.state.preview.textShadow.y, onSliderChange: this.inputChange }}
                    blur={{ min: 0, max: 100, step: 1, name: 'TextShadow', property: 'blur', title: 'Text Shadow Blur', value: this.state.preview.textShadow.blur, onSliderChange: this.inputChange }}
                    color={this.state.preview.textShadow.color}
                    colorLabel='Text Shadow Color:'
                    onColorChange={(color: string) => this.setState({ preview: { ...this.state.preview, textShadow: { ...this.state.preview.textShadow, color: color } }, previewItems: this.state.previewItems, selectedId: this.state.selectedId })}
                  />
                </li>
              )}
              <li>
                <SyncControl property="Margin" item={this.state.preview.margin} syncCheckboxChange={this.syncCheckboxChange} />
                <InputSlider name="Margin" property="top" title="Margin Top" value={this.state.preview.margin.top} min={-100} max={200} step={1} onSliderChange={this.syncedSliderChange} />
                <InputSlider name="Margin" property="right" title="Margin Right" value={this.state.preview.margin.right} min={-100} max={200} step={1} onSliderChange={this.syncedSliderChange} />
                <InputSlider name="Margin" property="bottom" title="Margin Bottom" value={this.state.preview.margin.bottom} min={-100} max={200} step={1} onSliderChange={this.syncedSliderChange} />
                <InputSlider name="Margin" property="left" title="Margin Left" value={this.state.preview.margin.left} min={-100} max={200} step={1} onSliderChange={this.syncedSliderChange} />
              </li>
              <li>
                <SyncControl property="Padding" item={this.state.preview.padding} syncCheckboxChange={this.syncCheckboxChange} />
                <InputSlider name="Padding" property="top" title="Padding Top" value={this.state.preview.padding.top} min={0} max={100} step={1} onSliderChange={this.syncedSliderChange} />
                <InputSlider name="Padding" property="right" title="Padding Right" value={this.state.preview.padding.right} min={0} max={100} step={1} onSliderChange={this.syncedSliderChange} />
                <InputSlider name="Padding" property="bottom" title="Padding Bottom" value={this.state.preview.padding.bottom} min={0} max={100} step={1} onSliderChange={this.syncedSliderChange} />
                <InputSlider name="Padding" property="left" title="Padding Left" value={this.state.preview.padding.left} min={0} max={100} step={1} onSliderChange={this.syncedSliderChange} />
              </li>
            </ul>
          </nav>

          <div className="preview-window">
            <PreviewList activePreview={this.state.preview} items={this.state.previewItems} activeIndex={this.state.selectedId} onSelectItem={this.selectItem} />
          </div>

          <aside className="tools">
            <div className="tools-global mb-auto">
              <label className="label row align-middle">
                Highlight selected
                <Switch
                  onChange={this.toggleHighlight}
                  checked={this.state.highlight}
                  className='mx-2'
                  checkedIcon={false}
                  uncheckedIcon={false}
                  width={46}
                  height={22}
                  handleDiameter={24}
                  boxShadow='1px 0 5px -1px #00000044'
                  onColor='#219221'
                />
                {this.state.highlight ? 'on' : 'off'}
              </label>
              <div className="row">
                <Button onClick={this.addPreviewItem} className='btn-sm mr-1'>&#10133; Add</Button>
                <Button onClick={() => this.addChild(this.state.selectedId)} className='btn-sm btn-group-start' disabled={this.state.preview.id.toString().includes('-')}>&#10133; Child</Button>
                <ButtonGroup name='childType' className='btn-sm' wrapperClass='btn-group-end' value={PreviewElement.Div} onChange={this.setChildType} items={[{ label: 'Div', value: PreviewElement.Div }, { label: 'P', value: PreviewElement.Paragraph }, { label: 'H2', value: PreviewElement.Heading }, { label: 'H3', value: PreviewElement.Subheading }]} />
                <DeleteButton disabled={!this.canBeDeleted()} onClick={this.deleteItem} />
              </div>
            </div>
            <div className="grid">
              <div className="col-6 row justify-between">
                <div className="grid">
                  <div className="col-4 label text-right">
                    Element ID:
                  </div>
                  <div className="col-6">
                    <input type="text" name="cssId" id="cssId" className='input-text' value={this.state.preview.cssId} onChange={this.changeId} />
                  </div>
                  <div className="col-12 row justify-center">
                    {[PreviewElement.Heading, PreviewElement.Paragraph, PreviewElement.Subheading].includes(this.state.preview.element) && (
                      <>
                        <div className="col label">
                          Text:
                        </div>
                        <div className="col">
                          <textarea name="contentText" id="contentText" cols={20} rows={4} className='input-text no-resize' value={this.state.preview.content} onChange={this.changeContent} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-6 text-right mt-auto">
                <ExportModal preview={this.state.preview} className='mr-2' />
                <ExportAllModal previewItems={this.state.previewItems} />
              </div>
            </div>
          </aside>
        </main>
      </div>
    );
  }
}

export default App;
