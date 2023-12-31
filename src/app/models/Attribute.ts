import { AttributeTypeEnum } from './AttributeTypeEnum';

export interface Attribute {
  id: string;
  partitionKey: string;
  name: string;
  label: string;
  attributeType: AttributeTypeEnum;
  valueStr: string;
  value: any;
}
