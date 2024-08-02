const editBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Edit Book: {{book.bookid}}</h1>
              <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" class="form-control" id="name" name="name" :value="book.name" disabled />
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
              <div class="mb-3">
                    <label for="author" class="form-label">Author:</label>
                    <input type="text" class="form-control" id="author" name="author" v-model="author" placeholder="Enter author name" required />
                </div>
                <div class="mb-3">
                    <label for="content">Content:</label>
                    <input type="text" class="form-control" id="content" name="content" v-model="content" placeholder="Enter the book content" required>
                </div>
                <div class="mb-3">
                    <label for="section" class="form-label">Section:</label>
                    <select class="form-select" id="s_id" name="s_id" v-model="book.s_id">
                        <option v-for="section in this.$store.state.Sections" :key="section.id" :value="section.id">{{section.name}}</option>
                    </select>
                </div>
                <button class="btn btn-primary" @click="edit">Edit</button>
            </div>
        </div>
    `,
    data(){
        return{
            book:{},
            message:'',
            author:'',
            content:''
        }
    },
    async mounted(){
        this.fetchBook();
        this.$store.dispatch('fetchSections');
    },
    methods:{
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
        async fetchBook(){
            const url = window.location.origin;
            const response = await fetch(url+'/book/'+this.$route.params.bookid,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                this.book = data;
                console.log('fetched book',data);
            } else {
                console.log('failed to get book.');
            }
        },
        async edit(){
            const url =window.location.origin;
            console.log('clicked on edit');
            const response = await fetch(url+'/book/edit/'+this.$route.params.bookid,{
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN' : this.getCookie('csrf_access_token'),
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    "author":this.author,
                    "content":this.content,
                }),
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('Updated Successfully.');
                if (this.$route.path != '/admin/books'){
                    this.$router.push('/admin/books');
                }
            } else {
                console.log('Failed.');
            }
        }
    }
}

export default editBook;