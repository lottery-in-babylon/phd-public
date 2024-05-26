export const codeCSS = `
    code,
    kbd,
    pre,
    samp {
    font-family: monospace;
    }

    /* Inline code */
    code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
    }

    /* User input typically entered via keyboard */
    kbd {
    padding: 2px 4px;
    font-size: 90%;
    color: #fff;
    background-color: #333;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
    }

    kbd kbd {
    padding: 0;
    font-size: 100%;
    box-shadow: none;
    }

    /* Blocks of code */
    pre {
    display: block;
    padding: 9px; /* Assuming (@line-height-computed - 1) / 2 is approximately 9px */
    margin: 0 0 10px; /* Assuming @line-height-computed / 2 is approximately 10px */
    font-size: 13px; /* Assuming @font-size-base is 14px */
    line-height: 1.42857143; /* Assuming @line-height-base is 1.42857143 */
    word-break: break-all;
    word-wrap: break-word;
    color: #333;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

    pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    white-space: pre-wrap;
    background-color: transparent;
    border-radius: 0;
    }

    /* Enable scrollable blocks of code */
    .pre-scrollable {
    max-height: 340px; /* Assuming @pre-scrollable-max-height is 340px */
    overflow-y: scroll;
    }

`;

export const tableCSS = `

    /* Basic table styling */
    table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    color: #212529;
    }

    /* Table borders */
    table, th, td {
    border: 1px solid #dee2e6;
    }

    /* Table headers */
    th, td {
    padding: 0.75rem;
    vertical-align: top;
    }

    /* Table header styling */
    th {
    background-color: #f8f9fa;
    font-weight: bold;
    }

    /* Zebra striping for table rows */
    tbody tr:nth-of-type(odd) {
    background-color: #f2f2f2;
    }

`;

export const customCSS = `

    /* Custom CSS */
    div.warning {
        padding: 10px;
        background-color: #fcf8e3;

    }
    
    img {
        max-width: 100%;
    }

`;