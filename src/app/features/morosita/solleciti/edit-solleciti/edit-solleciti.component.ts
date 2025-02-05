import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsitoInvioSollecito, SollecitoService } from 'src/app/core/services/sollecito.service';

@Component({
  selector: 'app-edit-solleciti',
  templateUrl: './edit-solleciti.component.html',
  styleUrls: ['./edit-solleciti.component.css']
})
export class EditSollecitiComponent {
  sollecito: any = {};
  morositaId!: number;
  sollecitoId!: number;
  esitoInvioOptions = Object.values(EsitoInvioSollecito);

  constructor(
    private sollecitoService: SollecitoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.morositaId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.sollecitoId = Number(this.route.snapshot.paramMap.get('sollecitoId'));
    this.sollecito = this.route.snapshot.data['sollecito'];
  }

  onSubmit() {
    this.sollecitoService.updateEsitoSollecito(
      this.morositaId,
      this.sollecitoId,
      this.sollecito.esitoInvio
    ).subscribe(() => {
      if (this.sollecito.esitoRisposta) {
        this.sollecitoService.updateRispostaSollecito(
          this.morositaId,
          this.sollecitoId,
          this.sollecito.esitoRisposta
        ).subscribe(() => this.navigateBack());
      } else {
        this.navigateBack();
      }
    });
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

