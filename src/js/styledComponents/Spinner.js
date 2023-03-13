import styled from 'styled-components';

/**
 * Styled spinner component using svg and css3 animations. 
 * 
 * Modified from: //https://stackoverflow.com/questions/6091253/overlay-with-spinner/20013732
 * 
 * 
 */

const Spinner = styled.svg`
    position: fixed;
    display: block;
    z-index: 100;
    left: 50%;
    top: 10%;
    width:15em;
    height: 15em;
    margin-left: -7.5em;
    
    -webkit-animation: rotation .6s infinite linear;
    -moz-animation: rotation .6s infinite linear;
    -o-animation: rotation .6s infinite linear;
    animation: rotation .6s infinite linear;
    border-left:15px solid rgba(0,174,239,.15);
    border-right:15px solid rgba(0,174,239,.15);
    border-bottom:15px solid rgba(0,174,239,.15);
    border-top:15px solid rgba(0,174,239,.8);
    border-radius:100%;
    
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    @-webkit-keyframes rotation {
   from {-webkit-transform: rotate(0deg);}
   to {-webkit-transform: rotate(359deg);}
}
@-moz-keyframes rotation {
   from {-moz-transform: rotate(0deg);}
   to {-moz-transform: rotate(359deg);}
}
@-o-keyframes rotation {
   from {-o-transform: rotate(0deg);}
   to {-o-transform: rotate(359deg);}
}
@keyframes rotation {
   from {transform: rotate(0deg);}
   to {transform: rotate(359deg);}
}

`;

export default Spinner