export class AuthService {
    loggedIn = false;
    username = '';
    password = '';


    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800);
            }
        );
        return promise;
    }

    login(data) {


        const promise = new Promise(
            (resolve, reject) => {
                this.loggedIn = true;
                this.username = data.username;
                this.password = data.password;
                setTimeout(() => {
                    resolve({
                        'db_status': this.loggedIn,
                        'db_msg': 'Login Valid',
                    });
                }, 500);
            }
        );
        return promise;
    }

    logout() {
        this.loggedIn = false;
        this.username = '';
        this.password = '';
    }
}
