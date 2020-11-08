const SavedFood = Vue.component('saved-food', {
    props: ['data', 'index', 'hr'],
    methods: {
        remove() {
            this.$emit('remove', this.index);
        },
        edit() {
            this.$emit('edit', this.data);
            this.remove();
        }
    },
    template: `<div>
<p>{{ data.name }}</br>
<span v-if="data.proteinratio">{{ Math.round(data.proteinratio) + '%'}} of calories from protein</br></span>
<span v-if="data.protein">{{data.protein}} grams of protein per 100g</br></span>
<span v-if="data.costOfProtein">{{'$' + parseFloat(data.costOfProtein).toFixed(2)}} per 100g of protein</br></span>
<span v-if="data.calories">{{ Math.round(data.calories) }} calories per 100g</br></span>
<span v-if="data.proteinPerItem">{{parseFloat(data.proteinPerItem).toFixed(2)}} grams of protein per item</br></span>
<span v-if="data.caloriesPerItem">{{Math.round(data.caloriesPerItem)}} calories per item</br></span>
<button @click="remove" class='remove'><i class="fas fa-ban"></i> Remove</button>
<button @click="edit" class="edit"><i class="fas fa-edit"></i> Edit</button>
<hr v-if="hr" style="width: 100%;">
    </div>`
});
