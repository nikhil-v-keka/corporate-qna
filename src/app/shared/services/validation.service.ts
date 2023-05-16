import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ValidationMessages } from '../models/validation/validation';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  loginName = new FormControl('', [Validators.required]);
  loginPassword = new FormControl('', [Validators.required]);
  registerName = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  signUpPassword = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
  ]);
  address = new FormControl('', [Validators.required]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
  ]);

  validationMessages: ValidationMessages = {
    name: [{ type: 'required', message: 'Name is required' }],
    password: [{ type: 'required', message: 'Password is required' }],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter valid Email' },
    ],
    phoneNumber: [
      { type: 'required', message: 'Mobile is required' },
      { type: 'pattern', message: 'Enter Valid Mobile' },
    ],
    confirmPassword: [{ type: 'required', message: 'Password is required' }],
    address: [{ type: 'required', message: 'Address is required' }],
    departmentId: [{ type: 'required', message: 'Department is required' }],
    designationId: [{ type: 'required', message: 'Designation is required' }]
  };
}
