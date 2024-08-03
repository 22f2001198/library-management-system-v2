const adminRequests = Vue.component('adminRequests',{
    template:`
    <div class="container">
    <h1>All Requests:</h1>
    <div v-if="this.$store.state.Requests.length !== 0">
        <table class="table table-bordered" border="2px" border-color="black">
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Book ID</th>
                <th>Actions</th>
            </tr>
            <tr v-for="request in this.$store.state.Requests" :key="request.reviewid">
                <td>{{request.requestid}}</td>
                <td>{{request.userid}}</td>
                <td>{{request.bookid}}</td>
                <td><button class="btn btn-primary">Issue</button><button class="btn btn-danger">Reject</button></td>
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
    }
});

export default adminRequests;