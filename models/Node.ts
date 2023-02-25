import { Schema, model, Types, Document } from 'mongoose';
import { IUser } from './User';

export interface INode extends Document {
  //имя
  name: string;

  parentId?: number;

  //мужчина/женщина/неизвестно
  gender: string;

  //дата рождения
  birthday: string;

  //мето рождения
  birthplace: string;

  //жив/помер
  isLife: boolean;

  //электронный адрес
  email: string;

  //семейный статус (женат/разведён/партнер/встречаются/неизвестно/другое)
  familyStatus: string;

  relationType: string;

  users: Array<IUser['_id'] | object>;
}

const NodeSchema: Schema = new Schema({
  name: { type: String, required: true },
  parentId: { type: Types.ObjectId, ref: 'User' },
  gender: { type: String },
  birthday: { type: String },
  birthplace: { type: String },
  isLife: { type: Boolean },
  email: { type: String },
  familyStatus: { type: String },
  relationType: { type: String },
  users: [{ type: Types.ObjectId, ref: 'User' }]
}, {
  versionKey: false
});

export default model<INode>('Node', NodeSchema);
