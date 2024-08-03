const Login={
    template:`
    <div>
      <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
            <h2 class="card-title">Login</h2>
                <div class="mb-3">
                  <label for="username" class="form-label">Username:</label>
                  <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter your username" required>
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password" required>
                </div>
                <button type="submit" class="btn btn-primary" @click="login">Submit</button>
        </div>
      </div>
    </div>
    `,
    data(){
        return{
            username:'',
            password:'',
            role:'',
            message:''
        }
    },
    methods:{
        close(){
            if (this.$route.path!='/'){
                this.$router.push('/');
            }
        },
        async login(){
            console.log('Clicked login');
            const url = window.location.origin;
            const response = await fetch(url+'/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    "username" : this.username,
                    "password" : this.password
                }),
            });
            if (response.ok){
                console.log('Logged In');
                const data = await response.json();
                alert(data.message);
                console.log(data.data.role);
                if (data.data.role === 'admin'){
                    if (this.$route.path != '/admin'){
                        this.$router.push('/admin');
                    }
                } else {
                    if (this.$route.path != '/user'){
                        this.$router.push('/user');
                    }
                }
            } else {
                console.log('Login Failed');
                const data = await response.json();
                alert(data.message);
                if (this.$route.path != '/register'){
                    this.$router.push('/register');
                }
            }
        }
    }
}

export default Login;