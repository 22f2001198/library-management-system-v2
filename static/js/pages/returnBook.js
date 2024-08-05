const returnBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Return Book:</h1>
              <p><strong>Are you sure you want to return this book?</strong></p>
              <button class="btn btn-danger" @click="ret">Confirm</button>
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
            if (this.$route.path != '/user/mybooks'){
                this.$router.push('/user/mybooks');
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
        async ret(){
            const url = window.location.origin;
            const response = await fetch(url+'/book/return/'+this.$route.params.bookid,{
                method:'DELETE',
                headers:{
                    'X-CSRF-TOKEN':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('returned Book',data);
                alert(data.message);
                if (this.$route.path != '/user/mybooks'){
                    this.$router.push('/user/mybooks');
                }
            } else {
                console.log('Failed to return.');
            }
        },
    }
}

export default returnBook;