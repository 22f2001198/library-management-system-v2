const addBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Add a Book:</h1>
                <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" class="form-control" id="name" name="name" v-model="book.name" placeholder="Enter the book name" required>
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
                <div class="mb-3">
                    <label for="author" class="form-label">Author:</label>
                    <input type="text" class="form-control" id="author" name="author" v-model="book.author" placeholder="Enter author name" required />
                </div>
                <div class="mb-3">
                    <label for="content">Content:</label>
                    <input type="text" class="form-control" id="content" name="content" v-model="book.content" placeholder="Enter the book content" required>
                </div>
                <div class="mb-3">
                    <label for="section" class="form-label">Section:</label>
                    <select class="form-select" id="s_id" name="s_id" v-model="book.s_id">
                        <option v-for="section in this.$store.state.Sections" :key="section.id" :value="section.id">{{section.name}}</option>
                    </select>
                </div>
                <button class="btn btn-primary" @click="add">+ Add a book.</button>
            </div>
        </div>
    `,
    data(){
        return{
            message:'',
            book:{
                name:'',
                author:'',
                content:'',
                s_id:'',
            },
        }
    },
    async mounted(){
        this.$store.dispatch('fetchSections');
    },
    methods: {
        close(){
            if (this.$route.path != '/admin/books'){
                this.$router.push('/admin/books');
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async add(){
            console.log('clicked on add book.');
            const url = window.location.origin;
            const response = await fetch(url+'/book/add',{
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "name":this.book.name,
                    "author":this.book.author,
                    "s_id":this.book.s_id,
                    "content":this.book.content
                }),
            });
            if (response.status === 201){
                const data = await response.json();
                alert(data.message);
                console.log('Successfully added the book');
                if (this.$route.path != '/admin/books'){
                    this.$router.push('/admin/books');
                }
            } else {
                const data = await response.json();
                alert(data.message);
                console.log('Failed to add the book.');
            }
        },
    },
}

export default addBook;