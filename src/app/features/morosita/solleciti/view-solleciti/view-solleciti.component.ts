import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sollecito } from 'src/app/core/models/sollecito.model';

@Component({
  selector: 'app-view-solleciti',
  templateUrl: './view-solleciti.component.html',
  styleUrls: ['./view-solleciti.component.css']
})
export class ViewSollecitiComponent implements OnInit {
  sollecito: Sollecito | null = null;
  currentMorositaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.sollecito = data['sollecitiResolver'];
    });

    this.currentMorositaId = Number(this.route.parent?.snapshot.paramMap.get('id'));
  }

  indietro(): void {
    if (this.currentMorositaId) {
      this.router.navigate(['/morosita', 'view-morosita', this.currentMorositaId, 'solleciti']);
    } else {
      this.router.navigate(['/morosita']);
    }
  }
}