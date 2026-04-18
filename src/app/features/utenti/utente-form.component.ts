import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruolo, UtentiService } from 'src/app/core/services/utenti.service';

@Component({
  selector: 'app-utente-form',
  templateUrl: './utente-form.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtenteFormComponent implements OnInit {
  isEdit = false;
  id: number | null = null;
  ruoli: Ruolo[] = [];
  errorMessage: string | null = null;
  loading = false;

  form = this.fb.group({
    username: [{ value: '', disabled: false }, Validators.required],
    password: [''],
    nome: [''],
    cognome: [''],
    email: ['', Validators.email],
    attivo: [true],
    ruoli: [<string[]>[]]
  });

  constructor(
    private fb: FormBuilder,
    private utentiService: UtentiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.utentiService.ruoli().subscribe(r => this.ruoli = r);

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'new') {
      this.isEdit = true;
      this.id = +idParam;
      this.form.get('username')?.disable();
      this.utentiService.get(this.id).subscribe(u => {
        this.form.patchValue({
          username: u.username,
          nome: u.nome,
          cognome: u.cognome,
          email: u.email,
          attivo: u.attivo,
          ruoli: u.ruoli || []
        });
      });
    } else {
      this.form.get('password')?.addValidators(Validators.required);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  toggleRuolo(nome: string): void {
    const current = this.form.value.ruoli || [];
    const next = current.includes(nome) ? current.filter(r => r !== nome) : [...current, nome];
    this.form.patchValue({ ruoli: next });
  }

  hasRuolo(nome: string): boolean {
    return (this.form.value.ruoli || []).includes(nome);
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = null;
    const v = this.form.getRawValue();

    const obs = this.isEdit && this.id
      ? this.utentiService.update(this.id, {
          nome: v.nome || undefined,
          cognome: v.cognome || undefined,
          email: v.email || undefined,
          attivo: v.attivo ?? undefined,
          password: v.password || undefined,
          ruoli: v.ruoli || []
        })
      : this.utentiService.create({
          username: v.username!,
          password: v.password!,
          nome: v.nome || undefined,
          cognome: v.cognome || undefined,
          email: v.email || undefined,
          attivo: v.attivo ?? true,
          ruoli: v.ruoli || []
        });

    obs.subscribe({
      next: () => this.router.navigate(['/utenti']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Salvataggio fallito';
      }
    });
  }

  cancel(): void { this.router.navigate(['/utenti']); }
}
