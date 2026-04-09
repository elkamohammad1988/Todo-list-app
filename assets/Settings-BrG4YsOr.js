import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";var r=t(e(),1),i=n();function a({dark:e}){let[t,n]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{let e=localStorage.getItem(`notifications`);e!==null&&n(JSON.parse(e))},[]),(0,r.useEffect)(()=>{localStorage.setItem(`notifications`,JSON.stringify(t))},[t]),(0,i.jsxs)(`div`,{className:`
        max-w-xl p-10 mx-auto rounded-2xl
        ${e?`bg-gray-900 text-white`:`bg-white text-gray-900`}
        shadow-lg
      `,children:[(0,i.jsx)(`h1`,{className:`\r
          mb-6\r
          text-3xl font-bold\r
        `,children:`Settings`}),(0,i.jsxs)(`div`,{className:`
          flex items-center justify-between
          p-4 border rounded-lg
          ${e?`border-gray-700 bg-gray-800`:`border-gray-200 bg-gray-100`}
        `,children:[(0,i.jsx)(`span`,{children:`Enable Notifications`}),(0,i.jsx)(`input`,{type:`checkbox`,checked:t,onChange:()=>n(!t),className:`w-5 h-5 accent-indigo-600 cursor-pointer`})]})]})}export{a as default};