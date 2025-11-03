
import React from 'react';

const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5.27,16.18 5.27,12.35C5.27,8.52 8.36,5.43 12.19,5.43C15.19,5.43 17.5,6.78 18.69,8.88L21.35,6.69C19.27,4.86 16.18,3.54 12.19,3.54C6.78,3.54 3,7.64 3,12.35C3,17.06 6.78,21.16 12.19,21.16C17.6,21.16 21.35,17.64 21.35,11.1V11.1Z" />
    </svg>
);

export default GoogleIcon;
