const banUser = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Ban User: {{user.username}}</h1>
              <p><strong>Are you sure you want to ban this user?</strong></p>
              <button class="btn btn-danger" @click="ban">Confirm</button>
            </div>
        </div>
    `,
    data(){
        return{
            user:{}
        }
    },
    async mounted(){
        this.fetchUser();
    },
    methods:{
        close(){
            if (this.$route.path != '/admin/users'){
                this.$router.push('/admin/users');
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async fetchUser(){
            const url = window.location.origin;
            const response = await fetch(url+'/user/'+this.$route.params.id,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                this.user = data;
                console.log('fetched user',data);
            } else {
                console.log('failed to get user.');
            }
        },
        async ban(){
            const url = window.location.origin;
            const response = await fetch(url+'/user/ban/'+this.$route.params.id,{
                method:'DELETE',
                headers:{
                    'X-CSRF-TOKEN':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('banned User',data);
                alert(data.message);
                if (this.$route.path != '/admin/users'){
                    this.$router.push('/admin/users');
                }
            } else {
                console.log('Failed to ban.');
            }
        },
    },
}

export default banUser;