const issueBook = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Issue Book: {{book.name}}</h1>
              <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" class="form-control" id="name" name="name" :value="book.name" disabled />
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
                <div class="mb-3">
                    <label for="user">User:</label>
                    <input type="text" class="form-control" id="user" name="user" :value="user.username" disabled />
                </div>
                <div class="mb-3">
                    <label for="doi" class="form-label">Issued On:</label>
                    <input type="date" class="form-control" v-model="doi" placeholder="Enter date of creation" required />
                </div>
                <button class="btn btn-primary" @click="issue">Issue</button>
            </div>
        </div>
    `,
    data(){
        return{
            message:'',
            book:{},
            doi:'',
            user:{}
        }
    },
    async mounted(){
        this.fetchBook();
        this.fetchUser();
    },
    methods:{
        close(){
            if (this.$route.path != '/admin/requests'){
                this.$router.push('/admin/requests');
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
        async fetchUser(){
            const url = window.location.origin;
            const response = await fetch(url+'/user/'+this.$route.params.id,{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                this.user = data;
                console.log('fetched user',data);
            } else {
                console.log('failed to get user.');
            }
        },
        async issue(){
            const url = window.location.origin;
            console.log('clicked on issue.');
            const response = await fetch(url+'/book/issue/'+this.$route.params.id+'/'+this.$route.params.bookid,{
                method: 'POST',
                headers: {
                    'X-CSRF-Token':this.getCookie('csrf_access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "doi":this.doi
                }),
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('Book issued successfully.');
                if (this.$route.path != '/admin/issued'){
                    this.$router.push('/admin/issued');
                }
            } else {
                console.log('Failed.');
            }
        },
    }
}

export default issueBook;