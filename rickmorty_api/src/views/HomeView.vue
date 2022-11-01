<template>
  <div class="home">
    <div class="btn-container">
		<button v-on:click="prevPage">PREV</button>
		<button v-on:click="nextPage">NEXT</button>
		&nbsp;
		&nbsp;
		&nbsp;
	</div>
	<br/>
	<div>
		<label>Order By :</label>
		&nbsp;
		<select @change="changeVal($event)">
			<option>Select</option>
			<option value="asc">Ascending</option>
			<option value="des">Descending</option>
		</select>
	</div>
	<div>
		<label>Filter By Status :</label>
		&nbsp;
		<select @change="changeStatus($event)">
			<option>Select</option>
			<option value="alive">Alive</option>
			<option value="dead">Dead</option>
			<option value="unknown">Unknown</option>
		</select>
	</div>
	<div class="container">
		<EventCard v-for="event in events" :key="event.id" :event="event" />
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Service from "@/services/service.js";
import EventCard from "@/components/EventCard.vue";
export default {
  name: 'HomeView',
  components: {
    EventCard
  },
  data() {
		return {
			events: null,
			page: 1
		};
	},
	created() {
		Service.getEvents()
			.then((response) => {
				console.log("events:", response.data.results);
				this.events = response.data.results;
			})
			.catch((error) => {
				console.log(error);
			});
	},
	methods: {
		nextPage: function () {
			this.page++;
			this.getPage();
		},
		prevPage: function () {
			this.page < 2 ? this.page : this.page--;
			this.getPage();
		},
		getPage: function () {
			Service.getEventsPage(this.page)
				.then((response) => {
					//console.log("events:", response.data.results);
					this.events = response.data.results;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		changeVal: function(event){
			// alert(event.target.value)
			if(event.target.value == 'des'){
				this.events.reverse()
			}
			if(event.target.value == 'asc'){
				this.getPage()
			}
		},
		changeStatus: function(event){
			if(event.target.value == "Select"){
				Service.getEventsPage(this.page)
				.then((response) => {
					//console.log("events:", response.data.results);
					this.events = response.data.results;
				})
				.catch((error) => {
					console.log(error);
				});
			}else{
				Service.getStatus(event.target.value)
					.then((response)=>{
						this.events = response.data.results;
					})
			}
		}	
	}
}
</script>

<style lang="css">
.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
</style>

