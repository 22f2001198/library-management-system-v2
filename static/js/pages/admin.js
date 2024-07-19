const Admin = {
    template: `
    <div>
        <h1>You have logged in as admin.</h1>
        <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
    `,
    data(){
        return{
            message: ''
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async logout(){
            //url = window.location.origin;
            console.log('clicked on logout');
            const response = await fetch('http://127.0.0.1:5000/logout',{
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
        }
    }
}

export default Admin;