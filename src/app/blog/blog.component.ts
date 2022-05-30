import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostData } from './postdata.model';
import { map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PutData } from './putdata.models';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(private http: HttpClient) {}
  fetchedPosts: PostData[] = [];
  fetched: PutData[] = [];

  url = 'https://api1-bdbc4-default-rtdb.firebaseio.com/posts.json';
  ngOnInit(): void {}
  createpost(postdata: { title: string; content: string }, form: NgForm) {
    console.log(postdata);
    this.http.post(this.url, postdata).subscribe((responsedata) => {
      console.log(responsedata);
      form.reset();
    });
  }
  onfetchposts() {
    this.fetchposts();
  }

  onclearposts() {
    this.http.delete(this.url).subscribe((response) => {
      console.log('Posts deleted: ' + response);
      this.fetchedPosts = [];
    });
  }
  fetchposts() {
    this.http
      .get(this.url)
      .pipe(
        map((responsedata) => {
          const postsarray = [];
          for (const key in responsedata) {
            postsarray.push({ ...responsedata[key], id: key });
          }
          return postsarray;
        })
      )
      .subscribe((posts) => {
        console.log(posts);
        this.fetchedPosts = posts;
        this.fetched = posts;
      });
  }
  updateposts(putdata: { content: string }, form: NgForm) {
    console.log(putdata);
    this.http.put(this.url, putdata).subscribe((responsedata) => {
      console.log(responsedata);
      form.reset();
      this.fetchposts();
    });
  }
}
