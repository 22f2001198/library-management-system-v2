const userSection = Vue.component('userSection',{
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
            </tr>
            <tr v-for="section in this.$store.state.Sections" :key="section.id">
                <td>{{section.id}}</td>
                <td>{{section.name}}</td>
                <td>{{section.created}}</td>
                <td>{{section.description}}</td>
            </tr>
        </tbody>
    </table>
    </div>
    <div v-if="this.$store.state.Sections.length == 0">
        No Sections present.
    </div>
    <br>
    <button class="btn btn-success" @click="browse">Browse by Section.</button>
    </div>
    `,
    async mounted(){
        this.$store.dispatch('fetchSections');
    },
    methods: {
        browse(){
            if (this.$route.path != '/browse/section'){
                this.$router.push('/browse/section');
            }
        }
    },
});

export default userSection;