export interface PrescriberInfo {
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  practiceName: string;
  phone: string;
  fax: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

export interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export type SelectedProduct = 'orenitram' | 'remodulin' | 'tyvaso' | null;

export interface OrenitramPrescription {
  prescriptionType: 'therapy-initiation' | 'alternate-dosing' | null;
  // Therapy initiation
  titrationKit: boolean;
  prescriptionBeyondMonth3: boolean;
  titrateByAmount: string;
  titrateEveryDays: string;
  untilGoalDose: string;
  // Alternate dosing
  initiateAtAmount: string;
  initiateFrequency: 'TID' | 'BID' | null;
  alternatetitrateAmount: string;
  alternateEveryDays: string;
  alternateGoalDose: string;
  // Strengths
  strength0125: boolean;
  strength025: boolean;
  strength1: boolean;
  strength25: boolean;
  strength5: boolean;
  // Instructions
  instructions: string;
  // Dispense
  dispenseType: '12months' | 'specify' | null;
  refillsCount: string;
  // Nurse education
  nurseEduType: 'specialty-pharmacy' | 'prescriber-directed' | null;
  nurseInstructions: string;
}

export interface RemodulinPrescription {
  refills: string;
  dosingWeight: string;
  dosingWeightUnit: 'kg' | 'lb';
  infusionType: 'subcutaneous' | 'intravenous' | null;
  diluent: 'sodium-chloride' | 'remodulin-sterile' | 'epoprostenol-sterile' | 'sterile-water' | null;
  pumpAmbulatory: boolean;
  pumpRemunity: boolean;
  vial04: boolean;
  vial1: boolean;
  vial25: boolean;
  vial5: boolean;
  vial10: boolean;
  initiationDosageAmount: string;
  initiationDosageUnit: string;
  titrateAmount: string;
  titrateUnit: string;
  titrateEveryDays: string;
  goalDoseAmount: string;
  goalDoseUnit: string;
  instructions: string;
  nursingVisitType: 'iv' | 'subq' | null;
  ivDressingChangeDays: string;
  ivPerStandard: boolean;
  subqInstructions: string;
  location: 'home' | 'outpatient' | 'hospital' | null;
}

export interface TyvasoPrescription {
  indication: 'ph-ild' | 'pah' | null;
  product: 'inhalation-solution' | 'inhalation-powder' | null;
  // Inhalation solution
  targetDoseType: 'recommended' | 'other' | null;
  targetDosageMcg: string;
  starterKit: boolean;
  refillKit: boolean;
  refillKitAmount: string;
  instructions: string;
  // DPI powder
  dpiTargetDose: string;
  dpiOtherDosageMcg: string;
  dpiTitrationKit: boolean;
  dpiMaintenanceRefills: string;
  dpiMaintenanceAmounts: string[];
  // Shared
  nursingVisitType: 'specialty-pharmacy' | 'prescriber-directed' | null;
  nursingInstructions: string;
  location: 'home' | 'outpatient' | 'hospital' | null;
}

export interface EnrollmentState {
  prescriber: Partial<PrescriberInfo>;
  patient: Partial<PatientInfo>;
  selectedProduct: SelectedProduct;
  orenitram: Partial<OrenitramPrescription>;
  remodulin: Partial<RemodulinPrescription>;
  tyvaso: Partial<TyvasoPrescription>;
  currentStep: 'prescriber' | 'patient' | 'product-details' | 'prescription-details' | 'review' | 'attestation';
  completedSteps: string[];
}
