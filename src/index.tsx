import React, { Component } from "react";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import FormGroup from "./form-group";
import "./index.less";

export interface IDataSourceItem {
  id: string;
  title: string;
}

interface BasicFormSection {
  label: string;
  name: string;
  required?: boolean;
  style?: Object;
  width?: string;
  height?: string;
  readonly?: boolean;
  placeholder?: string;
}

interface GeneralFormSection extends BasicFormSection {
  type: "text" | "number" | "textarea" | "datetime" | "switch";
}

interface GalleryFormSection extends BasicFormSection {
  type: "gallery";
  uploadUrl: string;
  uploadIcon?: string;
  multiple?: boolean;
}

interface SelectFormSection extends BasicFormSection {
  type: "select";
  dataSource: IDataSourceItem[];
}

export type FormSection =
  | GeneralFormSection
  | GalleryFormSection
  | SelectFormSection;

interface IData {
  [key: string]: any;
}

interface Props {
  formData?: IData;
  formSections: FormSection[];
  onSubmit: (data: IData, errors: string[]) => void;
  preview?: boolean;
  submitText?: string;
  showSubmit?: boolean;
}

interface State {
  stateFormData: IData;
}

export default class UIForm extends Component<Props, State> {
  state: State = {
    stateFormData: {},
  };

  componentDidMount() {
    const { formData = {} } = this.props;
    this.setState({ stateFormData: formData });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.formData && this.props.formData !== prevProps.formData) {
      this.setState({ stateFormData: this.props.formData });
    }
  }

  setFormItemValue(name: string, value: any) {
    const stateFormData: IData = { ...this.state.stateFormData };
    stateFormData[name] = value;
    this.setState({ stateFormData });
  }

  getFormData() {
    const { stateFormData } = this.state;
    return Object.assign({}, stateFormData);
  }

  validateForm = () => {
    const { stateFormData } = this.state;
    const { formSections, onSubmit } = this.props;
    const formErrors: string[] = [];
    formSections.forEach((control) => {
      if (control.required) {
        if (!stateFormData[control.name]) {
          formErrors.push(`${control.label}必填`);
        }
      }
    });
    if (onSubmit) {
      // return onSubmit(this.getFormData(), formErrors, () => {
      //   const newState = { ...stateFormData };
      //   formSections.forEach((control) => {
      //     newState[control.name] = null;
      //   });
      //   this.setState({ stateFormData: newState });
      // });
      return onSubmit(this.getFormData(), formErrors);
    }
    if (formErrors.length) {
      return formErrors;
    }
    return null;
  };

  onFormGroupChange = (name: string, value: any) => {
    this.setFormItemValue(name, value);
  };

  render() {
    const { formSections, preview, showSubmit, submitText } = this.props;
    const { stateFormData } = this.state;
    if (!formSections) {
      return null;
    }
    return (
      <View className="ui-form">
        {formSections.map((control) => (
          <FormGroup
            key={control.name}
            value={stateFormData[control.name]}
            kstyle={control.style}
            preview={preview}
            onChange={(value) => this.onFormGroupChange(control.name, value)}
            formProps={{
              ...control,
            }}
          />
        ))}
        {showSubmit && (
          <View className="buttons">
            <AtButton
              type="primary"
              className="primary"
              onClick={this.validateForm}
            >
              {submitText || "保存"}
            </AtButton>
          </View>
        )}
      </View>
    );
  }
}
