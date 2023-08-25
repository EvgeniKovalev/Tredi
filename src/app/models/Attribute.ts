import { AttributeTypeEnum } from './AttributeTypeEnum';

export interface Attribute {
  name: string;
  label: string;
  attributeType: AttributeTypeEnum;
}
