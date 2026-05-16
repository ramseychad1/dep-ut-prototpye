import { Injectable, signal } from '@angular/core';
import { EnrollmentState, SelectedProduct } from '../models/enrollment-state.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentStateService {
  private _state = signal<EnrollmentState>({
    prescriber: {
      firstName: 'Jane', lastName: 'Smith', npi: '1234567890',
      specialty: 'Cardiology', practiceName: 'Heart Care Associates',
      phone: '(555) 100-2000', fax: '(555) 100-2001',
      email: 'jsmith@heartcare.com', addressLine1: '100 Medical Blvd',
      city: 'Nashville', state: 'TN', zip: '37201', addressLine2: ''
    },
    patient: {
      firstName: 'Denny', lastName: 'Dequette',
      dateOfBirth: '12/21/1969', sex: 'Male',
      addressLine1: '456 Oak Street', city: 'Nashville',
      state: 'TN', zip: '37202', phone: '(555) 200-3000'
    },
    selectedProduct: null,
    orenitram: {},
    remodulin: {},
    tyvaso: {},
    currentStep: 'prescriber',
    completedSteps: ['prescriber', 'patient']
  });

  readonly state = this._state.asReadonly();

  setProduct(product: SelectedProduct) {
    this._state.update(s => ({ ...s, selectedProduct: product }));
  }

  setOrenitram(data: any) {
    this._state.update(s => ({ ...s, orenitram: { ...s.orenitram, ...data } }));
  }

  setRemodulin(data: any) {
    this._state.update(s => ({ ...s, remodulin: { ...s.remodulin, ...data } }));
  }

  setTyvaso(data: any) {
    this._state.update(s => ({ ...s, tyvaso: { ...s.tyvaso, ...data } }));
  }

  setPatient(data: any) {
    this._state.update(s => ({ ...s, patient: { ...s.patient, ...data } }));
  }

  setPrescriber(data: any) {
    this._state.update(s => ({ ...s, prescriber: { ...s.prescriber, ...data } }));
  }

  completeStep(step: string) {
    this._state.update(s => ({
      ...s,
      completedSteps: s.completedSteps.includes(step) ? s.completedSteps : [...s.completedSteps, step]
    }));
  }

  getPatientDisplayName(): string {
    const p = this._state().patient;
    return `${p.lastName}, ${p.firstName}`;
  }

  getProductDisplayName(): string {
    switch (this._state().selectedProduct) {
      case 'orenitram': return 'Orenitram® (treprostinil)';
      case 'remodulin': return 'Remodulin® (treprostinil)';
      case 'tyvaso': return 'TYVASO® & TYVASO DPI® (treprostinil)';
      default: return '';
    }
  }
}
