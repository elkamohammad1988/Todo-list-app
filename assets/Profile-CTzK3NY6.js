import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{n as r}from"./dist-D8al6Aob.js";import{t as i,y as a}from"./firebase-CPlfYfp7.js";var o=t(e(),1),s=n();function c({dark:e}){let[t,n]=(0,o.useState)(``),c=(0,o.useRef)(null);(0,o.useEffect)(()=>{let e=new IntersectionObserver(([e])=>{e.isIntersecting&&e.target.classList.add(`show`)},{threshold:.2});return c.current&&e.observe(c.current),()=>c.current&&e.unobserve(c.current)},[]),(0,o.useEffect)(()=>{i.currentUser&&n(i.currentUser.displayName||``);let e=localStorage.getItem(`profileName`);e&&n(e)},[]),(0,o.useEffect)(()=>{localStorage.setItem(`profileName`,t)},[t]);async function l(){if(i.currentUser)try{await a(i.currentUser,{displayName:t}),r.success(`Profile updated successfully!`)}catch(e){r.error(`Error updating profile: `+e.message)}}return(0,s.jsxs)(`div`,{ref:c,className:`opacity-0 translate-y-10 transition-all duration-500 max-w-xl p-10 mx-auto rounded-2xl shadow ${e?`bg-gray-900 text-white`:`bg-gray-100 text-black`}`,children:[(0,s.jsx)(`h1`,{className:`\r
          mb-6\r
          text-3xl font-bold\r
        `,children:`Profile`}),(0,s.jsxs)(`div`,{className:`\r
          space-y-4\r
        `,children:[(0,s.jsx)(`input`,{type:`text`,placeholder:`Your Name`,value:t,onChange:e=>n(e.target.value),className:`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${e?`focus:ring-indigo-400 bg-gray-800 text-white`:`focus:ring-indigo-500 bg-white text-black`}`}),(0,s.jsx)(`button`,{onClick:l,className:`\r
            px-6 py-2\r
            text-white\r
            bg-indigo-600 hover:bg-indigo-500\r
            rounded-lg\r
            transition-all\r
            transform hover:scale-105\r
          `,children:`Save Changes`})]})]})}export{c as default};