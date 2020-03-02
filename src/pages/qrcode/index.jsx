import React, { useEffect, useState } from 'react'



const str = 'https://hcm-staging.oss-cn-beijing.aliyuncs.com/ob/qr/8f214d0cf62f456358036ce720272a24.png';

export default function (){
  const [url, setUrl] = useState();
  useEffect(() => {
    import('./jquery-1.10.2.js').then(jQuery => {
      window.jQuery = jQuery.default.fn;
      import('./jquery.min.js')
      import('./llqrcode')
      import('./jquery.qrcode.min')
      import('./analyticCode')
    }).then(() => {
      setUrl(str);
    })
  }, [])

  return (<img src={url} alt='' onLoad={onLoad}/>)
}

function onLoad(e) {debugger
  window.analyticCode.getUrl('img-url', { src: str }, function(url1, url2){
    debugger
  });
}
