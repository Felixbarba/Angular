import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, NewPost } from '../../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createPost(post: NewPost): Observable<Post> {
    return this.http.post<Post>(this.API_URL, post).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.API_URL}/${post.id}`, post).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la petición HTTP:', error);
    let msg = 'Ocurrió un error inesperado.';
    if (error.error instanceof ErrorEvent) {
      msg = `Error de cliente: ${error.error.message}`;
    } else {
      msg = `Error del servidor: ${error.status} - ${error.statusText}`;
    }
    return throwError(() => new Error(msg));
  }
}
