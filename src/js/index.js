const espressoMenuForm = document.getElementById('espresso-menu-form');
const espressoMenuName = document.getElementById('espresso-menu-name');
const espressoMenuSubmitButton = document.getElementById('espresso-menu-submit-button');
const espressoMenuList = document.getElementById('espresso-menu-list')

espressoMenuForm.addEventListener('submit', handleSubmit);

const menu = [];

function handleSubmit(event) {
    event.preventDefault();
    const name = espressoMenuName.value;

    if (!name) {
        return
    }
    
    const newMenu = {
        name : name,
        id : menu.length == 0 ? 1 : menu[menu.length-1].id + 1
    };

    menu.push(newMenu);
    displayList(newMenu);
    espressoMenuName.value = '';
}

function displayList(item) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="w-100 pl-2 menu-name">${item.name}</span>
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
    `;

    li.className = 'menu-list-item d-flex items-center py-2';
    li.id = item.id;
    espressoMenuList.appendChild(li);

    const edit_btn = document.querySelector('.menu-edit-button');
    const dlt_btn = document.querySelector('.menu-remove-button');

    edit_btn.addEventListener('click', handleEditBtn);
    dlt_btn.addEventListener('click', handleDltBtn);
}



function handleEditBtn(event) {
    console.log('update')
    const update_menu = prompt('메뉴명을 수정해주세요');
    const target = event.target.parentNode;
    const span = target.querySelector('span');
    span.innerText = update_menu;
}


function handleDltBtn(event) {
    console.log('delete');
    const msg = confirm('정말 삭제하시겠습니까?');
    if (!msg) { return };
    const target = event.target.parentNode;
    console.log(target)
    espressoMenuList.removeChild(target);
}


// 첫번째 element만 dlt,edit이 먹힘...왜??