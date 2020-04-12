export enum StructuralNode {
  BestSellers = 'BestSellers',
  Delivery = 'Delivery',
  Footer = 'Footer',
  FooterMap = 'FooterMap',
  Header = 'Header',
  News = 'News',
  Payment = 'Payment',
  Recommended = 'Recommended',
  ShopCategories = 'ShopCategories'
}

export interface ActiveLevelUpdateEntry {
  activeLevel: number;
  id: number;
}

// -----------------------------------------------------------------------------

export interface CategoryStore {
  activeLevel?: number;
  content?: string;
  id: number;
  isNotClickable?: boolean;
  isWithoutProducts?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}

// -----------------------------------------------------------------------------

// TODO refactor Category models and store
// export interface Category extends CategoryStore {
//   productsCount: number; // TODO calculate products count in the store, not select this value in component
// }
