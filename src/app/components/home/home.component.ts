import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment as configs } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  trendingMovies: any;
  theaterMovies: any;
  popularMovies: any;

  constructor(private _http: HttpClient, private _router: Router) {}

  ngOnInit(): void {
    // this.getTrendingMovies();
    // this.getTheaterMovies();
    // this.getPopularMovies();
    this.getAllMovies();
  }

  async getAllMovies() {
    try {
      this.trendingMovies = await this.getMoviesByType('trending');
      this.theaterMovies = await this.getMoviesByType('theater');
      this.popularMovies = await this.getMoviesByType('popular');
    } catch (error) {
      console.error(error);
    }
  }

  async getMoviesByType(type: string) {
    try {
      const resp = this._http.get(`${configs.url}/assets/data/${type}-movies.json`);
      const movies = await lastValueFrom(resp);
      return movies;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  goToMovie(type: string, id: string) {
    this._router.navigate(['movie', type, id]);
  }

  /* async getTrendingMovies() {
    try {
      const resp = this._http.get(`${configs.url}/assets/data/trending-movies.json`);
      const movies = await lastValueFrom(resp);
      this.trendingMovies = movies;
      console.log(this.trendingMovies);
      
    } catch (error) {
      console.error(error);
    }
  }

  async getTheaterMovies() {
    try {
      const resp = this._http.get(`${configs.url}/assets/data/theater-movies.json`);
      const movies = await lastValueFrom(resp);
      this.theaterMovies = movies;
      console.log(this.theaterMovies);
      
    } catch (error) {
      console.error(error);
    }
  }

  async getPopularMovies() {
    try {
      const resp = this._http.get(`${configs.url}/assets/data/popular-movies.json`);
      const movies = await lastValueFrom(resp);
      this.popularMovies = movies;
      console.log(this.popularMovies);
      
    } catch (error) {
      console.error(error);
    }
  } */

}
