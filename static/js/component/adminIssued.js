const adminIssued = Vue.component('adminIssued',{
    template:`
    <div class="container">
    <h1>All Issued:</h1>
    <div v-if="this.Issued.length !== 0">
        <table class="table table-bordered" border="2px" border-color="black">
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Book ID</th>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Actions</th>
            </tr>
            <tr v-for="issue in this.Issued" :key="issue.issueid">
                <td>{{issue.issueid}}</td>
                <td>{{issue.id}}</td>
                <td>{{issue.username}}</td>
                <td>{{issue.bookid}}</td>
                <td>{{issue.book}}</td>
                <td>{{issue.doi}}</td>
                <td>{{issue.dor}}</td>
                <td><button class="btn btn-danger" @click="revoke(issue.bookid)">Revoke</button></td>
            </tr>
        </table>
    </div>
    <div v-if="this.Issued.length === 0">
    <p><strong>No Books issued yet.</strong></p>
    </div>
    </div>
    `,
    data(){
        return{
            Issued:[],
            message:''
        }
    },
    async mounted(){
        this.fetchIssued();
    },
    methods:{
        async fetchIssued(){
            const url = window.location.origin;
            const response = await fetch(url+'/issued');
            if (response.ok){
                const data = await response.json();
                console.log('fetched issued',data);
                this.Issued=data
            } else {
                const data = await response.json();
                console.log('Failed to get issued.');
                alert(data.message);
            }
        },
        async revoke(bookid){
            if (this.$route.path != '/revoke/book/'+bookid){
                this.$router.push('/revoke/book/'+bookid);
            }
        }
    }
});

export default adminIssued;