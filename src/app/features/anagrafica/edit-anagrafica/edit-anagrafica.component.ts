import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Anagrafica,
  TipoDocumento,
} from 'src/app/core/models/anagrafica.model';
import { AnagraficaService } from 'src/app/core/services/anagrafica.service';
import * as moment from 'moment';
import { BootstrapService } from 'src/app/core/services/bootstrap-service.service';
import { NotificationService } from 'src/app/core/services/notification.service';

type UploadDocumentType = 'CI' | 'PP' | 'PT';

@Component({
  selector: 'app-edit-anagrafica',
  templateUrl: './edit-anagrafica.component.html',
  styleUrls: ['./edit-anagrafica.component.css'],
})
export class EditAnagraficaComponent implements OnInit {
  pageTitle: string = 'Modifica Anagrafica';
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  hasUploadedFile = false;
  currentDocumentIndex: number = -1;
  deleteFileIndex: number = -1;
  breadcrumbList = [
    { label: 'ERP - di Regione Puglia', link: '/' },
    { label: 'Anagrafica', link: '/anagrafica' },
  ];
  private documentTypeMap: Record<TipoDocumento, UploadDocumentType> = {
    [TipoDocumento.CARTA_DEL_IDENTITA]: 'CI',
    [TipoDocumento.PASSAPORTO]: 'PP',
    [TipoDocumento.PATENTE]: 'PT',
  };
  anagrafica!: Anagrafica;
  anagraficaId!: number;
  modificaForm!: FormGroup;
  documentTypes: TipoDocumento[] = [
    TipoDocumento.CARTA_DEL_IDENTITA,
    TipoDocumento.PASSAPORTO,
    TipoDocumento.PATENTE,
  ];
  initialFormValues!: Anagrafica;
  submitted: boolean = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private anagraficaService: AnagraficaService,
    private bootstrapService: BootstrapService,
    private notificationService: NotificationService
  ) {
    this.uploadForm = this.formBuilder.group({
      documentType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ anagraficaByIdResolver }) => {
      this.anagrafica = anagraficaByIdResolver;
      console.log('anagraficaByIdResolver:', anagraficaByIdResolver);

      this.anagraficaId = anagraficaByIdResolver.id;
      console.log('Anagrafica ID:', this.anagraficaId);
    });

    this.initForm();
  }

  initForm() {
    this.modificaForm = this.formBuilder.group({
      id: [this.anagrafica.id || ''],
      cittadino: this.formBuilder.group({
        id: [this.anagrafica.cittadino?.id || ''],
        nome: [this.anagrafica.cittadino?.nome || '', Validators.required],
        cognome: [
          this.anagrafica.cittadino?.cognome || '',
          Validators.required,
        ],
        codiceFiscale: [
          this.anagrafica.cittadino?.codiceFiscale || '',
          Validators.required,
        ],
        genere: [this.anagrafica.cittadino?.genere || '', Validators.required],
        cittadinanza: [
          this.anagrafica.cittadino?.cittadinanza || '',
          Validators.required,
        ],
        dataDiNascita: [
          this.anagrafica.cittadino?.dataDiNascita || '',
          [Validators.required],
        ],
        residenza: this.formBuilder.group({
          id: [this.anagrafica.cittadino?.residenza?.id || ''],
          indirizzo: [
            this.anagrafica.cittadino?.residenza?.indirizzo || '',
            Validators.required,
          ],
          civico: [
            this.anagrafica.cittadino?.residenza?.civico || '',
            Validators.required,
          ],
          cap: [
            this.anagrafica.cittadino?.residenza?.cap || '',
            [Validators.required, Validators.pattern('^[0-9]{5}$')],
          ],
          comuneResidenza: [
            this.anagrafica.cittadino?.residenza?.comuneResidenza || '',
            Validators.required,
          ],
          provinciaResidenza: [
            this.anagrafica.cittadino?.residenza?.provinciaResidenza || '',
            Validators.required,
          ],
          statoResidenza: [
            this.anagrafica.cittadino?.residenza?.statoResidenza || '',
            Validators.required,
          ],
        }),
        contatti: this.formBuilder.group({
          id: [this.anagrafica.cittadino?.contatti?.id || ''],
          telefono: [this.anagrafica.cittadino?.contatti?.telefono || ''],
          cellulare: [this.anagrafica.cittadino?.contatti?.cellulare || ''],
          email: [this.anagrafica.cittadino?.contatti?.email || ''],
          pec: [this.anagrafica.cittadino?.contatti?.pec || ''],
        }),
        luogo_nascita: this.formBuilder.group({
          comune: [
            this.anagrafica.cittadino?.luogo_nascita?.comune || '',
            Validators.required,
          ],
          provincia: [
            this.anagrafica.cittadino?.luogo_nascita?.provincia || '',
          ],
          stato: [this.anagrafica.cittadino?.luogo_nascita?.stato || ''],
        }),
        documenti_identita: this.formBuilder.array(
          (this.anagrafica.cittadino?.documenti_identita || []).map(
            (doc: any) =>
              this.formBuilder.group({
                id: [doc.id || ''],
                tipo_documento: [doc.tipo_documento || ''],
                numero_documento: [doc.numero_documento || ''],
                data_emissione: [
                  doc.data_emissione
                    ? this.formatDateForBE(doc.data_emissione)
                    : '',
                ],
                data_scadenza: [
                  doc.data_scadenza
                    ? this.formatDateForBE(doc.data_scadenza)
                    : '',
                ],
                ente_emittente: [doc.ente_emittente || ''],
                nomeFile: [doc.nomeFile || ''],
                contentType: [doc.contentType || ''],
              })
          )
        ),
      }),
    });

    this.initialFormValues = this.modificaForm.getRawValue();
  }

  get documentiIdentita(): FormArray {
    return this.modificaForm.get('cittadino.documenti_identita') as FormArray;
  }

  addDocumento(): void {
    const documentoGroup = this.formBuilder.group({
      tipo_documento: ['', Validators.required],
      numero_documento: ['', Validators.required],
      data_emissione: ['', Validators.required],
      data_scadenza: ['', Validators.required],
      ente_emittente: ['', Validators.required],
      nomeFile: [''],
      contentType: [''],
      id: [null],
    });
    this.documentiIdentita.push(documentoGroup);
  }

  indietro() {
    this.router.navigate(['/anagrafica']);
  }

  resetForm() {
    this.modificaForm.reset(this.initialFormValues);
  }

  onSubmit() {
    window.scrollTo(0, 0);
    this.submitted = true;

    if (this.modificaForm.invalid) {
      return;
    }

    const formValue = this.modificaForm.getRawValue();

    formValue.cittadino.dataDiNascita = moment(
      formValue.cittadino.dataDiNascita
    ).format('YYYY-MM-DD');

    if (formValue.cittadino.documenti_identita) {
      formValue.cittadino.documenti_identita =
        formValue.cittadino.documenti_identita.map(
          (doc: {
            data_emissione: moment.MomentInput;
            data_scadenza: moment.MomentInput;
          }) => ({
            ...doc,
            data_emissione: moment(doc.data_emissione).format(
              'YYYY-MM-DDTHH:mm:ss.SSSZ'
            ),
            data_scadenza: moment(doc.data_scadenza).format(
              'YYYY-MM-DDTHH:mm:ss.SSSZ'
            ),
          })
        );
    }

    this.anagraficaService.modificaAnagrafica(formValue).subscribe({
      next: () => {
        this.submitted = false;

        this.notificationService.addNotification({
          message: "L'anagrafica salvata con successo!",
          type: 'success',
          timeout: 3000,
        });

        this.router.navigate([]);
      },
      error: (error) => {
        this.notificationService.addNotification({
          message: this.handleError(error.error),
          type: 'error',
          timeout: 20000,
        });
      },
    });
  }

  private handleError(error: any): string {
    switch (error.status) {
      case 400:
        return 'Dati non validi. Controlla i campi obbligatori.';
      case 422:
        return 'Dati non validi o anagrafica già esistente.';
      case 409:
        return error.message;
      case 500:
        return error.message;
      default:
        return "Errore durante il salvataggio dell'anagrafica.";
    }
  }

  private formatDateForBE(date: string | Date): string {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }

  openUploadModal(index: number) {
    this.currentDocumentIndex = index;
    const documentiFormArray = this.documentiIdentita;
    const currentDoc = documentiFormArray.at(index);
    const selectedType = currentDoc.get('tipo_documento')
      ?.value as TipoDocumento;

    if (selectedType) {
      const uploadModalType = this.documentTypeMap[selectedType];
      this.uploadForm.patchValue({
        documentType: uploadModalType,
      });
    } else {
      this.uploadForm.reset();
    }

    this.selectedFile = null;
    this.bootstrapService.showModal('uploadModal');
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveDocument() {
    if (
      this.uploadForm.valid &&
      this.selectedFile &&
      this.currentDocumentIndex !== -1
    ) {
      const documenti = this.documentiIdentita;
      const currentDoc = documenti.at(this.currentDocumentIndex);

      if (currentDoc) {
        currentDoc.patchValue({
          nomeFile: this.selectedFile.name,
          contentType: this.selectedFile.type,
        });

        const anagrafica = this.modificaForm.getRawValue();

        this.anagraficaService
          .modificaAnagrafica(anagrafica, this.selectedFile)
          .subscribe({
            next: (response) => {
              if (!currentDoc.get('id')?.value) {
                const updatedDoc = response.cittadino.documenti_identita?.find(
                  (doc) => doc.nomeFile === this.selectedFile?.name
                );
                if (updatedDoc) {
                  currentDoc.patchValue({ id: updatedDoc.id });
                }
              }

              this.hasUploadedFile = true;
              this.bootstrapService.hideModal('uploadModal');
            },
            error: (error) => {
              if (
                error.status === 400 &&
                error.error?.message?.includes('unique constraint')
              ) {
                this.errorMessage = 'Questo documento è già stato caricato.';
              } else {
                this.errorMessage =
                  'Errore durante il caricamento del documento.';
              }
            },
          });
      }
    }
  }

  deleteDocument(index: number) {
    this.showDeleteFileModal(index);
  }

  showDeleteFileModal(index: number) {
    this.deleteFileIndex = index;
    this.bootstrapService.showModal('deleteFileModal');
  }

  confirmDeleteFile() {
    if (this.deleteFileIndex !== -1) {
      const documento = this.documentiIdentita.at(this.deleteFileIndex);
      const documentoId = documento.get('id')?.value;

      if (documentoId) {
        this.anagraficaService
          .deleteDocument(this.anagraficaId, documentoId)
          .subscribe({
            next: () => {
              this.documentiIdentita.removeAt(this.deleteFileIndex);
              this.hasUploadedFile = false;
              this.selectedFile = null;
              this.bootstrapService.hideModal('deleteFileModal');
              this.deleteFileIndex = -1;
              this.notificationService.addNotification({
                message: "Il documento è stato eliminato con successo!",
                type: 'success',
                timeout: 3000,
              });
            },
            error: (error) => {
              this.notificationService.addNotification({
                message: "Eliminazione del documento non riuscita!",
                type: 'error',
                timeout: 5000,
              });
              this.bootstrapService.hideModal('deleteFileModal');
              this.deleteFileIndex = -1;
            },
          });
      } else {
        this.documentiIdentita.removeAt(this.deleteFileIndex);
        this.hasUploadedFile = false;
        this.selectedFile = null;
        this.bootstrapService.hideModal('deleteFileModal');
        this.deleteFileIndex = -1;
      }
    }
  }

  removeFile() {
    if (this.currentDocumentIndex !== -1) {
      const documento = this.documentiIdentita.at(this.currentDocumentIndex);
      const documentoId = documento.get('id')?.value;

      if (documentoId) {
        this.showDeleteFileModal(this.currentDocumentIndex);
      } else {
        documento.patchValue({
          nomeFile: null,
          contentType: null,
        });
        this.hasUploadedFile = false;
        this.selectedFile = null;
      }
    }
  }
}
