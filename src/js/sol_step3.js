import {$} from './utils/DOM.js';
import menuAPI from './api/index.js';

function App() {
    this.menu = {
        espresso : [],
        frappuccino : [],
        blended : [],
        teavana : [],
        desert: []
    };

    this.currentCategory = 'espresso';

    this.init = async() => {
        render();
        initEventListeners();
    }

    const render = async () => {
        this.menu[this.currentCategory] = await menuAPI.getAllMenuByCategory(this.currentCategory);

        const template = this.menu[this.currentCategory].map(item => {
            return (`
                <li data-menu-id=${item.id} class="menu-list-item d-flex items-center py-2">
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

    const addNewMenu = async() => {
        const newMenu = $('#menu-name').value;
        if (!newMenu) {return};

        const duplicatedMenu = this.menu[this.currentCategory].find(item => item.name == newMenu);
        if (duplicatedMenu) {
            alert('이미 존재하는 메뉴입니다. 새로운 메뉴를 입력해주세요');
            $('#menu-name').value = "";
            return;
        }

        await menuAPI.createMenuByCategory(this.currentCategory, newMenu);

        render();
        $('#menu-name').value = "";
    }

    const editMenu = async e => {
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const editedMenu = prompt('새로운 메뉴를 입력해주세요.', $menuName.innerText);
        const menuId = e.target.closest('li').dataset.menuId;

        await menuAPI.updateMenu(this.currentCategory, editedMenu, menuId);

        render();
    }

    const removeMenu = async e => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            const menuId = e.target.closest('li').dataset.menuId;
            await menuAPI.deleteMenu(this.currentCategory, menuId);

            render();
        }
    }

    const soldOutMenu = async e => {
        const menuId = e.target.closest('li').dataset.menuId;
        
        await menuAPI.updateSoldOutMenu(this.currentCategory, menuId);

        render();
    }

    const changeCategory = e => {
        const isCategoryButton = e.target.classList.contains('cafe-category-name');
        if (isCategoryButton) {
            const categoryName = e.target.dataset.categoryName;
            this.currentCategory = categoryName;

            $('#category-header').innerText = `${e.target.innerText} 메뉴 관리`;
            render();
        }
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
    
        $('nav').addEventListener('click', changeCategory)
    }
}


const app = new App();
app.init();