import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoundPage } from './found';

@NgModule({
  declarations: [
    FoundPage,
  ],
  imports: [
    IonicPageModule.forChild(FoundPage),
  ],
  entryComponents: [
    FoundPage,
  ]
})
export class FoundPageModule {}
