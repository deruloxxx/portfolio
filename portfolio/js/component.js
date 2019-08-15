// navigation component
Vue.component(`navigation`,{
    template: `
        <nav class="nav-right" id="nav">
            <ul class="global">
                <li class="linktext"><a href ="../html/works.html">WORKS</a></li>
                <li class="linktext"><a href ="../contact/contact.html">CONTACT</a></li>
            </ul>
        </nav>
        `
})
// h1 component
Vue.component(`h1-title`,{
    template: ` 
            <h1 class="tlt" data-in-effect="fadeInDown" data-in-shuffle="true">Riuya</h1> 
    `
})

// h2 component
Vue.component('h2-catch',{
    template: '<h2 class="sectiontitle">{{ val }}</h2>',
    props: ['val']
})

//  text component
// 考える必要あり
Vue.component(`home-text`,{
    template: `<p class="hometext">{{ message[0].text }}</p>`,
    data: function () {
        return{
            message:[
                {text: 'Design + Development'}
            ] 
        } 
    }
})
// button component

// mouse scroll line
Vue.component(`mouse-scroll-line`,{
    template: ` 
            <div class="line"></div>
    `
})
new Vue ({
    el: '#header'
})
new Vue ({ 
    el: '#main',
    data: {
        headings: [
            { intoroduce: 'Intoroduce' },
            { skill: 'Skill' },
        ],
    }
})