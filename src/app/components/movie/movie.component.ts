import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment as configs } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit{

  type: string = '';
  id: string = '';
  url: string = '';
  movies: any;
  movie: any;

  constructor(private _route: ActivatedRoute, private _http: HttpClient) {}

  ngOnInit(): void {
    this.type = this._route.snapshot.params['type'];
    this.id = this._route.snapshot.params['id'];
    this.url = `${configs.url}/assets/data/${this.type}-movies.json`;
    this.getMovie();
  }

  async getMovie() {
    try {
      const resp = this._http.get(this.url);
      this.movies = await lastValueFrom(resp);
      const index = this.movies.findIndex((movie: any) => movie.id == this.id);
      if (index > -1) {
        this.movie = this.movies[index];
      }
    } catch (error) {
      console.error(error);
    }
  }
}
