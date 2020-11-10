const TrackedItem = Vue.component('tracked-item', {
    props: ['item', 'index'],
    methods: {
        removeTrackedItem(){
            this.$emit('remove-tracked-item', this.index)
        }
    },
    template: `<div class="trackedItem">
    {{item.name}}<br>
    <span v-if="item.amountGrams">{{item.amountGrams}} grams<br></span>
    <span v-if="item.amountServes">{{item.amountServes}} serves<br></span>
    <button @click="removeTrackedItem" class="edit"><i class="fas fa-minus-circle"></i> Remove item from tracker</button>
</div>`
});
