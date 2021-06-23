'use strict'

class Carusel{
    constructor({
        count,
        section,
        elements
    }){
        this.section = document.querySelector(section);
        this.elements = document.querySelectorAll(elements);
        this.count = count;
        this.main = this.section.firstElementChild;
        this.elemLendth = this.elements.length;
        this.allDots = [];
        this.caruselDots = "";
        this.widthMain = 0;
        this.position = 0;
        
    }

    //--------управление количеством отображаемых айтемов--------
    widthForCarusel(){
        let widthSection = parseInt(getComputedStyle(this.section).width)
        this.widthMain = widthSection/this.count*this.elemLendth;
        this.main.style.width = this.widthMain+'px';
    }

    //-----создание навигационных кружочков-----
    createDots(){
        let ul = document.createElement('ul');
        ul.classList.add('carusel_dots');
        this.main.after(ul);

        this.createLi();
            

    }

    createLi(){
        this.caruselDots = document.querySelector('.carusel_dots');
        let countCreate = this.elemLendth/this.count;
        let c = 0;
        for(let i = 0; i < countCreate; i++){
            let li = document.createElement('li');
            li.classList.add('carusel_dot');
            li.setAttribute('data-number', c);
            this.caruselDots.append(li);
           
                c+=this.count;   
          
                   
        }

        if (this.elemLendth % this.count > 0) {
            let z = +this.caruselDots.querySelector('.carusel_dot:last-child').getAttribute('data-number');
            z = this.elemLendth - this.count;
            this.caruselDots.querySelector('.carusel_dot:last-child').setAttribute('data-number', z);
        }

       
    }

    // Генерируем стрелки
    createArrows(){

       const  str = ` <ul class="carusel_btn">
            <li class="arrow_left">&lsaquo;</li>
            <li class="arrow_right">&rsaquo;</li>
        </ul>`;

        this.main.insertAdjacentHTML('afterEnd', str);
    }

    // Привязываем событие
    events() {
        this.section.addEventListener('click', this.clicks.bind(this));
    }

    clicks(e) {
        let target = e.target;

        if(target.matches('.arrow_left')) {
            if(this.position>0) {
                --this.position;
            }
            
        }

        if(target.matches('.arrow_right')) {
            if(this.position<this.elemLendth - this.count) {
                ++this.position;
            } 
        }

        if(target.matches('.carusel_dot')) {
            let c = +target.getAttribute('data-number');
            this.position = c;}


        console.log(this.position);

        this.pushCarusel();
    }


    pushCarusel() {
        let offset = (this.widthMain / this.elemLendth) * this.position;

        this.main.style.transform = `translateX(-${offset}px)`;
        this.main.style.transition = 'transform 0.5s';

        console.log(offset);
    }




    init() {
        this.widthForCarusel();
        // this.createDots();
        this.createArrows();
        this.events();

       
    }

}


const parameter = {
        count: 4,
        section: '.candidates__elem',
        elements: '.elem',
        navigation: 'arrow'/'dots'/'full'
};

const caruselData = new Carusel(parameter);

caruselData.init();



//------------------------------header aнимация всплытия----------------------------------

window.onscroll = () => {

    let scroll = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector('.header');

    if(scroll > 0){
        header.classList.add('fixed');
    }else{
        header.classList.remove('fixed');
    }
  }

  //--------------------------------TABS-----------------------------------------------

class Tabs{
    constructor(tab, item, tabs, items){
        this.tab = document.querySelector(tab);
        this.item = document.querySelector(item);
        this.allTabs = Array.from(this.tab.querySelectorAll(tabs));
        this.items = this.item.querySelectorAll(items);
    }


    // Перекючение активной вкладки
    activeTabs() {
        this.tab.addEventListener('mousemove', this.act.bind(this));
    }

    act(e) {
        const target = e.target;

        const oldTab = this.tab.querySelector('.active');
        oldTab.classList.remove('active');

        target.classList.add('active');

        this.openTabs();
    }

    openTabs(elem) {
       
       const a = this.tab.querySelector('.active');
       const i = this.allTabs.indexOf(a);

       this.item.querySelector('.active').classList.remove('active');
        
       this.items[i].classList.add('active');
     }

    init(){
        this.activeTabs();
        
    }
}

const d = new Tabs('.tabs', '.items', '.tab', '.item');

d.init();

//---------------------------skrolling--------------------------------


class Scrolling{
    constructor({
        arrowTop,
        link,
    }){
        this.up = document.querySelector(arrowTop);
        this.link = document.querySelectorAll(link);
    }

    //----убираем стрелку навигации когда мы вверху----
    upEvent(){
        this.up.addEventListener('click', this.scrollUp.bind(this));
        window.addEventListener('scroll', this.scrollHidden.bind(this));
    }

    scrollUp(){
        let top = document.querySelector('#top');
        console.log(top)
                top.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });
    }

    scrollHidden(){
        this.up.hidden = (pageYOffset < document.documentElement.clientHeight);
    }

    //-----работаем с ссылками меню-----

    linkAlone(){
        this.link.forEach(this.elementEvent.bind(this))
    }

    elementEvent(elem){
        if(elem){
            elem.addEventListener('click', function(event){
                event.preventDefault();
                let href = elem.getAttribute('href');
                let section = document.querySelector(href);
                section.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });
            });
        }
    }

   
    
    init(){
        this.linkAlone();
        this.upEvent();
    }
}

const scroll = {
    arrowTop: '.up',
    link: '.header__menu a, .main a',
};

const scrollLink = new Scrolling(scroll);

scrollLink.init();

// export default Scrolling;