import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { JustfortodayComponent } from './justfortoday-component/justfortoday.component';

@NgModule({
  declarations: [
    JustfortodayComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
    JustfortodayComponent
  ],
  entryComponents:[
  	JustfortodayComponent
  ]
})
export class JustfortodayModule {}
