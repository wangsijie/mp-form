import React, { Component } from 'react';
import { Text, Picker } from '@tarojs/components';
import { IDataSourceItem } from './index';

interface Props {
    dataSource: IDataSourceItem[];
    onChange?: (value: string) => void;
    preview?: boolean;
    value?: string;
}

export default class Select extends Component<Props> {
  onChange = (e: any) => {
    const { onChange, dataSource } = this.props;
    const value = dataSource[e.target.value].id;
    typeof onChange === 'function' && onChange(value);
  }

  render() {
    const { preview, value, dataSource } = this.props;
    if (!dataSource || !dataSource.length) {
      return null;
    }
    const displayValue = dataSource.find(item => item.id === value);
    const selectValue = dataSource.findIndex(item => item.id === value);
    if (preview) {
      return <Text>{displayValue ? displayValue.title : ''}</Text>;
    }
    return (
      <Picker mode='selector' value={selectValue} range={dataSource} rangeKey='title' onChange={this.onChange} >
        {displayValue ? displayValue.title : '请选择'}
      </Picker>
    );
  }
}
