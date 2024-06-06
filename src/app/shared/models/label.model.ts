
export interface GetLabelResonse {
  name: string;
  prefix: string;
  color: string;
  type: string;
}

// export interface ILabelPost extends Omit<ILabelGet, 'id, created_at, update_at, status'> {

// }

export interface ILabelCategory{
  id: number,
  name: string
}
