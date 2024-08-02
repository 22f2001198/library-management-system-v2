const adminBooks = Vue.component('adminBooks',{
    template:`
    <div class="container">
    <h1>All Books:</h1>
    <div v-if="this.$store.state.Books.length !== 0">
        <table class="table table-bordered" border="2px" border-color="black">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Section ID</th>
                <th>Author</th>
                <th>Actions</th>
            </tr>
            <tr v-for="book in this.$store.state.Books" :key="book.bookid">
                <td>{{book.bookid}}</td>
                <td>{{book.name}}</td>
                <td>{{book.section}}</td>
                <td>{{book.author}}</td>
                <td><button class="btn btn-primary" @click="read(book.bookid)">Read</button><button class="btn btn-danger" @click="del(book.bookid)">Delete</button></td>
            </tr>
        </table>
    </div>
    <div v-if="this.$store.state.Books.length === 0">
    <p><strong>No Books added yet.</strong></p>
    </div>
    <button class="btn btn-success" @click="add">+ Add new Book</button>
    </div>
    `,
    async mounted(){
        this.$store.dispatch('fetchBooks');
    },
    methods: {
        add(){
            if (this.$route.path != '/add/book'){
                this.$router.push('/add/book');
            }
        },
        read(bookid){
            if (this.$route.path != '/read/book/'+bookid){
                this.$router.push('/read/book/'+bookid);
            }
        },
        del(bookid){
            if (this.$route.path != '/delete/book/'+bookid){
                this.$router.push('/delete/book/'+bookid);
            }
        }
    },
});

export default adminBooks;