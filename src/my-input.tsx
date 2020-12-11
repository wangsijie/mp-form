import React, { Component } from 'react';
import { Text, Input } from '@tarojs/components';

interface Props {
  onChange: (value: string) => void;
  preview?: boolean;
  value?: string;
  type?: 'text' | 'number' | 'idcard';
  placeholder?: string;
}

export default class MyInput extends Component<Props> {
  onChange = (e: any) => {
    const { onChange } = this.props
    const value = e.target.value || '';
    onChange(value);
  }
  render() {
    const { preview, value, type = 'text', placeholder = '请输入' } = this.props;
    if (preview) {
      return <Text>{value || ''}</Text>;
    }
    return <Input value={value} onInput={this.onChange} placeholder={placeholder} type={type} />
  }
}
