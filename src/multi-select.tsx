import React, { Component } from "react";
import { View, CheckboxGroup, Checkbox, Button } from "@tarojs/components";
import { IDataSourceItem } from "./index";

type Props = {
  dataSource: IDataSourceItem[];
  onChange?: (value: string[]) => void;
  preview?: boolean;
  value?: string[];
};

export default class MultiSelect extends Component<Props> {
  state = {
    open: false,
  };

  onChange = (e: any) => {
    const { onChange } = this.props;
    typeof onChange === "function" && onChange(e.detail.value);
  };

  render() {
    const { preview, value = [], dataSource } = this.props;
    const { open } = this.state;

    if (!dataSource || !dataSource.length) {
      return null;
    }

    const selectedValues = dataSource.filter((item) => value.includes(item.id));
    const displayValue = selectedValues.map((item) => item.title).join(",");

    if (preview) {
      return <View>{displayValue || "-"}</View>;
    }

    return (
      <View className="ui-multi-select">
        <View onClick={() => this.setState({ open: true })}>
          {displayValue || "请选择"}
        </View>
        {open && <View className="ui-multi-select__mask" />}
        {open && (
          <View className="ui-multi-select__panel">
            <View className="ui-multi-select__panel__body">
              <CheckboxGroup onChange={this.onChange}>
                {dataSource.map((item) => (
                  <View key={item.id}>
                    <Checkbox value={item.id} checked={value.includes(item.id)}>
                      {item.title}
                    </Checkbox>
                  </View>
                ))}
              </CheckboxGroup>
            </View>
            <View>
              <Button onClick={() => this.setState({ open: false })}>
                确定
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}
