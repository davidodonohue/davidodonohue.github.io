const SavedFood = Vue.component('saved-food', {
    props: ['data', 'index', 'hr'],
    data() {
        return {
            trackerGrams: null,
            trackerServes: null
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
        track() {
            this.$emit('add-to-tracker', this.data, this.trackerGrams, this.trackerServes);
            this.trackerGrams = null;
            this.trackerServes = null;
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
<input type="number" v-model="trackerGrams" placeholder="Grams to add" />
<input type="number" v-model="trackerServes" placeholder="Serves to add" />
<button @click="track" class="edit"><i class="fas fa-utensils"></i> Add to tracker</button>
<hr v-if="hr" style="width: 100%;">
    </div>`
});
