import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{n as r,s as i}from"./chunk-QFMPRPBF-DmyzOyiA.js";import{_ as a,t as o}from"./firebase-DfgmWA3C.js";import{n as s,r as c}from"./fa-DxxERJbU.js";var l=t(e(),1),u=n();function d(){let e=i(),[t,n]=(0,l.useState)(``),[d,f]=(0,l.useState)(``),[p,m]=(0,l.useState)(!1),[h,g]=(0,l.useState)(``);async function _(n){n.preventDefault(),g(``);try{await a(o,t,d),e(`/dashboard`)}catch(e){g(e.message)}}return(0,u.jsxs)(`div`,{className:`\r
        flex items-center justify-center\r
        min-h-screen\r
        p-4\r
        bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500\r
      `,children:[(0,u.jsxs)(`form`,{onSubmit:_,className:`\r
          w-full max-w-md\r
          p-8 space-y-6\r
          bg-white/20\r
          border border-white/30 rounded-3xl\r
          backdrop-blur-2xl shadow-2xl\r
        `,children:[(0,u.jsx)(`h1`,{className:`\r
            text-3xl text-white text-center font-bold\r
          `,children:`Login`}),h&&(0,u.jsx)(`p`,{className:`\r
              text-red-500 text-center font-medium\r
            `,children:h}),(0,u.jsx)(`input`,{type:`email`,placeholder:`Email`,value:t,onChange:e=>n(e.target.value),className:`inputStyle`,required:!0}),(0,u.jsxs)(`div`,{className:`\r
            relative\r
          `,children:[(0,u.jsx)(`input`,{type:p?`text`:`password`,placeholder:`Password`,value:d,onChange:e=>f(e.target.value),className:`inputStyle pr-12`,required:!0}),(0,u.jsx)(`div`,{onClick:()=>m(!p),className:`absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-gray-800 transition-transform hover:scale-110`,"aria-label":p?`Hide password`:`Show password`,children:p?(0,u.jsx)(c,{size:20}):(0,u.jsx)(s,{size:20})})]}),(0,u.jsx)(`button`,{type:`submit`,className:`\r
            w-full\r
            py-3\r
            text-purple-700 font-bold\r
            bg-white hover:bg-gray-100\r
            rounded-xl\r
            shadow-lg transition\r
            transform hover:scale-105\r
          `,children:`Login`}),(0,u.jsxs)(`p`,{className:`\r
            text-center text-white\r
          `,children:[`Don't have an account?`,` `,(0,u.jsx)(r,{to:`/register`,className:`\r
              font-semibold underline hover:text-gray-200\r
            `,children:`Register`})]})]}),(0,u.jsx)(`style`,{children:`
        .inputStyle {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.9);
          border: none;
          outline: none;
          transition: all 0.3s;
        }

        .inputStyle:focus {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.5);
        }
      `})]})}export{d as default};