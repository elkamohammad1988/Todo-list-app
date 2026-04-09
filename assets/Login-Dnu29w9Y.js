import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{n as r,s as i}from"./chunk-QFMPRPBF-DCfZhIG8.js";import{_ as a,t as o}from"./firebase-CPlfYfp7.js";import{a as s,i as c,n as l,r as u}from"./fa-Bx0z-9-B.js";var d=t(e(),1),f=n();function p(){let e=i(),[t,n]=(0,d.useState)(``),[p,m]=(0,d.useState)(``),[h,g]=(0,d.useState)(!1),[_,v]=(0,d.useState)(!1),[y,b]=(0,d.useState)(!1),[x,S]=(0,d.useState)(``);async function C(n){n.preventDefault(),S(``),b(!0);try{await a(o,t,p),_&&localStorage.setItem(`remember`,`true`),e(`/dashboard`)}catch{S(`Invalid email or password`)}finally{b(!1)}}return(0,f.jsx)(`div`,{className:`\r
        flex items-center justify-center\r
        min-h-screen\r
        p-4\r
        bg-white dark:bg-gray-900\r
      `,children:(0,f.jsxs)(`div`,{className:`\r
          w-full max-w-md\r
          p-8 space-y-6\r
          bg-white dark:bg-gray-800\r
          border border-gray-200 dark:border-gray-700 rounded-xl\r
          shadow-md\r
        `,children:[(0,f.jsxs)(`div`,{className:`\r
            space-y-2\r
            text-center\r
          `,children:[(0,f.jsxs)(`div`,{className:`\r
              text-3xl text-indigo-600 font-bold\r
            `,children:[`Todo`,(0,f.jsx)(`span`,{className:`\r
                text-black dark:text-white\r
              `,children:`Pro`})]}),(0,f.jsx)(`p`,{className:`\r
              text-gray-500 dark:text-gray-300 text-sm\r
            `,children:`Welcome back! Please login`})]}),x&&(0,f.jsx)(`div`,{className:`\r
              text-sm text-red-500 text-center\r
            `,children:x}),(0,f.jsx)(`input`,{type:`email`,placeholder:`Email`,value:t,onChange:e=>n(e.target.value),className:`\r
            w-full p-3\r
            border border-gray-300 dark:border-gray-700\r
            rounded-lg\r
            bg-white dark:bg-gray-800\r
            text-black dark:text-white\r
            focus:outline-none focus:ring-2 focus:ring-indigo-500\r
          `}),(0,f.jsxs)(`div`,{className:`\r
            relative\r
          `,children:[(0,f.jsx)(`input`,{type:h?`text`:`password`,placeholder:`Password`,value:p,onChange:e=>m(e.target.value),className:`\r
              w-full p-3 pr-12\r
              border border-gray-300 dark:border-gray-700\r
              rounded-lg\r
              bg-white dark:bg-gray-800\r
              text-black dark:text-white\r
              focus:outline-none focus:ring-2 focus:ring-indigo-500\r
            `}),(0,f.jsx)(`div`,{onClick:()=>g(!h),className:`absolute right-3 top-3 text-gray-500 cursor-pointer`,children:h?(0,f.jsx)(u,{}):(0,f.jsx)(l,{})})]}),(0,f.jsxs)(`div`,{className:`\r
            flex justify-between items-center\r
            text-sm\r
          `,children:[(0,f.jsxs)(`label`,{className:`\r
              flex items-center\r
              text-gray-500\r
              gap-2\r
            `,children:[(0,f.jsx)(`input`,{type:`checkbox`,checked:_,onChange:()=>v(!_)}),`Remember me`]}),(0,f.jsx)(r,{to:`/forgot-password`,className:`\r
              text-indigo-600 hover:underline\r
            `,children:`Forgot password?`})]}),(0,f.jsx)(`button`,{onClick:C,disabled:y,className:`\r
            w-full\r
            py-3\r
            text-white font-semibold\r
            bg-indigo-600 hover:bg-indigo-700\r
            rounded-lg\r
            transition disabled:opacity-50\r
          `,children:y?`Logging in...`:`Login`}),(0,f.jsxs)(`div`,{className:`\r
            flex items-center\r
            gap-3\r
          `,children:[(0,f.jsx)(`div`,{className:`\r
              flex-1\r
              h-px\r
              bg-gray-300 dark:bg-gray-700\r
            `}),(0,f.jsx)(`span`,{className:`\r
              text-gray-400 text-sm\r
            `,children:`OR`}),(0,f.jsx)(`div`,{className:`\r
              flex-1\r
              h-px\r
              bg-gray-300 dark:bg-gray-700\r
            `})]}),(0,f.jsxs)(`div`,{className:`\r
            flex\r
            gap-3\r
          `,children:[(0,f.jsxs)(`button`,{className:`\r
              flex-1 flex items-center justify-center\r
              p-2\r
              hover:bg-gray-100 dark:hover:bg-gray-700\r
              border rounded-lg\r
              gap-2\r
            `,children:[(0,f.jsx)(s,{}),` Google`]}),(0,f.jsxs)(`button`,{className:`\r
              flex-1 flex items-center justify-center\r
              p-2\r
              hover:bg-gray-100 dark:hover:bg-gray-700\r
              border rounded-lg\r
              gap-2\r
            `,children:[(0,f.jsx)(c,{}),` GitHub`]})]}),(0,f.jsxs)(`p`,{className:`\r
            text-center text-gray-500 text-sm\r
          `,children:[`Don’t have an account?`,` `,(0,f.jsx)(r,{to:`/register`,className:`\r
              text-indigo-600 font-semibold\r
            `,children:`Sign up`})]})]})})}export{p as default};