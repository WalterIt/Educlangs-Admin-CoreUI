import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CropperModule } from 'ngx-cropper';
import 'cropperjs/dist/cropper.min.css';  // frontend\node_modules\cropperjs\dist\cropper.min.css

import { NgxCroppieModule } from 'ngx-croppie';

import { ImageCropperModule } from '../../shared/image-cropper/image-cropper.module';


import {
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule
} from '@angular/material';


/**    PRIMENG IMPORTS    ***/
import { TableModule } from 'primeng/table';
import {GrowlModule} from 'primeng/components/growl/growl';
import {TabViewModule} from 'primeng/components/tabview/tabview';
import {CodeHighlighterModule} from 'primeng/components/codehighlighter/codehighlighter';
import {ToolbarModule} from 'primeng/components/toolbar/toolbar';
import {ButtonModule} from 'primeng/components/button/button';
import {SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';
import { MultiSelectModule, DropdownModule, DataTableModule, DialogModule } from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/components/contextmenu/contextmenu';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';

import { DictionariesRoutingModule } from './dictionaries-routing.module';
import { DictenComponent } from './dicten.component';
import { EnglishComponent } from './english.component';
import { FrenchComponent } from './french.component';
import { SpanishComponent } from './spanish.component';
import { PortugueseComponent } from './portuguese.component';
import { JapaneseComponent } from './japanese.component';
import { CustomImageFormControlComponent } from './custom-image-form-control/custom-image-form-control.component';

@NgModule({
  declarations: [
    DictenComponent,
    EnglishComponent,
    FrenchComponent,
    SpanishComponent,
    PortugueseComponent,
    JapaneseComponent,
    CustomImageFormControlComponent
  ],

  imports: [
    CommonModule,
    DictionariesRoutingModule,

    GrowlModule,
    TabViewModule,
    CodeHighlighterModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    InputTextModule,
    ContextMenuModule,
    DialogModule,
    CropperModule,
    NgxCroppieModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ImageCropperModule
  ]
})
export class DictionariesModule { }
