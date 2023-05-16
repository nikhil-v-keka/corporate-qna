import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { catchError, of, switchMap } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../authentication/auth.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { ValidationMessages } from 'src/app/shared/models/validation/validation';
import { Department } from 'src/app/shared/models/register/department';
import { Designation } from 'src/app/shared/models/register/designation';
import { SessionTimeoutComponent } from '../session-timeout/session-timeout.component';
import { ContextService } from 'src/app/shared/services/context.service';

function confirmPasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { notMatched: true };
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  relativePath: string;
  uploadedImage: string;
  validationMessage: string;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  attachment: FormData;
  department: Department[];
  designation: Designation[];
  isStatusLogin: boolean = true;
  isStatusSignUp: boolean = false;
  validationMessages: ValidationMessages;
  defaultPath: string = '../../../assets/';
  imageUrl: string = '../../../assets/users.png';
  rootPath: string = 'C:\\Qna\\TeamIWebClient\\src\\assets\\';

  constructor(
    private authService: AuthService,
    private encryptionService: EncryptionService,
    private contextService: ContextService,
    private router: Router,
    private formValidation: ValidationService,
    private toastr: ToastrService,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/forums']);
    }
    this.initializeForm();
    this.getSelectedDepartment();
    this.getSelectedDesignation();
    this.validationMessages = this.formValidation.validationMessages;
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      userName: this.formValidation.loginName,
      password: this.formValidation.loginPassword,
    });
    this.signUpForm = new FormGroup({
      userName: this.formValidation.registerName,
      phoneNumber: this.formValidation.phoneNumber,
      location: this.formValidation.address,
      email: this.formValidation.email,
      password: this.formValidation.signUpPassword,
      departmentId: new FormControl('', [Validators.required]),
      designationId: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      profileImageUrl: new FormControl(''),
    }, { validators: confirmPasswordValidator }
    );
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const encryptedData = this.encryptionService.encryptedData(this.loginForm.value);
      this.authService.login(encryptedData)
      .pipe(
          catchError((error) => {
            if (error) {
              this.validate();
              this.errorToastr();
            }
            return of();
          })
        )
        .subscribe((response) => {
          if (response) {
            this.message = response.token;
            this.authService.userDetail.next(this.message);
            localStorage.setItem('token', response.token)
            this.router.navigate(['/forums']);
            this.successToastr();
            this.loginForm.reset();  
            this.startSessionTimeout();
          }
        });
    }
  }

  signUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      if (this.attachment !== undefined) {
        this.authService
          .UploadImage(this.attachment)
          .pipe(
            switchMap((response: any) => {
              this.uploadedImage = response.path;
              this.relativePath = this.uploadedImage.replace(this.rootPath, this.defaultPath);
              let registrationDetails = this.userRegistration();
              return this.authService.signUp(registrationDetails);
            })
          )
          .subscribe(() => {
            window.alert('Register Successfully');
            this.openLogin();
            this.signUpForm.reset();
          });
      }
    }
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    if (file) {
      const formData = new FormData();
      const reader = new FileReader();
      formData.append('file', file, file.name);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      this.attachment = formData;
    }
  }

  openSignUp() {
    this.isStatusLogin = false;
    this.isStatusSignUp = true;
    this.loginForm.reset();
  }

  openLogin() {
    this.isStatusSignUp = false;
    this.isStatusLogin = true;
    this.signUpForm.reset();
  }

  getSelectedDepartment() {
    this.authService.getDepartment().subscribe((response: Department[]) => {
      this.department = response;
    });
  }

  getSelectedDesignation() {
    this.authService.getDesignation().subscribe((response: Designation[]) => {
      this.designation = response;
    });
  }

  userRegistration() {
    let registrationDetails = {
      userName: this.signUpForm.value.userName,
      phoneNumber: this.signUpForm.value.phoneNumber.toString(),
      location: this.signUpForm.value.location,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      confirmPassword: this.signUpForm.value.confirmPassword,
      departmentId: this.signUpForm.value.departmentId,
      designationId: this.signUpForm.value.designationId,
      profileImageUrl: this.relativePath,
    };
    return registrationDetails;
  }

  validate() {
    this.validationMessage = 'Incorrect username or password';
  }

  successToastr() {
    this.toastr.success('Sucess', 'Successfully Logged In');
  }

  errorToastr() {
    this.toastr.error('Error', 'Incorrect Username Or Password');
  }

  executeAfterTime(callback: () => void, delayInSeconds: number) {    
    setTimeout(callback, delayInSeconds);
  }

  openSmallModal(){
    this.bsModalRef = this.modalService.show(SessionTimeoutComponent, {
      class: 'small-modal',
    });
  }

  startSessionTimeout() {
    let token = localStorage.getItem('token');
    let timeperiod: number = this.contextService.sessionTime(token);
    const delayInSeconds = timeperiod;

    this.executeAfterTime(() => {
      this.openSmallModal();
    }, delayInSeconds);
  }
}
