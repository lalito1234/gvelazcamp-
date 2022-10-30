import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://rickandmortyapi.com/api/character",
	withCredentials: false,
	headers:{
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

const apiComment = axios.create({
	baseURL:'http://localhost:3000/books',
	withCredentials:false,
	headers:{
		Accept:"application/json",
		"Content-Type":"application/json"
	}
})

export default {
	getEvents() {
		return apiClient.get("/");
	},
	getEventsPage(page) {
		return apiClient.get("?page=" + page);
	},
	getEvent(id) {
		return apiClient.get("/" + id);
	},
	getEpisode(name , status){
		return apiClient.get("/?name="+name+"&status="+status);
	},
	getStatus(status){
		return apiClient.get('/?status='+status);
	},
	getComments(id){
		return apiComment.get('/?char_id='+id);
	},

	postComment(data){
		return apiComment.post('/add',data);
	}
};
