const SavedFood = Vue.component('saved-food', {
    props: ['data', 'index', 'hr'],
    data() {
        return {
            mixGrams: null,
            mixServes: null
        }
    },
    methods: {
        remove() {
            this.$emit('remove', this.index);
        },
        edit() {
            this.$emit('edit', this.data);
            this.remove();
        },
        mix() {
            this.$emit('add-to-mix', this.data, this.mixGrams, this.mixServes);
            this.mixGrams = null;
            this.mixServes = null;
        },
    },
    template: `<div>
<p>{{ data.name }}</br>
<span v-if="data.proteinPercent">{{ Math.round(data.proteinPercent) + '%'}} of calories from protein</br></span>
<span v-if="data.costPerProtein">{{'$' + parseFloat(data.costPerProtein).toFixed(2)}} per 100g of protein</br></span>
<span v-if="data.proteinPerServe">{{parseFloat(data.proteinPerServe).toFixed(2)}} grams of protein per serve</br></span>
<span v-if="data.caloriesPerServe">{{Math.round(data.caloriesPerServe)}} calories per serve</br></span>
<span v-if="data.serveGrams">{{Math.round(data.serveGrams)}} grams per serve</br></span>
<button @click="remove" class='remove'><i class="fas fa-ban"></i> Remove</button>
<button v-if="data.editEnabled" @click="edit" class="edit"><i class="fas fa-edit"></i> Edit</button><br>
<input type="number" v-model="mixGrams" placeholder="Grams to add" />
<input type="number" v-model="mixServes" placeholder="Serves to add" />
<button @click="mix" class="mix"><i class="fas fa-utensils"></i> Add to mixer</button>
<hr v-if="hr" style="width: 100%;">
    </div>`
});
