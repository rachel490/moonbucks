## STEP 1. 요구사항 구현을 위한 전략

### < ToDo Menu 추가 >
- [ ] 새로운 메뉴를 입력받은 후 확인 버튼을 눌러 메뉴에 추가
- [ ] 새로운 메뉴를 입력받은 후 enter키로 메뉴에 추가
- 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입
- [ ] 총 메뉴 갯수를 count하여 상단에 보여줌
- [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화
- [ ] 사용자 입력값이 빈 값이라면 추가되지 않음

### < ToDo Menu 수정 >
- [ ] 새로운 메뉴에 수정 버튼을 생성
- [ ] 수정버튼에 이벤트를 발생시킴
- [ ] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용해서 입력값을 저장
- [ ] 기존의 메뉴를 수정

### < ToDo Menu 삭제 >
- [ ] 새로운 메뉴에 삭제 버튼을 생성
- [ ] 삭제버튼에 이벤트를 발생시킴
- [ ] 메뉴 수정시 브라우저에서 제공하는 `confirm` 인터페이스를 활용
- [ ] 확인버튼을 누르면 기존 메뉴에서 삭제
- [ ] 취소버튼을 누르면 변함없음
- [ ] 총 메뉴 갯수를 count하여 상단에 보여줌


```js
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
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
```


#### Summary
- 구현사항을 읽은 후 스스로 다시 정리하는 시간을 갖는 것이 좋음
- 구현사항들을 큰 덩어리로 정의
- 각 구현사항에 맞는 절차들을 나열 (가능한 순서대로)
- 구현사항이 한줄에 두개이상인 경우 하나씩 쪼개기 
- 여러 곳에서 구현이 일어나야 하는 경우도 생각하기 

#### Reflection
- 구현사항을 세부적을 나누지 않아 발생한 실수들이 있음
 1. 확인버튼을 눌렀을 때 메뉴 추가 구현 못함  
 2. count를 구현하지 못함