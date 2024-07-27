const Admin = {
    template: `
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
            <router-link to="/admin" class="navbar-brand">LMS-v2</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link to="/admin" class="nav-link active" aria-current="page">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/admin/profile" class="nav-link active" aria-current="page">My Profile</router-link>
                </li>
                
                <li class="nav-item">
                    <button class="btn btn-danger" @click="logout">Logout</button>
                </li>
                </ul>
                <form class="d-flex" role="search">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>Open this select menu</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            </div>
        </nav>
        <div class="sidebar">
        <h4>User Information</h4>
        <p><strong>Username:</strong> {{this.$store.state.User.username}}</p>
        <p><strong>Name:</strong> {{this.$store.state.User.name}}</p>
        <p><strong>Role:</strong> {{this.$store.state.User.role}}</p>
        <p><strong>Email:</strong> {{this.$store.state.User.email}}</p>
        <button type="submit" class="btn btn-primary" @click="editProfile">Edit</button>
        </div>
        <div class="content">
            <h2>Main content here.</h2>
            <router-view />
        </div>
    </div>
    `,
    data(){
        return{
            message: ''
        }
    },
    async mounted(){
        console.log('getting Admin');
        this.$store.dispatch('fetchUser');
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async logout(){
            const url = window.location.origin;
            console.log('clicked on logout');
            const response = await fetch(url+'/logout',{
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN' : this.getCookie('csrf_access_token'),
                },
                credentials: 'include',
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('Logout Successful');
                if (this.$route.path != '/'){
                    this.$router.push('/');
                }
            } else {
                console.log('Logout Failed');
            }
        },
        editProfile(){
            if(this.$route.path != '/edit/profile'){
                this.$router.push('/edit/profile');
            }
        }
    },
    
}

export default Admin;