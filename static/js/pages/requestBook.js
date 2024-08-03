const requestBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Request Book: {{book.name}}</h1>
              <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" class="form-control" id="name" name="name" :value="book.name" disabled />
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
                <div class="mb-3">
                    <label for="remarks">Remarks:</label>
                    <input type="text" class="form-control" id="remarks" name="remarks" v-model="remarks" placeholder="Enter your remarks on the book here." required>
                </div>
                <button class="btn btn-primary" @click="request">Request</button>
            </div>
        </div>
    `,
    data(){
        return{
            message:'',
            remarks:'',
            book:{}
        }
    },
    async mounted(){
        this.$store.dispatch('fetchUser');
        this.fetchBook();
    },
    methods:{
        close(){
            if (this.$route.path != '/user/books'){
                this.$router.push('/user/books');
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
        async request(){
            const url = window.location.origin;
            console.log('clicked on request.');
            const response = await fetch(url+'/book/request/'+this.$route.params.bookid,{
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN' : this.getCookie('csrf_access_token'),
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    "remarks":this.remarks
                }),
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('requested successfully.');
                if (this.$route.path != '/user/books'){
                    this.$router.push('/user/books');
                }
            } else {
                const data = await response.json();
                console.log('Book request failed.');
                alert(data.message);
            }
        }
    }
}

export default requestBook;