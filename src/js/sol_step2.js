// 1. TODO localstorage Read & Write
// - [x] localStorage에 데이터를 저장 -> write
//      - [x] 메뉴를 추가할 떄
//      - [x] 메뉴를 수정할 때
//      - [x] 메뉴를 삭제할 때
// - [x] localStorage에 저장된 데이터를 읽어옴 -> read

// 2. TODO 카테고리별 메뉴판 관리
// - [x] 에스프레소 메뉴판 관리
// - [x] 프라푸치노 메뉴판 관리
// - [x] 블렌디드 메뉴판 관리
// - [x] 티바나 메뉴판 관리
// - [x] 디저트 메뉴판 관리

// 3. TODO 최초 데이터 read & render
// - [x] 페이지에 최초로 접근할 때 local storage에 저장된 espresso 메뉴판을 읽어옴
// - [x] 에스프레소 메뉴판을 화면에 출력

// 4. TODO 품절 상태 관리
// - [x] 품절 버튼을 추가
// - [x] 버튼 클릭했을 때 이벤트 발생시키기
// - [x] localstorage에 상태값 저장
// - [x] 클릭한 버튼에서 가장 가까운 li태그를 찾아서 `sold-out` class를 추가

import {$} from './utils/DOM.js';
import store from './store/index.js';

function App() {
    this.menu = {
        espresso : [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: []
    };

    this.currentCategory = "espresso"; 

    this.init = () => {
        if (store.getLocalStorage()) {
            this.menu = store.getLocalStorage();
        }
        render();
        initEventListeners();
    }

    const render = () => {
        const template = this.menu[this.currentCategory].map((item,idx) => {
            return `
                <li data-menu-id=${idx} class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name ${item.soldOut? "sold-out" : ""} ">${item.name}</span>
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
            `
        }).join("")
    
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

        this.menu[this.currentCategory].push({name: newMenu});
        store.setLocalStorage(this.menu);

       render();
        $('#menu-name').value = "";
    }

    const editMenu = e => {
        const menuId = e.target.closest('li').dataset.menuId;
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const editedMenu = prompt('새로운 메뉴를 입력해주세요.', $menuName.innerText);

        this.menu[this.currentCategory][menuId].name = editedMenu;
        store.setLocalStorage(this.menu);

        render();
    }

    const removeMenu = e => {
        if (confirm('정말로 삭제하시겠습니까?')) {

            const id = e.target.closest('li').dataset.menuId;
            this.menu[this.currentCategory].splice(id,1);
            store.setLocalStorage(this.menu);

            render();
        }
    }

    const soldOutMenu = e => {
        const menuId = e.target.closest('li').dataset.menuId;
        this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
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
    
        $('nav').addEventListener('click', (e) => {
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