const richText = (text) => {
    const oDiv = document.createElement('div');
    oDiv.innerHTML = text;
    const p = oDiv.getElementsByTagName('p');

    for (let i = 0; i < p.length; i++) {
        if (p[i].getElementsByTagName('img').length === 1) {
            p[i].classList.add('pic');
        }
    }
    return oDiv;
}

console.log(richText('<p><img/></p><p></p>'));