import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


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



import { UsersRoutingModule } from './users-routing.module';


import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent], 
  imports: [
    CommonModule,
    UsersRoutingModule,

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
    DialogModule
  ]
})
export class UsersModule { }
