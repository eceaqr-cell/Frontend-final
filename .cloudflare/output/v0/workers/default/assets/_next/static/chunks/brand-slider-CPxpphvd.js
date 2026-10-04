import{r as e}from"./framework-A1pNZAzD.js";import{t}from"./dist-BDDOAqrg.js";import"./utils-BvRk9kiK.js";import{t as n}from"./react-CnMIde8d.js";var r=e();function i({className:e,reverse:n=!1,pauseOnHover:i=!1,children:a,vertical:o=!1,repeat:s=4,...c}){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-100% - var(--gap)));
            }
          }
 
          @keyframes marquee-vertical {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(calc(-100% - var(--gap)));
            }
          }
 
          @keyframes scroll {
            to {
              transform: translate(calc(-50% - 0.5rem));
            }
          }
 
          .animate-marquee {
            animation: marquee var(--duration) linear infinite;
          }
 
          .animate-marquee-vertical {
            animation: marquee-vertical var(--duration) linear infinite;
          }
 
          .animate-reverse {
            animation-direction: reverse !important;
          }
 
          .pause-on-hover:hover .animate-marquee,
          .pause-on-hover:hover .animate-marquee-vertical {
            animation-play-state: paused !important;
          }
 
          .animate-scroll {
            animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
          }
        `}),(0,r.jsx)(`div`,{...c,className:t(`group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]`,{"flex-row":!o,"flex-col":o,"pause-on-hover":i},e),children:Array(s).fill(0).map((e,i)=>(0,r.jsx)(`div`,{className:t(`flex shrink-0 justify-around gap-(--gap)`,{"animate-marquee flex-row":!o,"animate-marquee-vertical flex-col":o,"animate-reverse":n}),children:a},i))})]})}function a({brandList:e}){return(0,r.jsx)(`section`,{children:(0,r.jsx)(`div`,{className:`py-6 md:py-10`,children:(0,r.jsx)(`div`,{className:`mx-auto max-w-6xl`,children:(0,r.jsxs)(n.div,{initial:{opacity:0,y:32},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:1,delay:.6,ease:`easeInOut`},className:`flex flex-col gap-3`,children:[(0,r.jsx)(`div`,{className:`flex justify-center text-center py-3 md:py-4 relative`,children:(0,r.jsxs)(`div`,{className:`flex items-center justify-center gap-4`,children:[(0,r.jsx)(`div`,{className:`hidden md:block h-0.5 w-40 bg-linear-to-l from-muted-foreground to-white dark:from-muted-foreground dark:to-transparent opacity-20`}),(0,r.jsx)(`p`,{className:`text-sm font-normal sm:px-2 px-10 text-muted-foreground text-center`,children:`Shipping/delivery partners`}),(0,r.jsx)(`div`,{className:`hidden md:block h-0.5 w-40 bg-linear-to-r from-muted-foreground to-white dark:from-muted-foreground dark:to-transparent opacity-20`})]})}),e&&e.length>0&&(0,r.jsx)(`div`,{className:`py-4`,children:(0,r.jsx)(i,{pauseOnHover:!0,className:`[--duration:20s] p-0`,children:e.map((e,t)=>(0,r.jsxs)(`div`,{children:[(0,r.jsx)(`img`,{src:e.image,alt:e.name,className:`w-36 h-8 mr-6 lg:mr-20 dark:hidden`}),(0,r.jsx)(`img`,{src:e.lightimg,alt:e.name,className:`hidden dark:block w-36 h-8 mr-12 lg:mr-20`})]},t))})})]})})})})}export{a as default};