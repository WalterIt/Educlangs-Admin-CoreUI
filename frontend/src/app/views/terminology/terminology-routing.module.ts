import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrammarClassComponent } from './grammar-class.component';
import { GrammarTopicComponent } from './grammar-topic.component';
import { LessonsComponent } from './lessons.component';
import { UnitsComponent } from './units.component';
import { VocabularyTopicComponent } from './vocabulary-topic.component';
import { LanguagesComponent } from './languages.component';
import { LevelsComponent } from './levels.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Terminology'
    },
    children: [
      {
        path: '',
        redirectTo: 'grammar-class'
      },
      {
        path: 'grammar-class',
        component: GrammarClassComponent,
        data: {
          title: 'Grammar Class'
        }
      },
      {
        path: 'grammar-topics',
        component: GrammarTopicComponent,
        data: {
          title: 'Grammar Topics'
        }
      },
      {
        path: 'languages',
        component: LanguagesComponent,
        data: {
          title: 'Languages'
        }
      },
      {
        path: 'lessons',
        component: LessonsComponent,
        data: {
          title: 'Lessons'
        }
      },
      {
        path: 'levels',
        component: LevelsComponent,
        data: {
          title: 'Levels'
        }
      },
      {
        path: 'units',
        component: UnitsComponent,
        data: {
          title: 'Units'
        }
      },
      {
        path: 'vocabulary-topics',
        component: VocabularyTopicComponent,
        data: {
          title: 'Vocabulary Topics'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminologyRoutingModule { }
