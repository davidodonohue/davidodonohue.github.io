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
<span v-if="data.proteinPer100gPercent">{{ Math.round(data.proteinPer100gPercent) + '%'}} of calories from proteinPer100g</br></span>
<span v-if="data.proteinPer100g">{{data.proteinPer100g}} grams of protein per 100g</br></span>
<span v-if="data.costPerProtein">{{'$' + parseFloat(data.costPerProtein).toFixed(2)}} per 100g of protein</br></span>
<span v-if="data.caloriesPer100g">{{ Math.round(data.caloriesPer100g) }} calories per 100g</br></span>
<span v-if="data.proteinPerItem">{{parseFloat(data.proteinPerItem).toFixed(2)}} grams of protein per item</br></span>
<span v-if="data.caloriesPerItem">{{Math.round(data.caloriesPerItem)}} calories per item</br></span>
<button @click="remove" class='remove'><i class="fas fa-ban"></i> Remove</button>
<button @click="edit" class="edit"><i class="fas fa-edit"></i> Edit</button>
<input type="number" v-model="mixGrams" placeholder="Grams to add" />
<input type="number" v-model="mixServes" placeholder="Serves to add" />
<button @click="mix" class="mix"><i class="fas fa-utensils"></i> Add to mixer</button>
<hr v-if="hr" style="width: 100%;">
    </div>`
});
