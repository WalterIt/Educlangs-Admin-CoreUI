import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DictenComponent } from './dicten.component';
import { EnglishComponent } from './english.component';
import { FrenchComponent } from './french.component';
import { SpanishComponent } from './spanish.component';
import { PortugueseComponent } from './portuguese.component';
import { JapaneseComponent } from './japanese.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dictionaries'
    },
    children: [
      {
        path: '',
        redirectTo: 'dicten'
      },
      {
        path: 'dicten',
        component: DictenComponent,
        data: {
          title: 'General Dictionary'
        }
      },
      {
        path: 'english',
        component: EnglishComponent,
        data: {
          title: 'English'
        }
      },
      {
        path: 'french',
        component: FrenchComponent,
        data: {
          title: 'French'
        }
      },
      {
        path: 'spanish',
        component: SpanishComponent,
        data: {
          title: 'Spanish'
        }
      },
      {
        path: 'portuguese',
        component: PortugueseComponent,
        data: {
          title: 'Portuguese'
        }
      },
      {
        path: 'japanese',
        component: JapaneseComponent,
        data: {
          title: 'Japanese'
        }
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionariesRoutingModule { }
