import React, { Component } from 'react';
import { View } from '@tarojs/components';
import { FormSection } from './index';
import Static from './static'
import MyInput from './my-input'
import TextArea from './text-area'
import ImageUploader from './image-uploader'
import Select from './select'
import DateTime from './datetime'
import MySwitch from './my-switch'

interface Props extends Partial<FormSection> {
    value?: any;
    preview?: boolean;
    onChange?: (value: any) => void;
    kstyle?: any;
}

interface State {
    value: any;
}

export default class FormGroup extends Component<Props, State> {

  componentDidMount() {
    this.updateValue(this.props.value);
  }

  componentDidUpdate() {
    if (this.props.value !== undefined) {
      this.updateValue(this.props.value);
    }
  }

  updateValue(value: any) {
    this.setState({ value });
  }

  render() {
    const {
      label, preview, type, onChange = (value: any) => {}, required, uploadUrl, width, height, multiple, uploadIcon, placeholder, dataSource,
    } = this.props;
    const { value } = this.state;
    // Taro限制，只能在 render 里面使用JSX
    let formItem;
    switch (type) {
      case 'text': {
        formItem = <MyInput value={value} onChange={onChange} preview={preview} placeholder={placeholder} />;
        break;
      }
      case 'number': {
        formItem = <MyInput value={value} onChange={onChange} preview={preview} placeholder={placeholder} type='number' />;
        break;
      }
      case 'textarea': {
        formItem = <TextArea value={value} onChange={onChange} preview={preview} placeholder={placeholder} />;
        break;
      }
      case 'gallery': {
        formItem = <ImageUploader
          value={value}
          onChange={onChange}
          uploadUrl={uploadUrl!}
          width={width}
          height={height}
          multiple={multiple}
          uploadIcon={uploadIcon}
          preview={preview}
        />;
        break;
      }
      case 'select': {
        formItem = <Select
          value={value}
          onChange={onChange}
          preview={preview}
          dataSource={dataSource!}
        />;
        break;
      }
      case 'datetime': {
        formItem = <DateTime
          value={value}
          onChange={onChange}
          preview={preview}
        />;
        break;
      }
      case 'switch': {
        formItem = <MySwitch
          value={value}
          onChange={onChange}
          preview={preview}
        />;
        break;
      }
      default: {
        formItem = <Static value={value} />;
      }
    }
    return (
      <View className='ui-form-group'>
        {label && <View className={`label ${!preview && required && 'required'}`}>{label}</View>}
        <View className='main'>
          {formItem}
        </View>
      </View>
    )
  }
}
