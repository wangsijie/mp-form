import React, { Component } from 'react';
import { Text } from '@tarojs/components';

interface Props {
  value?: string;
}

export default class Static extends Component<Props> {
  render() {
    const { value } = this.props;
    return <Text>{value || ''}</Text>;
  }
}
