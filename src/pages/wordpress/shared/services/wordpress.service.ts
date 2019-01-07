import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../../../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressService {

	constructor(private http: Http, private config: Config) {}

	public login(data) {
		let url = this.config.wordpressApiUrl + '/jwt-auth/v1/token';
		return this.http.post(url, data)
	  	.map(result => {
			return result.json();
		});
	}

	public getPosts(query) {
		query = this.transformRequest(query);
		let url = this.config.wordpressApiUrl + `/wp/v2/posts?${query}&_embed`;
		return this.http.get(url)
	  	.map(result => {
			return result.json();
		});
	}

	public getPost(id) {
		return this.http.get(this.config.wordpressApiUrl + `/wp/v2/posts/${id}?_embed`)
	  	.map(result => {
			return result.json();
		});
	}

	public getMedia(id) {
		return this.http.get(this.config.wordpressApiUrl + `/wp/v2/media/${id}`)
	  	.map(result => {
			return result.json();
		});
	}


	private transformRequest(obj) {
		let p, str;
		str = [];
		for (p in obj) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
		return str.join('&');
	}

}
