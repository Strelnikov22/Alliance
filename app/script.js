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

    // renderPositionBegin() {
    //     if(this.position>0) {
    //         --this.position;
    //     }
        
    // }
    // renderPositionEnd() {
    //     if(this.position<this.elemLendth - this.count) {
    //         ++this.position;
    //     }       
    // }
    // renderPositionBut(n) {
    //        this.position = n;
    // }

    pushCarusel() {
        let offset = (this.widthMain / this.elemLendth) * this.position;

        this.main.style.transform = `translateX(-${offset}px)`;
        this.main.style.transition = 'transform 0.5s';

        console.log(offset);
    }




    init() {
        this.widthForCarusel();
        this.createDots();
        this.createArrows();
        this.events();

       
    }
    // //------навигация кружочков-------
    // dotsEvent(){
    //     this.caruselDots.addEventListener('click', this.dotsTarget.bind(this));
    // }

    // dotsTarget(event){
    //     let target = event.target;

    //     if(target.matches('.carusel_dot')){
    //         let c = +target.getAttribute('data-number');
            
    //         let widthElem = this.widthMain/this.elemLendth;
    //         let offsetElem = widthElem*this.count*c-(widthElem*this.count);

    //         this.main.style.transform = `translate(-${offsetElem}px)`;
    //         this.main.style.transition = 'all 0.8s';
            
    //         this.position = c;
    //         console.log(c);
    //         console.log(this.position);
    //         }
            
    //     }

    // pushElem(i){
    //     let widthElem = this.widthMain/this.elemLendth;
      
    //     this.main.style.transform = `translate(-${widthElem*i}px)`;
    //     this.main.style.transition = 'all 0.8s';
    // }


    // //-----создание навигационных кнопок-----
    // createArrows(){
    //     const arrowsContainer = document.createElement('ul');
    //     const arrowLeft = document.createElement('li');
    //     const arrowRight = document.createElement('li');

    //     arrowsContainer.classList.add('carusel_btn');
    //     arrowLeft.classList.add('arrow_left');
    //     arrowRight.classList.add('arrow_right');

    //     this.main.after(arrowsContainer);
    //     arrowsContainer.prepend(arrowLeft);
    //     arrowsContainer.append(arrowRight);
    // }

    // //-----навигация навигационных кнопок-----
    // leftRight() {
    //     document.querySelector('.carusel_btn').addEventListener('click', this.clicks.bind(this));
    // }

    // clicks(event) {
    //     let target = event.target;

    //     if (target.matches('.arrow_left')) {
    //         if(this.position>0) {
    //             --this.position;
    //             console.log(this.position);
    //             this.pushElem(this.position);
    //         }
    //     }

    //     if (target.matches('.arrow_right')) {
    //         if(this.position < this.elemLendth-this.count) {
    //             ++this.position;
    //             console.log(this.position);
    //             this.pushElem(this.position);
    //         }
    //     }
    // }

    // counterPosition(n) {
    //     if(this.position>2) {
    //         this.position = this.position - n;
    //     }   
        
    // }

    // init(){
    //     this.widthForCarusel();
    //     this.createDots();
    //     this.createArrows();
    //     this.dotsEvent();
    //     this.leftRight();
    // }
}


const parameter = {
        count: 4,
        section: '.partner__items',
        elements: '.element',
        navigation: 'arrow'/'dots'/'full'
};

const caruselData = new Carusel(parameter);

caruselData.init();


// Object()
// Map()
// Set()
// Array()