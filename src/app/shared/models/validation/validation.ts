export class ValidationMessage {
  type: string;
  message: string;

  constructor(args: any) {
    this.type = args.type;
    this.message = args.type;
  }
}

export class ValidationMessages {
  name: ValidationMessage[];
  password: ValidationMessage[];
  email: ValidationMessage[];
  phoneNumber: ValidationMessage[];
  confirmPassword: ValidationMessage[];
  address: ValidationMessage[];
  departmentId: ValidationMessage[];
  designationId: ValidationMessage[];

  constructor(args: any) {
      this.name = args.name;
      this.password = args.password;
      this.email = args.email;
      this.phoneNumber = args.phoneNumber;
      this.confirmPassword = args.confirmPassword;
      this.address = args.address;
      this.departmentId = args.departmentId;
      this.designationId = args.designation;
  }
}
