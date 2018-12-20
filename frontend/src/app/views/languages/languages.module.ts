import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagesRoutingModule } from './languages-routing.module';
import { DictenComponent } from './dicten.component';
import { EnglishComponent } from './english.component';
import { FrenchComponent } from './french.component';
import { SpanishComponent } from './spanish.component';
import { PortugueseComponent } from './portuguese.component';
import { JapaneseComponent } from './japanese.component';

@NgModule({
  declarations: [DictenComponent, EnglishComponent, FrenchComponent, SpanishComponent, PortugueseComponent, JapaneseComponent],
  imports: [
    CommonModule,
    LanguagesRoutingModule
  ]
})
export class LanguagesModule { }
