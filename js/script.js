const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const toggleSwitch = document.querySelector(".theme-selector");
const select = document.querySelector('.format');
const Btn = document.getElementById('btn');
const url = document.querySelector('.url');
const serverURL = 'http://localhost:3000';
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'light') {
        toggleSwitch.checked = true;
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);


Btn.addEventListener('click', () => {
    if (!url.value) {
        Toast.fire({
            icon: 'error',
            title: 'Please enter Youtube video url'
        });
    } else {
        if (url.value.length < 40) {
            if (select.value === 'mp3') {
                downloadMp3(url.value);
            } else if (select.value === 'mp4') {
                downloadMp4(url.value);
            }
        } else if (url.value.length > 40) {
            downloadPlaylist(url);
        }
        Toast.fire({
            icon: 'success',
            title: 'Your download will start shortly'
        });
    }
});

async function downloadPlaylist(query) {
    console.log('Playlist Env')
}

async function downloadMp3(query) {
    const res = await fetch(`${serverURL}/downloadmp3?url=${query}`);
    if (res.status === 200) {
        var a = document.createElement('a');
        a.href = `${serverURL}/downloadmp3?url=${query}`;
        a.setAttribute('download', '');
        a.click();
    } else if (res.status === 400) {
        Toast.fire({
            icon: 'error',
            title: 'Invalid url'
        });
    }
}

async function downloadMp4(query) {
    const res = await fetch(`${serverURL}/downloadmp4?url=${query}`);
    if (res.status === 200) {
        var a = document.createElement('a');
        a.href = `${serverURL}/downloadmp4?url=${query}`;
        a.setAttribute('download', '');
        a.click();
    } else if (res.status === 400) {
        Toast.fire({
            icon: 'error',
            title: 'Invalid url'
        });
    }
}
