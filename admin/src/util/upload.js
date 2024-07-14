import axios from 'axios'
function upload(url, userForm) {

    const formData = new FormData();
    for (let i in userForm) {
        formData.append(i, userForm[i])
    }
    return axios.post(url, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(res=>res.data)
}

export default upload