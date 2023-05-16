export class Login{
    userName: string;
    password: string;

    constructor(args: any){
        this.userName = args.userName;
        this.password = args.password;
    }
}