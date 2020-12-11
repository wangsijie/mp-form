import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { uploadImage, $delete } from "mp-remote";

interface IImage {
  id?: string;
  url: string;
}

interface Props {
  value?: string | IImage[];
  uploadUrl: string;
  preview?: boolean;
  multiple?: boolean;
  onChange: (value: string | IImage[]) => void;
  width?: string;
  height?: string;
  uploadIcon?: string;
}

const plusImage =
  "https://meeyou-anxin.oss-cn-shanghai.aliyuncs.com/materials/image-add.png";

export default class ImageUploader extends Component<Props> {

  get images(): IImage[] {
    const { value } = this.props;
    if (!value) {
      return [];
    }
    // 单张图片的，value仅为一个url
    const data = Array.isArray(value) ? value : [{ url: value }];
    return data;
  }

  upload = async () => {
    const { uploadUrl } = this.props;
    if (!uploadUrl) {
      throw new Error("uploadUrl is missing");
    }
    const images: IImage[] = [...this.images]; // 先拷贝一份，不知道为什么，uploadImage以后，props.value会变回删除前的
    const newImages: any = await uploadImage(uploadUrl);
    this.emitOnChange([...images, ...newImages]);
  };

  previewImage = (e: any) => {
    const current = e.currentTarget.dataset.url;
    Taro.previewImage({
      current,
      urls: this.images.map((item) => item.url),
    });
  };

  deleteImage = async (tobeDelete: IImage) => {
    if (this.props.preview) {
      return;
    }
    try {
      const { tapIndex } = await Taro.showActionSheet({
        itemList: ["删除"],
      });
      if (tapIndex == 0) {
        const { uploadUrl, multiple } = this.props;
        if (multiple) {
          const { id } = tobeDelete;
          if (id) {
            $delete(`${uploadUrl}/${id}`);
            this.emitOnChange(this.images.filter((image) => image.id !== id));
          } else {
            const { url } = tobeDelete;
            this.emitOnChange(this.images.filter((image) => image.url !== url));
          }
        } else {
          this.emitOnChange(
            this.images.filter((image) => image.url !== tobeDelete.url)
          );
        }
      }
    } catch (e) {}
  };

  emitOnChange = (value: IImage[]) => {
    const { onChange, multiple } = this.props;
    if (multiple) {
      onChange(value);
    } else {
      onChange(value[0] ? value[0].url : '');
    }
  };

  render() {
    const { width = '118px', height = '118px', multiple, uploadIcon = plusImage, preview } = this.props;
    const blockStyle = { width, height };
    return (
      <View className="ui-image-uploader">
        {this.images.map((image) => (
          <View
            key={image.url}
            className="block"
            onClick={this.previewImage}
            onLongPress={this.deleteImage.bind(this, image)}
            data-url={image.url}
            style={blockStyle}
          >
            <Image src={image.url} style={blockStyle} mode="aspectFill" />
          </View>
        ))}
        {!preview && (multiple || this.images.length === 0) && (
          <View className="block create" style={blockStyle}>
            <View onClick={this.upload} style={blockStyle}>
              <Image src={uploadIcon} style="width:25px;height:23px" />
            </View>
          </View>
        )}
      </View>
    );
  }
}
