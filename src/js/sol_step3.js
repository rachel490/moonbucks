import {$} from './utils/DOM.js';
import store from './store/index.js';

const BASE_URL = 'http://localhost:3000/api';

function App() {
    this.menu = {
        espresso : [],
        frappuccino : [],
        blended : [],
        teavana : [],
        desert: []
    };

    this.currentCategory = 'espresso';

    this.init = () => {
        if (store.getLocalStorage()) {
            this.menu = store.getLocalStorage(); 
        }
        render();
        initEventListeners();
    }

    const render = () => {
        const template = this.menu[this.currentCategory].map((item,index) => {
            return (`
                <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" : ""}">${item.name}</span>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                    >
                        품절
                    </button>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                    >
                        삭제
                    </button>
                </li>
            `)
        }).join('');

        $('#menu-list').innerHTML = template;

        updateCount();
    }

    const updateCount = () => {
        const menuCount = this.menu[this.currentCategory].length;
        $('.menu-count').innerText = `총 ${menuCount}개`;
    }

    const addNewMenu = () => {
        const newMenu = $('#menu-name').value;
        if (!newMenu) {return};

        // this.menu[this.currentCategory].push({name:newMenu});
        // store.setLocalStorage(this.menu);

        fetch(`${BASE_URL}/category/${this.currentCategory}/menu`, {
            method : "POST",
            headers : {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify({
                name : newMenu
            })
        }).then(response => response.json())
        .then(data => console.log(data))
        
        fetch(`${BASE_URL}/category/${this.currentCategory}/menu`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // this.menu[this.currentCategory].push(data);
            // render();
            // $('#menu-name').value = "";
        })
    }

    const editMenu = e => {
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const editedMenu = prompt('새로운 메뉴를 입력해주세요.', $menuName.innerText);

        const menuId = e.target.closest('li').dataset.menuId;
        this.menu[this.currentCategory][menuId].name = editedMenu;
        store.setLocalStorage(this.menu);

        render();
    }

    const removeMenu = e => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            e.target.closest('li').remove();

            const menuId = e.target.closest('li').dataset.menuId;
            this.menu[this.currentCategory].splice(menuId,1);
            store.setLocalStorage(this.menu);

            render();
        }
    }

    const soldOutMenu = e => {
        const menuId = e.target.closest('li').dataset.menuId;
        this.menu[this.currentCategory][menuId].isSoldOut = !this.menu[this.currentCategory][menuId].isSoldOut;

        store.setLocalStorage(this.menu);
        render();
    }

    const initEventListeners = () => {
        $('#menu-form').addEventListener('submit', e => {
            e.preventDefault();
            addNewMenu();
        })
    
        $('#menu-submit-button').addEventListener('click', addNewMenu);
    
        $('#menu-list').addEventListener('click', e => {
            if (e.target.classList.contains('menu-edit-button')) {
                editMenu(e);
                return;
            }
    
            if (e.target.classList.contains('menu-remove-button')) {
                removeMenu(e);
                return;
            }
    
            if (e.target.classList.contains('menu-sold-out-button')) {
                soldOutMenu(e);
                return;
            }
        })
    
        $('nav').addEventListener('click', e => {
            const isCategoryButton = e.target.classList.contains('cafe-category-name');
            if (isCategoryButton) {
                const categoryName = e.target.dataset.categoryName;
                this.currentCategory = categoryName;
    
                $('#category-header').innerText = `${e.target.innerText} 메뉴 관리`;
                
                render();
            }
        })
    }
}


const app = new App();
app.init();