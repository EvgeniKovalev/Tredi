import { AttributeOptionTypeEnum } from './AttributeOptionTypeEnum';

export interface AttributeOption {
  name: string;
  attributeOptionType: AttributeOptionTypeEnum;
  selected: boolean;
}
