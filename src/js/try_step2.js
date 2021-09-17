// ## 🎯 step2 요구사항 - 상태 관리로 메뉴 관리하기

// 1. local storage에 데이터 저장
// - [x] 데이터를 저장할 변수를 선언
// - [x] 데이터를 저장할 때 type도 지정
// - [x] stringify를 통해서 localstorage에 저장 (새로고침해도 데이터 남게됨)

// 2. 여러개의 메뉴판 생성
// - [x] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 만든다.
// - [x] 데이터를 저장할 때 type도 지정
// - [x] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.    
// - [x] data를 훑으면서 해당하는 type에 속하는 메뉴만 보여줄 것

// 3. 품절 표시
// - [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 `sold-out` class를 추가하여 상태를 변경한다.
// - 품절 상태 메뉴의 마크업

// ```js
// <li class="menu-list-item d-flex items-center py-2">
//   <span class="w-100 pl-2 menu-name sold-out">${name}</span>
//     <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
//   >
//     품절
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
//   >
//     수정
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
//   >
//     삭제
//   </button>
// </li>
// ```



const $ = selector => document.querySelector(selector);
const menuData = [];

function App(category) {
    
    const displayMenu = (menu) => {
        const newMenuTemplate = (menu) => {
            return (`
            <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${menu}</span>
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
        }
        
        $(`#${category}-menu-list`).insertAdjacentHTML('beforeend', newMenuTemplate(menu));
        $(`#${category}-menu-name`).value = "";
    }
    
    const displayLocalStorage = () => {
        const savedMenus = JSON.parse(localStorage.getItem(category));
        if (!savedMenus) {return};
        savedMenus.forEach(item => {
            displayMenu(item);
            updateCount();
        });
    }

    const saveLocalStorage = () => {
        const menuList = document.querySelectorAll(`#${category}-menu-list li span`);
        const menus = []
        menuList.forEach(item => menus.push(item.innerText));

        localStorage.setItem(category, JSON.stringify(menus));
    }

    const updateCount = () => {
        const count = document.querySelectorAll(`#${category}-menu-list li`).length;
        $('.menu-count').innerText = `총 ${count}개`;
    }

    const addNewMenu = () => {
        const newMenu = $(`#${category}-menu-name`).value;
        
        if (!newMenu) {return};
        displayMenu(newMenu);
        updateCount();
    }

    const editMenu = e => {
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const editedMenu = prompt('새로운 메뉴를 입력해주세요.', $menuName.innerText);
        $menuName.innerText = editedMenu;
    }

    const removeMenu = e => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            e.target.closest('li').remove();
            updateCount();
        }
    }

    displayLocalStorage();

    $(`#${category}-menu-form`).addEventListener('submit', e => {
        e.preventDefault();
        addNewMenu();
        saveLocalStorage();
    })

    $(`#${category}-menu-submit-button`).addEventListener('click', () => {
        console.log('hi')
        addNewMenu();
        saveLocalStorage();
    });

    $(`#${category}-menu-list`).addEventListener('click', e => {
        if (e.target.classList.contains('menu-edit-button')) {
            editMenu(e);
            saveLocalStorage();
        }

        if (e.target.classList.contains('menu-remove-button')) {
            removeMenu(e);
            saveLocalStorage();
        }
    })
}

$('nav').addEventListener('click',e => {
    const categoryTitle = e.target.innerText;
    const categoryKoreanName = categoryTitle.split(' ')[1];
    const categoryEnglishName = e.target.dataset.categoryName;

    const mainTemplate = (categoryTitle, categoryKoreanName, categoryEnglishName) => {
        return (
        `
            <div class="wrapper bg-white p-10">
                <div class="heading d-flex justify-between">
                    <h2 class="mt-1">${categoryTitle} 메뉴 관리</h2>
                    <span class="mr-2 mt-4 menu-count">총 0개</span>
                </div>
                <form id="${categoryEnglishName}-menu-form">
                    <div class="d-flex w-100">
                    <label for="${categoryEnglishName}-menu-name" class="input-label" hidden>
                        ${categoryKoreanName} 메뉴 이름
                    </label>
                    <input
                            type="text"
                            id="${categoryEnglishName}-menu-name"
                            name="${categoryEnglishName}MenuName"
                            class="input-field"
                            placeholder="${categoryKoreanName} 메뉴 이름"
                            autocomplete="off"
                    />
                    <button
                            type="button"
                            name="submit"
                            id="${categoryEnglishName}-menu-submit-button"
                            class="input-submit bg-green-600 ml-2"
                    >
                        확인
                    </button>
                    </div>
                </form>
                <ul id="${categoryEnglishName}-menu-list" class="mt-3 pl-0"></ul>
            </div>
        `);
    }

    $('main').innerHTML =  mainTemplate(categoryTitle, categoryKoreanName, categoryEnglishName);
    App(categoryEnglishName);
})

