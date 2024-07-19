const Home = {
    template:`
    <div>
    <div class="header">
        <h1>Welcome to LMS v-2</h1>
    </div>
    <p class="text">
        Looking for a collection of books in one place.
    </p>
    <div class="actions">
        <a class="btn btn-outline-dark btn-sm" @click='login'>LOGIN</a>
        <a class="btn btn-outline-dark btn-sm" @click='register'>REGISTER</a>
    </div>
    </div>
    `,

    methods: {
        login(){
            if (this.$route.path!='/login'){
                this.$router.push('/login')
            }
        },
        register(){
            if (this.$route.path!='/register'){
                this.$router.push('/register').then
            }
        }
    }
}

export default Home;