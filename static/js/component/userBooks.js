const myBooks = Vue.component('myBooks',{
    template:`
    <div class="container">
    <h1>My Books:</h1>
    <div v-if="this.myBooks.length !== 0">
        <table class="table table-bordered" border="2px" border-color="black">
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Book ID</th>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Actions</th>
            </tr>
            <tr v-for="issue in this.myBooks" :key="issue.issueid">
                <td>{{issue.issueid}}</td>
                <td>{{issue.id}}</td>
                <td>{{issue.bookid}}</td>
                <td>{{issue.book}}</td>
                <td>{{issue.doi}}</td>
                <td><button class="btn btn-primary" @click="read(issue.bookid)">Read</button><button class="btn btn-danger" @click="ret(issue.bookid)">Return</button></td>
            </tr>
        </table>
    </div>
    <div v-if="this.myBooks.length === 0">
    <p><strong>No Books issued yet.</strong></p>
    </div>
    </div>
    `,
    data(){
        return{
            myBooks:[],
            message:''
        }
    },
    async mounted(){
        this.fetchUserIssued();
    },
    methods:{
        async fetchUserIssued(){
            const url = window.location.origin;
            const response = await fetch(url+'/mybooks',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json'
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched UserIssued',data);
                this.myBooks=data;
            } else {
                console.log('Failed to fetch UserIssued.');
            }
        },
        async read(bookid){
            if (this.$route.path != '/read/book/'+bookid){
                this.$router.push('/read/book/'+bookid);
            }
        },
        async ret(bookid){
            if (this.$route.path != '/return/book/'+bookid){
                this.$router.push('/return/book/'+bookid);
            }
        }
    }
});

export default myBooks;