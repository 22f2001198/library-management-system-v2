const adminUsers = Vue.component('adminUsers',{
    template:`
    <div class="container">
    <h1>All Users:</h1>
        <div v-if="this.users.length !== 0">
            <table class="table table-bordered" border="2px" border-color="black">
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="user in this.users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td><button class="btn btn-primary" @click="details(user.id)">Details</button><button class="btn btn-danger" @click="ban(user.id)">Ban</button></td>
                </tr>
            </table>
        </div>
        <div v-if="this.users.length === 0">
            <p><strong>No Users registered for now.</strong></p>
        </div>
    </div>
    `,
    data(){
        return{
            users:[]
        }
    },
    async mounted(){
        this.fetchUsers();
    },
    methods:{
        async fetchUsers(){
            const url = window.location.origin;
            const response = await fetch(url+'/users');
            if (response.ok){
                const data = await response.json();
                console.log('fetched users',data);
                this.users=data;
            } else {
                const data = await response.json();
                console.log('Failed to get users.');
                alert(data.message);
            }
        },
        details(id){
            if (this.$route.path != '/details/user/'+id){
                this.$router.push('/details/user/'+id);
            }
        },
        ban(id){
            if (this.$route.path != '/ban/user/'+id){
                this.$router.push('/ban/user/'+id);
            }
        }
    }
});

export default adminUsers;