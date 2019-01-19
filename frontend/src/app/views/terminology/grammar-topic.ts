import { Lesson } from './lesson';
import { Unit } from './unit';

export class GrammarTopic {
  constructor(
    public id?: any,
    public user_id?: any,
    public u_id?: string,
    public unit?: Unit,
    public l_id?: any,    // Lesson ID
    public lesson?: Lesson,
    public gt_description?: string,
    public gr_explanation?: string,
    public examples?: string
  ) { }

  }
