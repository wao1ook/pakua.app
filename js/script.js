const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
let select = document.querySelector('.format');
let Btn = document.getElementById('btn');
let url = document.querySelector('.url');
let serverURL = 'https://pakua-app.herokuapp.com';

const toggleSwitch = document.querySelector(".theme-selector");

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

Btn.addEventListener('click', () => {
    if (!url.value) {
        Toast.fire({
            icon: 'error',
            title: 'Please enter Youtube video url'
        });
    } else {
        if (select.value === 'mp3') {
            downloadMp3(url.value);
        } else if (select.value === 'mp4') {
            downloadMp4(url.value);
        }
        Toast.fire({
            icon: 'success',
            title: 'Your download will start shortly'
        });
    }
});

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
