const BASE_URL = 'http://localhost:3000/api';

const HTTP_METHOD = {
    POST (data) {
        return {
            method : "POST",
            headers : {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify(data)
        }
    },
    PUT (data) {
        return {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : data ? JSON.stringify(data) : null
        }
    },
    DELETE () {
        return {
            method : "DELETE"
        }
    }
}

const request = async(url,option) => {
    const response = await fetch(url, option);
    if (!response.ok) {
        alert("에러가 발생하였습니다.")
        console.error('에러 발생!!');
    }
    return response.json();
}

const requestWithoutJson = async(url,option) => {
    const response = await fetch(url, option);
    if (!response.ok) {
        alert("에러가 발생하였습니다.")
        console.error('에러 발생!!');
    }
    return response;
}

const menuAPI = {
    getAllMenuByCategory(category) {
        return request(`${BASE_URL}/category/${category}/menu`);
    },

    createMenuByCategory(category, name) {
        return request(`${BASE_URL}/category/${category}/menu`, HTTP_METHOD.POST({name}));
    },

    updateMenu(category, name, menuId) {
        return request(`${BASE_URL}/category/${category}/menu/${menuId}`, HTTP_METHOD.PUT({name}));
    },

    updateSoldOutMenu(category, menuId) {
        return request(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`, HTTP_METHOD.PUT());
    },

    deleteMenu(category, menuId) {
        return requestWithoutJson(`${BASE_URL}/category/${category}/menu/${menuId}`, HTTP_METHOD.DELETE());
    }
}

export default menuAPI;