const Register= {
    template: `
    <div>
      <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
            <h2 class="card-title">Register</h2>
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
                <div class="mb-3">
                    <label for="name" class="form-label">Name:</label>
                    <input type="text" class="form-control" v-model="name" placeholder="Enter your name" required>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Role:</label>
                    <input type="text" class="form-control" v-model="role" disabled />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" v-model="email" placeholder="Enter your email" required>
                </div>
                <button type="submit" class="btn btn-primary" @click="register">Submit</button>
        </div>
      </div>
    </div>
    `,
    data(){
        return{
            username:'',
            password:'',
            name:'',
            role:'user',
            email:'',
            message:''
        }
    },
    methods:{
        close(){
            if (this.$route.path!='/'){
                this.$router.push('/');
            }
        },
        async register(){
          console.log('Clicked')
          const url = window.location.origin;
          const response = await fetch(url + '/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "username": this.username,
              "password": this.password,
              "name": this.name,
              "email": this.email
            }),
          });
          if (response.ok){
            console.log('Created successfully');
            const data = await response.json();
            alert(data.message);
            if (this.$route.path != '/login'){
              this.$router.push('/login')
            }
          } else {
            console.log('Creation Failed');
            const data = await response.json();
            alert(data.message);
          }
        }
    }
}

export default Register;