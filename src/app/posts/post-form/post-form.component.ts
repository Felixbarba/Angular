import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { Post, NewPost } from '../../shared/models/post.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class PostFormComponent implements OnInit, OnDestroy {
  isEditMode = false;
  isSaving = false;
  postId!: number;
  errorMessage = '';
  successMessage = '';
  private routeSub!: Subscription;

  // Incluye id como campo obligatorio
  post: Post = {
    id: 0,
    userId: 1,
    title: '',
    body: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.url.subscribe(() => {
      this.initForm();
    });
  }

  initForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.postId = +idParam;

      this.postService.getPost(this.postId).subscribe({
        next: (data) => {
          this.post = data;
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar publicación.';
          console.error(err);
        }
      });
    } else {
      this.isEditMode = false;
      this.post = {
        id: 0, // el usuario debe ingresarlo manualmente
        userId: 1,
        title: '',
        body: ''
      };
    }
  }

  savePost(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSaving = true;

    // Validaciones
    if (!this.post.id || this.post.id <= 0) {
      this.errorMessage = 'El ID debe ser mayor que 0.';
      this.isSaving = false;
      return;
    }

    if (!this.post.title || this.post.title.length < 5) {
      this.errorMessage = 'El título debe tener al menos 5 caracteres.';
      this.isSaving = false;
      return;
    }

    if (!this.post.body || this.post.body.length < 10) {
      this.errorMessage = 'El contenido debe tener al menos 10 caracteres.';
      this.isSaving = false;
      return;
    }

    if (this.isEditMode) {
      this.postService.updatePost(this.post).subscribe({
        next: () => {
          this.successMessage = 'Publicación actualizada con éxito.';
          this.isSaving = false;
          setTimeout(() => this.router.navigate(['/posts']), 1000);
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar publicación.';
          console.error(err);
          this.isSaving = false;
        }
      });
    } else {
      const newPost: Post = {
        id: this.post.id,
        userId: this.post.userId,
        title: this.post.title,
        body: this.post.body
      };

      this.postService.createPost(newPost).subscribe({
        next: () => {
          this.successMessage = 'Publicación creada con éxito.';
          this.isSaving = false;
          setTimeout(() => this.router.navigate(['/posts']), 1000);
        },
        error: (err) => {
          this.errorMessage = 'Error al crear publicación.';
          console.error(err);
          this.isSaving = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
