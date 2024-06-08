export interface FilterModel{
  iconName: string;
  options: FilterOption[];
  placeholder?: string;
  type?: string;
  valueNull?: any;
}

export interface FilterOption {
  id?: number;
  name: string;
  type?: string;
  value?: number;
}
