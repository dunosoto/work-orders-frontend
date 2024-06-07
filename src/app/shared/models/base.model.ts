export interface BaseModel {
  id: number;
  name: string;
  prefix?: string;
  createdAt?: Date;
  updateAt?: Date;
  status?: boolean;
}


export interface IActionBtn<T> {
  action: string;
  data: T;
  category?: string;
}
