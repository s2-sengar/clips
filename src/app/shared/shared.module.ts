import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabsComponent } from './tabs/tabs.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AleartComponent } from './aleart/aleart.component';

@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabsComponent,
    InputComponent,
    AleartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports:[
    ModalComponent,
    TabsContainerComponent,
    TabsComponent,
    InputComponent,
    AleartComponent
  ]
})
export class SharedModule { }
