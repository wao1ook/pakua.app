let Btn = document.getElementById('btn');
let url = document.querySelector('.url');
let select = document.querySelector('.format');
let serverURL = 'http://localhost:3000';

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
        if (document.getElementById("mp3").value === 'mp3') {
            downloadMp3(url.value);
        } else if (document.getElementById("mp4").value === 'mp4') {
            downloadMp4(url.value);
        }
    }
});

async function downloadMp3(query) {
    const res = await fetch(`${serverURL}/downloadmp3?url=${query}`);
    if (res.status === 200) {
        Toast.fire({
            icon: 'success',
            title: 'Your download will start shortly'
        });
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
        Toast.fire({
            icon: 'success',
            title: 'Your download will start shortly'
        });
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
