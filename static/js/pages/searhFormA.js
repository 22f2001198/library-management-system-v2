const searchFormA = {
    template:`
    <div>
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
                </div>
                <h1>Search Book:</h1>
                <div class="mb-3">
                    <label for="type" class="form-label">Type:</label>
                    <select class="form-select" id="type" name="type" v-model="type">
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                    </select>
                    <div v-if="message" class="alert alert-warning">
                        {{message}}
                    </div>
                </div>
                <div class="mb-3">
                    <label for="query">Text:</label>
                    <input type="text" class="form-control" id="query" name="query" v-model="query" placeholder="Enter the search text" required>
                </div>
                <button class="btn btn-primary" @click="search">Search</button>
            </div>
            <div class="card" v-if="this.searchResult.length !== 0">
                <div class="card-body">
                    <table class="table table-bordered" border="2px" border-color="black">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                        <tr v-for="book in this.searchResult" :key="book.bookid">
                            <td>{{book.bookid}}</td>
                            <td>{{book.name}}</td>
                            <td>{{book.section}}</td>
                            <td>{{book.author}}</td>
                            <td><button class="btn btn-primary" @click="read(book.bookid)">Read</button><button class="btn btn-danger" @click="del(book.bookid)">Delete</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            type:'',
            query:'',
            searchResult:[],
            message:''
        }
    },
    methods:{
        close(){
            if (this.$route.path != '/admin'){
                this.$router.push('/admin');
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async search(){
            const url = window.location.origin;
            console.log('Clicked on search.');
            const response = await fetch(url+'/search',{
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': this.getCookie('csrf_access_token'),
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "type": this.type,
                    "query": this.query
                }),
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched Search results.');
                this.searchResult = data
            } else {
                const data = await response.json();
                alert(data.message);
                if (this.$route.path != '/admin'){
                    this.$router.push('/admin');
                }
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
    }
}

export default searchFormA;