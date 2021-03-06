// ## ๐ฏ step1 ์๊ตฌ์ฌํญ - ๋ ์กฐ์๊ณผ ์ด๋ฒคํธ ํธ๋ค๋ง์ผ๋ก ๋ฉ๋ด ๊ด๋ฆฌํ๊ธฐ

// CREATE
// - [x] ์์คํ๋ ์ ๋ฉ๋ด์ ์๋ก์ด ๋ฉ๋ด๋ฅผ ํ์ธ ๋ฒํผ์ผ๋ก ์ถ๊ฐํ๋ค 
//        => button์ click ์ด๋ฒคํธ๋ฅผ ๋ฐ์์ํด
// - [x] ์์คํ๋ ์ ๋ฉ๋ด์ ์๋ก์ด ๋ฉ๋ด๋ฅผ ์ํฐํค ์๋ ฅ์ผ๋ก ์ถ๊ฐํ๋ค. 
//       => form์ sumbit ์ด๋ฒคํธ๋ฅผ ๋ฐ์์ํด
// - [x] ์ถ๊ฐ๋๋ ๋ฉ๋ด์ ์๋ ๋งํฌ์์ `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` ์์ ์ฝ์ํด์ผ ํ๋ค.
// - [x] ๋ฉ๋ด๊ฐ ์ถ๊ฐ๋๊ณ  ๋๋ฉด, input์ ๋น ๊ฐ์ผ๋ก ์ด๊ธฐํํ๋ค.
// - [x] ์ฌ์ฉ์ ์๋ ฅ๊ฐ์ด ๋น ๊ฐ์ด๋ผ๋ฉด ์ถ๊ฐ๋์ง ์๋๋ค.
// - [x] ์ด ๋ฉ๋ด ๊ฐฏ์๋ฅผ countํ์ฌ ์๋จ์ ๋ณด์ฌ์ค๋ค.

// EDIT
// - [x] ๋ฉ๋ด์ ์์  ๋ฒํผ์ ๋๋ ์ ๋ ์ด๋ฒคํธ๋ฅผ ๋ฐ์์ํจ๋ค.
//        => li๋ ์์ง ์์ฑ๋์ง ์ ์ด๋ฏ๋ก ์ด๋ฏธ ์์๋์ด์๋ ul์ ์ด๋ฒคํธ๋ฅผ ๋ฐ์์์ผ ์ด๋ฒคํธ๋ฅผ li์ ์์ํ๋ค.
//        => click event๊ฐ ๋ฐ์ํ ๋์์ด ์์ ๋ฒํผ์ธ์ง ํ์ธํด์ผํจ.
// - [x] ๋ฉ๋ด ์์ ์ ๋ธ๋ผ์ฐ์ ์์ ์ ๊ณตํ๋ `prompt` ์ธํฐํ์ด์ค๋ฅผ ํ์ฉํด์ ์ฌ์ฉ์์๊ฒ์ ๋ฐ์ ์์ ๋๊ฐ์ ์ ์ฅํ๋ค.
// - [x] ๊ธฐ์กด์ ๊ฐ์ ์์ ๋ ๊ฐ์ผ๋ก ๋ฐ๊พผ๋ค.

// DELETE
// - [x] ๋ฉ๋ด ์ญ์  ๋ฒํผ์ ๋๋ ์ ๋ ์ด๋ฒคํธ๋ฅผ ๋ฐ์์ํจ๋ค.
// - [x] ๋ฉ๋ด ์์ ์ ๋ธ๋ผ์ฐ์ ์์ ์ ๊ณตํ๋ `confirm` ์ธํฐํ์ด์ค๋ฅผ ํ์ฉํ๋ค.
// - [x] ๋ฉ๋ด๋ฅผ ์ญ์ ํ๋ค.
// - [x] ์ด ๋ฉ๋ด ๊ฐฏ์๋ฅผ countํ์ฌ ์๋จ์ ๋ณด์ฌ์ค๋ค.


// ```js
// <li class="menu-list-item d-flex items-center py-2">
//   <span class="w-100 pl-2 menu-name">${name}</span>
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

function App() {
    const updateCount = () => {
        const count = document.querySelectorAll('#espresso-menu-list li').length;
        $('.menu-count').innerText = `์ด ${count}๊ฐ`;
    }

    const addNewMenu = () => {
        const newMenu = $('#espresso-menu-name').value;
        
        if (!newMenu) {return};

        const newMenuTemplate = (newMenu) => {
            return (`
                <li class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name">${newMenu}</span>
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
    
        $('#espresso-menu-list').insertAdjacentHTML('beforeend', newMenuTemplate(newMenu));
        $('#espresso-menu-name').value = "";

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

    $('#espresso-menu-form').addEventListener('submit', e => {
        e.preventDefault();
        addNewMenu();
    })

    $('#espresso-menu-submit-button').addEventListener('click', addNewMenu);

    $('#espresso-menu-list').addEventListener('click', e => {
        if (e.target.classList.contains('menu-edit-button')) {
            editMenu(e);
        }

        if (e.target.classList.contains('menu-remove-button')) {
            removeMenu(e);
        }
    })
}

App();