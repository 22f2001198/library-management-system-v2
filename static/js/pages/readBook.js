const readBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Read Book: {{book.bookid}}</h1>
              <br>
              <h3>{{book.name}}</h3>
              <br>
              <strong>Written By:</strong> {{book.author}}
              <br>
              <strong>Section:</strong> {{book.section}}
              <br>
              <strong>Content:</strong><br>
              <p>{{book.content}}</p><br>
              <button class="btn btn-primary" @click="edit(book.bookid)">Edit</button>
            </div>
        </div>
    `,
    data(){
        return{
            book:{},
        }
    },
    async mounted(){
        this.fetchBook();
    },
    methods:{
        close(){
            if (this.$route.path != '/admin/books'){
                this.$router.push('/admin/books');
            }
        },
        edit(bookid){
            if (this.$route.path != '/edit/book/'+bookid){
                this.$router.push('/edit/book/'+bookid);
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
        }
    }
}

export default readBook;