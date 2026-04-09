import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{n as r,s as i}from"./chunk-QFMPRPBF-DmyzOyiA.js";import{n as a}from"./dist-D8al6Aob.js";/* empty css                      */import{c as o,f as s,g as c,m as l,n as u,t as d}from"./firebase-DfgmWA3C.js";import{n as f,r as p}from"./fa-DxxERJbU.js";var m=t(e(),1),h=n();function g({dark:e}){let[t,n]=(0,m.useState)(``),[g,_]=(0,m.useState)(``),[v,y]=(0,m.useState)(``),[b,x]=(0,m.useState)(``),[S,C]=(0,m.useState)(``),[w,T]=(0,m.useState)(``),[E,D]=(0,m.useState)(!1),[O,k]=(0,m.useState)(!1),A=i();async function j(e){if(e.preventDefault(),S!==w){a.error(`Passwords do not match`);return}try{let e=await l(d,v,S);await c(e.user),a.success(`Verification email sent!`),await o(s(u,`users`,e.user.uid),{firstName:t,lastName:g,phone:b,role:`user`,createdAt:new Date}),A(`/`)}catch(e){a.error(e.message)}}return(0,h.jsxs)(`div`,{className:`flex items-center justify-center min-h-screen p-4 ${e?`bg-gray-900`:`bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500`}`,children:[(0,h.jsxs)(`div`,{className:`w-full max-w-lg p-8 sm:p-10 ${e?`bg-gray-800 text-white`:`bg-white/20`} border border-white/30 rounded-3xl backdrop-blur-2xl shadow-2xl`,children:[(0,h.jsx)(`h1`,{className:`\r
            mb-8\r
            text-3xl text-center sm:text-4xl font-bold\r
          `,children:`Create Account 🚀`}),(0,h.jsxs)(`form`,{onSubmit:j,className:`\r
            space-y-5\r
          `,children:[(0,h.jsxs)(`div`,{className:`\r
              grid grid-cols-1 sm:grid-cols-2\r
              gap-4\r
            `,children:[(0,h.jsx)(`input`,{type:`text`,placeholder:`First Name`,value:t,onChange:e=>n(e.target.value),className:`inputStyle ${e?`darkInput`:``}`,required:!0}),(0,h.jsx)(`input`,{type:`text`,placeholder:`Last Name`,value:g,onChange:e=>_(e.target.value),className:`inputStyle ${e?`darkInput`:``}`,required:!0})]}),(0,h.jsx)(`input`,{type:`email`,placeholder:`Email`,value:v,onChange:e=>y(e.target.value),className:`inputStyle ${e?`darkInput`:``}`,required:!0}),(0,h.jsx)(`input`,{type:`tel`,placeholder:`Phone Number`,value:b,onChange:e=>x(e.target.value),className:`inputStyle ${e?`darkInput`:``}`}),(0,h.jsxs)(`div`,{className:`\r
              relative\r
            `,children:[(0,h.jsx)(`input`,{type:E?`text`:`password`,placeholder:`Password`,value:S,onChange:e=>C(e.target.value),className:`inputStyle pr-12 ${e?`darkInput`:``}`,required:!0}),(0,h.jsx)(`div`,{onClick:()=>D(!E),className:`absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-gray-300 transition-transform hover:scale-110`,children:E?(0,h.jsx)(p,{size:20}):(0,h.jsx)(f,{size:20})})]}),(0,h.jsxs)(`div`,{className:`\r
              relative\r
            `,children:[(0,h.jsx)(`input`,{type:O?`text`:`password`,placeholder:`Confirm Password`,value:w,onChange:e=>T(e.target.value),className:`inputStyle pr-12 ${e?`darkInput`:``}`,required:!0}),(0,h.jsx)(`div`,{onClick:()=>k(!O),className:`absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-gray-300 transition-transform hover:scale-110`,children:O?(0,h.jsx)(p,{size:20}):(0,h.jsx)(f,{size:20})})]}),(0,h.jsx)(`button`,{type:`submit`,className:`\r
              w-full\r
              py-3 mt-4\r
              text-purple-700 font-bold\r
              bg-white hover:bg-gray-100\r
              rounded-xl\r
              shadow-lg transition\r
            `,children:`Register`})]}),(0,h.jsxs)(`p`,{className:`\r
            mt-6\r
            text-center text-white\r
          `,children:[`Already have an account?`,` `,(0,h.jsx)(r,{to:`/`,className:`\r
              font-semibold underline hover:text-gray-200\r
            `,children:`Login`})]})]}),(0,h.jsx)(`style`,{children:`
        .inputStyle {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.9);
          border: none;
          outline: none;
          transition: all 0.3s;
          color: #111827;
        }
        .inputStyle:focus {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.5);
        }
        .darkInput {
          background: rgba(31,41,55,0.8);
          color: #f9fafb;
        }
      `})]})}export{g as default};