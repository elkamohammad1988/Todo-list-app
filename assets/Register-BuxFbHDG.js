import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{n as r,s as i}from"./chunk-QFMPRPBF-DmyzOyiA.js";import{n as a}from"./dist-D8al6Aob.js";import{c as o,f as s,g as c,m as l,n as u,t as d}from"./firebase-CPlfYfp7.js";import{n as f,r as p}from"./fa-Bx0z-9-B.js";var m=t(e(),1),h=n();function g(){let[e,t]=(0,m.useState)(``),[n,g]=(0,m.useState)(``),[_,v]=(0,m.useState)(``),[y,b]=(0,m.useState)(``),[x,S]=(0,m.useState)(``),[C,w]=(0,m.useState)(``),[T,E]=(0,m.useState)(!1),[D,O]=(0,m.useState)(!1),k=i();async function A(t){if(t.preventDefault(),x!==C){a.error(`Passwords do not match`);return}try{let t=await l(d,_,x);await c(t.user),a.success(`Verification email sent!`),await o(s(u,`users`,t.user.uid),{firstName:e,lastName:n,phone:y,role:`user`,createdAt:new Date}),k(`/`)}catch(e){a.error(e.message)}}return(0,h.jsxs)(`div`,{className:`\r
        flex items-center justify-center\r
        min-h-screen\r
        p-4\r
        bg-white dark:bg-gray-900\r
      `,children:[(0,h.jsxs)(`div`,{className:`\r
          w-full max-w-lg\r
          p-8 space-y-5\r
          bg-white dark:bg-gray-800\r
          border border-gray-300 dark:border-gray-700 rounded-xl\r
          shadow-md\r
        `,children:[(0,h.jsx)(`h1`,{className:`\r
            text-3xl text-center text-black dark:text-white font-bold\r
          `,children:`Create Account 🚀`}),(0,h.jsxs)(`form`,{onSubmit:A,className:`\r
            space-y-4\r
          `,children:[(0,h.jsxs)(`div`,{className:`\r
              grid grid-cols-1 sm:grid-cols-2\r
              gap-3\r
            `,children:[(0,h.jsx)(`input`,{type:`text`,placeholder:`First Name`,value:e,onChange:e=>t(e.target.value),className:`input`,required:!0}),(0,h.jsx)(`input`,{type:`text`,placeholder:`Last Name`,value:n,onChange:e=>g(e.target.value),className:`input`,required:!0})]}),(0,h.jsx)(`input`,{type:`email`,placeholder:`Email`,value:_,onChange:e=>v(e.target.value),className:`input`,required:!0}),(0,h.jsx)(`input`,{type:`tel`,placeholder:`Phone Number`,value:y,onChange:e=>b(e.target.value),className:`input`}),(0,h.jsxs)(`div`,{className:`\r
              relative\r
            `,children:[(0,h.jsx)(`input`,{type:T?`text`:`password`,placeholder:`Password`,value:x,onChange:e=>S(e.target.value),className:`input pr-10`,required:!0}),(0,h.jsx)(`div`,{onClick:()=>E(!T),className:`absolute right-3 top-3 text-gray-500 cursor-pointer`,children:T?(0,h.jsx)(p,{}):(0,h.jsx)(f,{})})]}),(0,h.jsxs)(`div`,{className:`\r
              relative\r
            `,children:[(0,h.jsx)(`input`,{type:D?`text`:`password`,placeholder:`Confirm Password`,value:C,onChange:e=>w(e.target.value),className:`input pr-10`,required:!0}),(0,h.jsx)(`div`,{onClick:()=>O(!D),className:`absolute right-3 top-3 text-gray-500 cursor-pointer`,children:D?(0,h.jsx)(p,{}):(0,h.jsx)(f,{})})]}),(0,h.jsx)(`button`,{type:`submit`,className:`\r
              w-full\r
              py-3\r
              text-white font-semibold\r
              bg-indigo-600 hover:bg-indigo-700\r
              rounded-lg focus:ring-2 focus:ring-indigo-400\r
              transition\r
            `,children:`Register`})]}),(0,h.jsxs)(`p`,{className:`\r
            text-center text-gray-500 dark:text-gray-300 text-sm\r
          `,children:[`Already have an account?`,` `,(0,h.jsx)(r,{to:`/`,className:`\r
              text-indigo-600 font-semibold hover:underline\r
            `,children:`Login`})]})]}),(0,h.jsx)(`style`,{children:`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          background: white;
          color: #111827;
          outline: none;
          transition: all 0.2s;
        }

        .dark .input {
          background: #1f2937;
          border-color: #374151;
          color: white;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.3);
        }
      `})]})}export{g as default};