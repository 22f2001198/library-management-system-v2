const adminRequests = Vue.component('adminRequests',{
    template:`
    <div class="container">
    <h1>All Requests:</h1>
    <div v-if="this.$store.state.Requests.length !== 0">
        <table class="table table-bordered" border="2px" border-color="black">
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Book ID</th>
                <th>Book</th>
                <th>Actions</th>
            </tr>
            <tr v-for="request in this.$store.state.Requests" :key="request.requestid">
                <td>{{request.requestid}}</td>
                <td>{{request.id}}</td>
                <td>{{request.username}}</td>
                <td>{{request.bookid}}</td>
                <td>{{request.bookname}}</td>
                <td><button class="btn btn-primary" @click="issue(request.id,request.bookid)">Issue</button><button class="btn btn-danger" @click="reject(request.requestid)">Reject</button></td>
            </tr>
        </table>
    </div>
    <div v-if="this.$store.state.Requests.length === 0">
    <p><strong>No Requests yet.</strong></p>
    </div>
    </div>
    `,
    async mounted(){
        this.$store.dispatch('fetchRequests');
    },
    methods:{
        async issue(id,bookid){
            if (this.$route.path != '/issue/book/'+id+'/'+bookid){
                this.$router.push('/issue/book/'+id+'/'+bookid);
            }
        },
        async reject(requestid){
            if (this.$route.path != '/reject/request/'+requestid){
                this.$router.push('/reject/request/'+requestid);
            }
        }
    }
});

export default adminRequests;