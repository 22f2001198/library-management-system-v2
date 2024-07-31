const editSection = {
    template:`
        <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Edit Section</h1>
            <div class="mb-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter the section name" required />
                  <div v-if="message" class="alert alert-warning">
                    {{message}}
                  </div>
                </div>
                <div class="mb-3">
                    <label for="created" class="form-label">Created On:</label>
                    <input type="date" class="form-control" placeholder="Date of creation" disabled />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description:</label>
                    <input type="text" class="form-control" v-model="description" placeholder="Enter description" required />
                </div>
                <button type="submit" class="btn btn-primary" @click="edit">Submit</button>
        </div>
      </div>
    </div>
    `,
    async mounted(){
        this.fetchSection();
    },
    data(){
        return{
            name:'',
            description:'',
            message:''
        }
    },
    methods: {
        close(){
            if (this.$route.path != '/admin/sections'){
                this.$router.push('/admin/sections');
            }
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return "";
        },
        async fetchSection(){
            const url = window.location.origin;
            const response = await fetch(url+'/section/edit/'+this.$route.params.id,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('fetched Section',data);
            } else {
                console.log('Failed to get this particular section.');
            }
        },
        async edit(){
            const url = window.location.origin;
            const response = await fetch(url+'/section/edit/'+this.$route.params.id,{
                method:'PUT',
                headers:{
                    'X-CSRF-TOKEN':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json',
                },
                credentials:'include',
                body: JSON.stringify({
                    'name':this.name,
                    'description':this.description,
                }),
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
                console.log('Updated section.');
                if (this.$route.path != '/admin/sections'){
                    this.$router.push('/admin/sections');
                }
            } else {
                console.log('Failed.');
            }
        }
    },
}

export default editSection;