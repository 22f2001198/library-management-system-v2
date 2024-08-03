const browseSection ={
    template:`
    <div>
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
                </div>
                <h1>Browse Section:</h1>
                <div class="mb-3">
                    <label for="type" class="form-label">Section:</label>
                    <select class="form-select" id="section" name="section" v-model="section">
                        <option v-for="section in this.$store.state.Sections" :key="section.id" :value="section.id">{{section.name}}</option>
                    </select>
                    <div v-if="message" class="alert alert-warning">
                        {{message}}
                    </div>
                    <button class="btn btn-success" @click="browse">Browse</button>
                </div>
            </div>
            <div class="card" v-if="this.browseResult.length !== 0">
                <div class="card-body">
                    <table class="table table-bordered" border="2px" border-color="black">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                        <tr v-for="book in this.browseResult" :key="book.bookid">
                            <td>{{book.bookid}}</td>
                            <td>{{book.name}}</td>
                            <td>{{book.section}}</td>
                            <td>{{book.author}}</td>
                            <td><button class="btn btn-primary">Rate</button><button class="btn btn-success">Request</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            section:'',
            browseResult:[],
            message:''
        }
    },
    async mounted(){
        this.$store.dispatch('fetchSections');
    },
    methods:{
        close(){
            if (this.$route.path != '/user'){
                this.$router.push('/user');
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async browse(){
            const url = window.location.origin;
            console.log('Clicked on browse section.');
            const response = await fetch(url+'/section/browse',{
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': this.getCookie('csrf_access_token'),
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "section": this.section
                }),
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched Section books.');
                this.browseResult = data
            } else {
                const data = await response.json();
                alert(data.message);
                if (this.$route.path != '/user'){
                    this.$router.push('/user');
                }
            }
        },
        rate(bookid){
            if (this.$route.path != '/rate/book/'+bookid){
                this.$router.push('/rate/book/'+bookid);
            }
        },
        request(bookid){
            if (this.$route.path != '/request/book/'+bookid){
                this.$router.push('/request/book/'+bookid);
            }
        }
    },
}

export default browseSection;