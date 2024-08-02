const adminSection = Vue.component('adminSection',{
    template:`
    <div class="container">
    <h1>All Sections:</h1>
    <div v-if="this.$store.state.Sections.length !== 0">
    <table class="table table-bordered" border="2px" border-color="black">
        <tbody>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Created On</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            <tr v-for="section in this.$store.state.Sections" :key="section.id">
                <td>{{section.id}}</td>
                <td>{{section.name}}</td>
                <td>{{section.created}}</td>
                <td>{{section.description}}</td>
                <td><button class="btn btn-primary" @click="edit(section.id)">Edit</button><button class="btn btn-danger" @click="del(section.id)">Delete</button></td>
            </tr>
        </tbody>
    </table>
    </div>
    <div v-if="this.$store.state.Sections.length == 0">
        No Sections created yet.
    </div>
    <br>
    <button class="btn btn-success" @click="add">+ Add section</button>
    </div>
    `,
    data(){
        return{message:''}
    },
    async mounted(){
        this.$store.dispatch('fetchSections');
    },
    methods: {
        add(){
            if (this.$route.path != '/add/section'){
                this.$router.push('/add/section');
            }
        },
        edit(id){
            if (this.$route.path != '/edit/section/'+id){
                this.$router.push('/edit/section/'+id);
            }
        },
        del(id){
            if (this.$route.path != '/delete/section/'+id){
                this.$router.push('/delete/section/'+id);
            }
        }
    }
});

export default adminSection;