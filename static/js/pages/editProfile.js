const EditProfile = {
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
                  <input type="text" class="form-control" id="username" name="username" :value=this.$store.state.User.username disabled />
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" class="form-control" id="password" name="password" v-model="password" placeholder="Change your password" required>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Name:</label>
                    <input type="text" class="form-control" v-model="name" name="name" required>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Role:</label>
                    <input type="text" class="form-control" name="role" :value=this.$store.state.User.role disabled />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" name="email" v-model="email" required>
                </div>
                <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
        </div>
      </div>
    </div>
    `,
    data(){
        return{
            message: '',
            password: '',
            name: '',
            email: '',
        }
    },
    async mounted(){
        console.log('getting current profile.');
        this.$store.dispatch('fetchUser');
    },
    methods: {
        close(){
            if(this.$store.state.User.role === 'admin'){
                if (this.$route.path != '/admin'){
                    this.$router.push('/admin');
                }
            } else {
                if (this.$route.path != '/user'){
                    this.$router.push('/user');
                }
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async submit(){
            const url = window.location.origin;
            const response = await fetch(url+'/profile/edit',{
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN' : this.getCookie('csrf_access_token'),
                    'Content-Type' : 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "password": this.password,
                    "name": this.name,
                    "email": this.email,
                }),
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                if(this.$store.state.User.role === 'admin'){
                    if (this.$route.path != '/admin'){
                        this.$router.push('/admin');
                    }
                } else {
                    if (this.$route.path != '/user'){
                        this.$router.push('/user');
                    }
                }
            } else {
                console.log('profile update failed');
            }
        },
    }
}

export default EditProfile;