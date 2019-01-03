import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**    PRIMENG IMPORTS    ***/
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/components/button/button';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ContextMenuModule } from 'primeng/components/contextmenu/contextmenu';
import { SliderModule } from 'primeng/components/slider/slider';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { GrowlModule } from 'primeng/components/growl/growl';

import { TerminologyRoutingModule } from './terminology-routing.module';
import { GrammarClassComponent } from './grammar-class.component';
import { GrammarTopicComponent } from './grammar-topic.component';
import { LanguagesComponent } from './languages.component';
import { LevelsComponent } from './levels.component';
import { LessonsComponent } from './lessons.component';
import { VocabularyTopicComponent } from './vocabulary-topic.component';
import { UnitsComponent } from './units.component';

@NgModule({
  declarations: [
    GrammarClassComponent,
    GrammarTopicComponent,
    LanguagesComponent,
    LevelsComponent,
    LessonsComponent,
    VocabularyTopicComponent,
    UnitsComponent
  ],
  imports: [
    CommonModule,
    TerminologyRoutingModule,

    TableModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ContextMenuModule,
    SliderModule,
    DropdownModule,
   // MultiSelectModule,
    GrowlModule
  ]
})
export class TerminologyModule { }
