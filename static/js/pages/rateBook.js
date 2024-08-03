const rateBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Rate Book: {{book.name}}</h1>
              <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" class="form-control" id="name" name="name" :value="book.name" disabled />
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
                <div class="mb-3">
                    <label for="section" class="form-label">Rating:</label>
                    <select class="form-select" id="rating" name="rating" v-model="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="comment">Comment:</label>
                    <input type="text" class="form-control" id="comment" name="comment" v-model="comment" placeholder="Enter your comment on the book here." required />
                </div>
                <button class="btn btn-primary" @click="rate">Rate</button>
            </div>
        </div>
    `,
    data(){
        return{
            message:'',
            rating:'',
            comment:'',
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
        async rate(){
            const url = window.location.origin;
            console.log('clicked on rate.');
            const response = await fetch(url+'/book/rate/'+this.$route.params.bookid,{
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN' : this.getCookie('csrf_access_token'),
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    "rating":this.rating,
                    "comment":this.comment
                }),
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('rated successfully.');
                if (this.$route.path != '/user/books'){
                    this.$router.push('/user/books');
                }
            } else {
                console.log('rating request failed.');
                alert(data.message);
            }
        }
    }
}

export default rateBook;