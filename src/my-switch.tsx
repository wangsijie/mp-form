import React, { Component } from 'react';
import { Text, Switch } from '@tarojs/components';

interface Props {
    onChange: (value: boolean) => void;
    preview?: boolean;
    value?: boolean;
}

export default class MySwitch extends Component<Props> {
  onChange = (e: any) => {
    const { onChange } = this.props
    onChange(e.detail.value);
  }
  render() {
    const { preview, value } = this.props;
    if (preview) {
      return <Text>{value ? '是' : '否'}</Text>;
    }
    return <Switch checked={!!value} onChange={this.onChange} />
  }
}
