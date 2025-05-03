import React from 'react';
import Icon1 from '../Img/1-partner-16-05.png'
import Icon2 from '../Img/2-partner-16-04.png'
import Icon3 from '../Img/3-partner-16-04.png'
import Icon4 from '../Img/4-partner-16-04.png'
import Icon5 from '../Img/5-partner-16-04.png'

const IconMarket: React.FC = () => {

return(
<div className="d-flex flex-wrap mt-5 justify-content-center" style={{ gap: '80px',paddingBottom:'2rem' }}>
    <img src={Icon1.src} alt="Logo 1" style={{ height: '35px' }} />
    <img src={Icon2.src} alt="Logo 2" style={{ height: '35px' }} />
    <img src={Icon3.src} alt="Logo 3" style={{ height: '35px' }} />
    <img src={Icon4.src} alt="Logo 4" style={{ height: '35px' }} />
    <img src={Icon5.src} alt="Logo 5" style={{ height: '35px' }} />
</div>
);
}
export default IconMarket
