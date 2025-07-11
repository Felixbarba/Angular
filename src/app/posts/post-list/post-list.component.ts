import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 10);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar publicaciones.';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  deletePost(id: number): void {
    const confirmDelete = confirm('¿Estás seguro de eliminar esta publicación?');
    if (!confirmDelete) return;

    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== id);
        alert('Publicación eliminada con éxito');
      },
      error: (error) => {
        console.error(error);
        alert('Ocurrió un error al intentar eliminar la publicación.');
      }
    });
  }
}
