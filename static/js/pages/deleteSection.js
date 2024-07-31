const deleteSection = {
    template:`
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
              </div>
              <h1>Delete Section</h1>
              <p><strong>Are you sure you want to delete?</strong></p>
              <button class="btn btn-danger" @click="del">Confirm</button>
            </div>
        </div>
    `,
    mounted(){
        this.fetchSection();
    },
    data(){
        return{
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
        async del(){
            const url = window.location.origin;
            const response = await fetch(url+'/section/delete/'+this.$route.params.id,{
                method:'DELETE',
                headers:{
                    'X-CSRF-TOKEN':this.getCookie('csrf_access_token'),
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const data = await response.json();
                console.log('deleted Section',data);
                alert(data.message);
                if (this.$route.path != '/admin/sections'){
                    this.$router.push('/admin/sections');
                }
            } else {
                console.log('Failed to delete.');
            }
        },
    },
}

export default deleteSection;