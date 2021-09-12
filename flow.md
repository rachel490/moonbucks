## STEP 1. 요구사항 구현을 위한 전략

### < ToDo Menu 추가 >
- [ ] 새로운 메뉴를 입력받은 후 확인 버튼을 눌러 메뉴에 추가
- [ ] 새로운 메뉴를 입력받은 후 enter키로 메뉴에 추가
- [ ] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입
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


-----

## STEP 2. TODO CREATE

#### 구현사항들
- [ ] 새로운 메뉴를 입력받은 후 확인 버튼을 눌러 메뉴에 추가
- [x] 새로운 메뉴를 입력받은 후 enter키로 메뉴에 추가
- [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입
- [x] 총 메뉴 갯수를 count하여 상단에 보여줌
- [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화
- [x] 사용자 입력값이 빈 값이라면 추가되지 않음


#### 1) 






#### Reflection
- 새로운 메뉴가 create될때 구현해야할 사항들을 한꺼번에 정리함으로써 적절한 코드의 위치를 찾을 수 있어서 좋았음.

- $변수명 = DOM 조작을 하는 변수의 경우 관습적으로 $를 앞에 붙여줌

- innerHTML이 아닌 inserAdjacentHTML를 쓰면 기존의 html를 유지하면서 원하는 위치에 추가할 수 있음
  - 'beforebegin' : element 앞에 
  - `afterbegin' : element 안에 가장 첫번째 child
  - 'beforeend' : element 안에 가장 마지막 child
  - 'afterend' : element 뒤에


---
## STEP 3. TODO UPDATE

#### 구현사항들
- [x] 새로운 메뉴에 수정 버튼을 생성
- [x] 수정버튼에 이벤트를 발생시킴
- [x] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용해서 입력값을 저장
- [x] 기존의 메뉴를 수정


#### Reflection
- 이벤트 위임 : 아직 생성되지 않은 element에 이벤트를 넣지 않고 이미 생성된 element에 이벤트를 넣어서 위임을 할 것!

- 가장 가까운 태그 찾기 : closest('태그명')
- class가 여러개인 경우 : classList를 통해서 배열형식으로 받아올 수 있음
  - contains : 특정 class가 포함되어있는지 확인할 때 사용



---

## STEP 4. TODO DELETE

#### 구현사항들
- [x] 새로운 메뉴에 삭제 버튼을 생성
- [x] 삭제버튼에 이벤트를 발생시킴
- [x] 메뉴 수정시 브라우저에서 제공하는 `confirm` 인터페이스를 활용
- [x] 확인버튼을 누르면 기존 메뉴에서 삭제
- [x] 취소버튼을 누르면 변함없음
- [x] 총 메뉴 갯수를 count하여 상단에 보여줌

#### Reflection
- 중복이 되는 부분은 함수나 변수로 설정할 것. 반대로 한번만 쓰여지는 것은 되도록 변수로 설정하지 않을 것
- removeChild가 아닌 그냥 remove 써도됨.


---

## STEP 5. REFACTORING
- 코드를 접어서 숲을 보는 연습하기
- 재사용되는 함수나 변수들은 위에 분류해놓기
- 시간이 지났을 때 한눈에 어떤 기능을 하는 것인지 모르겠는 코드들은 따로 함수로 정의하기 -> 함수이름을 통해서 어떤 기능을 하는지 바로 알 수 있어짐.
- 콜백함수에서 인자를 안쓰는 경우 인자와 화살표, 가로등을 생략할 수 있음 (함수이름만 적는 것)
