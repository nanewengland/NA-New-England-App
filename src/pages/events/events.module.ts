import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { EventsComponent} from './events-component/events.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
  	SharedModule,
    PipesModule
    ],
    exports: [
      EventsComponent
    ],
    entryComponents:[
      EventsComponent
    ]
  })
export class EventsPageModule {}
