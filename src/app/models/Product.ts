import { Attribute } from './Attribute';

export interface Product {
  id: string;
  partitionKey: string;
  name: string;
  attributes?: Attribute[];
}
