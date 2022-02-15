// --------- Кастомовые селекты на странице
/* Look for any elements with the class "custom-select": */
const customSelect = (select, count) => {
    x = document.getElementsByClassName(select);
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("div");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        a.setAttribute("value", selElmnt.options[selElmnt.selectedIndex].value);
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("div");
        b.setAttribute("class", "select-items select-hide");
        for (j = count; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("div");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
}
customSelect("catalogSort", 0);

// Ширина прокрутки страницы и ширины экрана
const sizeWindow = (screen) => {
    let scrollBar = window.innerWidth - screen;
    return screen + scrollBar;
}

// Переменные для фильтра
let moreFilterButton = document.querySelector('.filterBottom .more'),
    filterWrap = document.querySelector('.filterWrap'),
    filter = document.querySelector('.filter'),
    filterColors = document.querySelector('.filterColors h5'),
    filterParametrsItemTitle = document.querySelectorAll('.filterParametrsItemTitle'),
    filterParametrsItemDropdown = document.querySelectorAll('.filterParametrsItemDropdown'),
    filterColorsWrap = document.querySelector('.filterColorsWrap'),
    catalogNavBtnFilter = document.querySelector('.catalogNavBtnFilter');

// Кнопка открытия фильтра
catalogNavBtnFilter.onclick = function(e) {
    filter.classList.toggle('active');
}
// Выпадающее меню в фильтре
for(btnDropdown of filterParametrsItemTitle) {
    btnDropdown.onclick = function(e) {
        e.currentTarget.nextElementSibling.setAttribute('style', 'width: ' + e.currentTarget.offsetWidth + 'px;');
        // e.currentTarget.nextElementSibling.classList.toggle('active');
        e.currentTarget.parentElement.classList.toggle('active');
    }
}

filterColors.onclick = function(e) {
    e.currentTarget.nextElementSibling.setAttribute('style', 'width: ' + e.currentTarget.offsetWidth + 'px;');
    e.currentTarget.nextElementSibling.classList.toggle('active');
    e.currentTarget.parentElement.classList.toggle('active');
}
// Кнопка показать все параметры в фильтре
moreFilterButton.onclick = function(e) {    
    filterWrap.classList.toggle('active');
    moreFilterButton.classList.toggle('active');
    if(filterWrap.classList.contains('active')) {
        e.currentTarget.children[0].innerHTML = 'Свернуть';
    } else {
        e.currentTarget.children[0].innerHTML = 'Все параметры';
    }
    filterColorsWrap.style.height = (filterWrap.offsetHeight - 35) + 'px'; 
};
function closeFilterParametrsItem (btn, dropdown) {
	$(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $(".filterParametrsItemDropdown"); // тут указываем ID элемента
        var btn = $(".filterParametrsItem"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0
            && !btn.is(e.target)) { // и не по его дочерним элементам
            console.log(!btn.is(e.target))
            div.removeClass('active');
        }  
    });
};

// --------- Меню и поиск
const shopMenuItem = document.querySelectorAll('.shopMenuItem');
const searchMob = document.querySelector('.searchMob');
const navPanel = document.querySelector('.navPanel');
// --------- Отрыть/Закрыть
for(item of shopMenuItem) {
    item.addEventListener('click', e => {
        e.currentTarget.classList.toggle('active');
    })
}

searchMob.addEventListener('click', e => {
    navPanel.classList.toggle('active');
})

//---------- Мобильное меню
let btnOpen = document.getElementById('burger'),
    modal = document.getElementById('mobileMenu'),
    overlay = document.getElementById('overlay'),
    btnClose = document.getElementById('close');

btnOpen.addEventListener('click', function() {
    modal.classList.add('active');
});
function closeModal() {
    modal.classList.remove('active');
}
overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);

//-----------   Фильтр меню
let btnFilter = document.getElementById('btnFilterModal'),
modalFilter = document.getElementById('mobileFilter'),
mobileFilterOverlay = document.querySelector('.mobileFilterOverlay'),
mobileFilterClose = document.querySelector('.mobileFilterClose');


function closeFilterModal() {
    modalFilter.classList.remove('active');
}
btnFilter.addEventListener('click', function() {
    if(sizeWindow(document.body.clientWidth) < 770) { 
        modalFilter.classList.add('active');
    }
});
mobileFilterOverlay.addEventListener('click', closeFilterModal);
mobileFilterClose.addEventListener('click', closeFilterModal);

//---------- Клонирование элементов
// Клонирование в конец списка
const cloneElementWithRemove = (divGet, divInsert) => {
    divInsert.append(divGet)
}
// Клонирование в начало списка
const cloneElementBeforeWithRemove = (divGet, divInsert) => {
    divInsert.prepend(divGet)
}
// Клонирование в конец списка без удаления элемента
const cloneElementWithoutRemove = (divGet, divInsert) => {
    const newDiv = divGet.cloneNode( true );
    divInsert.appendChild( newDiv );
}

// Элементы и их контейнеры для ресайза
const mailHeader = document.querySelector('.mail');
const shopPanel = document.querySelector('.shopPanel');
const headerDesc = document.querySelector('.headerDesc');
const logoWrap = document.querySelector('.logoWrap');
const phoneWrapper  = document.querySelector('.phoneWrapper');
const phoneBlock  = document.querySelector('.phoneBlock');
const phones  = document.querySelector('.phones');
const geopositions  = document.querySelector('.geopositions');
const mobileMenuTop  = document.querySelector('.mobileMenuTop ');
const topPanel  = document.querySelector('.topPanel ');
const mobileMenuLogo  = document.querySelector('.logo ');
const mobileMenu  = document.querySelector('.menu');
const shopMenu  = document.querySelector('.shopMenu');
const mobileMenuContacts  = document.querySelector('.mobileMenuContacts');
const mobileMenuNav  = document.querySelector('.mobileMenuNav');
const partnersOpen  = document.querySelector('.partnersOpen');
const partnersTop  = document.querySelector('.partnersTop');
const partners  = document.querySelector('.partners');
const footerNetworks  = document.querySelector('.footerNetworks');
const footerWrapper  = document.querySelector('.footerWrapper');
const footerContacts  = document.querySelector('.footerContacts');
const sidebar  = document.querySelector('.sidebar');

const filterBottom  = document.querySelector('.filterBottom');
const mobileFilterList  = document.querySelector('.mobileFilterList');
const mobileMenuTopFilter  = document.querySelector('.mobileMenuTopFilter');

const filterParametrsRangeFrom  = document.getElementById('filterParametrsRangeFrom');
const filterParametrsRangeTo  = document.getElementById('filterParametrsRangeTo');

let isClonelogo = false;

if(sizeWindow(document.body.clientWidth) > 769) { 
    closeFilterParametrsItem();
}
if(sizeWindow(document.body.clientWidth) < 770) { 
    cloneElementWithoutRemove(mobileMenuLogo, mobileMenuTop);      
    cloneElementWithoutRemove(mobileMenuLogo, mobileMenuTopFilter);
    cloneElementWithRemove(phoneBlock, mobileMenuContacts); 
    cloneElementWithRemove(headerDesc, phones);
    cloneElementWithRemove(partnersOpen, partners); 
    cloneElementWithRemove(footerNetworks, footerWrapper);
    cloneElementWithRemove(shopMenu, mobileMenuNav);
    cloneElementWithRemove(mobileMenu, mobileMenuNav);        
    cloneElementWithRemove(filterWrap, mobileFilterList);   
    cloneElementWithRemove(filterBottom, mobileFilterList); 

    filterParametrsRangeFrom.value = 0;
    filterParametrsRangeTo.value = 5010;    

    isClonelogo = true;

    // Новый формат фильтра в мобильном меню
    let filterParametrsItemDropdownWrap = document.querySelectorAll('.filterParametrsItemDropdownWrap');
    let filterColorsWrap = document.querySelectorAll('.filterColorsWrap');

    const changeDropdownInMobile = dropdown => {
        for(dropdownMenu of dropdown) {
            if(dropdownMenu.children.length > 4) {
                for(var i = 4; i < dropdownMenu.children.length; i++) {
                    dropdownMenu.children[i].classList.add('hidden'); 
                }
                let elMore = document.createElement("div");
                elMore.classList.add('more');
                elMore.innerHTML = `
                <div>Показать еще </div>
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.24315 0.0893921C9.12396 -0.0297974 8.90942 -0.0297974 8.76639 0.0893921L4.66627 4.21335L0.56615 0.0893921C0.423123 -0.0297974 0.208582 -0.0297974 0.0893921 0.0893921C-0.0297974 0.208582 -0.0297974 0.423123 0.0893921 0.56615L4.42789 4.90465C4.4994 4.97616 4.57092 5 4.66627 5C4.73778 5 4.83314 4.97616 4.90465 4.90465L9.24315 0.56615C9.38617 0.423123 9.38617 0.208582 9.24315 0.0893921Z" fill="#61C100"/>
                </svg>
                `;
                dropdownMenu.appendChild( elMore );
    
                elMore.addEventListener('click', e => {
                    for(var i = 0; i < e.currentTarget.parentElement.children.length; i++) {
                        e.currentTarget.parentElement.children[i].classList.remove('hidden'); 
                        e.currentTarget.classList.add('hidden');
                    }
                })
            }
        }    

    }
    changeDropdownInMobile(filterParametrsItemDropdownWrap);
    changeDropdownInMobile(filterColorsWrap);
} 


$(window).resize(function () {
    closeModal();
    closeFilterModal();
    switch (true) {
        // Мобильное разрешение
        case sizeWindow(sizeWindow(document.body.clientWidth))  < 770:

            if(!isClonelogo) {
                cloneElementWithoutRemove(mobileMenuLogo, mobileMenuTop);
                cloneElementWithoutRemove(mobileMenuLogo, mobileMenuTopFilter);
                isClonelogo = true;
            }
            cloneElementWithRemove(phoneBlock, mobileMenuContacts); 
            cloneElementWithRemove(headerDesc, phones);
            cloneElementWithRemove(partnersOpen, partners); 
            cloneElementWithRemove(footerNetworks, footerWrapper);
            cloneElementWithRemove(shopMenu, mobileMenuNav);
            cloneElementWithRemove(mobileMenu, mobileMenuNav);               
            cloneElementWithRemove(filterWrap, mobileFilterList);   
            cloneElementWithRemove(filterBottom, mobileFilterList); 
            
            btnFilter.addEventListener('click', function() {
                if(sizeWindow(document.body.clientWidth) < 770) { 
                    modalFilter.classList.add('active');
                }
            });
            
            filterParametrsRangeFrom.value = 0;
            filterParametrsRangeTo.value = 5010;
            break;
        // Планшетное разрешение после мобильного
        case sizeWindow(document.body.clientWidth)  > 769:    
                    
            cloneElementWithRemove(phoneBlock, phoneWrapper ); 
            cloneElementWithRemove(headerDesc, geopositions);          
            cloneElementWithRemove(partnersOpen, partnersTop);   
            cloneElementWithRemove(footerNetworks, footerContacts); 
            cloneElementBeforeWithRemove(shopMenu, sidebar);             
            cloneElementWithRemove(mobileMenu, navPanel);   
            cloneElementWithRemove(filterWrap, filter);   
            cloneElementWithRemove(filterBottom, filter); 
           
            filterParametrsRangeFrom.value = 'Цена от, р.';
            filterParametrsRangeTo.value = 'до, р.';

            closeFilterParametrsItem();
            break;       
    }
});

$(document).ready(function(){
    const partners = (num) => {
        $(".partnersItem").slice(0, num).show();
        $(".partnersOpen").on("click", function(e){
          e.preventDefault();
          $(".partnersItem:hidden").slice(0, num).slideDown();
            if($(".partnersItem:hidden").length == 0) {
                $(".partnersOpen").addClass("hidden");
            }
        });
    }
    if(document.body.clientWidth > 1200) {
        partners(6);
    } else if(document.body.clientWidth > 768)  {
        partners(4);
    } else if(document.body.clientWidth > 567)  {
        partners(3);
    } else if(document.body.clientWidth > 319)  {
        partners(2);
    }
    
})