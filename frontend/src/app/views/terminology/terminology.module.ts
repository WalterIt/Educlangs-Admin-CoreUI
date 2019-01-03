import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminologyRoutingModule } from './terminology-routing.module';
import { GrammarClassComponent } from './grammar-class.component';
import { GrammarTopicComponent } from './grammar-topic.component';
import { LanguagesComponent } from './languages.component';
import { LevelsComponent } from './levels.component';
import { LessonsComponent } from './lessons.component';
import { VocabularyTopicComponent } from './vocabulary-topic.component';
import { UnitsComponent } from './units.component';

@NgModule({
  declarations: [GrammarClassComponent, GrammarTopicComponent, LanguagesComponent, LevelsComponent, LessonsComponent, VocabularyTopicComponent, UnitsComponent],
  imports: [
    CommonModule,
    TerminologyRoutingModule
  ]
})
export class TerminologyModule { }
