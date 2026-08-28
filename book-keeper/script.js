
const openModalBtn = document.getElementById('show-modal');
const modal = document.getElementById('modal-container');
const closeModalBtn = document.getElementById('close-modal');

const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksConatiner = document.getElementById('bookmark-container');


let bookmarks = [];


function deleteBookmark(url) {
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    createBookmark();
}


// Create Bookmark DOM 
function createBookmark() {
    bookmarksConatiner.textContent = '';
    bookmarks.forEach(bookmark => {
        const item = document.createElement('div');
        item.classList.add('item');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.id = 'delete-bookmark';
        closeIcon.title = 'Delete Bookmark';
        closeIcon.setAttribute('onclick', `deleteBookmark('${bookmark.url}')`);

        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}`);
        favicon.setAttribute('alt', 'Website Icon');
        const link = document.createElement('a');
        link.setAttribute('href', bookmark.url);
        link.setAttribute('target', '_blank');
        link.textContent = bookmark.name;
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksConatiner.appendChild(item);

    })

}

openModalBtn.addEventListener('click', () => {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

window.addEventListener('click', (e) => {
    e.target == modal ? modal.classList.remove('show-modal') : false;
});

function validate(name, url) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    if (!name || !url) {
        alert('Please fill in all the fields');
        return false;
    }
    if (!url.match(regex)) {
        alert('Please enter a valid URL');
        return false;
    }
    return true;
}

function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = [
            {
                name: "Facebook",
                url: "https://www.facebook.com"
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    createBookmark();

}


function storeBookmark(e) {
    e.preventDefault();
    const websiteName = websiteNameEl.value;
    let websiteUrl = websiteUrlEl.value;
    if (!websiteName || !websiteUrl) {
        alert('Please fill in all the fields');
        return;
    }
    if (!websiteUrl.includes('http://') && !websiteUrl.includes('https://')) {
        websiteUrl = `https://${websiteUrl}`;
    }
    if (!validate(websiteName, websiteUrl)) {
        return false;
    }

    const bookmark = {
        name: websiteName,
        url: websiteUrl
    };
    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}


bookmarkForm.addEventListener('submit', storeBookmark);

fetchBookmarks();

