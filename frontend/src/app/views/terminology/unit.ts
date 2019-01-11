import { Level } from './level';

export class Unit {
  constructor(
    public id?: any,
    public user_id?: any,
    public u_name?: string,
    public l_id?: any,    // Level ID
    public level?: Level
  ) { }

  }
