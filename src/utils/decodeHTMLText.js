export const decodeHtml = (initText) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = initText;
    return txt.value;
}