export class AuthService {
    loggedIn = false;
    username = '';
    password = '';


    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                resolve(this.loggedIn);
            }
        );
        return promise;
    }


    isAuthValid() {
        return this.loggedIn;
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

        const promise = new Promise(
            (resolve, reject) => {
                this.loggedIn = false;
                this.username = '';
                this.password = '';
                setTimeout(() => {
                    resolve({
                        'db_status': this.loggedIn,
                        'db_msg': 'Logout Success',
                    });
                }, 500);
            }
        );
        return promise;

    }
}
