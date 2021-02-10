const Social = Vue.component('social', {
    methods: {
        copyToClipboard(text){
            if (navigator.clipboard){
                navigator.clipboard.writeText(text)
                .catch(
                    function() {
                        console.log("Error copying to clipboard");
                });
            } else {
                console.log("Clipboard API not supported on this device");
            }  
        }
    },
    template: `<div class="page">
    <div class="pageTile">
    <h1 class="banner">Social</h1>
</div>
<div class="pageTile">
    <div class="card">
        <h3>Phone</h3>
        <a href="sms:0401609112" class="styledButton"><i class="far fa-comment"> SMS me</i></a>
        <button @click="copyToClipboard('0401609112')" class="styledButton"><i class="far fa-copy"> Copy my phone number</i></button>
        <h3>Email</h3>
        <a href="mailto:subjectification@gmail.com" class="styledButton"><i class="fas fa-envelope"> Email me</i></a>
        <button @click="copyToClipboard('subjectification@gmail.com')" class="styledButton"><i class="far fa-copy"> Copy my email address</i></button>
        <h3>Social</h3>
        <a href="whatsapp://send?text=Check out this website! www.davidodonohue.github.io" class="styledButton"><i class="far fa-paper-plane"> Share this page via WhatsApp</i></a>
    </div>
</div>
    </div>`
});
