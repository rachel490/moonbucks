// DOM 조작하는 변수인 경우에 관행적으로 $를 앞에 붙여줌
const $ = (selector) => document.querySelector(selector);

function App() {

    const updateMenuCount = () => {
        //3. 메뉴 카운트 업데이트 : li의 개수 카운팅 -> querySelectorAll이용해서 배열로 받아와서 길이 구하면 됨
        const menuCount = $('#espresso-menu-list').querySelectorAll(
            'li'
        ).length;

        //3. innerText 업데이트
        $('.menu-count').innerText = `총 ${menuCount}개`;
    }

    // CREATE :
    // 2~5. 재사용을 위해 함수로 묶어줌
    const addMenuName = () => {

        //5. 입력값이 빈값일 때 추가되지 않게함 + 경고창 띄우기
        if ($('#espresso-menu-name').value === '') {
            alert('값을 입력해주세요');
            return;
        }

        //1. 사용자가 입력한 메뉴를 변수에 저장
        const espressoMenuName = $('#espresso-menu-name').value;

        //2. 메뉴를 만들때 기본 템플릿 함수 생성
        const menuItemTemplate = (menu) => {
            return `
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
            `;
        };

        //2. 메뉴 생성함수에 새 메뉴를 넣어서 li를 만들어줌
        //2. 생성한 li를 ul에 넣어줌: innerHTML -> 기존의 것을 덮어씌움 / insertAdjacentHTML(position) -> 기존의 것에 추가
        $('#espresso-menu-list').insertAdjacentHTML(
            'beforeend',
            menuItemTemplate(espressoMenuName)
        );

        updateMenuCount();

        //4. input 초기화
        $('#espresso-menu-name').value = '';
    }

    const updateMenuName = (e) => {
        const $menuName = e.target.closest('li').querySelector('.menu-name');

        //prompt 발생시킴 : default값을 기존의 메뉴이름으로 함 -> closest로 가장 인접한 부모노드를 찾음 + id
        const updatedMenuName = prompt('메뉴명을 수정해주세요',$menuName.innerText);

        //update된 값을 기존 메뉴에 적용함
        $menuName.innerText = updatedMenuName;
    }

    const removeMenuName = (e) => {
        //confirm 발생시킴 : 반환값 -> true,false 
        //확인버튼을 누르면 메뉴에서 삭제
        if (confirm('정말 삭제하시겠습니까?')) {
            e.target.closest('li').remove();
        }

        //메뉴 개수 count 업데이트 : querySelectorAll로 li들을 배열로 받음
        updateMenuCount();
    }


    // enter 눌렀을 때 새로고침 되는 현상 막기 -> 새로고침되는 이유는 form안에 input이 있으므로 인해 enter를 누르면 form이 자동적으로 submit이 이루어지기 때문
    // form에 해당되는 현상이므로 form에 event를 발생시켜야함
    $('#espresso-menu-form').addEventListener('submit', (e) => {
        e.preventDefault(); //form이 submit될때 자동적으로 새로고침되는 것을 막음.
    });

    //1. getting user input - by button click
    $("#espresso-menu-submit-button").addEventListener('click', addMenuName);

    //1. getting user input - by keypress event
    $('#espresso-menu-name').addEventListener('keypress', (e) => {
        //1. enter키를 눌렀을때만 사용자 입력값 받아오도록 함
        if (e.key !== 'Enter') {
            return;
        }
        addMenuName();
    });

    // UPDATE + DELETE
    // 이벤트의 위임을 적용해서 아직 생성되지 않은 li태그들이 아닌 ul에 이벤트를 넣음 
    $('#espresso-menu-list').addEventListener('click', e => {

        // UPDATE : 
        //수정버튼이 클릭되었을때 : click 대상이 수정버튼인지를 먼저 확인 -> class이용
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }


        // DELETE :
        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });
}

App();
