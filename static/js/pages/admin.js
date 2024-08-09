const Admin = Vue.component('Admin',{
    template: `
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
            <a class="navbar-brand" @click="home">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" @click="home">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" @click="section">Section</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" @click="books">Books</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" @click="requests">Requests</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" @click="issued">Issued</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" @click="users">Users</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" @click="report">Report</a>
                </li>
                
                <li class="nav-item">
                    <button class="btn btn-danger" @click="logout">Logout</button>
                </li>
                </ul>
                <button class="btn btn-outline-success ms-auto" type="button" @click="search">Search</button>
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
        <div>
            <router-view></router-view>
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
        home(){
            if (this.$route.path != '/admin'){
                this.$router.push('/admin');
            }
        },
        section(){
            if (this.$route.path != '/admin/sections'){
                this.$router.push('/admin/sections');
            }
        },
        books(){
            if (this.$route.path != '/admin/books'){
                this.$router.push('/admin/books');
            }
        },
        requests(){
            if (this.$route.path != '/admin/requests'){
                this.$router.push('/admin/requests');
            }
        },
        issued(){
            if (this.$route.path != '/admin/issued'){
                this.$router.push('/admin/issued');
            }
        },
        users(){
            if (this.$route.path != '/admin/users'){
                this.$router.push('/admin/users');
            }
        },
        report(){
            if (this.$route.path != '/admin/report'){
                this.$router.push('/admin/report');
            }
        },
        search(){
            if (this.$route.path != '/search/book'){
                this.$router.push('/search/book');
            }
        },
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
    
}) 

export default Admin;