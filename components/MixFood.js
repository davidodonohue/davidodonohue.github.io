const MixFood = Vue.component('mix-food', {
    props: ['food', 'index'],
    methods: {
        removeMixFood(){
            this.$emit('remove-mix-food', this.index)
        }
    },
    template: `<div class="mixFood">
    {{food.name}}<br>
    <span v-if="food.amountGrams">{{food.amountGrams}} grams<br></span>
    <span v-if="food.amountServes">{{food.amountServes}} serves<br></span>
    <button @click="removeMixFood" class="removeMix"><i class="fas fa-minus-circle"></i> Remove food from mixer</button>
</div>`
});
