import React, { Component } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import moment from 'moment';

interface Props {
    onChange: (value: string) => void;
    value?: string | null;
    preview?: boolean;
    format?: string;
}

export default class DateTime extends Component<Props> {
    onChange = (e: any) => {
        const { onChange, value: oldValue } = this.props;
        const eventValue = e.target.value;

        const value = moment(oldValue || undefined);
        if (eventValue.indexOf('-') > -1) {
            // 日期
            let [year, month, date] = eventValue.split('-');
            month = parseInt(month, 10) - 1;
            value.year(year);
            value.month(month);
            value.date(date);
        } else {
            // 时间
            const [hour, minute] = eventValue.split(':');
            value.hour(hour);
            value.minute(minute);
        }
        typeof onChange === 'function' && onChange(value.toISOString());
    }
    render() {
        const { preview, value, format = 'datetime' } = this.props;
        if (preview) {
            return <Text>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</Text>;
        }
        const date = value ? moment(value).format('YYYY-MM-DD') : '';
        const time = value ? moment(value).format('HH:mm') : '';
        const month = value ? moment(value).format('MM') : '';
        return (
            <View>
                {['datetime', 'date'].includes(format) && <Picker mode='date' value={date} onChange={this.onChange}>
                    日期：{date || '请选择'}
                </Picker>}
                {format === 'month' && <Picker mode='date' fields='month' value={date} onChange={this.onChange}>
                    {month ? `${month}月` : '请选择'}
                </Picker>}
                {format === 'datetime' && <Picker mode='time' value={time} onChange={this.onChange}>
                    时间：{time || '请选择'}
                </Picker>}
            </View>
        );
    }
}
