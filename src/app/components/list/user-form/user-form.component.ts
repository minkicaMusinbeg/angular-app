import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form/form-validation.service';
import { PROFILE } from '../list.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() userData!: PROFILE;
  readonly userRoles = [
    { val: 1, viewVal: 'Customer' },
    { val: 2, viewVal: 'Admin' }
  ];
  dozvole: string[]= ['Can add', 'Can edit', 'Can delete']
  currentUser: PROFILE | null = null;
  // SHOW AND HIDE PW FOR USER EXPERIENCE
  showPassword: boolean = false;
  // USER FORM GROUP
  userForm!: FormGroup;
  permissions: {
    canEdit: boolean,
    canDelete : boolean,
    canAdd: boolean
  } = {
    canEdit: false,
    canDelete: false,
    canAdd: false
  }
  constructor(
    private formValidationService: FormValidationService,
    // private globalData: GlobalDataService
  ) {
    // INIT USER FORM
  }

  ngOnInit(): void {
    this.userForm = this.inituserForm;
  }
  // GET USER FORM DATA
  get getFormData() {
    return { ...this.userForm.value, role: this.userForm.value?.role || 1 };
  }
  // USER FORM PROPERTIES
  private get inituserForm() {
    const passwordValidator = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(
        '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ];
    const passwordConfirmValidator = [
      ...passwordValidator,
      this.passwordMatchValidator(),
    ];

    return new FormGroup(
      {
        fullName: new FormControl(this.userData?.fullName || '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
        email: new FormControl(
          {
            value: this.userData?.email || '',
            //! EMAIL CANT BE CHANGE BECAUSE OF USED TO AUTH
            disabled: false,
          },
          [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(30),
          ]
        ),
        role: new FormControl(this.userData?.role || '', []),
        password: new FormControl('', this.userData ? [] : passwordValidator),
        passwordConfirm: new FormControl(
          '',
          this.userData ? [] : passwordConfirmValidator
        ),
      }
      // TODO CAN ACTIVATE FOR BETTER PERFORMANCE
      // { updateOn: 'blur' }
    );
  }
  // FIELD ERROR
  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.userForm);
  }
  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.userForm);
  }

  // CUSTOM VALIDATOR
  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.userForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }

}
