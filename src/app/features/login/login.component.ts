import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = null;
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe({
      next: () => {
        const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/anagrafica';
        this.router.navigateByUrl(redirect);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Login fallito. Riprova.';
      }
    });
  }
}
