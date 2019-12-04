import { router } from 'umi'
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
/* document.addEventListener('keyup', ({keyCode, code}) => {
  if(code === 'ArrowRight' || keyCode === 39){
    router.go(1);
  }else if(code === 'ArrowLeft' || keyCode === 37){
    router.go(-1);
  }
}, false) */
