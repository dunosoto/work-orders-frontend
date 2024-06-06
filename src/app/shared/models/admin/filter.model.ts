export interface FilterModel{
  iconName: string;
  options: Option[];
  placeholder?: string;
  type?: string;
  valueNull?: any;
}

export interface Option {
  id?: number;
  name: string;
  type?: string;
  value?: number;
}
