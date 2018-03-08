import $ from "jquery";

const baseUrl = "/types";
/* eslint-disable */
export default class TypeApi {
    getAllTypes() {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "GET",
                url: baseUrl
            }).done( response => {
                resolve(response);
            }).fail( response => {
                reject({error: response})
            });
        });
    }
}
/* eslint-enable */
