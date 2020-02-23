export function storageAvailable() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

export function saveToken(token:string) {
    if(storageAvailable()) {
        localStorage.setItem('token',token);
    }else {
        console.log("Storage is not available!")
    }
}

export function getToken() {
    if(storageAvailable() && localStorage.getItem('token')) {
        return localStorage.getItem('token');
    } else {
        return '';
    }
}

export function deleteToken() {
    if(storageAvailable() && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        return true;
    } else {
        return false;
    }
}
