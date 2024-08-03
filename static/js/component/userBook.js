const userBook = Vue.component('userBook',{
    template:`
    <div class="container">
    <h1>All Books:</h1>
    <div v-if="this.$store.state.Books.length !== 0">
        <table class="table table-bordered" border="2px" border-color="black">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Section</th>
                <th>Author</th>
                <th>Actions</th>
            </tr>
            <tr v-for="book in this.$store.state.Books" :key="book.bookid">
                <td>{{book.bookid}}</td>
                <td>{{book.name}}</td>
                <td>{{book.section}}</td>
                <td>{{book.author}}</td>
                <td><button class="btn btn-primary" @click="rate(book.bookid)">Rate</button><button class="btn btn-success" @click="request(book.bookid)">Request</button></td>
            </tr>
        </table>
    </div>
    <div v-if="this.$store.state.Books.length === 0">
    <p><strong>No Books found.</strong></p>
    </div>
    </div>
    `,
    async mounted(){
        this.$store.dispatch('fetchBooks');
    },
    methods:{
        rate(bookid){
            if (this.$route.path != '/rate/book/'+bookid){
                this.$router.push('/rate/book/'+bookid);
            }
        },
        request(bookid){
            if (this.$route.path != '/request/book/'+bookid){
                this.$router.push('/request/book/'+bookid);
            }
        }
    },
});

export default userBook;