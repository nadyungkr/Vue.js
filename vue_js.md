# Vue.js

## Vue.js가 무엇인가?
- 사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크

## Javascript Framework를 왜 쓸까?
- 편리한 데이터 바인딩과 상태 관리
- 빠른 개발, 쉬운 유지보수
- SPA

## SPA
- Single Page Application

## Vue.js를 쓰는 이유?
- 사용자 경험
    - 페이지(리프레쉬) -> 앱(필요한 부분만 렌더링)
    - 반응성 향상
    - 풍부한 기능
- 코드 분리
    - 서버 & 브라우저
- 배포의 이점

## Vue.js 설치방법
- [Vue.js 설치 방법](https://kr.vuejs.org/v2/guide/installation.html)

## 컴포넌트(Component) Based
![component](./images/component.png)
<br/>
HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화 하는데 도움이 됨. 상위 수준에서 컴포넌트는 Vue의 컴파일러에 의해 동작이 추가된 사용자 지정 엘리먼트임. 경우에 따라 특별한 <code>is</code>속성으로 확장된 원시 HTML 엘리먼트로 나타날 수 있음`
<br/>
Vue 컴포넌트는 Vue 인스턴스이기도함. 모든 옵션 객체를 사용할 수 있음. (루트에만 사용하는 옵션은 제외함) 같은 라이프사이클 훅을 사용할 수 있음
  
## 컴포넌트 사용하기

### 전역등록
```javascript
new Vue({
    el: '#some-element',
    // 옵션
})
```
전역 컴포넌트를 등록하려면, <code>Vue.component(tagName, options)</code>를 사용함
```javascript
Vue.component('my-component', {
    //옵션
})
```
모두 소문자, 하이픈을 포함하는 규칙을 따르는 것이 좋음<br/>
일단 등록되면, 컴포넌트는 인스턴스의 템플릿에서 커스텀 엘리먼트 `<my-component></my-component>`로 사용할 수 있음. 루트 Vue인스턴스를 인스턴스화 하기 **전에** 컴포넌트가 등록되어 있는지 확인해야함
```html
<div id="example">
    <my-component></my-component>
</div>
```
```javascript
//등록
Vue.component('my-component',{
    template: '<div>사용자 정의 컴포넌트 입니다!</div>'
})

//루트 인스턴스 생성
new Vue({
    el: '#example'
})
```
아래와 같이 렌더링 됨
```html
<div id="example">
    <div>사용자 정의 컴포넌트 입니다!</div>
</div>
```

### 지역등록
모든 컴포넌트를 전역으로 등록할 필요 없음. 컴포넌트를 <code>components</code> 인스턴스 옵션으로 등록함으로써 다른 인스턴스/컴포넌트의 범위에서만 사용할 수 있는 컴포넌트를 만들 수 있음
```javascript
var Child = {
    template: '<div>사용자 정의 컴포넌트 입니다!</div>'
}

new Vue({
    //...
    components: {
        // <my-coponent> 는 상위 템플릿에서만 사용할 수 있음
        'my-component':Child
    }
})
```
동일한 캡슐화는 디렉트와 같은 다른 등록 가능한 Vue 기능에도 적용됨

### DOM 템플릿 구문 분석 경고
DOM을 템플릿으로 사용할 때(예: `el` 옵션을 사용하여 기존 콘텐츠가 있는 엘리먼트를 마운트 하는 경우), Vue는 템플릿 콘텐츠만 가져올 수 있기 때문에 HTML이 작동하는 방식에 고유한 몇가지 제한사항이 적용됨. 브라우저가 구문 분석과 정규화 한 후에도 작동함. 가장 중요한 것은 `<ul>`,`<ol>`,`<table>`과`<select>`와 같은 일부 엘리먼트는 그 안에 어떤 엘리먼트가 나타나는지 제한을 가지고 있고, `<option>`과 같이 특정 다른 엘리먼트 안에만 나타날 수 있음
<br/>
이러한 제한이 있는 엘리먼트가 있는 사용자 지정 컴포넌트를 사용하면 다음과 같은 문제가 발생

```html
<table>
    <my-row>...</my-row>
<table>
```
사용자 지정 컴포넌트 `<my-row>`는 잘못 된 컨텐츠가 되어, 결과적으로 렌더링시 에러를 발생. 해결 방법은 <code>is</code> 특수 속성을 사용하는 것
```html
<table>
    <tr is="my-row"></tr>
</table>
```
**다음 소스 중 하나에 포함되면 문자열 템플릿을 사용하는 경우에는 이러한 제한 사항이 적용되지 않음**
- <code><script type="text/x-template"></code>
- JavaScript 인라인 템플릿 문자열
- .vue 컴포넌트
따라서 가능한 경우 항상 문자열 템플릿을 사용하는 것이 좋음

### <code>data</code>는 반드시 함수여야 한다
vue생성자에 사용할 수 있는 대부분의 옵션은 컴포넌트에서 사용할 수 있음. 한가지 특별한 경우가 있는데 <code>data</code>는 함수여야 함. 실제로 이를 사용하는 경우의 예는
```javascript
Vue.component('my-component',{
    template:'<span>{{ message }}</span>',
    data:{
        message:'hello'
    }
})
```
그런 다음 Vue는 중단하고 콘솔에서 경고를 함. <code>data</code>는 컴포넌트 인스턴스의 함수여야함. 규칙이 존재하는 이유를 이해하는 것이 좋음. 따라서 다음과 같이 사용해야함
```html
<div id="example-2">
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
</div>
```
```javascript
var data = { counter: 0 }

Vue.component('simple-counter', {
    template:'<button v-on:click="counter +=1">{{ counter }}</button>',
    //데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
    //각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환
    data: function() {
        return data
    }
})

new Vue({
    el:'#example-2'
})
```
이렇게 작성하게 되면 세개의 컴포넌트 인스턴스가 모두 같은 <code>data</code> 객체를 공유하므로 하나의 카운터를 증가시키면 세개가 모두 증가함. 대신 새로운 데이터 객체를 반환하면 이 문제를 해결가능
```javascript
data : function(){
    reutrn{
        counter: 0
    }
}
```
이제 모든 카운터에는 각각 고유한 내부 상태가 있음

### 컴포넌트 작성
컴포넌트는 부모-자식 관계에서 가장 일반적으로 함께 사용하기 위한 것.
컴포넌트 A는 자체 템플릿에서 컴포넌트 B를 사용할 수 있음. 그들은 필연적으로 서로 의사소통을함.
부모는 자식에게 데이터를 전달해야 할 수 있으며, 자식은 자신에게 일어난 일을 부모에게 알릴 필요가 있음. 그러나 부모와 자식이 명확하게 정의된 인터페이스를 통해 가능한한 분리된 상태로 유지하는 것도 매우 중요함.
이처럼 각 컴포넌트의 코드를 상대적으로 격리할 수 있도록 작성하고 추론할 수 있으므로 유지 관리가 쉽고 잠재적으로 쉽게 재사용 가능함
Vue.js에서 부모-자식 컴포넌트 관계는 **props는 아래**로, **events 위로** 라고 요약 할 수 있음. 부모는 **props**를 통해 자식에게 데이터를 전달하고 자식은 **events**를 통해 부모에게 메시지를 보냄.
![props-events](./images/props-events.png)

## Vue.js 와 jQuery 비교
```html
<input id="thing" type="text"/>
<p class="formname"></p>
<script>
$(function() {
    $('#app').change(function(e) {
        var input = $(this).find('#thing').val();
        $(this).find('.formname').append(input);
    });
});
</script>
```
```html
<input id="name" type="text" v-model="name"/>
<p>{{ name }}</p>
<script>
new Vue({
    el:'#app',
    data: {
        name: ''
    }
});
</script>
```

## Vue 인스턴스
- 기본
```javascript
Var app = new Vue({options})
```
- 데이터를 제자리에 두기
```html
<h1>{{ product }}</h1>
```
```javascript
data : {
    product : "Socks"
}
```
- Important Term: Expression
    - 표현식을 사용하면 기존 데이터 값을 논리와 함께 활용하여 새 데이터 값을 생성 가능
    - Vue의 표현을 보면 {{ product }}에 연결된 Vue 인스턴스 데이터를 참조하고 있음을 알 수 있음
    - 해당 표현식을 product 값으로 대체 "이 경우 Socks"
- 표현식을 사용할 수 있는 다른 방법들
```javascript
{{ product + '?' }}
{{ firstName + ' ' + lastName }}
{{ message.split('').reverse().join('') }}
```

- Vue 인스턴스는 모든 Vue 응용 프로그램의 루트
- Vue 인스턴스는 DOM 요소에 연결됨
- Vue 인스턴스의 데이터는 `{{}}`을 사용 
- Vue는 반응성(reactive)이 있음

## Vue의 반응성
Vue가 `product`의 값을 즉시 표현 할 수 있는 이유는 Vue가 반응하기 때문. 인스턴스의 데이터는 데이터가 참조되는 모든 장소에 연결됨. 따라서 데이터를 참조하는 HTML 내에 데이터를 표시 할 수 있고, 데이터가 변경될 때 마다 새로운 값을 표시하도록 업데이트함.
<br/>
console창에 입력하여 product를 새로 정의하면 즉시 데이터가 업데이트 되는 것을 알 수 있음

## Vue 데이터 바인딩
- `src`속성을 v-bind 하기
```html
<img v-bind:src="image" />
```
이것은 다음과 같은 뜻이 됨
```html
<img src="./images/green_socks.jpg" />
```
- `alt`속성을 v-bind 하기
```javascript
altText: "A pair of Socks"
```
다음과 같이 바인딩 할 수 있음
```html
<img v-bind:src="image" v-bind:alt="altText"/>
```
- 데이터는 HTMl 속성에 바인딩 될 수 있음
- 구문은 `v-bind:` or `:`for short.
- 뒤에오는 속성 이름 `:`은 데이터를 바인딩할 속성을 지정
- 속성의 따옴표 내에서 바인딩 하는 데이터를 참조

## v-if, v-else, v-else-if
- `v-if`와 `v-else`
```html
<div v-if="Math.random() > 0.5">
    이제 나를 볼 수 있어요
</div>
<div v-else>
    이제는 안 보입니다
</div>
```
- `v-else-if`
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
- `v-else`와 마찬가지로, `v-else-if` 엘리먼트는`v-if` 또는 `v-else-if` 엘리먼트 바로 뒤에 와야 합니다.

# `key`를 이용한 재사용 가능한 엘리먼트 제어
```html
<template v-if="loginType === 'username'">
  <label>사용자 이름</label>
  <input placeholder="사용자 이름을 입력하세요">
</template>
<template v-else>
  <label>이메일</label>
  <input placeholder="이메일 주소를 입력하세요">
</template>
```
- 위 코드에서 `loginType`을 바꾸어도 사용자가 이미 입력한 내용은 지워지지 않음
- 템플릿 모두 같은 요소를 사용하므로 `input`은 대체되지 않고 단지 placeholder만 변경
**항상 바람직한 코드는 아님. 두 엘리먼트는 완전히 별개이므로 `key`속성을 추가하여 재사용이 가능하게 만들기**
```html
<template v-if="loginType === 'username'">
  <label>사용자 이름</label>
  <input placeholder="사용자 이름을 입력하세요" key="username-input">
</template>
<template v-else>
  <label>이메일</label>
  <input placeholder="이메일 주소를 입력하세요" key="email-input">
</template>
```
- 이제 트랜지션 할 때마다 입력이 처음부터 렌더링 됨
- `label` 엘리먼트는 key 속성이 없기 때문에 여전히 효율적으로 재사용 됨

## v-show
- `v-show`는 <template> 구문을 지원하지 않으며 v-else와도 작동하지 않음
- `v-show`가 있는 엘리먼트는 항상 렌더링 되고 DOM에 남아있음
- `v-show`는 단순히 엘리먼트에 `display` CSS 속성을 토글함
    - `V-show`는 가시성을 토글하기 만하며 DOM에서 요소를 삽입하거나 제거하지 않음

## v-if vs v-show
- `v-if`는 조건부 블럭 안의 이벤트 리스너와 자식 컴포넌트가 토글하는 동안 적절하게 제거되고 다시 만들어지기 때문에 “진짜” 조건부 렌더링
- `v-if`는 초기 렌더링에서 조건이 거짓인 경우 아무것도 하지 않음. 조건 블록이 처음으로 참이 될 때 까지 렌더링 되지 않음.
- `v-show`는 훨씬 단순. CSS 기반 토글만으로 초기 조건에 관계 없이 엘리먼트가 항상 렌더링 됨.
- 일반적으로 `v-if`는 토글 비용이 높고 `v-show`는 초기 렌더링 비용이 더 높음. 매우 **자주 바꾸기를 원한다면** `v-show`를, **런타임 시 조건이 바뀌지 않으면** v-if를 권장

## v-for
- ES6에서 사용하는 `for in`과 매우 비슷함
- `v-for` 지시어는 데이터 배열을 반복할 수 있음
- 반복하는 배열의 요소에 별칭을 지정하고, 배열의 이름을 지정할 것
- `v-for="item in items"`
- 객체의 배열을 반복할 수도 있음.
- .표기를 사용하여 객체의 값을 표시할 수 있음
- 사용 할 때는 렌더링 된 각 요소에 고유한 키를 지정하는 것이 좋음
- `itemId`같은 별칭을 지정해 아이디를 키에 저장하도록 함
```html
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```
```javascript
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
- `v-for` 블록안에 부모 범위 속성에 대한 모든 권한 있음
- `v-for`는 또한 현재 항목의 인덱스에 대한 두번째 전달인자 옵션을 제공
```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```javascript
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
- 결과
    - Parent-0-Foo
    - Parent-1-Bar
- `in`대신에 `of`를 구분자로 사용 할 수 있음. 
- `v-for`와 객체 관계는 `v-for`를 사용하여 객체의 속성을 반복할 수 있음
- 객체 속성,두번째 전달 인자, 인덱스도 제공함
- 콘솔을 열어서 배열의 변경 감지를 확인 할 수 있음
    - 변이 메소드는 다음과 같음
    - `push()`
    - `pop()`
    - `shift()`
    - `unshift()`
    - `splice()`
    - `sort()`
    - `reverse()`

## 이벤트 핸들링
- `v-on` 지시를 사용하여 DOM 이벤트를 듣고 트리거 될 때 JavaScript를 실행할 수 있음
```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p>
</div>
```
```javascript
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

### 메소드 이벤트 헨들러
  - 많은 이벤트 핸들러의 로직은 더 복잡함
  - JavaScript를 v-on 속성 값으로 보관하는 것은 간단하지 않음. 지저분. 
  - 이 때문에 v-on이 호출하고자 하는 메소드의 이름을 받음
```html
<div id="example-2">
  <!-- `greet`는 메소드 이름으로 아래에 정의되어 있습니다 -->
  <button v-on:click="greet">Greet</button>
</div>
```
```javascript
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 메소드는 `methods` 객체 안에 정의
  methods: {
    greet: function (event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킴
      alert('Hello ' + this.name + '!')
      // `event` 는 네이티브 DOM 이벤트
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// 또한 JavaScript를 이용해서 메소드를 호출할 수 있음
example2.greet() // => 'Hello Vue.js!'
```

### 인라인 메소드 핸들러
-  메소드 이름을 직접 바인딩 하는 대신 인라인 JavaScript 구문에 메소드를 사용할 수 있음
```html
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```
```javascript
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

### 이벤트 수식어
- 이벤트 핸들러 내부에서 `event.preventDefault()` 또는 `event.stopPropagation()`를 호출하는 것은 매우 보편적인 일
- `v-on` 이벤트에 이벤트 수식어를 제공
- 수식어는 `.`으로 표시된 접미사
  - `.stop`
  - `.prevent`
  - `.capture`
  - `.self`
  - `.once`
  - `.passive`
```html
<!-- 클릭 이벤트 전파가 중단 -->
<a v-on:click.stop="doThis"></a>

<!-- 제출 이벤트가 페이지를 다시 로드 하지 않음 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 수식어는 체이닝 가능-->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 단순히 수식어만 사용할 수 있음 -->
<form v-on:submit.prevent></form>

<!-- 이벤트 리스너를 추가할 때 캡처모드를 사용함 -->
<!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리. -->
<div v-on:click.capture="doThis">...</div>


<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리 -->
<!-- 자식 엘리먼트에서는 안됨 -->
<div v-on:click.self="doThat">...</div>
```
- 관련 코드는 동일한 순서로 생성되므로 수식어를 사용할 때 순서를 지정해야함
- `v-on:click.prevent.self`를 사용하면 모든 클릭을 막을 수 있음
- `v-on:click.self.prevent` 엘리먼트 자체에 클릭을 방지

### 키 수식어
```html
<input v-on:keyup.enter="submit">
```
```html
<input v-on:keyup.page-down="onPageDown">
```
- 키 수식어
  - `.enter`
  -  `.tab`
  -  `.delete (“Delete” 와 “Backspace” 키 모두를 캡처합니다)`
  - `.esc`
  - `.space`
  - `.up`
  - `.down`
  - `.left`
  - `.right`
- 일부 키(.esc와 모든 화살표 키)는 IE9에서 일관성 없는 key 값을 가지고 있음. IE9를 지원해야하는 경우 내장 별칭이 선호됨.
- 시스템 수식어 키 목록
  - `.ctrl`
  - `.alt`
  - `.shift`
  - `.meta`
- 마우스 버튼 수식어
  - `.left`
  - `.right`
  - `.middle`

## 계산된 속성
- 템플릿 내 표현은 매우 편리하지만 간단한 작업을 위한 것이다!
- 템플릿에 너무 많은 로직을 추가하면 부풀어지고 유지하기 힘들다

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```
- 이 시점에서 템플릿은 더 이상 단순하고 선언적이지 않음
- 그렇기 때문에 복잡한 논리에는 **계산 된 속성**을 사용해야 함
```html
<div id="example">
  {{ reverseM }}
</div>
```
```javascript
var app = new Vue{(
    el:`#app`,
    computed: {
      revrseM(){
        return message.split('').reverse().join('')
      }
    }
)}
```
- 위 코드처럼 변경해서 반환하는 것이 좋다

## Watcher
```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```
```javascript
<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to use what you're familiar with.      -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // whenever question changes, this function will run
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```
- 대부분의 경우 계산 된 속성이 더 적합하지만 사용자 지정 감시자가 필요한 경우가 있음
- 그렇기 때문에 Vue는 watch옵션을 통해 데이터 변경에 반응하는보다 일반적인 방법을 제공
- 데이터 변경에 대한 응답으로 비동기식 또는 값 비싼 작업을 수행하려는 경우에 가장 유용