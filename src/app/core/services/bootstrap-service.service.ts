import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class BootstrapService {
  constructor() {}

  showModal(idModal: string): void {
    const modalElement = document.getElementById(idModal);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error(`Modal with ID '${idModal}' not found.`);
    }
  }

  toggleModal(idModal: string): void {
    const modalElement = document.getElementById(idModal);
    if (modalElement) {
      const modal =
        bootstrap.Modal.getInstance(modalElement) ||
        new bootstrap.Modal(modalElement);
      modal.toggle();
    } else {
      console.error(`Modal with ID '${idModal}' not found.`);
    }
  }

  hideModal(idModal: string): void {
    const modalElement = document.getElementById(idModal);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      } else {
        console.error(`Modal with ID '${idModal}' not initialized.`);
      }
    } else {
      console.error(`Modal with ID '${idModal}' not found.`);
    }
  }

  activateTooltips(): void {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
