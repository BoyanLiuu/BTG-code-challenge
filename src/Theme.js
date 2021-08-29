import { createGlobalStyle } from "styled-components";

export const lightTheme = {
	bgColor: "hsl(210, 22%, 96%)",
	cardColor: "hsl(0, 0%, 100%)",
	searchInputColor: "hsl(219, 29%, 14%)",
	uncheckedColor: "hsla(219, 29%, 14%,0.1)",
	cardShadowColor: "hsla(233, 71%, 60%, 0.2)",
	cardLightShadowColor: "hsla(235, 42%, 88%, 0.4)",
	cardTitleColor: "hsl(220, 29%, 10%)",
	logoPosition: "0.5rem",
};

export const darkTheme = {
	bgColor: "hsl(220, 29%, 10%)",
	cardColor: "hsl(219, 29%, 14%)",
	searchInputColor: "hsl(0, 0%, 100%)",
	cardShadowColor: "hsla(233, 71%, 60%, 0.4)",
	cardTitleColor: "white",
	cardLightShadowColor: "hsla(235, 42%, 88%, 0.4)",
	uncheckedColor: "hsla(0, 0%, 100%,0.1)",
	logoPosition: "3rem",
};

export const GlobalStyle = createGlobalStyle`
    :root {
        box-sizing: border-box;
        font-size: 62.5%;
        --violet-color: hsl(235, 69%, 61%);
        --light-violet-color: hsl(235,82%,77%);
        --scroll-bar-color: rgba(70, 70, 207, 0.6);
        --hovered-scroll-bar-color: rgba(70, 70, 207, 1);
        --dark-grey-opacity-color: hsla(214, 17%, 51%,0.2);
        --half-light-violet-color: rgba(89, 100, 224, 0.4);
        --dark-grey-opacity-color: hsla(214, 17%, 51%,0.2);
        --dark-grey-color: hsl(214, 17%, 51%);
        
    }
    *,
    ::before,
    ::after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }
    body {
        width:100%;
        min-width: 28rem;
        background-color: ${(props) => props.theme.bgColor};
        font-family: 'Kumbh Sans', sans-serif;
        overflow-x: hidden;
        transition: background-color ease-in-out 0.3s;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
                                    
    }
    a {
        text-decoration: none;
    }
    /* scrollbar width */
    ::-webkit-scrollbar {
        width: 1rem;
    }

    /* scrollbar Track */
    ::-webkit-scrollbar-track {
        background: var(--dark-grey-opacity-color);
    }

    /* scrollbar Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--scroll-bar-color);
        border-radius: 2rem;
    }

    /* scrollbar Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: var(--hovered-scroll-bar-color);
    }
`;
