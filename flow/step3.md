<!-- ## 🎯 step3 요구사항 - 서버와의 통신을 통해 메뉴 관리하기
- [ ] 웹 서버를 띄워서 실제 서버에 데이터의 변경을 저장하는 형태로 리팩터링한다.

1. localStorage 삭제
- [ ] localStorage에 저장하는 로직은 지운다.

2. API 사용해서 data CRUD 구현
- [ ] menu 가져오기 API = | GET    | /api/category/:category/menu |
- [ ] menu 생성하는 API = | POST   | /api/category/:category/menu |
- [ ] menu 수정하는 API = | PUT   | /api/category/:category/menu/:menuId |
- [ ] menu 삭제하는 API = | DELETE | /api/category/:category/menu/:menuId |]
- [ ] menu 품절 API    = | PUT   | /api/category/:category/menu/:menuId/soldout |

3. async await 사용하여 구분
- [ ] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

4. 예외처리
- [ ] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 [alert](https://developer.mozilla.org/ko/docs/Web/API/Window/alert)으로 예외처리를 진행한다.
- [ ] 중복되는 메뉴는 추가할 수 없다.

### baseUrl
`http://localhost:3000`
-->

## Lecture

### 1) Web의 역사

- Web의 등장 : 1990년 Tim Berners Lee에 의해서 웹이 처음 만들어짐 (스위스의 CERN 연구소에서 80년대부터 연구하기 시작해서 10년만에 만들어짐)
    - 10월 : 첫 webpage editor 등장 -> html을 작성할 수 있는 에디터
    - 11월 : 첫 웹브라우저 등장 -> webpage editor로 만든 html을 화면에 보여주는 역할을 하는 웹브라우저가 만들어짐 = world wide web = wwww
    - 12월 : 첫 웹서버 등장 -> info.cern.ch 첫 주소가 있는 웹페이지가 만들어짐
- 서버가 필요한 이유:
    - 데이터를 관리하기 위해서는 한곳에 모아서 관리하는 편이 효율적이고 안전하기 때문 
        -> ex) 업데이트가 생길 경우 하나의 서버에서 업데이트 후 다른 client들이 동시다발적으로 업데이트된 내용을 볼 수 있음
    - 이런 이유로 웹서버가 1990.12월에 만들어진 이후로부터 지금까지 client / server로 분리되어서 웹페이지가 만들어지고 있다. 

### 2) 요구사항 쪼개기

1. 서버요청 부분
- [ ] menu 가져오기 API = | GET    | /api/category/:category/menu |
- [ ] menu 생성하는 API = | POST   | /api/category/:category/menu |
- [ ] menu 수정하는 API = | PUT   | /api/category/:category/menu/:menuId |
- [ ] menu 삭제하는 API = | DELETE | /api/category/:category/menu/:menuId |]
- [ ] menu 품절 API    = | PUT   | /api/category/:category/menu/:menuId/soldout |

2. Refactoring
- [ ] localStorage에 저장하는 로직은 지운다.
- [ ] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

3. 사용자 경험 (예외처리)
- [ ] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 [alert](https://developer.mozilla.org/ko/docs/Web/API/Window/alert)으로 예외처리를 진행한다.
- [ ] 중복되는 메뉴는 추가할 수 없다.

baseUrl = `http://localhost:3000`