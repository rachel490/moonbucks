// ## ๐ฏ step2 ์๊ตฌ์ฌํญ - ์ํ ๊ด๋ฆฌ๋ก ๋ฉ๋ด ๊ด๋ฆฌํ๊ธฐ

// 1. local storage์ ๋ฐ์ดํฐ ์ ์ฅ
// - [x] ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ  ๋ณ์๋ฅผ ์ ์ธ
// - [x] ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ  ๋ type๋ ์ง์ 
// - [x] stringify๋ฅผ ํตํด์ localstorage์ ์ ์ฅ (์๋ก๊ณ ์นจํด๋ ๋ฐ์ดํฐ ๋จ๊ฒ๋จ)

// 2. ์ฌ๋ฌ๊ฐ์ ๋ฉ๋ดํ ์์ฑ
// - [x] ์์คํ๋ ์, ํ๋ผํธ์น๋ธ, ๋ธ๋ ๋๋, ํฐ๋ฐ๋, ๋์ ํธ ๊ฐ๊ฐ์ ์ข๋ฅ๋ณ๋ก ๋ฉ๋ดํ์ ๋ง๋ ๋ค.
// - [x] ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ  ๋ type๋ ์ง์ 
// - [x] ํ์ด์ง์ ์ต์ด๋ก ์ ๊ทผํ  ๋๋ ์์คํ๋ ์ ๋ฉ๋ด๊ฐ ๋จผ์  ๋ณด์ด๊ฒ ํ๋ค.    
// - [x] data๋ฅผ ํ์ผ๋ฉด์ ํด๋นํ๋ type์ ์ํ๋ ๋ฉ๋ด๋ง ๋ณด์ฌ์ค ๊ฒ

// 3. ํ์  ํ์
// - [ ] ํ์  ์ํ์ธ ๊ฒฝ์ฐ๋ฅผ ๋ณด์ฌ์ค ์ ์๊ฒ, ํ์  ๋ฒํผ์ ์ถ๊ฐํ๊ณ  `sold-out` class๋ฅผ ์ถ๊ฐํ์ฌ ์ํ๋ฅผ ๋ณ๊ฒฝํ๋ค.
// - ํ์  ์ํ ๋ฉ๋ด์ ๋งํฌ์

// ```js
// <li class="menu-list-item d-flex items-center py-2">
//   <span class="w-100 pl-2 menu-name sold-out">${name}</span>
//     <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
//   >
//     ํ์ 
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
//   >
//     ์์ 
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
//   >
//     ์ญ์ 
//   </button>
// </li>
// ```



const $ = selector => document.querySelector(selector);

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
                ์์ 
                </button>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                ์ญ์ 
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
        $('.menu-count').innerText = `์ด ${count}๊ฐ`;
    }

    const addNewMenu = () => {
        const newMenu = $(`#${category}-menu-name`).value;
        
        if (!newMenu) {return};
        displayMenu(newMenu);
        updateCount();
    }

    const editMenu = e => {
        const $menuName = e.target.closest('li').querySelector('.menu-name');
        const editedMenu = prompt('์๋ก์ด ๋ฉ๋ด๋ฅผ ์๋ ฅํด์ฃผ์ธ์.', $menuName.innerText);
        $menuName.innerText = editedMenu;
    }

    const removeMenu = e => {
        if (confirm('์ ๋ง๋ก ์ญ์ ํ์๊ฒ ์ต๋๊น?')) {
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
                    <h2 class="mt-1">${categoryTitle} ๋ฉ๋ด ๊ด๋ฆฌ</h2>
                    <span class="mr-2 mt-4 menu-count">์ด 0๊ฐ</span>
                </div>
                <form id="${categoryEnglishName}-menu-form">
                    <div class="d-flex w-100">
                    <label for="${categoryEnglishName}-menu-name" class="input-label" hidden>
                        ${categoryKoreanName} ๋ฉ๋ด ์ด๋ฆ
                    </label>
                    <input
                            type="text"
                            id="${categoryEnglishName}-menu-name"
                            name="${categoryEnglishName}MenuName"
                            class="input-field"
                            placeholder="${categoryKoreanName} ๋ฉ๋ด ์ด๋ฆ"
                            autocomplete="off"
                    />
                    <button
                            type="button"
                            name="submit"
                            id="${categoryEnglishName}-menu-submit-button"
                            class="input-submit bg-green-600 ml-2"
                    >
                        ํ์ธ
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

App('espresso');
