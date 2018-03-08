import { ajax } from "jquery";

const baseUrl = "http://localhost:3001/pokemons";
/* eslint-disable */
export default class PokemonApi {
    getAll() {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: baseUrl
            }).done( response => {
                resolve(response);
            }).fail( response => {
                reject({error: response})
            });
        });
    }
    get(id = 1) {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: baseUrl + `/${id}`
            }).done( response => {
                resolve(response);
            }).fail( response => {
                reject({error: response})
            });
        });
    }
    create(data = {name: "blabla", osef: "ahok"}) {
        return new Promise((resolve, reject) => {
            ajax({
                method: "POST",
                url: baseUrl + "/create",
                data
            }).done( response => {
                resolve(response);
            }).fail( response  => {
                reject({error: response})
            });
        });
    }
    update(id = 1, data = {name: "blabla", osef: "ahok"}) {
        return new Promise((resolve, reject) => {
            ajax({
                method: "PUT",
                url: baseUrl + "/update/" + id,
                data
            }).done( response => {
                resolve(response);
            }).fail( response  => {
                reject({error: response})
            });
        });
    }
    delete(id = 1, callback) {
        return new Promise((resolve, reject) => {
            ajax({
                method: "DELETE",
                url: baseUrl + "/delete/" + id
            }).done( response => {
                resolve(response);
            }).fail( response  => {
                reject({error: response})
            });
        });
    }
    getMarked() {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: baseUrl + "/marked"
            }).done( response => {
                resolve(response);
            }).fail( response => {
                reject({error: response})
            });
        });
    }
    signal(id_pokemon, lat, lng) {
        return new Promise((resolve, reject) => {
            ajax({
                method: "POST",
                url: baseUrl + "/signal",
                data: {
                    id_pokemon,
                    lat,
                    lng
                }
            }).done( response => {
                resolve(response);
            }).fail( response => {
                reject({error: response})
            });
        });
    }
    marked(callback){
      ajax({
          method: "GET",
          url: baseUrl + "/marked"
      }).done( response => {
          callback(response);
      }).fail( response => {
          callback({error: response})
      });
    }

}
/* eslint-enable */
