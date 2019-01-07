import { Component } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { WordpressService } from '../shared/services/wordpress.service';

@Component({
	templateUrl: './wordpress-post.html',
	providers: [ WordpressService ]
})
export class WordpressPost {

	options : InAppBrowserOptions = {
      location : 'no',//Or 'no'
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'yes', //Android only
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only
      toolbar : 'yes', //iOS only
      enableViewportScale : 'yes', //iOS only
      allowInlineMediaPlayback : 'no',//iOS only
      presentationstyle : 'pagesheet',//iOS only
      fullscreen : 'yes',//Windows only
	  };

	post: any;
    authorData: any;
    comments = [];

	constructor(
			private navParams: NavParams,
			private wordpressService: WordpressService,
			private loadingController: LoadingController,
			private iab: InAppBrowser
		) {
		if (navParams.get('post')) {
			this.post = navParams.get('post');
			this.authorData = this.post["_embedded"].author[0];
			if(this.post["_embedded"].replies) {
			 	this.comments = this.post["_embedded"].replies[0];
			}
		}
		if (this.navParams.get('id')) {
			this.getPost(this.navParams.get('id'));
		}
	}

	getPost(id) {
		let loader = this.loadingController.create({
			content: "Please wait"
		});

		loader.present();
		this.wordpressService.getPost(id)
		.subscribe(result => {
			this.post = result;
			this.authorData = this.post["_embedded"].author[0];
			if(this.post["_embedded"].replies) {
			 	this.comments = this.post["_embedded"].replies[0];
			}
		},
		error => console.log(error),
    () => loader.dismiss());
	}

	previewPost() {
		const browser = this.iab.create(this.post.link, '_blank', this.options);
		browser.show();
	}



}
