# GOAL
- vue를 사용하여 웹 페이지에 데이터를 표시하기
    - 인스턴스를 사용하여 Vue 어플리케이션 작성을 시작하는 방법 및 기본 데이터를 웹페이지에 로드하는 방법
    - Vue 인스턴스는 모든 Vue 응용 프로그램의 루트
    - Vue 인스턴스는 DOM 요소에 연결됨
    - Vue 인스턴스의 데이터는 `{{}}`을 사용 
    - Vue는 반응성(reactive)이 있음
- 인스턴스 데이터 값을 기반으로 이미지를 표시하고, 대체 텍스트를 첨부하기 위해 속성 바인딩 사용하기
    - 데이터에서 해당 이미지를 업데이트 하고 페이지에서 이미지를 자동으로 업데이트 하게 하기
    - `src`속성을 데이터 바인딩 하기
- 조건부 렌더링 하기
    - 데이터를 기반으로 제품 재고가 있는지 여부를 나타내는 텍스트를 표시하기
    - `v-if`와 `v-else` 지시문을 사용하여 렌더링 할 요소를 결정 가능함
    - js에 `inStock:true`를 추가하고 html에 p태그에 `v-if`, `v-else`를 추가할 것
    - inStock이 진실한 경우 첫번째 단락이 렌더링 될 것이고 그렇지 않은경우 두번째 단락이 렌더링됨
    - 추가 조건부 구문 `v-else-if`로 3단계 논리를 추가할 수 있음
    - js에 inventory: 수량(숫자)을 추가하고 html에 3단계 논리를 작성할 p태그에 조건을 주기
    - 추가 조건부 구문 `v-show`로 앱에서 페이지를 자주 켜고 끄는 요소가 필요한 경우 사용. 지시어가 있는 경우 항상 DOM에 표시되지만 조건이 충족되면 페이지에서만 볼 수 있음. 조건부로 CSS 속성 `display:none`을 요소에 추가하거나 제거하기
- 리스트 렌더링
    - vue를 사용하여 웹페이지에 목록을 표시하는 방법
    - 제품 세부 정보 목록을 표시하기
        - 80% cotton, 20% polyester, Gender-netural
        - 위 세부 정보는 ul에 li에 `v-for`를 통해서 데이터를 업데이트함
        - `v-for` javascript의 `for in`문과 비슷함
        - 배열에 있는 내용을 하나씩 가져다 담아서 li에 업데이트 하는 방식
        - 반복하는 배열에서 문자열 별명으로 단수명사()를 사용하는데 `detail`로 씀
        - 그런 다음 `in`하는 컬렉션 배열을 `details`라고 말하고 이름을 저장. 
        - 이중 괄호 안에 표시 할 데이터를 `detail`로 지정해서 `ul` > `li`로 불러옴
        - `v-for` 지시어는 디스플레이 데이터 배열을 반복할 수 있음
        - 반복되는 배열의 요소에 대한 별칭을 사용하고 반복하는 배열의 이름을 지정할 것
        - `v-for=item in items"`
    - 객체 배열을 반복하는 데이터를 표시하는 방법 (JS파일 13줄번째, HTML 파일 27번째줄 확인)
        - Vue가 각 노드이 ID를 추적할 수 있도록 같은 요소를 렌더링 할 때는 특수 키 속성 지정
        - 객체 배열을 반복하고 . 표기법을 사용하여 객체의 값을 표시할 수 있음
        - 사용할 때는 `v-for`렌더링 된 각 요소에 고유 한 키를 작성할 것!
- 이벤트 처리
    - `v-on` 지시어 요소 이벤트를 수신할 수 있도록 하는데 사용
    - `v-on`은 `@`
    - 수신 할 이벤트 유형을 지정 가능
        - 예) 딸깍하는 소리
        - 마우스 오버
        - 다른 DOM 이벤트
    -  `v-on` 지시어는 방법을 트리거 할 수 있음
    - 트리거 된 메소드는 인수를 취할 수 있음
    - `this` 현재 Vue 인스턴스의 데이터와 인스턴스 내에 선언된 다른 메소드를 참조