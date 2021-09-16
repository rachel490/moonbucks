// ## 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

// CREATE
// - [x] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼으로 추가한다 
//        => button에 click 이벤트를 발생시킴
// - [x] 에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다. 
//       => form에 sumbit 이벤트를 발생시킴
// - [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

// EDIT
// - [x] 메뉴의 수정 버튼을 눌렀을 때 이벤트를 발생시킨다.
//        => li는 아직 생성되지 전이므로 이미 생서되어있는 ul에 이벤트를 발생시켜 이벤트를 li에 위임한다.
//        => click event가 발생한 대상이 수정버튼인지 확인해야함.
// - [x] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용해서 사용자에게서 받은 수정된값을 저장한다.
// - [x] 기존의 값을 수정된 값으로 바꾼다.

// DELETE
// - [x] 메뉴 삭제 버튼을 눌렀을 때 이벤트를 발생시킨다.
// - [x] 메뉴 수정시 브라우저에서 제공하는 `confirm` 인터페이스를 활용한다.
// - [x] 메뉴를 삭제한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.


// ```js
// <li class="menu-list-item d-flex items-center py-2">
//   <span class="w-100 pl-2 menu-name">${name}</span>
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

function App() {
    const updateCount = () => {
        const count = document.querySelectorAll('#espresso-menu-list li').length;
        $('.menu-count').innerText = `총 ${count}개`;
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
    
        $('#espresso-menu-list').insertAdjacentHTML('beforeend', newMenuTemplate(newMenu));
        $('#espresso-menu-name').value = "";

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