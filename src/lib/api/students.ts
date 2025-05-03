import requestHandler from "../hooks/request-handler"

const studentsApi = {
    getStudents(): any {
        return requestHandler({ url: "students/get", method: "get"});
    },
    searchStudents(data: any): any {
        return requestHandler({ url: "students/search", method: "post", data: data});
    }
}

export default studentsApi;