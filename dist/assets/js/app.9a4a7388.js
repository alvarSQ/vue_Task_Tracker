(function(){"use strict";var t={7155:function(t,e,s){var i=s(9963),n=s(2201),o=s(6252),a=s(2262),r=s(3577),l=s(9876);const d=(0,l.Q_)("support",{state:()=>({newTaskInput:{title:"",description:"",deadline:""},tags:[{title:"низкий",ind:1,isActive:!1},{title:"средний",ind:2,isActive:!0},{title:"высокий",ind:3,isActive:!1}],isEditTask:!1}),getters:{getInputs:t=>t.newTaskInput,getTags:t=>t.tags,getIsEditTask:t=>t.isEditTask},actions:{}});s(2894);const u=(0,l.Q_)("tasks",{state:()=>({tasks:[{title:""}],isChekReady:!1,selectSort:"id"}),persist:{paths:["tasks"]},getters:{getTasks:t=>t.tasks,getTaskById:t=>e=>t.tasks.find((t=>t.id===e)),getisChekReady:t=>t.isChekReady,getDelTask:t=>e=>t.tasks.filter((t=>t.id!==e)),sortByReadyTask:t=>t=>t.toSorted(((t,e)=>t.isReady-e.isReady)),sortByDeadLine:t=>t=>t.toSorted(((t,e)=>new Date(t.deadLine)-new Date(e.deadLine))),sortById:t=>t=>t.toSorted(((t,e)=>t.id-e.id)),sortByPriority:t=>t=>t.toSorted(((t,e)=>e.priority-t.priority)),sortBySortHandle:t=>t=>t.toSorted(((t,e)=>t.sortHandle-e.sortHandle)),setNewTask(t){return function(e,s){t.tasks=t.tasks.map((t=>(t.id===e&&(t=s),t)))}},getSortTasks(t){let e=t.getTasks;return this.getisChekReady&&(e=e.filter((t=>!1===t.isReady))),"readytask"===this.selectSort?e=this.sortByReadyTask(e):"deadline"===this.selectSort?e=this.sortByDeadLine(e):"priority"===this.selectSort?e=this.sortByPriority(e):"id"===this.selectSort?e=this.sortById(e):"hand"===this.selectSort&&(e=this.sortBySortHandle(e)),e}},actions:{handSort(t){this.getisChekReady&&(t=this.getTasks),this.isChekReady=!1,this.selectSort="hand",this.tasks=t},delTask(t){this.tasks=this.getDelTask(t)},sortChange(){this.tasks.sort(((t,e)=>e.priority-t.priority))},detectEnd(t){const e=t.newIndex-t.oldIndex,s=t.oldIndex+1,i=Math.max(...this.getTasks.map((t=>t.sortHandle))),n=i-this.getTasks.length+1,o=t.newIndex+n;this.tasks=this.getTasks.map(((i,n)=>(e>0&&i.sortHandle>s&&i.sortHandle<=o&&(i.sortHandle=n+1),e<0&&i.sortHandle<s&&i.sortHandle>=o&&(i.sortHandle=n+1),n===t.newIndex&&(i.sortHandle=n+1),i)))}}});var c=s(9980),p=s.n(c);const k={class:"chek"},h=["disabled"];var g={__name:"DelSelektTask",setup(t){const e=u();return(t,s)=>((0,o.wg)(),(0,o.iD)("label",k,[(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":s[0]||(s[0]=t=>(0,a.SU)(e).isChekReady=t),type:"checkbox",disabled:"hand"===(0,a.SU)(e).selectSort},null,8,h),[[i.e8,(0,a.SU)(e).isChekReady]]),(0,o.Uk)(" Скрыть выполненные ")]))}};const v=g;var m=v;const y={class:"note-form__wrapper"},f={class:"note-form"},w={class:"task-content"},S={style:{"margin-bottom":"10px"}},T=(0,o.uE)('<option value="id">Без сортировки</option><option value="readytask">по выполнению</option><option value="deadline">по дедлайну</option><option value="priority">по приортету</option><option value="hand">вручную</option>',5),b=[T],_={class:"taskList"},I={class:"navbar-content"},C=["onUpdate:modelValue","name"],D={class:"cur-poi"},U=["onClick"],H={key:0,class:"navbar-content"},x={key:0,class:"deadline"},R={props:{},components:{DelSelektTask:m,draggable:p()},data(){return{}},methods:{},mounted(){},watch:{}};var E=Object.assign(R,{__name:"home",setup(t){const e=u(),s=d(),n=(0,o.Fl)({get:()=>e.getSortTasks,set:t=>e.handSort(t)});return(t,l)=>{const d=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",y,[(0,o._)("div",f,[(0,o._)("div",w,[(0,o._)("form",S,[(0,o.wy)((0,o._)("select",{name:"Task",id:"selectTask","onUpdate:modelValue":l[0]||(l[0]=t=>(0,a.SU)(e).selectSort=t)},b,512),[[i.bM,(0,a.SU)(e).selectSort]])]),(0,o.Wm)(m),(0,o.Wm)(d,{class:"btn btnDefault",to:{name:"newTask"},onClick:l[1]||(l[1]=t=>(0,a.SU)(s).isEditTask=!1)},{default:(0,o.w5)((()=>[(0,o.Uk)(" Добавить новую задачу ")])),_:1})]),(0,o.Wm)((0,a.SU)(p()),{modelValue:n.value,"onUpdate:modelValue":l[3]||(l[3]=t=>n.value=t),tag:"ul","item-key":"id",onEnd:(0,a.SU)(e).detectEnd},{item:(0,o.w5)((({element:t})=>[t.title?((0,o.wg)(),(0,o.iD)("li",{key:0,class:(0,r.C_)([{"low-prior":1===t.priority,"mid-prior":2===t.priority,"hi-prior":3===t.priority},t.title?"note-list":""])},[(0,o._)("div",_,[(0,o._)("div",I,[(0,o._)("div",null,[(0,o.wy)((0,o._)("input",{style:{"margin-bottom":"0","text-align":"center"},type:"checkbox","onUpdate:modelValue":e=>t.isReady=e,name:t.title},null,8,C),[[i.e8,t.isReady]])]),(0,o._)("p",{class:(0,r.C_)(["title",{"task-ready":t.isReady}])},(0,r.zw)(t.title),3),(0,o._)("div",D,[(0,o.Wm)(d,{to:{name:"editTask",params:{id:t.id}},onClick:l[2]||(l[2]=t=>(0,a.SU)(s).isEditTask=!0)},{default:(0,o.w5)((()=>[(0,o.Uk)("✍")])),_:2},1032,["to"]),(0,o._)("span",{onClick:s=>(0,a.SU)(e).delTask(t.id)},"❌",8,U)])]),t.isReady?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",H,[t.deadLine?((0,o.wg)(),(0,o.iD)("p",x," Дедлайн: "+(0,r.zw)(t.deadLine),1)):(0,o.kq)("",!0)]))])],2)):(0,o.kq)("",!0)])),_:1},8,["modelValue","onEnd"])])])}}});const j=E;var A=j;const V={class:"note-form__wrapper"},W={class:"top"},O=(0,o._)("strong",{style:{"text-align":"center"}},"приоритет выполнения:",-1),B=["disabled"];function L(t,e,s,n,a,r){const l=(0,o.up)("router-link"),d=(0,o.up)("TagsList");return(0,o.wg)(),(0,o.iD)("div",V,[(0,o._)("form",{class:"note-form",onSubmit:e[3]||(e[3]=(0,i.iM)((t=>r.addNewTask()),["prevent"]))},[(0,o._)("div",W,[(0,o.Wm)(l,{class:"close",to:{name:"home"},onClick:r.clearInputs},{default:(0,o.w5)((()=>[(0,o.Uk)("❌")])),_:1},8,["onClick"])]),(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":e[0]||(e[0]=e=>t.supportStore.getInputs.title=e),placeholder:"Название задачи..."},null,512),[[i.nr,t.supportStore.getInputs.title]]),(0,o.wy)((0,o._)("textarea",{"onUpdate:modelValue":e[1]||(e[1]=e=>t.supportStore.getInputs.description=e),placeholder:"Описание задачи..."},null,512),[[i.nr,t.supportStore.getInputs.description]]),(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":e[2]||(e[2]=e=>t.supportStore.getInputs.deadline=e),type:"date"},null,512),[[i.nr,t.supportStore.getInputs.deadline]]),O,(0,o.Wm)(d,{onTagClick:r.handleTagClick},null,8,["onTagClick"]),t.supportStore.getIsEditTask?(0,o.WI)(t.$slots,"default",{key:1}):((0,o.wg)(),(0,o.iD)("button",{key:0,class:"btn btnPrimary",type:"submit",disabled:!t.supportStore.getInputs.title}," Добавить новую задачу ",8,B))],32)])}s(560);const z={class:"tags-list"},Z=["onClick"];function P(t,e,s,i,n,a){return(0,o.wg)(),(0,o.iD)("div",z,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.supportStore.getTags,(e=>((0,o.wg)(),(0,o.iD)("div",{class:(0,r.C_)(["tag-item",{"low-prior":"низкий"===e.title&&1==e.isActive,"mid-prior":"средний"===e.title&&1==e.isActive,"hi-prior":"высокий"===e.title&&1==e.isActive}]),key:e,onClick:s=>t.$emit("tagClick",e)},(0,r.zw)(e.title),11,Z)))),128))])}var F={emits:["tagClick"],data(){return{}},computed:{...(0,l.Kc)(d)}},N=s(3744);const K=(0,N.Z)(F,[["render",P]]);var M=K,q={components:{TagsList:M},data(){return{}},computed:{...(0,l.Kc)(u,d)},methods:{addNewTask(){const t=this.supportStore.getTags.find((t=>!0===t.isActive)),e={id:this.tasksStore.getTasks.reduce(((t,e)=>e.id>t?e.id:t),0)+1,title:this.supportStore.getInputs.title,description:this.supportStore.getInputs.description,priority:t.ind,deadLine:this.supportStore.getInputs.deadline,sortHandle:this.tasksStore.getTasks.reduce(((t,e)=>e.sortHandle>t?e.sortHandle:t),0)+1,isEdit:!1,isReady:!1};""!=this.supportStore.getInputs.title&&(this.tasksStore.getTasks.push(e),""==this.tasksStore.getTasks[0].title&&this.tasksStore.getTasks.shift(),this.clearInputs())},clearInputs(){this.supportStore.getInputs.title="",this.supportStore.getInputs.description="",this.supportStore.getInputs.deadline=""},handleTagClick(t){this.supportStore.getTags.forEach((t=>t.isActive=!1)),t.isActive=!t.isActive}},mounted(){this.clearInputs()},watch:{}};const $=(0,N.Z)(q,[["render",L]]);var Y=$;function Q(t,e,s,i,n,a){const l=(0,o.up)("router-link"),d=(0,o.up)("NewTask"),u=(0,o.up)("notFound");return a.hasTask?((0,o.wg)(),(0,o.j4)(d,{key:0},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{to:{name:"home"},class:(0,r.C_)(["btn btnPrimary",{disabled:!t.supportStore.getInputs.title}]),onClick:e[0]||(e[0]=t=>a.saveTask(a.task.id))},{default:(0,o.w5)((()=>[(0,o.Uk)(" Изменить задачу ")])),_:1},8,["class"])])),_:1})):((0,o.wg)(),(0,o.j4)(u,{key:1}))}const G={class:"title"};function J(t,e){return(0,o.wg)(),(0,o.iD)("h1",G,"404 Not Found")}const X={},tt=(0,N.Z)(X,[["render",J]]);var et=tt,st={components:{NewTask:Y,notFound:et},data(){return{}},methods:{saveTask(t){let e=this.supportStore.getTags.find((t=>!0===t.isActive));const s={id:t,title:this.supportStore.getInputs.title,description:this.supportStore.getInputs.description,priority:e.ind,deadLine:this.supportStore.getInputs.deadline,sortHandle:this.tasksStore.getTasks.reduce(((t,e)=>e.sortHandle>t?e.sortHandle:t),0)+1,isEdit:!1,isReady:!1};if(""==this.supportStore.getInputs.title)return alert("Заполни все поля!");this.tasksStore.setNewTask(t,s)},fillInputs(){this.supportStore.getInputs.title=this.task.title,this.supportStore.getInputs.description=this.task.description,this.supportStore.getInputs.deadline=this.task.deadLine,this.supportStore.getTags.forEach((t=>t.isActive=!1)),this.supportStore.getTags.find((t=>{t.ind===this.task.priority&&(t.isActive=!0)}))}},mounted(){this.fillInputs()},computed:{...(0,l.Kc)(u,d),id(){return parseInt(this.$route.params.id)},validId(){return/^[1-9]+\d*$/.test(this.id)},task(){return this.tasksStore.getTaskById(this.id)},hasTask(){return this.validId&&void 0!==this.task}},watch:{}};const it=(0,N.Z)(st,[["render",Q]]);var nt=it;const ot={class:"md-body"},at=(0,o.uE)('<h1>В этом приложении:</h1><ul><li>Полная настройка шаблона на Vue CLI</li><li>Установка и настройка Vue-router для Vue.js 3</li><li>Динамическая перерисовка без перезагрузки страницы</li><li>Динамичный навбар и ссылки</li><li>Обработка несуществующих роутов</li><li>Хеши и моды для роутера</li><li>Настройка общего конфига</li></ul><p> Сделано на курсе <a href="https://tocode.ru/courses/vuejs-3-s-nulya-do-rezultata/">Cделано на курсе &quot;Vue.js 3 c нуля до результата&quot;</a></p>',3),rt=[at];function lt(t,e){return(0,o.wg)(),(0,o.iD)("div",ot,rt)}const dt={},ut=(0,N.Z)(dt,[["render",lt]]);var ct=ut;const pt=(0,n.r5)(),kt=(0,n.p7)({history:pt,routes:[{path:"/",name:"home",component:A},{path:"/new",name:"newTask",component:Y,props:!0},{path:"/edit/:id",name:"editTask",component:nt},{path:"/about",name:"about",component:ct},{path:"/:CatchAll(.*)",name:"404",component:et}]});var ht=kt,gt=s(7605);const vt={class:"wapper"},mt={class:"wrapper-content"},yt={class:"container"};function ft(t,e,s,i,n,a){const r=(0,o.up)("Header"),l=(0,o.up)("router-view"),d=(0,o.up)("Footer");return(0,o.wg)(),(0,o.iD)("div",vt,[(0,o.Wm)(r),(0,o._)("div",mt,[(0,o._)("div",yt,[(0,o.Wm)(l)])]),(0,o.Wm)(d)])}const wt={class:"navbar"},St={class:"container"},Tt={class:"navbar-content"},bt={class:"navbar-list"};function _t(t,e,s,i,n,a){const l=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("header",null,[(0,o._)("div",wt,[(0,o._)("div",St,[(0,o._)("div",Tt,[(0,o.Wm)(l,{class:"navbar-logo",to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,r.zw)(n.title),1)])),_:1}),(0,o._)("ul",bt,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.links,(t=>((0,o.wg)(),(0,o.iD)("li",{class:"navbar-item",key:t.alias},[(0,o.Wm)(l,{class:"navbar-link",to:t.url},{default:(0,o.w5)((()=>[(0,o.Uk)((0,r.zw)(t.title),1)])),_:2},1032,["to"])])))),128))])])])])])}const It={dev:!0},Ct=(It.dev,{title:"Template"}),Dt=[{title:"Home",alias:"home",url:"/"},{title:"About",alias:"about",url:"/about"}];var Ut={data(){return{title:Ct.title,links:Dt}}};const Ht=(0,N.Z)(Ut,[["render",_t]]);var xt=Ht;const Rt={class:"footer"},Et={class:"container"},jt={class:"navbar-list"},At=(0,o._)("ul",{class:"navbar-list",style:{"margin-top":"14px"}},[(0,o._)("li",{class:"navbar-item",style:{opacity:"0.6","font-size":"14px"}},[(0,o._)("a",{href:"https://tocode.ru/courses/vuejs-3-s-nulya-do-rezultata/",class:"navbar-link"},'Сделано на курсе "Vue.js 3 c нуля до результата"')])],-1);function Vt(t,e,s,i,n,a){const l=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("footer",Rt,[(0,o._)("div",Et,[(0,o._)("ul",jt,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.links,(t=>((0,o.wg)(),(0,o.iD)("li",{class:"navbar-item",key:t.alias},[(0,o.Wm)(l,{class:"navbar-link",to:t.url},{default:(0,o.w5)((()=>[(0,o.Uk)((0,r.zw)(t.title),1)])),_:2},1032,["to"])])))),128))]),At])])}var Wt={data(){return{links:Dt}}};const Ot=(0,N.Z)(Wt,[["render",Vt]]);var Bt=Ot,Lt={components:{Header:xt,Footer:Bt}};const zt=(0,N.Z)(Lt,[["render",ft]]);var Zt=zt;const Pt=(0,l.WB)();Pt.use(gt.Z);const Ft=(0,i.ri)(Zt);Ft.use(ht),Ft.use(Pt),Ft.mount("#app")}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,s),o.exports}s.m=t,function(){var t=[];s.O=function(e,i,n,o){if(!i){var a=1/0;for(u=0;u<t.length;u++){i=t[u][0],n=t[u][1],o=t[u][2];for(var r=!0,l=0;l<i.length;l++)(!1&o||a>=o)&&Object.keys(s.O).every((function(t){return s.O[t](i[l])}))?i.splice(l--,1):(r=!1,o<a&&(a=o));if(r){t.splice(u--,1);var d=n();void 0!==d&&(e=d)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[i,n,o]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,o,a=i[0],r=i[1],l=i[2],d=0;if(a.some((function(e){return 0!==t[e]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(l)var u=l(s)}for(e&&e(i);d<a.length;d++)o=a[d],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(u)},i=self["webpackChunkvue_task_tracker"]=self["webpackChunkvue_task_tracker"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(7155)}));i=s.O(i)})();