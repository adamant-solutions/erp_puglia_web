import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtentiService, Utente } from 'src/app/core/services/utenti.service';

@Component({
  selector: 'app-utenti-list',
  templateUrl: './utenti-list.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiListComponent implements OnInit {
  utenti: Utente[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private utentiService: UtentiService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.utentiService.list().subscribe({
      next: u => { this.utenti = u; this.loading = false; },
      error: () => { this.errorMessage = 'Errore nel caricamento utenti'; this.loading = false; }
    });
  }

  edit(u: Utente): void { this.router.navigate(['/utenti', u.id]); }
  create(): void { this.router.navigate(['/utenti', 'new']); }

  delete(u: Utente): void {
    if (!u.id) return;
    if (!confirm(`Eliminare l'utente ${u.username}?`)) return;
    this.utentiService.delete(u.id).subscribe({
      next: () => this.load(),
      error: () => alert('Eliminazione fallita')
    });
  }
}
