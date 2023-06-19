import React, { Component } from "react";
import { View } from "@tarojs/components";
import Static from "./static";
import MyInput from "./my-input";
import TextArea from "./text-area";
import ImageUploader from "./image-uploader";
import Select from "./select";
import DateTime from "./datetime";
import MySwitch from "./my-switch";
import MultiSelect from "./multi-select";

interface Props {
  value?: any;
  preview?: boolean;
  onChange?: (value: any) => void;
  kstyle?: any;
  formProps: any;
}

interface State {
  value: any;
}

export default class FormGroup extends Component<Props, State> {
  constructor(args: any) {
    super(args);
    this.state = { value: undefined };
  }

  componentDidMount() {
    this.updateValue(this.props.value);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.value !== undefined &&
      this.props.value !== prevProps.value
    ) {
      this.updateValue(this.props.value);
    }
  }

  updateValue(value: any) {
    this.setState({ value });
  }

  render() {
    const { preview, onChange = (value: any) => {}, formProps } = this.props;
    const {
      label,
      type,
      required,
      uploadUrl,
      width,
      height,
      multiple,
      uploadIcon,
      placeholder,
      dataSource,
      format,
    } = formProps;
    const { value } = this.state;
    // Taro限制，只能在 render 里面使用JSX
    let formItem;
    switch (type) {
      case "text": {
        formItem = (
          <MyInput
            value={value}
            onChange={onChange}
            preview={preview}
            placeholder={placeholder}
          />
        );
        break;
      }
      case "number": {
        formItem = (
          <MyInput
            value={value}
            onChange={onChange}
            preview={preview}
            placeholder={placeholder}
            type="number"
          />
        );
        break;
      }
      case "textarea": {
        formItem = (
          <TextArea
            value={value}
            onChange={onChange}
            preview={preview}
            placeholder={placeholder}
          />
        );
        break;
      }
      case "gallery": {
        formItem = (
          <ImageUploader
            value={value}
            onChange={onChange}
            uploadUrl={uploadUrl!}
            width={width}
            height={height}
            multiple={multiple}
            uploadIcon={uploadIcon}
            preview={preview}
          />
        );
        break;
      }
      case "select": {
        formItem = (
          <Select
            value={value}
            onChange={onChange}
            preview={preview}
            dataSource={dataSource!}
          />
        );
        break;
      }
      case "multi-select": {
        formItem = (
          <MultiSelect
            value={value}
            onChange={onChange}
            preview={preview}
            dataSource={dataSource!}
          />
        );
        break;
      }
      case "datetime": {
        formItem = (
          <DateTime
            value={value}
            onChange={onChange}
            preview={preview}
            format={format}
          />
        );
        break;
      }
      case "switch": {
        formItem = (
          <MySwitch value={value} onChange={onChange} preview={preview} />
        );
        break;
      }
      default: {
        formItem = <Static value={value} />;
      }
    }
    return (
      <View className="ui-form-group">
        {label && (
          <View className={`label ${!preview && required && "required"}`}>
            {label}
          </View>
        )}
        <View className="main">{formItem}</View>
      </View>
    );
  }
}
