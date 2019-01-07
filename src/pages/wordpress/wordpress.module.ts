import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { WordpressPosts } from './wordpress-posts/wordpress-posts.component';
import { WordpressPost } from './wordpress-post/wordpress-post.component';



@NgModule({
  declarations: [
    WordpressPosts,
    WordpressPost
  ],
  imports: [
  	CommonModule,
  	SharedModule
  ],
  exports: [
    WordpressPosts,
    WordpressPost
  ],
  entryComponents:[
  	WordpressPosts,
    WordpressPost
  ]
})
export class WordpressModule {}
