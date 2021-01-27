const NavBar = Vue.component('nav-bar', {
    data () {
        return {
            pages: [
                {name: "Home", url: "index.html"},
                {name: "Treatise", url: "treatise.html"},
                {name: "Book Reviews", url: "book-reviews.html"},
                {name: "Projects", url: "projects.html"},
                {name: "Quotes", url: "quotes.html"},
                {name: "YouTube", url: "https://www.youtube.com/channel/UCalf_ITbJtXeo3mWtMMVRkQ"},
                {name: "Social", url: "social.html"},
            ]
        }
    },

    template: `<div class="navbar">
    <a :href="page.url" v-for="page in pages">{{page.name}}</a>
</div>`
});
