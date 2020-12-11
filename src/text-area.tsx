import React, { Component } from 'react';
import { Text, Textarea } from '@tarojs/components';

interface Props {
    onChange: (value: string) => void;
    preview?: boolean;
    value?: string;
    placeholder?: string;
}

export default class TextArea extends Component<Props> {
  onChange = (e: any) => {
    const { onChange } = this.props
    const value = e.target.value || '';
    onChange(value);
  }
  render() {
    const { preview, value, placeholder } = this.props;
    if (preview) {
      return <Text>{value || ''}</Text>;
    }
    return <Textarea
      value={value}
      onInput={this.onChange}
      maxlength={-1}
      placeholder={placeholder}
      style={{ height: '150px' }}
    />
  }
}
