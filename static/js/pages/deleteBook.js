const deleteBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Delete Book:</h1> {{book.name}}
              <p><strong>Are you sure you want to delete this book?</strong></p>
              <button class="btn btn-danger" @click="del">Confirm</button>
            </div>
        </div>
    `,
    data(){
        return{
            book : {},
            message : ''
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
        async del(){
            const url = window.location.origin;
            const response = await fetch(url+'/book/delete/'+this.$route.params.bookid,{
                method:'DELETE',
                headers:{
                    'X-CSRF-TOKEN':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('deleted Book',data);
                alert(data.message);
                if (this.$route.path != '/admin/books'){
                    this.$router.push('/admin/books');
                }
            } else {
                console.log('Failed to delete.');
            }
        },
    }
}

export default deleteBook;