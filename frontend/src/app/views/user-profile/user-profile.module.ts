import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';


import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    TabViewModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    GrowlModule,
    TabViewModule,
    CodeHighlighterModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    DataTableModule,
    InputTextModule,
    ContextMenuModule,
    DialogModule,
    InputMaskModule,
    AutoCompleteModule
  ]
})
export class UserProfileModule { }
